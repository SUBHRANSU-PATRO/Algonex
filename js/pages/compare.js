// ═══════════════════════════════════════════════════
// Compare Algorithms Mode
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

const ALGO_FACTORIES = {
  'linear-regression': createLinearRegression,
  'knn': createKNN,
  'decision-tree': createDecisionTree,
  'kmeans': createKMeans,
  'neural-network': createNeuralNetwork,
  'random-forest': createRandomForest,
  'svm': createSVM,
};

export function renderCompare(container) {
  container.classList.add('page-content');

  const selectOptions = ALGORITHMS.map(a => `<option value="${a.id}">${a.name}</option>`).join('');

  container.innerHTML = `
    <div class="aura aura-primary" style="top:50%;left:-200px"></div>
    <div class="aura aura-secondary" style="bottom:0;right:-200px"></div>

    <div class="container-wide" style="padding-top:var(--space-2xl);padding-bottom:var(--space-2xl)">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:var(--space-xl)">
        <div>
          <div class="chip chip-secondary mb-md">Compare Mode</div>
          <h1 class="text-headline-lg">Compare Algorithms Side-by-Side</h1>
          <p class="text-body-md text-muted mt-sm">Run two algorithms on the same data and compare behavior, speed, and accuracy.</p>
        </div>
        <button class="btn btn-primary" id="compare-run-btn">
          <span class="material-symbols-outlined" style="font-size:18px">play_arrow</span>
          Run Both
        </button>
      </div>

      <div class="compare-grid" style="height:calc(100vh - 280px)">
        <!-- Left Panel -->
        <div class="compare-panel">
          <div class="compare-panel-header">
            <select class="select-field" id="algo-select-left" style="max-width:200px">
              ${selectOptions}
            </select>
            <span class="chip chip-primary" id="status-left">READY</span>
          </div>
          <div class="compare-panel-canvas">
            <div class="vis-canvas-wrap h-full" id="canvas-wrap-left" style="min-height:300px">
              <canvas id="canvas-left"></canvas>
            </div>
          </div>
        </div>

        <!-- Right Panel -->
        <div class="compare-panel">
          <div class="compare-panel-header">
            <select class="select-field" id="algo-select-right" style="max-width:200px">
              ${selectOptions}
            </select>
            <span class="chip chip-secondary" id="status-right">READY</span>
          </div>
          <div class="compare-panel-canvas">
            <div class="vis-canvas-wrap h-full" id="canvas-wrap-right" style="min-height:300px">
              <canvas id="canvas-right"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Metrics Comparison Table -->
      <div class="card" style="margin-top:var(--space-xl);padding:var(--space-lg)">
        <h3 class="text-headline-sm mb-md">Metrics Comparison</h3>
        <table class="metrics-table" id="compare-metrics">
          <thead>
            <tr><th>Metric</th><th id="th-left">Algorithm A</th><th id="th-right">Algorithm B</th></tr>
          </thead>
          <tbody id="compare-tbody">
            <tr><td colspan="3" class="text-muted text-center" style="padding:var(--space-xl)">Select algorithms and press Run Both to compare</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Set defaults
  const selectLeft = document.getElementById('algo-select-left');
  const selectRight = document.getElementById('algo-select-right');
  selectLeft.value = 'knn';
  selectRight.value = 'decision-tree';

  let rendererL = null, rendererR = null;
  let algoL = null, algoR = null;
  let anims = [];

  requestAnimationFrame(() => {
    rendererL = new CanvasRenderer(document.getElementById('canvas-left'));
    rendererR = new CanvasRenderer(document.getElementById('canvas-right'));
  });

  document.getElementById('compare-run-btn').addEventListener('click', () => {
    anims.forEach(a => cancelAnimationFrame(a));
    anims = [];

    const leftId = selectLeft.value;
    const rightId = selectRight.value;

    algoL = ALGO_FACTORIES[leftId]();
    algoR = ALGO_FACTORIES[rightId]();

    // Defaults
    const defaultsL = {};
    for (const [k, v] of Object.entries(algoL.params)) defaultsL[k] = v.value;
    const defaultsR = {};
    for (const [k, v] of Object.entries(algoR.params)) defaultsR[k] = v.value;

    algoL.reset(defaultsL);
    algoR.reset(defaultsR);

    document.getElementById('th-left').textContent = ALGORITHMS.find(a => a.id === leftId)?.name || leftId;
    document.getElementById('th-right').textContent = ALGORITHMS.find(a => a.id === rightId)?.name || rightId;

    // Run both
    runAlgo(algoL, leftId, rendererL, 'status-left', defaultsL);
    runAlgo(algoR, rightId, rendererR, 'status-right', defaultsR);

    // Update metrics after a delay
    setTimeout(() => updateCompareMetrics(), 2000);
    setTimeout(() => updateCompareMetrics(), 5000);
  });

  function runAlgo(algo, id, renderer, statusId, defaults) {
    document.getElementById(statusId).textContent = 'RUNNING';
    document.getElementById(statusId).className = 'chip chip-success';

    const isIterative = (id === 'linear-regression' || id === 'neural-network');
    const isClustering = (id === 'kmeans' || id === 'random-forest');

    if (isIterative) {
      const maxEpochs = defaults.epochs || 200;
      let frame;
      function tick() {
        if (algo.epoch >= maxEpochs) {
          document.getElementById(statusId).textContent = 'COMPLETE';
          algo.render(renderer);
          updateCompareMetrics();
          return;
        }
        const steps = Math.max(1, Math.floor(maxEpochs / 100));
        for (let i = 0; i < steps && algo.epoch < maxEpochs; i++) {
          algo.step(defaults.learningRate || 0.5);
        }
        algo.render(renderer);
        frame = requestAnimationFrame(tick);
        anims.push(frame);
      }
      tick();
    } else if (isClustering) {
      let frame;
      function tick() {
        if (algo.converged) {
          document.getElementById(statusId).textContent = 'CONVERGED';
          algo.render(renderer);
          updateCompareMetrics();
          return;
        }
        algo.step();
        algo.render(renderer);
        frame = requestAnimationFrame(tick);
        anims.push(frame);
      }
      tick();
    } else {
      // Single-shot
      algo.step(defaults);
      algo.render(renderer);
      document.getElementById(statusId).textContent = 'COMPLETE';
      updateCompareMetrics();
    }
  }

  function updateCompareMetrics() {
    if (!algoL || !algoR) return;
    const mL = algoL.getMetrics();
    const mR = algoR.getMetrics();
    const allKeys = [...new Set([...Object.keys(mL), ...Object.keys(mR)])];

    const tbody = document.getElementById('compare-tbody');
    if (tbody) {
      tbody.innerHTML = allKeys.map(k => `
        <tr>
          <td class="text-label-md">${k}</td>
          <td>${mL[k] !== undefined ? mL[k] : '—'}</td>
          <td>${mR[k] !== undefined ? mR[k] : '—'}</td>
        </tr>
      `).join('');
    }
  }

  return () => {
    anims.forEach(a => cancelAnimationFrame(a));
    if (rendererL) rendererL.destroy();
    if (rendererR) rendererR.destroy();
  };
}
