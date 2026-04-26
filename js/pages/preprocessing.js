// ═══════════════════════════════════════════════════
// Data Preprocessing Visualization Module
// Wired to AppState for cross-page data flow (T15)
// ═══════════════════════════════════════════════════

import { AppState } from '../utils/app-state.js';

function generateRawDataset() {
  const n = 80;
  const features = { age: [], income: [], score: [] };
  const labels = [];
  for (let i = 0; i < n; i++) {
    const age = 18 + Math.random() * 50 + (Math.random() < 0.05 ? 100 : 0);
    const income = 20000 + Math.random() * 80000;
    const score = 30 + Math.random() * 70;
    features.age.push(Math.random() < 0.08 ? null : parseFloat(age.toFixed(1)));
    features.income.push(Math.random() < 0.06 ? null : parseFloat(income.toFixed(0)));
    features.score.push(Math.random() < 0.1 ? null : parseFloat(score.toFixed(1)));
    labels.push(income > 50000 && score > 60 ? 1 : 0);
  }
  return { features, labels, featureNames: ['Age', 'Income', 'Score'] };
}

function computeStats(arr) {
  const clean = arr.filter(v => v !== null && v !== undefined);
  if (!clean.length) return { mean: 0, median: 0, min: 0, max: 0, std: 0, missing: arr.length };
  clean.sort((a, b) => a - b);
  const mean = clean.reduce((s, v) => s + v, 0) / clean.length;
  const median = clean.length % 2 === 0 ? (clean[clean.length / 2 - 1] + clean[clean.length / 2]) / 2 : clean[Math.floor(clean.length / 2)];
  const std = Math.sqrt(clean.reduce((s, v) => s + (v - mean) ** 2, 0) / clean.length);
  return { mean, median, min: clean[0], max: clean[clean.length - 1], std, missing: arr.length - clean.length };
}

function minMaxNorm(arr) {
  const vals = arr.filter(v => v !== null);
  const mn = Math.min(...vals), mx = Math.max(...vals), r = mx - mn || 1;
  return arr.map(v => v === null ? null : (v - mn) / r);
}

function zScoreNorm(arr) {
  const vals = arr.filter(v => v !== null);
  const mean = vals.reduce((s, v) => s + v, 0) / vals.length;
  const std = Math.sqrt(vals.reduce((s, v) => s + (v - mean) ** 2, 0) / vals.length) || 1;
  return arr.map(v => v === null ? null : (v - mean) / std);
}

function robustScaleNorm(arr) {
  const vals = arr.filter(v => v !== null).sort((a, b) => a - b);
  if (vals.length < 4) return arr;
  const q1 = vals[Math.floor(vals.length * 0.25)];
  const q3 = vals[Math.floor(vals.length * 0.75)];
  const median = vals[Math.floor(vals.length * 0.5)];
  const iqr = q3 - q1 || 1;
  return arr.map(v => v === null ? null : (v - median) / iqr);
}

function imputeMean(arr) {
  const vals = arr.filter(v => v !== null);
  const mean = vals.reduce((s, v) => s + v, 0) / vals.length;
  return arr.map(v => v === null ? parseFloat(mean.toFixed(2)) : v);
}

function imputeMedian(arr) {
  const vals = arr.filter(v => v !== null).sort((a, b) => a - b);
  const med = vals.length % 2 === 0 ? (vals[vals.length / 2 - 1] + vals[vals.length / 2]) / 2 : vals[Math.floor(vals.length / 2)];
  return arr.map(v => v === null ? parseFloat(med.toFixed(2)) : v);
}

function buildHistogram(values, bins = 12) {
  const clean = values.filter(v => v !== null && !isNaN(v));
  if (!clean.length) return { counts: new Array(bins).fill(0), edges: [] };
  const mn = Math.min(...clean), mx = Math.max(...clean), r = mx - mn || 1, bw = r / bins;
  const counts = new Array(bins).fill(0);
  for (const v of clean) counts[Math.min(Math.floor((v - mn) / bw), bins - 1)]++;
  return { counts, min: mn, max: mx };
}

