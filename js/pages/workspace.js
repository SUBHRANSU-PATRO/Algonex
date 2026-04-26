// ═══════════════════════════════════════════════════
// Algorithm Visualization Workspace
// ═══════════════════════════════════════════════════

import { getAlgorithmById } from '../algorithms/registry.js';
import { createLinearRegression } from '../algorithms/linear-regression.js';
import { createKNN } from '../algorithms/knn.js';
import { createDecisionTree } from '../algorithms/decision-tree.js';
import { createKMeans } from '../algorithms/kmeans.js';
import { createNeuralNetwork } from '../algorithms/neural-network.js';
import { createRandomForest } from '../algorithms/random-forest.js';
import { createSVM } from '../algorithms/svm.js';
import { CanvasRenderer } from '../components/canvas-renderer.js';
import { renderSidebar } from '../components/sidebar.js';

const ALGO_FACTORIES = {
  'linear-regression': createLinearRegression,
  'knn':               createKNN,
  'decision-tree':     createDecisionTree,
  'kmeans':            createKMeans,
  'neural-network':    createNeuralNetwork,
  'random-forest':     createRandomForest,
  'svm':               createSVM,
};

const CLASSIFICATION_ALGOS = new Set(['knn', 'decision-tree', 'neural-network', 'random-forest', 'svm']);
const REGRESSION_ALGOS     = new Set(['linear-regression']);
const GRADIENT_ALGOS       = new Set(['linear-regression', 'neural-network', 'svm']); // have lossHistory

