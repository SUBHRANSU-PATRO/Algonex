// ═══════════════════════════════════════════════════
// Compare Algorithms Mode — enhanced with training time,
// bar chart, 4-algorithm support, model complexity (T12)
// ═══════════════════════════════════════════════════

import { ALGORITHMS } from '../algorithms/registry.js';
import { createLinearRegression } from '../algorithms/linear-regression.js';
import { createKNN } from '../algorithms/knn.js';
import { createDecisionTree } from '../algorithms/decision-tree.js';
import { createKMeans } from '../algorithms/kmeans.js';
import { createNeuralNetwork } from '../algorithms/neural-network.js';
import { createRandomForest } from '../algorithms/random-forest.js';
import { createSVM } from '../algorithms/svm.js';
import { CanvasRenderer } from '../components/canvas-renderer.js';
import { AppState } from '../utils/app-state.js';
import { normalize2D } from '../utils/math-helpers.js';

const ALGO_FACTORIES = {
  'linear-regression': createLinearRegression,
  'knn': createKNN,
  'decision-tree': createDecisionTree,
  'kmeans': createKMeans,
  'neural-network': createNeuralNetwork,
  'random-forest': createRandomForest,
  'svm': createSVM,
};

const COMPLEXITY = {
  'linear-regression': { train: 'O(n·epochs)', predict: 'O(1)', note: 'Fast training & prediction' },
  'knn': { train: 'O(1)', predict: 'O(n·k)', note: 'Lazy learner — no training, slow prediction' },
  'decision-tree': { train: 'O(n·m·log n)', predict: 'O(log n)', note: 'Fast once built' },
  'random-forest': { train: 'O(t·n·m·log n)', predict: 'O(t·log n)', note: 'Ensemble of trees' },
  'kmeans': { train: 'O(n·k·iters)', predict: 'O(k)', note: 'Iterative centroid updates' },
  'neural-network': { train: 'O(n·h²·epochs)', predict: 'O(h²)', note: 'Scales with hidden size' },
  'svm': { train: 'O(n²)', predict: 'O(sv)', note: 'Depends on support vectors' },
};

