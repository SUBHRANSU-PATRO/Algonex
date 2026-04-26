// ═══════════════════════════════════════════════════
// SVM — soft-margin linear SVM via hinge loss gradient descent
// ═══════════════════════════════════════════════════

import { generateBlobs } from '../utils/math-helpers.js';

export function createSVM() {
  let data = { points: [], labels: [], binaryLabels: [] };
  let w = [0, 0];
  let b = 0;
  let epoch = 0;
  let lossHistory = [];
  let supportVectors = [];
  let C = 1.0;

  const params = {
    learningRate: { value: 0.05, min: 0.005, max: 0.3, step: 0.005, label: 'Learning Rate' },
    epochs:       { value: 200, min: 20, max: 800, step: 20, label: 'Max Epochs' },
    C:            { value: 1.0, min: 0.1, max: 5.0, step: 0.1, label: 'Regularization (C)' },
    dataPoints:   { value: 40, min: 15, max: 80, step: 5, label: 'Points per Class' },
    spread:       { value: 0.12, min: 0.04, max: 0.22, step: 0.01, label: 'Cluster Spread' },
  };

  function rawScore(x, y) { return w[0] * x + w[1] * y + b; }
  function predictBinary(x, y) { return rawScore(x, y) >= 0 ? 1 : 0; }

  function step(lr) {
    const learningRate = lr || 0.05;
    const n = data.points.length;
    let dw = [w[0] / n, w[1] / n], db = 0, totalLoss = 0;
    const svCandidates = [];
    for (let i = 0; i < n; i++) {
      const xi = data.points[i];
      const yi = data.binaryLabels[i];
      const m = yi * rawScore(xi[0], xi[1]);
      const loss = Math.max(0, 1 - m);
      totalLoss += loss;
      if (loss > 0) {
        dw[0] -= (C * yi * xi[0]) / n;
        dw[1] -= (C * yi * xi[1]) / n;
        db    -= (C * yi) / n;
      }
      if (m <= 1.05) svCandidates.push(i);
    }
    supportVectors = svCandidates;
    w[0] -= learningRate * dw[0];
    w[1] -= learningRate * dw[1];
    b     -= learningRate * db;
    epoch++;
    const avgLoss = totalLoss / n;
    lossHistory.push(avgLoss);
    return avgLoss;
  }

  function reset(paramValues, externalData = null) {
    C = paramValues.C || 1.0;
    if (externalData && externalData.points && externalData.points.length > 0 && externalData.labels) {
      data = { points: externalData.points, labels: [...externalData.labels] };
      // SVM needs binary labels — convert multiclass to binary (class 0 vs rest)
      const uniqueClasses = [...new Set(data.labels)];
      if (uniqueClasses.length > 2) {
        data.labels = data.labels.map(l => l === uniqueClasses[0] ? 0 : 1);
      }
      data.binaryLabels = data.labels.map(l => l === 0 ? -1 : 1);
    } else {
      const n = paramValues.dataPoints || 40;
      const spread = paramValues.spread || 0.12;
      data = generateBlobs(n, [[0.3, 0.7], [0.7, 0.3]], spread);
      data.binaryLabels = data.labels.map(l => l === 0 ? -1 : 1);
    }
    w = [(Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1];
    b = 0; epoch = 0; lossHistory = []; supportVectors = [];
  }

  function render(renderer) {
    renderer.clear();
    renderer.drawGrid();
    renderer.drawAxes('Feature 1', 'Feature 2');
    if (epoch > 0) {
      renderer.drawDecisionBoundary((x, y) => predictBinary(x, y), 60);
      drawMarginLines(renderer);
      drawSupportVectors(renderer);
      drawInfoOverlay(renderer);
    }
    renderer.drawPoints(data.points, data.labels, 5);
  }

  function drawMarginLines(renderer) {
    const ctx = renderer.ctx;
    if (Math.abs(w[1]) < 1e-9) return;
    const drawLine = (offset, color, dash) => {
      ctx.save();
      ctx.setLineDash(dash);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const y0 = -(w[0] * 0 + b - offset) / w[1];
      const y1 = -(w[0] * 1 + b - offset) / w[1];
      const [px0, py0] = renderer.toPixel(0, y0);
      const [px1, py1] = renderer.toPixel(1, y1);
      ctx.moveTo(px0, py0); ctx.lineTo(px1, py1); ctx.stroke();
      ctx.restore();
    };
    drawLine(0,  'rgba(0,209,255,0.85)', []);
    drawLine(1,  'rgba(0,209,255,0.35)', [6, 4]);
    drawLine(-1, 'rgba(0,209,255,0.35)', [6, 4]);
  }

  function drawSupportVectors(renderer) {
    const ctx = renderer.ctx;
    for (const idx of supportVectors) {
      const [px, py] = renderer.toPixel(data.points[idx][0], data.points[idx][1]);
      const grad = ctx.createRadialGradient(px, py, 4, px, py, 14);
      grad.addColorStop(0, 'rgba(251,191,36,0.45)');
      grad.addColorStop(1, 'rgba(251,191,36,0)');
      ctx.beginPath(); ctx.arc(px, py, 14, 0, Math.PI * 2);
      ctx.fillStyle = grad; ctx.fill();
      ctx.beginPath(); ctx.arc(px, py, 9, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(251,191,36,0.7)'; ctx.lineWidth = 1.5; ctx.stroke();
    }
  }

  function drawInfoOverlay(renderer) {
    const ctx = renderer.ctx;
    const w2 = Math.sqrt(w[0] ** 2 + w[1] ** 2);
    const marginWidth = w2 > 1e-9 ? (2 / w2).toFixed(3) : '—';
    ctx.fillStyle = 'rgba(11,19,38,0.85)';
    ctx.strokeStyle = 'rgba(164,230,255,0.15)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(12, 12, 168, 66, 10); ctx.fill(); ctx.stroke();
    ctx.fillStyle = 'rgba(164,230,255,0.5)'; ctx.font = '9px "Space Grotesk"'; ctx.textAlign = 'left';
    ctx.fillText('SVM MARGIN', 24, 30);
    ctx.fillStyle = '#00d1ff'; ctx.font = 'bold 16px "Space Grotesk"';
    ctx.fillText(marginWidth, 24, 52);
    ctx.fillStyle = 'rgba(164,230,255,0.4)'; ctx.font = '9px "Space Grotesk"';
    ctx.fillText(`${supportVectors.length} support vectors`, 24, 68);
  }

  function getParamExplanation(paramKey, value) {
    const expl = {
      learningRate: value < 0.01
        ? '⚠️ Very small LR — slow convergence. Margin moves in tiny increments.'
        : value < 0.1
          ? '✓ Small-moderate LR — stable SVM convergence.'
          : '⚠️ Large LR — may overshoot optimal margin. Reduce if loss oscillates.',
      epochs: value < 50
        ? '⚠️ Few epochs — SVM may not converge. Increase for clean boundary.'
        : value < 300
          ? '✓ Sufficient epochs for a linearly separable problem.'
          : '✓ Many epochs — ensures full convergence.',
      C: value < 0.5
        ? '✓ Low C — strong regularization. Wider margin, more misclassifications allowed (soft margin).'
        : value < 2.0
          ? '✓ Moderate C — balanced trade-off between margin width and error.'
          : '⚠️ High C — penalizes misclassifications heavily. Narrow margin, risk of overfitting.',
      dataPoints: `Using ${value} points per class (${value * 2} total).`,
      spread: value < 0.08
        ? '✓ Tight clusters — SVM finds a clean hard margin.'
        : value < 0.15
          ? '✓ Moderate spread — the soft margin C controls the trade-off.'
          : '⚠️ High spread — significant overlap. Adjust C or consider a non-linear kernel.',
    };
    return expl[paramKey] || '';
  }

  function getExplanation() {
    const loss = lossHistory.length > 0 ? lossHistory[lossHistory.length - 1] : null;
    const w2 = Math.sqrt(w[0] ** 2 + w[1] ** 2);
    const marginVal = w2 > 1e-9 ? (2 / w2).toFixed(3) : '—';
    return {
      title: 'Support Vector Machine',
      currentStep: `Epoch ${epoch}`,
      formula: `max 2/||w||  s.t. yᵢ(w·xᵢ+b) ≥ 1`,
      parameters: [
        { name: 'Margin Width', value: marginVal, color: 'primary' },
        { name: 'Hinge Loss',   value: loss !== null ? loss.toFixed(4) : '—', color: loss && loss < 0.1 ? 'success' : 'warning' },
        { name: 'Support Vecs', value: supportVectors.length, color: 'secondary' },
        { name: 'C',            value: C, color: 'primary' },
      ],
      insight: epoch === 0
        ? 'Press RUN to train. The SVM finds the hyperplane that maximizes the margin between classes. Watch the cyan margin lines widen as training progresses.'
        : loss && loss < 0.05
          ? `Converged! Margin = ${marginVal}. The ${supportVectors.length} support vectors (gold rings) are the only points that matter for the boundary.`
          : `Training epoch ${epoch}. Margin width = ${marginVal}. Gold rings mark support vectors — the boundary is defined entirely by these critical points.`,
      theory: 'SVMs maximize the geometric margin between classes. Soft-margin SVM allows misclassifications penalized by C. Only support vectors — points on or within the margin band — influence the decision boundary. This is the key insight: most training data is irrelevant!',
    };
  }

  function getMetrics() {
    if (epoch === 0) return { 'Status': 'Run to see metrics' };
    let correct = 0;
    for (let i = 0; i < data.points.length; i++) {
      if (predictBinary(data.points[i][0], data.points[i][1]) === data.labels[i]) correct++;
    }
    const loss = lossHistory.length > 0 ? lossHistory[lossHistory.length - 1] : null;
    const w2 = Math.sqrt(w[0] ** 2 + w[1] ** 2);
    return {
      'Epochs':          epoch,
      'Hinge Loss':      loss !== null ? loss.toFixed(4) : '—',
      'Accuracy':        ((correct / data.points.length) * 100).toFixed(1) + '%',
      'Margin Width':    w2 > 1e-9 ? (2 / w2).toFixed(3) : '—',
      'Support Vectors': supportVectors.length,
      'C':               C,
    };
  }

  function getConfusionMatrix() {
    if (epoch === 0) return null;
    const classes = [0, 1];
    const matrix = [[0, 0], [0, 0]];
    for (let i = 0; i < data.points.length; i++) {
      const pred = predictBinary(data.points[i][0], data.points[i][1]);
      const actual = data.labels[i];
      if (actual >= 0 && actual <= 1 && pred >= 0 && pred <= 1) matrix[actual][pred]++;
    }
    return { matrix, classes };
  }

  return {
    params,
    predict: predictBinary,
    step, reset, render, getExplanation, getMetrics, getConfusionMatrix, getParamExplanation,
    get data() { return data; },
    get lossHistory() { return lossHistory; },
    get epoch() { return epoch; },
    get supportVectors() { return supportVectors; },
  };
}