export function renderWorkspace(container, algoId = 'linear-regression') {
  const meta = getAlgorithmById(algoId);
  if (!meta) {
    container.innerHTML = `<div class="page-content container" style="padding-top:100px;text-align:center">
      <h2>Algorithm not found</h2><a href="#explorer" class="btn btn-primary mt-lg">Back to Explorer</a></div>`;
    return;
  }

  const sidebarContainer = document.createElement('div');
  document.body.appendChild(sidebarContainer);
  renderSidebar(sidebarContainer, algoId);

  const factory = ALGO_FACTORIES[algoId];
  if (!factory) return;

  const algo = factory();
  let renderer = null;
  let animFrame = null;
  let isRunning = false;
  let currentParamValues = {};
  let iterHistory = [];       // for step-back
  let currentHistoryIdx = -1;
  let playSpeed = 1;

  // Init params
  for (const [key, def] of Object.entries(algo.params)) currentParamValues[key] = def.value;
  algo.reset(currentParamValues);

  // Build controls HTML
  let controlsHTML = '';
  for (const [key, def] of Object.entries(algo.params)) {
    controlsHTML += `
      <div class="glass-panel" style="padding:var(--space-md);border-radius:var(--radius-lg);border:1px solid var(--glass-border)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-sm)">
          <label class="text-label-md text-dim">${def.label}</label>
          <span class="text-label-md text-primary" id="val-${key}">${def.value}</span>
        </div>
        <input type="range" id="param-${key}" min="${def.min}" max="${def.max}" step="${def.step}" value="${def.value}" />
        <div style="display:flex;justify-content:space-between;margin-top:4px">
          <span class="text-label-sm text-dim">${def.min}</span>
          <span class="text-label-sm text-dim">${def.max}</span>
        </div>
        <div id="explain-${key}" class="param-explain-text"></div>
      </div>`;
  }

  container.classList.add('page-with-sidebar');
  container.innerHTML = `
    <div class="workspace-grid">
      <!-- Left: Controls -->
      <section class="workspace-controls" id="ws-controls">
        <h2 class="text-headline-sm mb-lg">${meta.name}</h2>
        <div class="text-label-sm text-dim mb-md" style="padding:4px 0;border-bottom:1px solid var(--glass-border)">PARAMETERS</div>
        <div style="display:flex;flex-direction:column;gap:var(--space-md)">
          ${controlsHTML}
        </div>

        <!-- Playback Controls -->
        <div style="margin-top:var(--space-lg)">
          <div class="text-label-sm text-dim mb-md" style="padding:4px 0;border-bottom:1px solid var(--glass-border)">PLAYBACK</div>
          <div style="display:flex;flex-direction:column;gap:var(--space-sm)">
            <button class="btn btn-primary w-full" id="btn-run">
              <span class="material-symbols-outlined" style="font-size:18px">play_arrow</span> RUN SIMULATION
            </button>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-sm)">
              <button class="btn btn-secondary" id="btn-prev" title="Previous Step" disabled style="opacity:0.4">
                <span class="material-symbols-outlined" style="font-size:18px">skip_previous</span> Prev
              </button>
              <button class="btn btn-secondary" id="btn-step">
                <span class="material-symbols-outlined" style="font-size:18px">skip_next</span> Step
              </button>
            </div>
            <button class="btn btn-ghost w-full" id="btn-reset">
              <span class="material-symbols-outlined" style="font-size:18px">restart_alt</span> RESET
            </button>
          </div>
          <!-- Speed -->
          <div style="margin-top:var(--space-md)">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
              <span class="text-label-sm text-dim">SPEED</span>
              <span class="text-label-sm text-primary" id="speed-val">1×</span>
            </div>
            <input type="range" id="speed-slider" min="1" max="10" step="1" value="1" />
          </div>
        </div>

        <!-- Export -->
        <div style="margin-top:var(--space-lg)">
          <div class="text-label-sm text-dim mb-md" style="padding:4px 0;border-bottom:1px solid var(--glass-border)">EXPORT</div>
          <div style="display:flex;flex-direction:column;gap:var(--space-sm)">
            <button class="btn btn-outline btn-sm w-full" id="btn-export-img">
              <span class="material-symbols-outlined" style="font-size:16px">image</span> Save Canvas PNG
            </button>
            <button class="btn btn-outline btn-sm w-full" id="btn-export-csv">
              <span class="material-symbols-outlined" style="font-size:16px">download</span> Download Metrics
            </button>
          </div>
        </div>
      </section>

      <!-- Center: Canvas + Evaluation -->
      <section class="workspace-canvas" id="ws-canvas">
        <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:var(--space-md)">
          <div>
            <h1 class="text-headline-lg">${meta.name}</h1>
            <p class="text-body-sm text-muted">Real-time visualization · <span id="iter-label">Epoch 0</span></p>
          </div>
          <div style="display:flex;gap:var(--space-sm)">
            <span class="chip chip-primary" id="status-chip">READY</span>
          </div>
        </div>
        <div class="vis-canvas-wrap" id="canvas-wrap">
          <canvas id="main-canvas"></canvas>
        </div>

        <!-- Metrics Bar -->
        <div style="display:flex;gap:var(--space-xl);margin-top:var(--space-md);flex-wrap:wrap" id="metrics-bar"></div>

        <!-- Loss Curve (only shown for gradient algorithms) -->
        <div id="loss-curve-section" style="display:none;margin-top:var(--space-lg)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-sm)">
            <span class="text-label-sm text-dim">LOSS CURVE</span>
            <span class="text-label-sm" id="loss-curve-label" style="color:var(--primary)">—</span>
          </div>
          <div class="vis-canvas-wrap" style="min-height:130px;border-radius:var(--radius-lg)">
            <canvas id="loss-curve-canvas"></canvas>
          </div>
        </div>

        <!-- Evaluation Dashboard -->
        <div id="eval-dashboard" style="margin-top:var(--space-lg)"></div>
      </section>

      <!-- Right: Explanation -->
      <section class="workspace-explanation" id="ws-explanation">
        <div style="padding:var(--space-lg);border-bottom:1px solid var(--glass-border)">
          <h3 class="text-headline-sm mb-md">Mathematical Foundation</h3>
          <div id="formula-box" class="glass-panel" style="padding:var(--space-lg);border-radius:var(--radius-lg);text-align:center"></div>
          <div id="param-readout" style="margin-top:var(--space-md)"></div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;padding:var(--space-lg);overflow:hidden">
          <h3 class="text-headline-sm mb-md">Active Insights</h3>
          <div id="insight-panel" style="flex:1;overflow-y:auto"></div>
          <div id="recommendation-panel" style="margin-top:var(--space-md)"></div>
        </div>
      </section>
    </div>`;

  // Init canvas renderer
  const canvasEl  = document.getElementById('main-canvas');
  requestAnimationFrame(() => {
    renderer = new CanvasRenderer(canvasEl);
    algo.render(renderer);
    updateExplanation();
    updateMetrics();
    updateEvalDashboard();
  });

  // ── Slider events with debounce ──
  let debounceTimers = {};
  for (const key of Object.keys(algo.params)) {
    const slider   = document.getElementById(`param-${key}`);
    const valLabel = document.getElementById(`val-${key}`);
    const explEl   = document.getElementById(`explain-${key}`);
    if (slider) {
      slider.addEventListener('input', () => {
        const val = parseFloat(slider.value);
        currentParamValues[key] = val;
        valLabel.textContent = val;
        // Immediate param explanation flash
        if (explEl && algo.getParamExplanation) {
          const newText = algo.getParamExplanation(key, val);
          explEl.textContent = newText;
          explEl.style.animation = 'none';
          requestAnimationFrame(() => { explEl.style.animation = 'paramFlash 0.4s ease'; });
        }
        // Debounce auto-reset+run if currently running
        clearTimeout(debounceTimers[key]);
        debounceTimers[key] = setTimeout(() => {
          if (isRunning) {
            stopRunning();
            algo.reset(currentParamValues);
            iterHistory = [];
            if (renderer) algo.render(renderer);
            updateExplanation(); updateMetrics(); updateEvalDashboard();
            startRunning();
          }
        }, 300);
      });
      // Populate initial explanation
      if (explEl && algo.getParamExplanation) {
        explEl.textContent = algo.getParamExplanation(key, parseFloat(slider.value));
      }
    }
  }

  // Speed slider
  document.getElementById('speed-slider').addEventListener('input', (e) => {
    playSpeed = parseInt(e.target.value);
    document.getElementById('speed-val').textContent = `${playSpeed}×`;
  });

  // Run/Pause
  document.getElementById('btn-run').addEventListener('click', () => {
    if (isRunning) stopRunning();
    else startRunning();
  });

  // Step forward
  document.getElementById('btn-step').addEventListener('click', () => {
    stopRunning();
    doStep();
    document.getElementById('btn-prev').disabled = false;
    document.getElementById('btn-prev').style.opacity = '1';
  });

  // Step backward
  document.getElementById('btn-prev').addEventListener('click', () => {
    if (iterHistory.length > 1) {
      iterHistory.pop(); // remove current
      const prev = iterHistory[iterHistory.length - 1];
      algo.reset(prev.params);
      // replay steps
      for (let s = 0; s < prev.stepCount; s++) {
        if (algoId === 'linear-regression' || algoId === 'neural-network') {
          algo.step(prev.params.learningRate || 0.5);
        } else {
          algo.step(prev.params);
        }
      }
      if (renderer) algo.render(renderer);
      updateExplanation();
      updateMetrics();
      updateEvalDashboard();
      if (iterHistory.length <= 1) {
        document.getElementById('btn-prev').disabled = true;
        document.getElementById('btn-prev').style.opacity = '0.4';
      }
    }
  });

  // Reset
  document.getElementById('btn-reset').addEventListener('click', () => {
    stopRunning();
    algo.reset(currentParamValues);
    iterHistory = [];
    document.getElementById('btn-prev').disabled = true;
    document.getElementById('btn-prev').style.opacity = '0.4';
    if (renderer) algo.render(renderer);
    updateExplanation();
    updateMetrics();
    updateEvalDashboard();
    updateStatus('READY', 'chip-primary');
    document.getElementById('iter-label').textContent = 'Epoch 0';
  });

  // Export PNG
  document.getElementById('btn-export-img').addEventListener('click', () => {
    if (!canvasEl) return;
    const link = document.createElement('a');
    link.download = `algonex-${algoId}-snapshot.png`;
    link.href = canvasEl.toDataURL('image/png');
    link.click();
  });

  // Export CSV metrics
  document.getElementById('btn-export-csv').addEventListener('click', () => {
    const metrics = algo.getMetrics();
    const exp     = algo.getExplanation();
    let csv = `Algonex — ${meta.name} Metrics Report\n`;
    csv += `Algorithm,${meta.name}\n`;
    csv += `Iteration,${exp.currentStep}\n\n`;
    csv += `Metric,Value\n`;
    for (const [k, v] of Object.entries(metrics)) csv += `${k},${v}\n`;
    csv += `\nParameters\n`;
    for (const [k, v] of Object.entries(currentParamValues)) csv += `${k},${v}\n`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.download = `algonex-${algoId}-report.csv`;
    link.href = URL.createObjectURL(blob);
    link.click();
  });

  // ── Core helpers ──
  function doStep() {
    // Save history snapshot
    const stepCount = typeof algo.epoch !== 'undefined' ? algo.epoch : 0;
    iterHistory.push({ params: { ...currentParamValues }, stepCount });

    if (algoId === 'linear-regression' || algoId === 'neural-network') {
      algo.step(currentParamValues.learningRate || 0.5);
    } else {
      algo.step(currentParamValues);
    }
    if (renderer) algo.render(renderer);
    updateExplanation();
    updateMetrics();
    updateEvalDashboard();

    const iterLbl = document.getElementById('iter-label');
    if (iterLbl) {
      const ep = typeof algo.epoch !== 'undefined' ? algo.epoch : (iterHistory.length);
      iterLbl.textContent = `Epoch ${ep}`;
    }
  }

  function startRunning() {
    isRunning = true;
    const runBtn = document.getElementById('btn-run');
    runBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size:18px">pause</span> PAUSE';
    updateStatus('RUNNING', 'chip-success');
    const maxEpochs = currentParamValues.epochs || 200;
    const maxIter   = currentParamValues.maxIterations || 30;
    const isIterative  = (algoId === 'linear-regression' || algoId === 'neural-network');
    const isForestLike = (algoId === 'random-forest');

    function tick() {
      if (!isRunning) return;
      if (isIterative) {
        if (algo.epoch >= maxEpochs) { stopRunning(); updateStatus('COMPLETE', 'chip-success'); return; }
        const stepsPerFrame = Math.max(1, Math.floor(maxEpochs / 150)) * playSpeed;
        for (let i = 0; i < stepsPerFrame && algo.epoch < maxEpochs; i++) {
          algo.step(currentParamValues.learningRate || 0.5);
        }
      } else if (algoId === 'kmeans') {
        if (algo.converged) { stopRunning(); updateStatus('CONVERGED', 'chip-success'); return; }
        algo.step();
      } else if (isForestLike) {
        if (algo.converged) { stopRunning(); updateStatus('COMPLETE', 'chip-success'); return; }
        algo.step(currentParamValues);
      } else {
        algo.step(currentParamValues);
        if (renderer) algo.render(renderer);
        updateExplanation(); updateMetrics(); updateEvalDashboard();
        stopRunning(); updateStatus('COMPLETE', 'chip-success');
        return;
      }
      if (renderer) algo.render(renderer);
      updateExplanation(); updateMetrics(); updateEvalDashboard();
      const ep = typeof algo.epoch !== 'undefined' ? algo.epoch : '';
      const iterLbl = document.getElementById('iter-label');
      if (iterLbl && ep !== '') iterLbl.textContent = `Epoch ${ep}`;
      animFrame = requestAnimationFrame(tick);
    }
    tick();
  }

  function stopRunning() {
    isRunning = false;
    if (animFrame) cancelAnimationFrame(animFrame);
    const runBtn = document.getElementById('btn-run');
    if (runBtn) runBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size:18px">play_arrow</span> RUN SIMULATION';
  }

  function updateStatus(text, cls) {
    const chip = document.getElementById('status-chip');
    if (chip) { chip.textContent = text; chip.className = `chip ${cls}`; }
  }

  function updateExplanation() {
    const exp = algo.getExplanation();
    const formulaBox = document.getElementById('formula-box');
    if (formulaBox) {
      formulaBox.innerHTML = `
        <div class="text-label-sm text-dim mb-sm">${exp.title}</div>
        <div style="font-size:1.4rem;font-family:var(--font-headline);font-weight:200;letter-spacing:0.1em;margin:var(--space-md) 0;color:var(--on-surface)">${exp.formula}</div>
        <div class="text-label-sm text-primary">${exp.currentStep}</div>`;
    }
    const paramReadout = document.getElementById('param-readout');
    if (paramReadout && exp.parameters) {
      paramReadout.innerHTML = exp.parameters.map(p => `
        <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-sm)">
          <div class="text-headline-sm" style="color:var(--${p.color});min-width:80px;font-weight:800">${p.value}</div>
          <div class="text-label-sm text-dim">${p.name}</div>
        </div>`).join('');
    }
    const insightPanel = document.getElementById('insight-panel');
    if (insightPanel) {
      insightPanel.innerHTML = `
        <div class="glass-panel" style="padding:var(--space-md);border-radius:var(--radius-lg);border-left:2px solid var(--primary);margin-bottom:var(--space-md)">
          <p class="text-body-sm" style="color:var(--on-surface-variant);line-height:1.7">${exp.insight}</p>
        </div>
        <div style="padding:var(--space-md);border-radius:var(--radius-lg);background:rgba(255,255,255,0.02)">
          <div class="text-label-sm text-dim mb-sm">THEORY</div>
          <p class="text-body-sm text-muted" style="line-height:1.7">${exp.theory}</p>
        </div>`;
    }
    const recPanel = document.getElementById('recommendation-panel');
    if (recPanel) {
      recPanel.innerHTML = `
        <div style="padding:var(--space-md);border-radius:var(--radius-lg);background:rgba(0,209,255,0.05);border:1px solid rgba(0,209,255,0.1)">
          <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-xs)">
            <span class="material-symbols-outlined text-primary" style="font-size:16px">lightbulb</span>
            <span class="text-label-sm text-primary">Industry Tip</span>
          </div>
          <p class="text-body-sm text-muted">Adjust parameters and press RUN to see how they affect the model. In practice, tuning these values (hyperparameter search) is one of the most important steps in building a good model.</p>
        </div>`;
    }
  }

  function updateMetrics() {
    const metrics = algo.getMetrics();
    const bar = document.getElementById('metrics-bar');
    if (bar) {
      bar.innerHTML = Object.entries(metrics).map(([k, v]) => `
        <div>
          <div class="text-label-sm text-dim">${k}</div>
          <div class="text-headline-sm" style="font-weight:800">${v}</div>
        </div>`).join('');
    }
    // Update loss curve if this is a gradient algorithm
    if (GRADIENT_ALGOS.has(algoId) && algo.lossHistory) {
      updateLossCurve(algo.lossHistory);
    }
  }

  function updateEvalDashboard() {
    const dash = document.getElementById('eval-dashboard');
    if (!dash) return;
    const isClassification = CLASSIFICATION_ALGOS.has(algoId);
    const isRegression     = REGRESSION_ALGOS.has(algoId);

    if (isClassification && algo.getConfusionMatrix) {
      const cmData = algo.getConfusionMatrix();
      if (!cmData) { dash.innerHTML = ''; return; }
      const { matrix, classes } = cmData;
      const classNames = ['Class 0', 'Class 1', 'Class 2'].slice(0, classes.length);
      const maxVal = Math.max(...matrix.flat(), 1);

      let matHTML = `<table class="conf-matrix">
        <thead><tr><th>Actual \\ Pred</th>${classNames.map(c => `<th>${c}</th>`).join('')}</tr></thead>
        <tbody>`;
      matrix.forEach((row, ri) => {
        matHTML += `<tr><th>${classNames[ri]}</th>`;
        row.forEach((val, ci) => {
          const intensity = val / maxVal;
          const bg = ri === ci
            ? `rgba(52,211,153,${0.1 + intensity * 0.5})`
            : `rgba(255,180,171,${intensity * 0.4})`;
          matHTML += `<td style="background:${bg};color:${ri===ci?'var(--success)':'var(--error)'};font-weight:700;text-align:center">${val}</td>`;
        });
        matHTML += '</tr>';
      });
      matHTML += '</tbody></table>';

      // P/R/F1 summary
      const metrics = algo.getMetrics();
      const statKeys = ['Accuracy','Precision','Recall','F1 Score'];
      let statsHTML = statKeys.filter(k => metrics[k]).map(k => `
        <div class="eval-stat-card">
          <div class="text-label-sm text-dim">${k}</div>
          <div class="text-headline-md" style="font-weight:800;color:var(--primary)">${metrics[k]}</div>
        </div>`).join('');

      dash.innerHTML = `
        <div style="margin-top:var(--space-md)">
          <h3 class="text-headline-sm mb-md">Model Evaluation Dashboard</h3>
          <div style="display:grid;grid-template-columns:auto 1fr;gap:var(--space-lg);align-items:start">
            <div>
              <div class="text-label-sm text-dim mb-sm">CONFUSION MATRIX</div>
              ${matHTML}
              <div class="text-label-sm text-dim mt-sm" style="margin-top:var(--space-sm)">Green = correct predictions · Red = errors</div>
            </div>
            <div>
              <div class="text-label-sm text-dim mb-sm">CLASSIFICATION METRICS</div>
              <div class="eval-stats-row">${statsHTML}</div>
              <div style="margin-top:var(--space-md);padding:var(--space-md);background:rgba(164,230,255,0.04);border-radius:var(--radius-md)">
                <div class="text-label-sm text-dim mb-sm">METRIC GUIDE</div>
                <div class="text-body-sm text-muted" style="line-height:1.8">
                  <strong>Precision</strong> — Of all predicted positives, how many were actually positive?<br>
                  <strong>Recall</strong> — Of all actual positives, how many did the model catch?<br>
                  <strong>F1 Score</strong> — Harmonic mean of Precision and Recall. Best for imbalanced data.
                </div>
              </div>
            </div>
          </div>
        </div>`;
    } else if (isRegression && algo.getPredVsActual) {
      const predActual = algo.getPredVsActual();
      if (!predActual || predActual.length === 0) { dash.innerHTML = ''; return; }
      dash.innerHTML = `
        <div style="margin-top:var(--space-md)">
          <h3 class="text-headline-sm mb-md">Prediction vs Actual</h3>
          <div class="vis-canvas-wrap" style="min-height:200px"><canvas id="pred-actual-canvas"></canvas></div>
        </div>`;
      requestAnimationFrame(() => drawPredVsActual(predActual));
    } else {
      dash.innerHTML = '';
    }
  }

  function drawPredVsActual(predActual) {
    const canvas = document.getElementById('pred-actual-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px'; canvas.style.height = rect.height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const w = rect.width, h = rect.height, pad = 40;

    const allY  = predActual.flatMap(d => [d.predicted, d.actual]);
    const minY  = Math.min(...allY), maxY = Math.max(...allY), rangeY = maxY - minY || 1;
    const toX   = v => pad + ((v - Math.min(...predActual.map(d => d.x))) / (Math.max(...predActual.map(d => d.x)) - Math.min(...predActual.map(d => d.x)) || 1)) * (w - 2*pad);
    const toY   = v => (h - pad) - ((v - minY) / rangeY) * (h - 2*pad);

    ctx.strokeStyle = 'rgba(164,230,255,0.04)'; ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const x = pad + (i/5)*(w-2*pad), y = pad + (i/5)*(h-2*pad);
      ctx.beginPath(); ctx.moveTo(x, pad); ctx.lineTo(x, h-pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(w-pad, y); ctx.stroke();
    }
    for (const d of predActual) {
      const px = toX(d.x), py = toY(d.actual);
      ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI*2);
      ctx.fillStyle = '#d0bcff80'; ctx.fill();
    }
    const sorted = [...predActual].sort((a, b) => a.x - b.x);
    ctx.beginPath(); ctx.strokeStyle = '#00d1ff'; ctx.lineWidth = 2;
    sorted.forEach((d, i) => {
      const px = toX(d.x), py = toY(d.predicted);
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    });
    ctx.stroke();
    ctx.fillStyle = 'rgba(164,230,255,0.4)'; ctx.font = '9px "Space Grotesk"'; ctx.textAlign = 'center';
    ctx.fillText('FEATURE X', w/2, h - 5);
    ctx.fillStyle = '#d0bcff'; ctx.fillText('● Actual', w - 80, 16);
    ctx.fillStyle = '#00d1ff'; ctx.fillText('— Predicted', w - 80, 28);
  }

  // ── Loss Curve ──
  function updateLossCurve(history) {
    const section = document.getElementById('loss-curve-section');
    const canvas  = document.getElementById('loss-curve-canvas');
    const label   = document.getElementById('loss-curve-label');
    if (!section || !canvas || !history || history.length === 0) return;
    section.style.display = 'block';
    const latest = history[history.length - 1];
    if (label) label.textContent = `Loss: ${latest.toFixed(5)}`;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px'; canvas.style.height = rect.height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const w = rect.width, h = rect.height, pad = { top: 12, right: 16, bottom: 24, left: 40 };
    const cw = w - pad.left - pad.right, ch = h - pad.top - pad.bottom;
    ctx.clearRect(0, 0, w, h);

    const minL = 0, maxL = Math.max(...history, 0.001);
    const toX = i  => pad.left + (i / Math.max(history.length - 1, 1)) * cw;
    const toY = v  => pad.top  + ch - ((v - minL) / (maxL - minL)) * ch;

    // Grid lines
    ctx.strokeStyle = 'rgba(164,230,255,0.05)'; ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (i / 4) * ch;
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + cw, y); ctx.stroke();
      ctx.fillStyle = 'rgba(164,230,255,0.3)'; ctx.font = '8px "Space Grotesk"'; ctx.textAlign = 'right';
      ctx.fillText(((maxL - (i / 4) * maxL)).toFixed(3), pad.left - 4, y + 3);
    }
    // X axis labels
    ctx.fillStyle = 'rgba(164,230,255,0.3)'; ctx.font = '8px "Space Grotesk"'; ctx.textAlign = 'center';
    ctx.fillText('0', pad.left, h - 6);
    ctx.fillText(history.length, pad.left + cw, h - 6);
    ctx.fillText('Epochs', pad.left + cw / 2, h - 6);

    if (history.length < 2) return;

    // Gradient fill under curve
    const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + ch);
    grad.addColorStop(0, 'rgba(0,209,255,0.25)');
    grad.addColorStop(1, 'rgba(0,209,255,0)');
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(history[0]));
    history.forEach((v, i) => ctx.lineTo(toX(i), toY(v)));
    ctx.lineTo(toX(history.length - 1), pad.top + ch);
    ctx.lineTo(toX(0), pad.top + ch);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Loss line with glow
    ctx.shadowColor = '#00d1ff'; ctx.shadowBlur = 6;
    ctx.beginPath(); ctx.strokeStyle = '#00d1ff'; ctx.lineWidth = 2;
    history.forEach((v, i) => {
      const px = toX(i), py = toY(v);
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    });
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Current point dot
    const lastX = toX(history.length - 1), lastY = toY(latest);
    ctx.beginPath(); ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#00d1ff'; ctx.fill();
  }

  // ── KNN Hover Neighbor Highlight ──
  (function setupKNNHover() {
    if (algoId !== 'knn') return;
    const canvasWrap = document.getElementById('canvas-wrap');
    if (!canvasWrap) return;
    let hoverCanvas = null;

    canvasWrap.addEventListener('mousemove', (e) => {
      if (!renderer || !algo.getNeighbors || !algo.boundaryDrawn) return;
      const rect  = canvasWrap.getBoundingClientRect();
      const mx    = e.clientX - rect.left;
      const my    = e.clientY - rect.top;
      // Convert to feature space using renderer
      const mainCanvas = document.getElementById('main-canvas');
      if (!mainCanvas) return;
      const cw = mainCanvas.clientWidth, ch = mainCanvas.clientHeight;
      const pad = 50;
      const fx = (mx - pad) / (cw - 2 * pad);
      const fy = 1 - (my - pad) / (ch - 2 * pad);
      if (fx < 0 || fx > 1 || fy < 0 || fy > 1) {
        if (hoverCanvas) hoverCanvas.style.opacity = '0';
        return;
      }

      if (!hoverCanvas) {
        hoverCanvas = document.createElement('canvas');
        hoverCanvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;transition:opacity 0.15s';
        canvasWrap.appendChild(hoverCanvas);
      }
      const dpr = window.devicePixelRatio || 1;
      hoverCanvas.width  = cw * dpr;
      hoverCanvas.height = ch * dpr;
      hoverCanvas.style.width  = cw + 'px';
      hoverCanvas.style.height = ch + 'px';
      hoverCanvas.style.opacity = '1';
      const ctx = hoverCanvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cw, ch);

      const neighbors = algo.getNeighbors(fx, fy);
      const toPixel = (nx, ny) => [
        pad + nx * (cw - 2 * pad),
        (ch - pad) - ny * (ch - 2 * pad),
      ];
      const colors = ['#00d1ff', '#d0bcff', '#34d399'];
      // Query point
      const [qpx, qpy] = toPixel(fx, fy);
      ctx.beginPath(); ctx.arc(qpx, qpy, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.fill();
      // Lines to neighbors
      for (const nb of neighbors) {
        const [npx, npy] = toPixel(algo.data.points[nb.idx][0], algo.data.points[nb.idx][1]);
        ctx.beginPath(); ctx.moveTo(qpx, qpy); ctx.lineTo(npx, npy);
        ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
        ctx.stroke(); ctx.setLineDash([]);
        // Highlight ring
        ctx.beginPath(); ctx.arc(npx, npy, 10, 0, Math.PI * 2);
        ctx.strokeStyle = colors[nb.label % colors.length] + 'cc'; ctx.lineWidth = 2;
        ctx.stroke();
      }
      // Votes tooltip
      const votes = {};
      for (const nb of neighbors) votes[nb.label] = (votes[nb.label] || 0) + 1;
      const winner = Object.entries(votes).sort((a, b) => b[1] - a[1])[0];
      ctx.fillStyle = 'rgba(11,19,38,0.88)'; ctx.strokeStyle = 'rgba(164,230,255,0.2)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect(qpx + 12, qpy - 28, 110, 36, 6); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#00d1ff'; ctx.font = 'bold 10px "Space Grotesk"'; ctx.textAlign = 'left';
      ctx.fillText(`→ Class ${winner ? winner[0] : '?'}`, qpx + 20, qpy - 14);
      ctx.fillStyle = 'rgba(164,230,255,0.5)'; ctx.font = '9px "Space Grotesk"';
      ctx.fillText(`${algo.k} neighbors polled`, qpx + 20, qpy - 2);
    });

    canvasWrap.addEventListener('mouseleave', () => {
      if (hoverCanvas) hoverCanvas.style.opacity = '0';
    });
  })();

  // Cleanup
  return () => {
    stopRunning();
    if (renderer) renderer.destroy();
    if (sidebarContainer && sidebarContainer.parentNode) {
      sidebarContainer.parentNode.removeChild(sidebarContainer);
    }
  };
}