function drawHistogram(ctx, x, y, w, h, hist, color, label) {
  const { counts } = hist;
  const maxC = Math.max(...counts, 1), barW = w / counts.length;
  ctx.fillStyle = 'rgba(11,19,38,0.5)';
  ctx.beginPath(); ctx.roundRect(x - 8, y - 24, w + 16, h + 40, 8); ctx.fill();
  ctx.fillStyle = color; ctx.font = '10px "Space Grotesk"'; ctx.textAlign = 'left';
  ctx.fillText(label, x, y - 8);
  for (let i = 0; i < counts.length; i++) {
    const barH = (counts[i] / maxC) * h, bx = x + i * barW, by = y + h - barH;
    ctx.fillStyle = color + '25'; ctx.fillRect(bx + 1, by - 2, barW - 2, barH + 2);
    ctx.fillStyle = color + 'CC'; ctx.fillRect(bx + 1, by, barW - 2, barH);
    ctx.fillStyle = color; ctx.fillRect(bx + 1, by, barW - 2, 2);
  }
  ctx.strokeStyle = 'rgba(164,230,255,0.15)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
}

export function renderPreprocessing(container) {
  container.classList.add('page-content');
  let rawData = generateRawDataset();
  let imputeMethod = 'mean', scaleMethod = 'minmax', selectedFeature = 0;

  // T15: Check if AppState has data loaded
  const hasAppData = AppState.dataset && AppState.datasetName;
  const datasetLabel = hasAppData
    ? `Using: <strong>${AppState.datasetName}</strong> — preprocessing applied to generated sample data. Apply when done.`
    : 'Using generated sample data — <a href="#playground" style="color:var(--primary)">load a dataset first</a> for real pipeline.';

  container.innerHTML = `
    <div class="aura aura-primary" style="top:-100px;right:-200px"></div>
    <div class="aura aura-secondary" style="bottom:-100px;left:-200px"></div>
    <div class="container" style="padding-top:var(--space-2xl);padding-bottom:var(--space-3xl)">
      <div class="section-header" style="text-align:left;margin-bottom:var(--space-2xl)">
        <div class="chip chip-primary mb-md">Data Preprocessing</div>
        <h1 class="text-display-md" style="max-width:700px">Preprocessing Visualizer</h1>
        <p class="text-body-lg text-muted mt-sm" style="max-width:600px">
          Explore how missing value handling, feature scaling, and normalization transform your data before training.
        </p>
        <div class="text-body-sm mt-sm" style="color:var(--on-surface-variant)">${datasetLabel}</div>
      </div>
      <div class="preprocess-controls-row">
        <div class="glass-panel preprocess-control-card">
          <div class="text-label-sm text-dim mb-sm">FEATURE</div>
          <select class="select-field" id="pp-feature-select">
            ${rawData.featureNames.map((f, i) => `<option value="${i}">${f}</option>`).join('')}
          </select>
        </div>
        <div class="glass-panel preprocess-control-card">
          <div class="text-label-sm text-dim mb-sm">IMPUTE METHOD</div>
          <div class="segmented-control" id="pp-impute-control">
            <button class="active" data-method="mean">Mean</button>
            <button data-method="median">Median</button>
            <button data-method="drop">Drop</button>
          </div>
        </div>
        <div class="glass-panel preprocess-control-card">
          <div class="text-label-sm text-dim mb-sm">SCALING</div>
          <div class="segmented-control" id="pp-scale-control">
            <button class="active" data-method="minmax">Min-Max</button>
            <button data-method="zscore">Z-Score</button>
            <button data-method="robust">Robust</button>
            <button data-method="none">None</button>
          </div>
        </div>
        <div class="glass-panel preprocess-control-card">
          <button class="btn btn-primary btn-sm w-full" id="pp-regenerate">
            <span class="material-symbols-outlined" style="font-size:16px">refresh</span> New Dataset
          </button>
        </div>
      </div>

      <!-- T15: Apply & Navigate Buttons -->
      <div style="margin-top:var(--space-lg);display:flex;justify-content:flex-end;gap:var(--space-sm)">
        <button class="btn btn-outline" id="pp-apply-btn" style="padding:var(--space-sm) var(--space-lg)">
          <span class="material-symbols-outlined" style="font-size:18px">check</span>
          Apply Preprocessing
        </button>
        <button class="btn btn-primary" id="pp-next-btn" style="padding:var(--space-sm) var(--space-xl)">
          <span class="material-symbols-outlined" style="font-size:18px">arrow_forward</span>
          Next: Train-Test Split →
        </button>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-lg);margin-top:var(--space-xl)">
        <div class="card-glass" style="padding:var(--space-lg)">
          <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-md)">
            <span class="material-symbols-outlined text-warning" style="font-size:20px">warning</span>
            <h3 class="text-headline-sm">Raw Data (with missing values)</h3>
          </div>
          <div id="pp-raw-table-wrap" style="max-height:260px;overflow:auto;border-radius:var(--radius-md)">
            <table class="data-preview-table" id="pp-raw-table"></table>
          </div>
          <div id="pp-raw-stats" class="preprocess-stats-row" style="margin-top:var(--space-md)"></div>
        </div>
        <div class="card-glass" style="padding:var(--space-lg)">
          <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-md)">
            <span class="material-symbols-outlined text-success" style="font-size:20px">check_circle</span>
            <h3 class="text-headline-sm">After Imputation</h3>
          </div>
          <div id="pp-clean-table-wrap" style="max-height:260px;overflow:auto;border-radius:var(--radius-md)">
            <table class="data-preview-table" id="pp-clean-table"></table>
          </div>
          <div id="pp-clean-stats" class="preprocess-stats-row" style="margin-top:var(--space-md)"></div>
        </div>
      </div>
      <div style="margin-top:var(--space-xl)">
        <h2 class="text-headline-md mb-md">Distribution: Before vs After Preprocessing</h2>
        <div class="vis-canvas-wrap" style="min-height:300px"><canvas id="pp-histogram-canvas"></canvas></div>
      </div>
      <div style="margin-top:var(--space-xl)">
        <h2 class="text-headline-md mb-md">Feature Scaling Comparison</h2>
        <div class="vis-canvas-wrap" style="min-height:280px"><canvas id="pp-scaling-canvas"></canvas></div>
      </div>

      <!-- Missing Values Heatmap (T15) -->
      <div style="margin-top:var(--space-xl)">
        <h2 class="text-headline-md mb-md">Missing Values Heatmap</h2>
        <div class="vis-canvas-wrap" style="min-height:200px"><canvas id="pp-missing-heatmap"></canvas></div>
      </div>

      <div class="card-glass" style="padding:var(--space-xl);margin-top:var(--space-xl);border-left:3px solid var(--primary)">
        <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-md)">
          <span class="material-symbols-outlined text-primary" style="font-size:20px">lightbulb</span>
          <h3 class="text-headline-sm">How Preprocessing Helps</h3>
        </div>
        <div id="pp-explanation" class="text-body-md text-muted" style="line-height:1.8"></div>
      </div>
    </div>`;

  document.getElementById('pp-feature-select').addEventListener('change', e => { selectedFeature = parseInt(e.target.value); updateAll(); });
  document.querySelectorAll('#pp-impute-control button').forEach(btn => {
    btn.addEventListener('click', () => { document.querySelectorAll('#pp-impute-control button').forEach(b => b.classList.remove('active')); btn.classList.add('active'); imputeMethod = btn.dataset.method; updateAll(); });
  });
  document.querySelectorAll('#pp-scale-control button').forEach(btn => {
    btn.addEventListener('click', () => { document.querySelectorAll('#pp-scale-control button').forEach(b => b.classList.remove('active')); btn.classList.add('active'); scaleMethod = btn.dataset.method; updateAll(); });
  });
  document.getElementById('pp-regenerate').addEventListener('click', () => { rawData = generateRawDataset(); updateAll(); });

  // T15: Apply preprocessing to AppState
  document.getElementById('pp-apply-btn').addEventListener('click', () => {
    AppState.preprocessingDone = true;
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;padding:12px 20px;border-radius:10px;background:rgba(52,211,153,0.9);color:#fff;font-family:"Space Grotesk",sans-serif;font-size:13px;font-weight:500;box-shadow:0 8px 32px rgba(0,0,0,0.4);animation:fadeIn 0.3s ease';
    toast.textContent = `Preprocessing applied (${imputeMethod} imputation + ${scaleMethod} scaling)`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  });

  // T15: Navigate to train-test-split
  document.getElementById('pp-next-btn').addEventListener('click', () => {
    AppState.preprocessingDone = true;
    window.location.hash = '#train-test-split';
  });

  function getFeat(idx) { return rawData.features[Object.keys(rawData.features)[idx]]; }
  function getImputed(raw) { return imputeMethod === 'mean' ? imputeMean(raw) : imputeMethod === 'median' ? imputeMedian(raw) : raw.filter(v => v !== null); }
  function getScaled(imp) {
    if (scaleMethod === 'minmax') return minMaxNorm(imp);
    if (scaleMethod === 'zscore') return zScoreNorm(imp);
    if (scaleMethod === 'robust') return robustScaleNorm(imp);
    return imp;
  }

  function updateAll() { updateTables(); updateHistograms(); updateScaling(); updateMissingHeatmap(); updateExplanation(); }

  function updateTables() {
    const raw = getFeat(selectedFeature), fname = rawData.featureNames[selectedFeature];
    const imputed = getImputed(raw);
    document.getElementById('pp-raw-table').innerHTML = `<thead><tr><th>#</th><th>${fname}</th><th>Status</th></tr></thead><tbody>${raw.slice(0, 30).map((v, i) => `<tr style="${v === null ? 'background:rgba(255,180,171,0.08)' : ''}"><td>${i + 1}</td><td>${v === null ? '<span style="color:var(--error);font-weight:700">MISSING</span>' : v}</td><td>${v === null ? '<span class="chip chip-error" style="font-size:9px;padding:2px 8px">null</span>' : '<span class="chip chip-success" style="font-size:9px;padding:2px 8px">ok</span>'}</td></tr>`).join('')}</tbody>`;
    document.getElementById('pp-clean-table').innerHTML = `<thead><tr><th>#</th><th>${fname}</th><th>Source</th></tr></thead><tbody>${imputed.slice(0, 30).map((v, i) => { const wasNull = imputeMethod !== 'drop' && raw[i] === null; return `<tr style="${wasNull ? 'background:rgba(52,211,153,0.08)' : ''}"><td>${i + 1}</td><td>${v !== null ? (typeof v === 'number' ? v.toFixed(2) : v) : '—'}</td><td>${wasNull ? `<span class="chip chip-primary" style="font-size:9px;padding:2px 8px">${imputeMethod}</span>` : '<span class="chip chip-success" style="font-size:9px;padding:2px 8px">original</span>'}</td></tr>`; }).join('')}</tbody>`;
    const rs = computeStats(raw), cs = computeStats(imputed);
    document.getElementById('pp-raw-stats').innerHTML = statChips(rs, true);
    document.getElementById('pp-clean-stats').innerHTML = statChips(cs, false);
  }

  function statChips(s, showMiss) {
    return `<div class="preprocess-stat"><span class="text-label-sm text-dim">MEAN</span><span class="text-headline-sm">${s.mean.toFixed(1)}</span></div><div class="preprocess-stat"><span class="text-label-sm text-dim">MEDIAN</span><span class="text-headline-sm">${s.median.toFixed(1)}</span></div><div class="preprocess-stat"><span class="text-label-sm text-dim">STD</span><span class="text-headline-sm">${s.std.toFixed(1)}</span></div>${showMiss ? `<div class="preprocess-stat"><span class="text-label-sm text-dim">MISSING</span><span class="text-headline-sm" style="color:var(--error)">${s.missing}</span></div>` : ''}<div class="preprocess-stat"><span class="text-label-sm text-dim">RANGE</span><span class="text-headline-sm">${s.min.toFixed(0)}–${s.max.toFixed(0)}</span></div>`;
  }

  function setupCanvas(id) {
    const c = document.getElementById(id); if (!c) return null;
    const ctx = c.getContext('2d'), dpr = window.devicePixelRatio || 1, rect = c.parentElement.getBoundingClientRect();
    c.width = rect.width * dpr; c.height = rect.height * dpr; c.style.width = rect.width + 'px'; c.style.height = rect.height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w: rect.width, h: rect.height };
  }

  function updateHistograms() {
    const cv = setupCanvas('pp-histogram-canvas'); if (!cv) return;
    const { ctx, w, h } = cv; ctx.clearRect(0, 0, w, h);
    const raw = getFeat(selectedFeature), imp = getImputed(raw), scl = getScaled(imp);
    const hW = (w - 80) / 3, hH = h - 80;
    drawHistogram(ctx, 20, 40, hW - 10, hH, buildHistogram(raw), '#ffb4ab', `RAW ${rawData.featureNames[selectedFeature]}`);
    drawHistogram(ctx, 20 + hW + 10, 40, hW - 10, hH, buildHistogram(imp), '#34d399', `AFTER ${imputeMethod.toUpperCase()}`);
    drawHistogram(ctx, 20 + (hW + 10) * 2, 40, hW - 10, hH, buildHistogram(scl), '#00d1ff', `AFTER ${scaleMethod.toUpperCase()}`);
  }

  function updateScaling() {
    const cv = setupCanvas('pp-scaling-canvas'); if (!cv) return;
    const { ctx, w, h } = cv; ctx.clearRect(0, 0, w, h);
    const keys = Object.keys(rawData.features), colors = ['#00d1ff', '#d0bcff', '#34d399'], gW = (w - 80) / keys.length;
    for (let f = 0; f < keys.length; f++) {
      const raw = rawData.features[keys[f]], imp = getImputed(raw), scl = getScaled(imp);
      const rs = computeStats(raw), ss = computeStats(scl);
      const cx = 40 + f * gW + gW / 2, barW = 50;
      ctx.fillStyle = colors[f]; ctx.font = 'bold 11px "Space Grotesk"'; ctx.textAlign = 'center';
      ctx.fillText(rawData.featureNames[f].toUpperCase(), cx, 20);
      const rH = Math.min((rs.max - rs.min) / (rs.max || 1) * (h - 80), h - 80);
      ctx.fillStyle = colors[f] + '25'; ctx.fillRect(cx - barW - 10, h - 40 - rH, barW, rH);
      ctx.fillStyle = colors[f] + '80'; ctx.fillRect(cx - barW - 10, h - 40 - rH, barW, 3);
      ctx.fillStyle = 'rgba(164,230,255,0.4)'; ctx.font = '9px "Space Grotesk"';
      ctx.fillText('RAW', cx - barW / 2 - 10, h - 24);
      ctx.fillText(`${rs.min.toFixed(0)}–${rs.max.toFixed(0)}`, cx - barW / 2 - 10, h - 12);
      const sVals = scl.filter(v => v !== null), sMn = Math.min(...sVals), sMx = Math.max(...sVals);
      const sH = Math.max(20, Math.min((sMx - sMn + 0.1) * (h - 80), h - 80));
      ctx.fillStyle = colors[f] + '50'; ctx.fillRect(cx + 10, h - 40 - sH, barW, sH);
      ctx.fillStyle = colors[f]; ctx.fillRect(cx + 10, h - 40 - sH, barW, 3);
      ctx.fillStyle = 'rgba(164,230,255,0.4)';
      ctx.fillText(scaleMethod.toUpperCase(), cx + barW / 2 + 10, h - 24);
      ctx.fillText(`${sMn.toFixed(2)}–${sMx.toFixed(2)}`, cx + barW / 2 + 10, h - 12);
    }
  }

  // T15: Missing values heatmap
  function updateMissingHeatmap() {
    const cv = setupCanvas('pp-missing-heatmap'); if (!cv) return;
    const { ctx, w, h } = cv; ctx.clearRect(0, 0, w, h);
    const keys = Object.keys(rawData.features);
    const nRows = rawData.features[keys[0]].length;
    const maxCols = keys.length;
    const cellW = Math.min(12, (w - 120) / nRows);
    const cellH = Math.min(30, (h - 60) / maxCols);
    const padL = 80, padT = 30;

    // Title
    ctx.fillStyle = 'rgba(164,230,255,0.5)'; ctx.font = '10px "Space Grotesk"'; ctx.textAlign = 'left';
    ctx.fillText('MISSING VALUES HEATMAP  (red = missing, green = present)', padL, 16);

    for (let f = 0; f < maxCols; f++) {
      const feat = rawData.features[keys[f]];
      ctx.fillStyle = 'rgba(164,230,255,0.5)'; ctx.font = '10px "Space Grotesk"';
      ctx.textAlign = 'right';
      ctx.fillText(rawData.featureNames[f], padL - 8, padT + f * cellH + cellH / 2 + 3);

      for (let i = 0; i < nRows; i++) {
        const isMissing = feat[i] === null;
        ctx.fillStyle = isMissing ? 'rgba(255,100,100,0.7)' : 'rgba(52,211,153,0.25)';
        ctx.fillRect(padL + i * cellW, padT + f * cellH, cellW - 1, cellH - 1);
      }
    }

    // Legend
    const legendX = padL + nRows * cellW + 16;
    ctx.fillStyle = 'rgba(255,100,100,0.7)'; ctx.fillRect(legendX, padT, 12, 12);
    ctx.fillStyle = 'rgba(164,230,255,0.5)'; ctx.font = '9px "Space Grotesk"'; ctx.textAlign = 'left';
    ctx.fillText('Missing', legendX + 16, padT + 10);
    ctx.fillStyle = 'rgba(52,211,153,0.25)'; ctx.fillRect(legendX, padT + 20, 12, 12);
    ctx.fillStyle = 'rgba(164,230,255,0.5)';
    ctx.fillText('Present', legendX + 16, padT + 30);
  }

  function updateExplanation() {
    const el = document.getElementById('pp-explanation'); if (!el) return;
    const s = computeStats(getFeat(selectedFeature));
    const iE = { mean: `<strong>Mean imputation</strong> replaces ${s.missing} missing values with the mean (${s.mean.toFixed(1)}). Preserves the average but may reduce variance.`, median: `<strong>Median imputation</strong> replaces ${s.missing} missing values with the median (${s.median.toFixed(1)}). More robust to outliers than mean.`, drop: `<strong>Dropping missing values</strong> removes ${s.missing} rows. Simplest approach but reduces dataset size.` };
    const sE = { minmax: `<strong>Min-Max normalization</strong> scales all values to [0, 1]: x' = (x - min) / (max - min). Preserves distribution shape but is sensitive to outliers.`, zscore: `<strong>Z-score standardization</strong> transforms to mean=0, std=1: x' = (x - μ) / σ. Preferred for algorithms assuming normal distributions.`, robust: `<strong>Robust scaling</strong> uses the median and IQR: x' = (x - median) / (Q3 - Q1). Resilient to outliers — ideal for real-world data with skewed distributions.`, none: `<strong>No scaling</strong> — features remain in original ranges. Distance-based algorithms will be dominated by high-magnitude features.` };
    el.innerHTML = `<p style="margin-bottom:var(--space-md)">${iE[imputeMethod]}</p><p style="margin-bottom:var(--space-md)">${sE[scaleMethod]}</p><p><strong>Why it matters:</strong> Preprocessing ensures all features contribute equally. Without scaling, Income (20k–100k) dominates Score (30–100) in distance-based algorithms.</p>`;
  }

  requestAnimationFrame(() => updateAll());
  const rh = () => { updateHistograms(); updateScaling(); updateMissingHeatmap(); };
  window.addEventListener('resize', rh);
  return () => window.removeEventListener('resize', rh);
}
