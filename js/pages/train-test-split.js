// ═══════════════════════════════════════════════════
// Train-Test Split Interactive Visualization
// Wired to AppState for cross-page data flow (T14)
// ═══════════════════════════════════════════════════

import { generateBlobs } from '../utils/math-helpers.js';
import { AppState } from '../utils/app-state.js';

export function renderTrainTestSplit(container) {
  container.classList.add('page-content');
  let splitRatio = 0.8;
  let stratified = true;

  // T14: Use AppState data if available, otherwise generate synthetic
  let data;
  let usingAppState = false;
  if (AppState.dataset && AppState.dataset.points && AppState.dataset.labels) {
    data = { points: [...AppState.dataset.points], labels: [...AppState.dataset.labels] };
    usingAppState = true;
  } else {
    data = generateBlobs(50, [[0.3, 0.7], [0.7, 0.3]], 0.13);
  }

  let trainIndices = [], testIndices = [];
  let animProgress = 0;
  let animFrame = null;

  function computeSplit() {
    const n = data.points.length;
    const indices = data.points.map((_, i) => i);
    if (stratified && data.labels) {
      const byClass = {};
      indices.forEach(i => { const c = data.labels[i]; if (!byClass[c]) byClass[c] = []; byClass[c].push(i); });
      trainIndices = []; testIndices = [];
      for (const cls of Object.keys(byClass)) {
        const arr = byClass[cls].sort(() => Math.random() - 0.5);
        const splitAt = Math.floor(arr.length * splitRatio);
        trainIndices.push(...arr.slice(0, splitAt));
        testIndices.push(...arr.slice(splitAt));
      }
    } else {
      const shuffled = indices.sort(() => Math.random() - 0.5);
      const splitAt = Math.floor(n * splitRatio);
      trainIndices = shuffled.slice(0, splitAt);
      testIndices = shuffled.slice(splitAt);
    }
    animProgress = 0;
    startAnimation();
  }

  function getClassDistribution(idxs) {
    const counts = {};
    idxs.forEach(i => { const c = data.labels ? data.labels[i] : 0; counts[c] = (counts[c] || 0) + 1; });
    return counts;
  }

  const datasetLabel = usingAppState ? `Using: <strong>${AppState.datasetName || 'Custom'}</strong> (${data.points.length} samples)` : 'Using synthetic data — <a href="#playground" style="color:var(--primary)">load a dataset</a> for real data';

  container.innerHTML = `
    <div class="aura aura-primary" style="top:50%;left:-200px"></div>
    <div class="aura aura-secondary" style="bottom:0;right:-200px"></div>
    <div class="container" style="padding-top:var(--space-2xl);padding-bottom:var(--space-3xl)">
      <div class="section-header" style="text-align:left;margin-bottom:var(--space-2xl)">
        <div class="chip chip-primary mb-md">Train / Test Split</div>
        <h1 class="text-display-md" style="max-width:700px">Interactive Data Splitting</h1>
        <p class="text-body-lg text-muted mt-sm" style="max-width:600px">
          Drag the slider to change the split ratio. Watch data points recolor in real time — cyan for training, purple for testing.
        </p>
        <div class="text-body-sm mt-sm" style="color:var(--on-surface-variant)">${datasetLabel}</div>
      </div>

      <!-- Controls -->
      <div class="preprocess-controls-row">
        <div class="glass-panel preprocess-control-card" style="flex:2">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-sm)">
            <span class="text-label-sm text-dim">SPLIT RATIO</span>
            <span class="text-headline-sm text-primary" id="tts-ratio-val">${Math.round(splitRatio * 100)}/${Math.round((1 - splitRatio) * 100)}</span>
          </div>
          <input type="range" id="tts-ratio-slider" min="50" max="95" step="5" value="${splitRatio * 100}" />
          <div style="display:flex;justify-content:space-between;margin-top:4px">
            <span class="text-label-sm text-dim">50/50</span>
            <span class="text-label-sm text-dim">95/5</span>
          </div>
        </div>
        <div class="glass-panel preprocess-control-card">
          <div class="text-label-sm text-dim mb-sm">STRATEGY</div>
          <div class="segmented-control" id="tts-strategy">
            <button class="active" data-val="true">Stratified</button>
            <button data-val="false">Random</button>
          </div>
        </div>
        <div class="glass-panel preprocess-control-card">
          <button class="btn btn-primary btn-sm w-full" id="tts-reshuffle">
            <span class="material-symbols-outlined" style="font-size:16px">shuffle</span> Reshuffle
          </button>
        </div>
        <div class="glass-panel preprocess-control-card">
          <button class="btn btn-secondary btn-sm w-full" id="tts-newdata">
            <span class="material-symbols-outlined" style="font-size:16px">refresh</span> New Data
          </button>
        </div>
      </div>

      <!-- Apply Split & Continue (T14) -->
      <div style="margin-top:var(--space-lg);display:flex;justify-content:flex-end;gap:var(--space-sm)">
        <button class="btn btn-primary" id="tts-apply-continue" style="padding:var(--space-sm) var(--space-xl)">
          <span class="material-symbols-outlined" style="font-size:18px">check_circle</span>
          Apply Split & Continue to Workspace →
        </button>
      </div>

      <!-- Split Bar -->
      <div class="split-bar-container" style="margin-top:var(--space-lg)">
        <div class="split-bar">
          <div class="split-bar-train" id="tts-bar-train" style="width:${splitRatio * 100}%">
            <span>Train <span id="tts-train-count">${trainIndices.length}</span></span>
          </div>
          <div class="split-bar-test" id="tts-bar-test" style="width:${(1 - splitRatio) * 100}%">
            <span>Test <span id="tts-test-count">${testIndices.length}</span></span>
          </div>
        </div>
      </div>

      <!-- Scatter Canvas -->
      <div style="margin-top:var(--space-xl)">
        <div class="vis-canvas-wrap" style="min-height:420px">
          <canvas id="tts-canvas"></canvas>
          <div style="position:absolute;top:16px;right:16px;display:flex;gap:var(--space-sm)">
            <span class="chip chip-primary" style="font-size:9px">● Train</span>
            <span class="chip chip-secondary" style="font-size:9px">● Test</span>
          </div>
        </div>
      </div>

      <!-- Info panels -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-lg);margin-top:var(--space-xl)">
        <div class="card-glass" style="padding:var(--space-lg)">
          <h3 class="text-headline-sm mb-md" style="color:var(--primary)">Training Set</h3>
          <div id="tts-train-info"></div>
        </div>
        <div class="card-glass" style="padding:var(--space-lg)">
          <h3 class="text-headline-sm mb-md" style="color:var(--secondary)">Test Set</h3>
          <div id="tts-test-info"></div>
        </div>
      </div>

      <!-- Explanation -->
      <div class="card-glass" style="padding:var(--space-xl);margin-top:var(--space-xl);border-left:3px solid var(--primary)">
        <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-md)">
          <span class="material-symbols-outlined text-primary" style="font-size:20px">lightbulb</span>
          <h3 class="text-headline-sm">Understanding Train/Test Split</h3>
        </div>
        <div id="tts-explanation" class="text-body-md text-muted" style="line-height:1.8"></div>
      </div>
    </div>`;

  // Bindings
  const slider = document.getElementById('tts-ratio-slider');
  slider.addEventListener('input', () => {
    splitRatio = parseInt(slider.value) / 100;
    document.getElementById('tts-ratio-val').textContent = `${Math.round(splitRatio * 100)}/${Math.round((1 - splitRatio) * 100)}`;
    computeSplit();
  });

  document.querySelectorAll('#tts-strategy button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#tts-strategy button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      stratified = btn.dataset.val === 'true';
      computeSplit();
    });
  });

  document.getElementById('tts-reshuffle').addEventListener('click', () => computeSplit());
  document.getElementById('tts-newdata').addEventListener('click', () => {
    data = generateBlobs(50, [[0.3, 0.7], [0.7, 0.3]], 0.13);
    usingAppState = false;
    computeSplit();
  });

  // T14: Apply Split & Continue → saves to AppState and navigates
  document.getElementById('tts-apply-continue').addEventListener('click', () => {
    const trainPoints = trainIndices.map(i => data.points[i]);
    const trainLabels = data.labels ? trainIndices.map(i => data.labels[i]) : null;
    const testPoints = testIndices.map(i => data.points[i]);
    const testLabels = data.labels ? testIndices.map(i => data.labels[i]) : null;

    const trainData = { points: trainPoints, labels: trainLabels };
    const testData = { points: testPoints, labels: testLabels };

    // If no dataset was loaded, set it now
    if (!AppState.dataset) {
      AppState.setDataset({
        points: data.points,
        labels: data.labels,
        classNames: data.classNames || null,
      }, 'Synthetic');
    }

    AppState.setSplit(splitRatio, trainData, testData);

    // Show toast
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;padding:12px 20px;border-radius:10px;background:rgba(52,211,153,0.9);color:#fff;font-family:"Space Grotesk",sans-serif;font-size:13px;font-weight:500;box-shadow:0 8px 32px rgba(0,0,0,0.4);animation:fadeIn 0.3s ease';
    toast.textContent = `Split applied: ${trainIndices.length} train / ${testIndices.length} test → Navigating to workspace`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);

    // Navigate to workspace
    const algoRoute = data.labels ? 'knn' : 'linear-regression';
    window.location.hash = `#workspace/${algoRoute}`;
  });

  function startAnimation() {
    if (animFrame) cancelAnimationFrame(animFrame);
    animProgress = 0;
    function tick() {
      animProgress = Math.min(1, animProgress + 0.06);
      drawCanvas();
      updateInfoPanels();
      if (animProgress < 1) animFrame = requestAnimationFrame(tick);
    }
    tick();
  }

  function drawCanvas() {
    const canvas = document.getElementById('tts-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px'; canvas.style.height = rect.height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const w = rect.width, h = rect.height, pad = 50;
    ctx.clearRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = 'rgba(164,230,255,0.04)'; ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = pad + (i / 10) * (w - 2 * pad), y = pad + (i / 10) * (h - 2 * pad);
      ctx.beginPath(); ctx.moveTo(x, pad); ctx.lineTo(x, h - pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(w - pad, y); ctx.stroke();
    }

    // Points
    const trainSet = new Set(trainIndices);
    for (let i = 0; i < data.points.length; i++) {
      const pt = data.points[i];
      const px = pad + pt[0] * (w - 2 * pad);
      const py = (h - pad) - pt[1] * (h - 2 * pad);
      const isTrain = trainSet.has(i);

      const targetColor = isTrain ? [0, 209, 255] : [208, 188, 255];
      const r = targetColor[0], g = targetColor[1], b = targetColor[2];
      const alpha = 0.3 + animProgress * 0.7;

      // Glow
      ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.15})`;
      ctx.fill();

      // Point
      ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.fill();

      // Class shape indicator for test points (hollow circle)
      if (!isTrain) {
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha * 0.8})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2); ctx.stroke();
      }
    }

    // Split line label
    ctx.fillStyle = 'rgba(164,230,255,0.3)'; ctx.font = '10px "Space Grotesk"'; ctx.textAlign = 'center';
    ctx.fillText(`${trainIndices.length} train / ${testIndices.length} test`, w / 2, h - 15);
  }

  function updateInfoPanels() {
    const trainDist = getClassDistribution(trainIndices);
    const testDist = getClassDistribution(testIndices);

    document.getElementById('tts-bar-train').style.width = `${splitRatio * 100}%`;
    document.getElementById('tts-bar-test').style.width = `${(1 - splitRatio) * 100}%`;
    document.getElementById('tts-train-count').textContent = trainIndices.length;
    document.getElementById('tts-test-count').textContent = testIndices.length;

    document.getElementById('tts-train-info').innerHTML = `
      <div class="preprocess-stats-row">
        <div class="preprocess-stat"><span class="text-label-sm text-dim">SAMPLES</span><span class="text-headline-sm">${trainIndices.length}</span></div>
        ${Object.entries(trainDist).map(([c, n]) => `<div class="preprocess-stat"><span class="text-label-sm text-dim">CLASS ${c}</span><span class="text-headline-sm">${n} (${(n / trainIndices.length * 100).toFixed(0)}%)</span></div>`).join('')}
      </div>`;

    document.getElementById('tts-test-info').innerHTML = `
      <div class="preprocess-stats-row">
        <div class="preprocess-stat"><span class="text-label-sm text-dim">SAMPLES</span><span class="text-headline-sm">${testIndices.length}</span></div>
        ${Object.entries(testDist).map(([c, n]) => `<div class="preprocess-stat"><span class="text-label-sm text-dim">CLASS ${c}</span><span class="text-headline-sm">${n} (${(n / testIndices.length * 100).toFixed(0)}%)</span></div>`).join('')}
      </div>`;

    const el = document.getElementById('tts-explanation');
    if (el) {
      const pct = Math.round(splitRatio * 100);
      el.innerHTML = `
        <p style="margin-bottom:var(--space-md)"><strong>${pct}/${100 - pct} split</strong> — ${pct}% of data is used for training, ${100 - pct}% held out for testing. ${pct >= 80 ? 'This is the most common split ratio, giving the model enough data to learn while keeping a fair test set.' : pct >= 70 ? 'A 70/30 split provides a larger test set for more reliable evaluation, at the cost of less training data.' : 'A 50/50 or 60/40 split is unusual — consider increasing training data for better model performance.'}</p>
        <p><strong>${stratified ? 'Stratified' : 'Random'} split</strong> — ${stratified ? 'Class proportions are preserved in both sets. This ensures the test set is representative, especially important for imbalanced datasets.' : 'Points are randomly assigned regardless of class. This may result in class imbalance between train and test sets.'}</p>`;
    }
  }

  computeSplit();

  const rh = () => drawCanvas();
  window.addEventListener('resize', rh);
  return () => { if (animFrame) cancelAnimationFrame(animFrame); window.removeEventListener('resize', rh); };
}