export function renderCompare(container) {
  container.classList.add('page-content');

  // Checkbox options for multi-select
  const algoCheckboxes = ALGORITHMS.map(a => `
    <label style="display:flex;align-items:center;gap:8px;cursor:pointer;padding:6px 10px;border-radius:8px;background:rgba(164,230,255,0.04);border:1px solid rgba(164,230,255,0.08)">
      <input type="checkbox" class="algo-check" value="${a.id}" style="accent-color:var(--primary)">
      <span class="text-body-sm">${a.name}</span>
    </label>
  `).join('');

  container.innerHTML = `
    <div class="aura aura-primary" style="top:50%;left:-200px"></div>
    <div class="aura aura-secondary" style="bottom:0;right:-200px"></div>

    <div class="container-wide" style="padding-top:var(--space-2xl);padding-bottom:var(--space-2xl)">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:var(--space-xl)">
        <div>
          <div class="chip chip-secondary mb-md">Compare Mode</div>
          <h1 class="text-headline-lg">Compare Algorithms Side-by-Side</h1>
          <p class="text-body-md text-muted mt-sm">Select up to 4 algorithms, run them on the same data, and compare accuracy, speed, and complexity.</p>
        </div>
        <button class="btn btn-primary" id="compare-run-btn">
          <span class="material-symbols-outlined" style="font-size:18px">play_arrow</span>
          Run All
        </button>
      </div>

      <!-- Algorithm Selection -->
      <div class="card" style="padding:var(--space-lg);margin-bottom:var(--space-xl)">
        <div class="text-label-sm text-dim mb-md">SELECT ALGORITHMS (up to 4)</div>
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-sm)" id="algo-checkboxes">
          ${algoCheckboxes}
        </div>
      </div>

      <!-- Canvas Grid -->
      <div id="canvas-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-lg);margin-bottom:var(--space-xl)">
        <div class="compare-panel">
          <div class="compare-panel-header">
            <span class="text-label-md" id="canvas-label-0">—</span>
            <span class="chip chip-primary" id="status-0">READY</span>
          </div>
          <div class="compare-panel-canvas">
            <div class="vis-canvas-wrap h-full" style="min-height:280px"><canvas id="canvas-0"></canvas></div>
          </div>
        </div>
        <div class="compare-panel">
          <div class="compare-panel-header">
            <span class="text-label-md" id="canvas-label-1">—</span>
            <span class="chip chip-secondary" id="status-1">READY</span>
          </div>
          <div class="compare-panel-canvas">
            <div class="vis-canvas-wrap h-full" style="min-height:280px"><canvas id="canvas-1"></canvas></div>
          </div>
        </div>
        <div class="compare-panel">
          <div class="compare-panel-header">
            <span class="text-label-md" id="canvas-label-2">—</span>
            <span class="chip chip-primary" id="status-2">READY</span>
          </div>
          <div class="compare-panel-canvas">
            <div class="vis-canvas-wrap h-full" style="min-height:280px"><canvas id="canvas-2"></canvas></div>
          </div>
        </div>
        <div class="compare-panel">
          <div class="compare-panel-header">
            <span class="text-label-md" id="canvas-label-3">—</span>
            <span class="chip chip-secondary" id="status-3">READY</span>
          </div>
          <div class="compare-panel-canvas">
            <div class="vis-canvas-wrap h-full" style="min-height:280px"><canvas id="canvas-3"></canvas></div>
          </div>
        </div>
      </div>

      <!-- Metrics Comparison Table -->
      <div class="card" style="padding:var(--space-lg);margin-bottom:var(--space-xl)">
        <h3 class="text-headline-sm mb-md">Metrics Comparison</h3>
        <div style="overflow-x:auto">
          <table class="metrics-table" id="compare-metrics">
            <thead><tr id="compare-thead"><th>Metric</th></tr></thead>
            <tbody id="compare-tbody">
              <tr><td colspan="5" class="text-muted text-center" style="padding:var(--space-xl)">Select algorithms and press Run All to compare</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Accuracy Bar Chart -->
      <div class="card" style="padding:var(--space-lg)">
        <h3 class="text-headline-sm mb-md">Accuracy Comparison</h3>
        <div id="accuracy-chart" style="min-height:200px"></div>
      </div>
    </div>
  `;

  // Set defaults: KNN and Decision Tree checked
  setTimeout(() => {
    const checks = document.querySelectorAll('.algo-check');
    checks.forEach(c => {
      if (c.value === 'knn' || c.value === 'decision-tree') c.checked = true;
    });
    // Limit to 4
    document.getElementById('algo-checkboxes').addEventListener('change', () => {
      const checked = document.querySelectorAll('.algo-check:checked');
      if (checked.length > 4) {
        checks.forEach(c => { if (!Array.from(checked).slice(0, 4).includes(c)) c.checked = false; });
      }
    });
  }, 50);

  let renderers = [null, null, null, null];
  let algos = [];
  let anims = [];
  let results = []; // { id, name, metrics, trainTime, predictTime }

  requestAnimationFrame(() => {
    for (let i = 0; i < 4; i++) {
      const c = document.getElementById(`canvas-${i}`);
      if (c) renderers[i] = new CanvasRenderer(c);
    }
  });

  document.getElementById('compare-run-btn').addEventListener('click', () => {
    anims.forEach(a => cancelAnimationFrame(a));
    anims = [];
    results = [];

    const selected = Array.from(document.querySelectorAll('.algo-check:checked')).map(c => c.value);
    if (selected.length === 0) return;

    algos = selected.map(id => ({ id, algo: ALGO_FACTORIES[id]() }));

    // Update grid columns
    const grid = document.getElementById('canvas-grid');
    const cols = algos.length <= 2 ? '1fr 1fr' : '1fr 1fr';
    grid.style.gridTemplateColumns = cols;

    // Hide unused panels, show used ones
    for (let i = 0; i < 4; i++) {
      const panels = grid.children;
      if (panels[i]) panels[i].style.display = i < algos.length ? '' : 'none';
    }

    // Update headers
    const thead = document.getElementById('compare-thead');
    thead.innerHTML = '<th>Metric</th>' + algos.map(a => {
      const meta = ALGORITHMS.find(al => al.id === a.id);
      return `<th>${meta?.name || a.id}</th>`;
    }).join('');

    // Run each
    algos.forEach((a, idx) => {
      const meta = ALGORITHMS.find(al => al.id === a.id);
      const label = document.getElementById(`canvas-label-${idx}`);
      if (label) label.textContent = meta?.name || a.id;

      const defaults = {};
      for (const [k, v] of Object.entries(a.algo.params)) defaults[k] = v.value;

      // T13: Inject AppState data if available
      let extData = null;
      if (AppState.splitDone && AppState.trainData && AppState.trainData.points?.length > 0) {
        const normPts = normalize2D(AppState.trainData.points);
        extData = { points: normPts, labels: AppState.trainData.labels, classNames: AppState.dataset?.classNames };
      } else if (AppState.dataset && AppState.dataset.points?.length > 0) {
        const normPts = normalize2D(AppState.dataset.points);
        extData = { points: normPts, labels: AppState.dataset.labels, classNames: AppState.dataset.classNames };
      }
      a.algo.reset(defaults, extData);

      const t0 = performance.now();
      runAlgo(a.algo, a.id, renderers[idx], `status-${idx}`, defaults, idx, t0);
    });

    setTimeout(() => updateCompareMetrics(), 2500);
    setTimeout(() => updateCompareMetrics(), 5000);
  });

  function runAlgo(algo, id, renderer, statusId, defaults, idx, startTime) {
    const statusEl = document.getElementById(statusId);
    if (statusEl) { statusEl.textContent = 'RUNNING'; statusEl.className = 'chip chip-success'; }

    const isIterative = (id === 'linear-regression' || id === 'neural-network');
    const isClustering = (id === 'kmeans' || id === 'random-forest');

    if (isIterative) {
      const maxEpochs = defaults.epochs || 200;
      function tick() {
        if (algo.epoch >= maxEpochs || algo.converged) {
          const trainTime = performance.now() - startTime;
          // Measure prediction time
          const pt0 = performance.now();
          for (let i = 0; i < 100; i++) algo.predict ? algo.predict(0.5, 0.5) : 0;
          const predictTime = (performance.now() - pt0) / 100;
          results[idx] = { id, trainTime, predictTime, metrics: algo.getMetrics() };
          if (statusEl) statusEl.textContent = 'COMPLETE';
          algo.render(renderer);
          updateCompareMetrics();
          return;
        }
        const steps = Math.max(1, Math.floor(maxEpochs / 100));
        for (let i = 0; i < steps && algo.epoch < maxEpochs; i++) {
          algo.step(defaults.learningRate || 0.5);
        }
        algo.render(renderer);
        const frame = requestAnimationFrame(tick);
        anims.push(frame);
      }
      tick();
    } else if (isClustering) {
      function tick() {
        if (algo.converged) {
          const trainTime = performance.now() - startTime;
          const pt0 = performance.now();
          for (let i = 0; i < 100; i++) algo.predict ? algo.predict(0.5, 0.5) : 0;
          const predictTime = (performance.now() - pt0) / 100;
          results[idx] = { id, trainTime, predictTime, metrics: algo.getMetrics() };
          if (statusEl) statusEl.textContent = 'CONVERGED';
          algo.render(renderer);
          updateCompareMetrics();
          return;
        }
        algo.step();
        algo.render(renderer);
        const frame = requestAnimationFrame(tick);
        anims.push(frame);
      }
      tick();
    } else {
      algo.step(defaults);
      const trainTime = performance.now() - startTime;
      const pt0 = performance.now();
      for (let i = 0; i < 100; i++) algo.predict ? algo.predict(0.5, 0.5) : 0;
      const predictTime = (performance.now() - pt0) / 100;
      results[idx] = { id, trainTime, predictTime, metrics: algo.getMetrics() };
      algo.render(renderer);
      if (statusEl) statusEl.textContent = 'COMPLETE';
      updateCompareMetrics();
    }
  }

  function updateCompareMetrics() {
    if (algos.length === 0) return;

    // Gather all metrics
    const allMetrics = algos.map((a, i) => {
      const r = results[i];
      const m = r?.metrics || a.algo.getMetrics();
      const trainTime = r?.trainTime;
      const predictTime = r?.predictTime;
      const comp = COMPLEXITY[a.id] || {};
      return {
        ...m,
        'Train Time': trainTime !== undefined ? `${trainTime.toFixed(1)}ms` : '—',
        'Predict Time': predictTime !== undefined ? `${predictTime.toFixed(3)}ms` : '—',
        'Train Complexity': comp.train || '—',
        'Predict Complexity': comp.predict || '—',
      };
    });

    const allKeys = [...new Set(allMetrics.flatMap(m => Object.keys(m)))];

    const tbody = document.getElementById('compare-tbody');
    if (tbody) {
      tbody.innerHTML = allKeys.map(k => `
        <tr>
          <td class="text-label-md">${k}</td>
          ${allMetrics.map(m => `<td>${m[k] !== undefined ? m[k] : '—'}</td>`).join('')}
        </tr>
      `).join('');
    }

    // Accuracy bar chart
    drawAccuracyChart();
  }

  function drawAccuracyChart() {
    const chartEl = document.getElementById('accuracy-chart');
    if (!chartEl) return;

    const data = algos.map((a, i) => {
      const m = results[i]?.metrics || a.algo.getMetrics();
      const accStr = m['Accuracy'] || '0';
      const acc = parseFloat(accStr);
      const meta = ALGORITHMS.find(al => al.id === a.id);
      return { name: meta?.name || a.id, accuracy: isNaN(acc) ? 0 : acc };
    });

    const colors = ['#00d1ff', '#d0bcff', '#34d399', '#fbbf24'];
    const maxAcc = Math.max(...data.map(d => d.accuracy), 1);

    chartEl.innerHTML = data.map((d, i) => {
      const pct = (d.accuracy / 100) * 100;
      return `
        <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-md)">
          <div style="min-width:140px" class="text-body-sm">${d.name}</div>
          <div style="flex:1;height:28px;background:rgba(164,230,255,0.06);border-radius:6px;overflow:hidden;position:relative">
            <div style="height:100%;width:${pct}%;background:${colors[i % colors.length]};border-radius:6px;transition:width 0.6s ease;display:flex;align-items:center;justify-content:flex-end;padding-right:8px">
              <span style="font-size:11px;font-weight:700;color:rgba(0,0,0,0.7)">${d.accuracy.toFixed(1)}%</span>
            </div>
          </div>
        </div>`;
    }).join('');
  }

  return () => {
    anims.forEach(a => cancelAnimationFrame(a));
    renderers.forEach(r => { if (r) r.destroy(); });
  };
}
