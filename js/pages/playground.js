// ═══════════════════════════════════════════════════
// Dataset Playground — real CSV visualization + metadata
// Wired to AppState for cross-page data flow (T13)
// ═══════════════════════════════════════════════════

import { PRELOADED_DATASETS, getIrisData, getHousingData, getTitanicData, getDiabetesData, getSyntheticData } from '../utils/datasets.js';
import { parseCSV } from '../utils/csv-parser.js';
import { AppState } from '../utils/app-state.js';

const DATASET_LOADERS = {
  iris: () => { const d = getIrisData(); return { ...d, name: 'Iris' }; },
  housing: () => { const d = getHousingData(); return { ...d, name: 'Housing' }; },
  titanic: () => { const d = getTitanicData(); return { ...d, name: 'Titanic' }; },
  diabetes: () => { const d = getDiabetesData(); return { ...d, name: 'Diabetes' }; },
  synthetic: () => { const d = getSyntheticData(3, 30, 0.1); return { ...d, name: 'Synthetic 2D' }; },
};

function showToast(message, type = 'success') {
  const existing = document.getElementById('pg-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'pg-toast';
  const bg = type === 'error' ? 'rgba(163,45,45,0.9)' : 'rgba(52,211,153,0.9)';
  toast.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:9999;padding:12px 20px;border-radius:10px;background:${bg};color:#fff;font-family:"Space Grotesk",sans-serif;font-size:13px;font-weight:500;box-shadow:0 8px 32px rgba(0,0,0,0.4);animation:fadeIn 0.3s ease`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

const DATASET_METADATA = {
  iris: {
    samples: 150, features: 4, classes: 3,
    featureNames: ['Sepal Length', 'Sepal Width', 'Petal Length', 'Petal Width'],
    classNames: ['Setosa', 'Versicolor', 'Virginica'],
    classCounts: [50, 50, 50],
    task: 'Classification',
    description: 'Classic multiclass flower classification. Each sample is a flower described by 4 measurements.',
  },
  housing: {
    samples: 506, features: 13, classes: null,
    featureNames: ['CRIM', 'ZN', 'INDUS', 'CHAS', 'NOX', 'RM', 'AGE', 'DIS', 'RAD', 'TAX', 'PTRATIO', 'B', 'LSTAT'],
    classNames: null, classCounts: null,
    task: 'Regression',
    description: 'Boston house price prediction. Features describe neighbourhood characteristics. Target is median home value.',
  },
  titanic: {
    samples: 891, features: 7, classes: 2,
    featureNames: ['Pclass', 'Sex', 'Age', 'SibSp', 'Parch', 'Fare', 'Embarked'],
    classNames: ['Did Not Survive', 'Survived'],
    classCounts: [549, 342],
    task: 'Classification',
    description: 'Predict Titanic passenger survival. A classic binary classification benchmark.',
  },
  diabetes: {
    samples: 442, features: 10, classes: null,
    featureNames: ['Age', 'Sex', 'BMI', 'BP', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6'],
    classNames: null, classCounts: null,
    task: 'Regression',
    description: 'Predict diabetes disease progression one year after baseline. 10 normalized physiological measurements.',
  },
  synthetic: {
    samples: 90, features: 2, classes: 3,
    featureNames: ['Feature X', 'Feature Y'],
    classNames: ['Class 0', 'Class 1', 'Class 2'],
    classCounts: [30, 30, 30],
    task: 'Classification',
    description: 'Synthetic 2D dataset with 3 Gaussian clusters. Great for visualizing classification boundaries.',
  },
};

// ── Canvas scatter plot from CSV data ──────────────────────
function drawScatterFromData(canvasId, rows, xCol, yCol, colorCol) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !rows.length) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width  = rect.width  * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width  = rect.width  + 'px';
  canvas.style.height = rect.height + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const w = rect.width, h = rect.height, pad = 56;

  // Gather numeric X and Y values
  const raw = rows.filter(r => r[xCol] !== undefined && r[yCol] !== undefined && !isNaN(parseFloat(r[xCol])) && !isNaN(parseFloat(r[yCol])));
  if (raw.length === 0) {
    ctx.fillStyle = 'rgba(164,230,255,0.4)'; ctx.font = '14px "Space Grotesk"';
    ctx.textAlign = 'center'; ctx.fillText('Selected columns have no numeric data', w / 2, h / 2);
    return;
  }
  const xs = raw.map(r => parseFloat(r[xCol]));
  const ys = raw.map(r => parseFloat(r[yCol]));
  const xMin = Math.min(...xs), xMax = Math.max(...xs), xRange = xMax - xMin || 1;
  const yMin = Math.min(...ys), yMax = Math.max(...ys), yRange = yMax - yMin || 1;

  const toPixX = v => pad + ((v - xMin) / xRange) * (w - 2 * pad);
  const toPixY = v => (h - pad) - ((v - yMin) / yRange) * (h - 2 * pad);

  // Colors by color column (categorical or numeric bucketing)
  const COLORS = ['#00d1ff', '#d0bcff', '#34d399', '#fbbf24', '#ffb4ab', '#f9a1ff', '#4cd6ff', '#ff6b6b'];
  let colorMap = {};
  if (colorCol && colorCol !== '__none__') {
    const uniqueVals = [...new Set(raw.map(r => String(r[colorCol])))];
    uniqueVals.forEach((v, i) => { colorMap[v] = COLORS[i % COLORS.length]; });
  }

  // Background
  ctx.fillStyle = 'rgba(11,19,38,0)';
  ctx.fillRect(0, 0, w, h);

  // Grid
  ctx.strokeStyle = 'rgba(164,230,255,0.04)'; ctx.lineWidth = 1;
  for (let i = 0; i <= 8; i++) {
    const gx = pad + (i / 8) * (w - 2 * pad);
    const gy = pad + (i / 8) * (h - 2 * pad);
    ctx.beginPath(); ctx.moveTo(gx, pad);      ctx.lineTo(gx, h - pad); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(pad, gy);      ctx.lineTo(w - pad, gy); ctx.stroke();
  }

  // Axes
  ctx.strokeStyle = 'rgba(164,230,255,0.15)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(pad, h - pad); ctx.lineTo(w - pad, h - pad); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(pad, pad);      ctx.lineTo(pad, h - pad);     ctx.stroke();

  // Axis labels
  ctx.fillStyle = 'rgba(164,230,255,0.4)'; ctx.font = '10px "Space Grotesk"'; ctx.textAlign = 'center';
  ctx.fillText(xCol.toUpperCase(), w / 2, h - 8);
  ctx.save(); ctx.translate(14, h / 2); ctx.rotate(-Math.PI / 2);
  ctx.fillText(yCol.toUpperCase(), 0, 0);
  ctx.restore();

  // Tick labels
  ctx.fillStyle = 'rgba(164,230,255,0.25)'; ctx.font = '8px "Space Grotesk"';
  for (let i = 0; i <= 4; i++) {
    const xv = xMin + (i / 4) * xRange;
    const yv = yMin + (i / 4) * yRange;
    ctx.textAlign = 'center'; ctx.fillText(xv.toFixed(1), toPixX(xv), h - pad + 14);
    ctx.textAlign = 'right';  ctx.fillText(yv.toFixed(1), pad - 6, toPixY(yv) + 3);
  }

  // Plot points
  raw.forEach(r => {
    const px = toPixX(parseFloat(r[xCol]));
    const py = toPixY(parseFloat(r[yCol]));
    const colorKey = colorCol && colorCol !== '__none__' ? String(r[colorCol]) : null;
    const color = colorKey ? (colorMap[colorKey] || COLORS[0]) : '#00d1ff';

    ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2);
    ctx.fillStyle = color + '25'; ctx.fill();
    ctx.beginPath(); ctx.arc(px, py, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = color + 'CC'; ctx.fill();
    ctx.strokeStyle = color; ctx.lineWidth = 0.8; ctx.stroke();
  });

  // Legend (if color col used)
  if (colorCol && colorCol !== '__none__') {
    const entries = Object.entries(colorMap).slice(0, 8);
    let ly = pad + 8;
    entries.forEach(([label, color]) => {
      ctx.beginPath(); ctx.arc(w - pad + 8, ly, 5, 0, Math.PI * 2);
      ctx.fillStyle = color + 'CC'; ctx.fill();
      ctx.fillStyle = 'rgba(218,226,253,0.7)'; ctx.font = '9px "Space Grotesk"';
      ctx.textAlign = 'left'; ctx.fillText(String(label).substring(0, 14), w - pad + 18, ly + 3);
      ly += 18;
    });
  }

  // Stats overlay
  ctx.fillStyle = 'rgba(11,19,38,0.75)';
  ctx.beginPath(); ctx.roundRect(pad + 8, pad + 8, 140, 42, 6); ctx.fill();
  ctx.fillStyle = 'rgba(164,230,255,0.5)'; ctx.font = '9px "Space Grotesk"'; ctx.textAlign = 'left';
  ctx.fillText(`${raw.length} points plotted`, pad + 16, pad + 22);
  ctx.fillStyle = 'rgba(164,230,255,0.3)'; ctx.font = '8px "Space Grotesk"';
  ctx.fillText(`X: ${xMin.toFixed(2)} → ${xMax.toFixed(2)}`, pad + 16, pad + 36);
  ctx.fillText(`Y: ${yMin.toFixed(2)} → ${yMax.toFixed(2)}`, pad + 80, pad + 36);
}

export function renderPlayground(container) {
  container.classList.add('page-content');
  let selectedDataset = null;
  let uploadedData    = null; // { headers, rows, numericCols }

  container.innerHTML = `
    <div class="aura aura-primary" style="top:-100px;right:-150px"></div>
    <div class="aura aura-secondary" style="bottom:-100px;left:-200px"></div>
    <div class="container" style="padding-top:var(--space-xl);padding-bottom:var(--space-3xl)">
      <div class="section-header" style="text-align:left;margin-bottom:var(--space-2xl)">
        <div class="chip chip-primary mb-md">Dataset Playground</div>
        <h1 class="text-display-md" style="max-width:600px">Explore &amp; Upload Datasets</h1>
        <p class="text-body-lg text-muted mt-sm" style="max-width:550px">
          Use preloaded classic datasets or upload your own CSV. Inspect metadata, visualize your data as a scatter plot, and choose an algorithm to run.
        </p>
      </div>

      <!-- Preloaded Datasets -->
      <h2 class="text-headline-md mb-lg">Preloaded Datasets</h2>
      <div class="dataset-cards mb-2xl">
        ${PRELOADED_DATASETS.map(ds => `
          <div class="card dataset-card-btn" style="cursor:pointer" data-id="${ds.id}">
            <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-md)">
              <div style="width:48px;height:48px;border-radius:var(--radius-lg);background:rgba(164,230,255,0.08);display:flex;align-items:center;justify-content:center">
                <span class="material-symbols-outlined" style="color:${ds.color}">${ds.icon}</span>
              </div>
              <div>
                <h3 class="text-title-lg">${ds.name}</h3>
                <div class="text-label-sm text-dim">${ds.rows} rows · ${ds.features} features</div>
              </div>
            </div>
            <p class="text-body-sm text-muted mb-md">${ds.description}</p>
            <button class="btn btn-outline btn-sm w-full">
              <span class="material-symbols-outlined" style="font-size:16px">info</span> Inspect Dataset
            </button>
          </div>
        `).join('')}
      </div>

      <!-- Dataset Metadata Panel (preloaded) -->
      <div id="dataset-metadata" class="hidden" style="margin-bottom:var(--space-2xl)"></div>

      <!-- Custom Upload -->
      <h2 class="text-headline-md mb-lg">Upload Your Own CSV</h2>
      <div class="upload-zone" id="upload-zone">
        <span class="material-symbols-outlined" style="font-size:48px;color:var(--outline);margin-bottom:var(--space-md)">cloud_upload</span>
        <p class="text-body-lg" style="margin-bottom:var(--space-xs)">Drag &amp; drop your CSV file here</p>
        <p class="text-body-sm text-muted">or click to browse · max 5 MB</p>
        <input type="file" id="csv-input" accept=".csv" style="display:none" />
      </div>

      <!-- Upload Result Panel -->
      <div id="upload-result" class="hidden" style="margin-top:var(--space-xl)"></div>
    </div>`;

  // ── Preloaded dataset click ──
  document.querySelectorAll('.dataset-card-btn').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.dataset-card-btn').forEach(c => c.classList.remove('card-selected'));
      card.classList.add('card-selected');
      showDatasetMetadata(card.dataset.id);
    });
  });

  function showDatasetMetadata(id) {
    const meta = DATASET_METADATA[id];
    const ds   = PRELOADED_DATASETS.find(d => d.id === id);
    if (!meta || !ds) return;
    const metaEl = document.getElementById('dataset-metadata');
    metaEl.classList.remove('hidden');

    const classDistHTML = meta.classCounts && meta.classNames
      ? meta.classNames.map((cn, i) => {
          const pct = (meta.classCounts[i] / meta.samples * 100).toFixed(0);
          return `
            <div style="margin-bottom:var(--space-sm)">
              <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                <span class="text-body-sm">${cn}</span>
                <span class="text-label-sm text-dim">${meta.classCounts[i]} (${pct}%)</span>
              </div>
              <div style="height:6px;background:var(--surface-container-highest);border-radius:3px;overflow:hidden">
                <div style="height:100%;width:${pct}%;background:var(--primary);border-radius:3px"></div>
              </div>
            </div>`;
        }).join('')
      : `<p class="text-body-sm text-muted">Continuous target (regression task)</p>`;

    metaEl.innerHTML = `
      <div class="card-glass" style="padding:var(--space-xl)">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--space-lg)">
          <div>
            <div class="chip chip-${meta.task === 'Classification' ? 'primary' : 'secondary'} mb-sm">${meta.task}</div>
            <h3 class="text-headline-md">${ds.name} Dataset</h3>
            <p class="text-body-sm text-muted mt-sm">${meta.description}</p>
          </div>
          <button class="btn btn-primary btn-sm" id="btn-use-dataset">
            <span class="material-symbols-outlined" style="font-size:16px">play_arrow</span> Use this Dataset →
          </button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)">
          <div class="glass-panel" style="padding:var(--space-md);border-radius:var(--radius-lg);text-align:center">
            <div class="text-label-sm text-dim">SAMPLES</div>
            <div class="text-headline-md" style="color:var(--primary)">${meta.samples}</div>
          </div>
          <div class="glass-panel" style="padding:var(--space-md);border-radius:var(--radius-lg);text-align:center">
            <div class="text-label-sm text-dim">FEATURES</div>
            <div class="text-headline-md" style="color:var(--secondary)">${meta.features}</div>
          </div>
          <div class="glass-panel" style="padding:var(--space-md);border-radius:var(--radius-lg);text-align:center">
            <div class="text-label-sm text-dim">CLASSES</div>
            <div class="text-headline-md" style="color:var(--success)">${meta.classes || 'N/A'}</div>
          </div>
          <div class="glass-panel" style="padding:var(--space-md);border-radius:var(--radius-lg);text-align:center">
            <div class="text-label-sm text-dim">TASK</div>
            <div class="text-headline-sm" style="color:var(--warning)">${meta.task}</div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-xl)">
          <div>
            <div class="text-label-sm text-dim mb-md">FEATURE NAMES</div>
            <div style="display:flex;flex-wrap:wrap;gap:var(--space-sm)">
              ${meta.featureNames.map(f => `<span class="chip chip-primary" style="font-size:9px">${f}</span>`).join('')}
            </div>
          </div>
          <div>
            <div class="text-label-sm text-dim mb-md">CLASS DISTRIBUTION</div>
            ${classDistHTML}
          </div>
        </div>
      </div>`;

    // Wire "Use this Dataset" button
    setTimeout(() => {
      const useBtn = document.getElementById('btn-use-dataset');
      if (useBtn) {
        useBtn.addEventListener('click', () => {
          const loader = DATASET_LOADERS[id];
          if (loader) {
            const dsData = loader();
            AppState.setDataset(dsData, ds.name);
            showToast(`Loaded ${ds.name} dataset · ${dsData.points?.length || '—'} samples → Next: Preprocessing`);
            window.location.hash = '#preprocessing';
          }
        });
      }
    }, 50);
  }

  // ── Upload zone ──
  const zone      = document.getElementById('upload-zone');
  const fileInput = document.getElementById('csv-input');

  zone.addEventListener('click', () => fileInput.click());
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', e => {
    e.preventDefault(); zone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  });
  fileInput.addEventListener('change', () => { if (fileInput.files[0]) handleFile(fileInput.files[0]); });

  function handleFile(file) {
    // T22: CSV validation
    const validExts = ['.csv'];
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!validExts.includes(ext)) {
      showToast('Upload failed: file must be a .csv file', 'error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      showToast('Upload failed: file must be under 10 MB', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => showToast('Upload failed: could not read file', 'error');
    reader.onload = e => {
      try {
        uploadedData = parseCSV(e.target.result);
        if (!uploadedData.rows || uploadedData.rows.length < 10) {
          showToast('Upload failed: CSV must have at least 10 rows', 'error');
          return;
        }
        if (!uploadedData.headers || uploadedData.headers.length < 2) {
          showToast('Upload failed: CSV must have at least 2 columns', 'error');
          return;
        }
        if (!uploadedData.numericCols || uploadedData.numericCols.length < 1) {
          showToast('Upload failed: CSV must have at least one numeric column', 'error');
          return;
        }
        showToast(`Loaded ${uploadedData.rows.length} rows × ${uploadedData.headers.length} columns`);
        showUploadResult(file.name);
      } catch (err) {
        showToast('Upload failed: invalid CSV format', 'error');
      }
    };
    reader.readAsText(file);
  }

  function showUploadResult(filename) {
    const { headers, rows, numericCols } = uploadedData;
    const resultEl = document.getElementById('upload-result');
    resultEl.classList.remove('hidden');

    // Default axis selections
    const xDefault = numericCols[0] || headers[0];
    const yDefault = numericCols[1] || headers[1] || headers[0];

    resultEl.innerHTML = `
      <!-- Metadata Summary -->
      <div class="card-glass" style="padding:var(--space-xl);margin-bottom:var(--space-xl)">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--space-lg)">
          <div>
            <div class="chip chip-success mb-sm">Uploaded Successfully</div>
            <h3 class="text-headline-md">${filename}</h3>
          </div>
          <button class="btn btn-primary btn-sm" id="btn-use-upload">
            <span class="material-symbols-outlined" style="font-size:16px">play_arrow</span> Use this Dataset →
          </button>
        </div>

        <!-- Stats row -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)">
          <div class="glass-panel" style="padding:var(--space-md);border-radius:var(--radius-lg);text-align:center">
            <div class="text-label-sm text-dim">ROWS</div>
            <div class="text-headline-md" style="color:var(--primary)">${rows.length}</div>
          </div>
          <div class="glass-panel" style="padding:var(--space-md);border-radius:var(--radius-lg);text-align:center">
            <div class="text-label-sm text-dim">COLUMNS</div>
            <div class="text-headline-md" style="color:var(--secondary)">${headers.length}</div>
          </div>
          <div class="glass-panel" style="padding:var(--space-md);border-radius:var(--radius-lg);text-align:center">
            <div class="text-label-sm text-dim">NUMERIC</div>
            <div class="text-headline-md" style="color:var(--success)">${numericCols.length}</div>
          </div>
          <div class="glass-panel" style="padding:var(--space-md);border-radius:var(--radius-lg);text-align:center">
            <div class="text-label-sm text-dim">CATEGORICAL</div>
            <div class="text-headline-md" style="color:var(--warning)">${headers.length - numericCols.length}</div>
          </div>
        </div>

        <!-- Column chips -->
        <div class="text-label-sm text-dim mb-sm">COLUMNS <span style="opacity:0.5;font-weight:400">· green = numeric · yellow = categorical</span></div>
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-sm)">
          ${headers.map(h => `<span class="chip ${numericCols.includes(h) ? 'chip-success' : 'chip-warning'}" style="font-size:9px">${h}</span>`).join('')}
        </div>
      </div>

      <!-- Visualization Section -->
      <div class="card-glass" style="padding:var(--space-xl);margin-bottom:var(--space-xl)">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--space-lg)">
          <div>
            <h3 class="text-headline-md">Scatter Plot Visualization</h3>
            <p class="text-body-sm text-muted mt-sm">Select which columns to plot on each axis and optionally color points by a third column.</p>
          </div>
        </div>

        <!-- Column selectors -->
        <div style="display:flex;gap:var(--space-md);margin-bottom:var(--space-lg);flex-wrap:wrap">
          <div style="flex:1;min-width:140px">
            <div class="text-label-sm text-dim mb-sm">X AXIS</div>
            <select class="select-field" id="scatter-x">
              ${numericCols.map(c => `<option value="${c}" ${c === xDefault ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
          <div style="flex:1;min-width:140px">
            <div class="text-label-sm text-dim mb-sm">Y AXIS</div>
            <select class="select-field" id="scatter-y">
              ${numericCols.map(c => `<option value="${c}" ${c === yDefault ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
          <div style="flex:1;min-width:140px">
            <div class="text-label-sm text-dim mb-sm">COLOR BY (optional)</div>
            <select class="select-field" id="scatter-color">
              <option value="__none__">None</option>
              ${headers.map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
          </div>
          <div style="display:flex;align-items:flex-end">
            <button class="btn btn-primary btn-sm" id="btn-replot">
              <span class="material-symbols-outlined" style="font-size:16px">refresh</span> Plot
            </button>
          </div>
        </div>

        <!-- Canvas -->
        <div class="vis-canvas-wrap" style="min-height:400px">
          <canvas id="scatter-canvas"></canvas>
        </div>
      </div>

      <!-- Data Table Preview -->
      <div class="card-glass" style="padding:0;overflow:hidden">
        <div style="padding:var(--space-md) var(--space-lg);border-bottom:1px solid var(--glass-border);display:flex;justify-content:space-between;align-items:center">
          <h3 class="text-headline-sm">Data Table Preview</h3>
          <span class="chip chip-primary" style="font-size:9px">Showing first 50 rows of ${rows.length}</span>
        </div>
        <div style="max-height:340px;overflow:auto">
          <table class="data-preview-table">
            <thead><tr>${headers.map(h => `<th>${h} ${numericCols.includes(h) ? '<span style="color:var(--success);opacity:0.6">●</span>' : ''}</th>`).join('')}</tr></thead>
            <tbody>${rows.slice(0, 50).map(row => `<tr>${headers.map(h => `<td>${row[h] !== undefined ? row[h] : '—'}</td>`).join('')}</tr>`).join('')}</tbody>
          </table>
        </div>
      </div>`;

    // Bind plot controls
    const replot = () => {
      const xCol     = document.getElementById('scatter-x').value;
      const yCol     = document.getElementById('scatter-y').value;
      const colorCol = document.getElementById('scatter-color').value;
      requestAnimationFrame(() => drawScatterFromData('scatter-canvas', rows, xCol, yCol, colorCol));
    };

    document.getElementById('btn-replot').addEventListener('click', replot);
    document.getElementById('scatter-x').addEventListener('change', replot);
    document.getElementById('scatter-y').addEventListener('change', replot);
    document.getElementById('scatter-color').addEventListener('change', replot);

    // Initial plot
    requestAnimationFrame(() => drawScatterFromData('scatter-canvas', rows, xDefault, yDefault, '__none__'));

    // Wire "Use this Dataset" button for uploaded data
    setTimeout(() => {
      const useUploadBtn = document.getElementById('btn-use-upload');
      if (useUploadBtn) {
        useUploadBtn.addEventListener('click', () => {
          // Convert uploaded CSV rows to points/labels format for workspace
          const xCol = numericCols[0];
          const yCol = numericCols[1] || numericCols[0];
          const points = rows.map(r => [parseFloat(r[xCol]) || 0, parseFloat(r[yCol]) || 0]);
          // Try to find a label column (non-numeric)
          const labelCol = headers.find(h => !numericCols.includes(h));
          let labels = null;
          let classNames = null;
          if (labelCol) {
            const uniqueVals = [...new Set(rows.map(r => String(r[labelCol])))];
            classNames = uniqueVals;
            labels = rows.map(r => uniqueVals.indexOf(String(r[labelCol])));
          }
          const dsData = { points, labels, classNames, headers, rows, numericCols, name: filename };
          AppState.setDataset(dsData, filename);
          showToast(`Dataset "${filename}" ready · ${rows.length} samples → Next: Preprocessing`);
          window.location.hash = '#preprocessing';
        });
      }
    }, 50);
  }
}
