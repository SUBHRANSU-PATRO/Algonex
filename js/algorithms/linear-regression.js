// ═══════════════════════════════════════════════════
// Linear Regression — enhanced with residual lines, gradient descent animation,
// param explanations, and pred-vs-actual data
// ═══════════════════════════════════════════════════

import { generateLinearData, meanSquaredError } from '../utils/math-helpers.js';

export function createLinearRegression() {
  let weight = Math.random() * 0.5;
  let bias   = Math.random() * 0.5;
  let data   = generateLinearData(60);
  let epoch  = 0;
  let lossHistory = [];
  let _converged = false;
  let showResiduals = true;

  const params = {
    learningRate: { value: 0.5, min: 0.01, max: 2, step: 0.01, label: 'Learning Rate' },
    epochs:       { value: 200, min: 10, max: 1000, step: 10,  label: 'Max Epochs' },
    dataPoints:   { value: 60, min: 20, max: 150,  step: 5,   label: 'Data Points' },
    noise:        { value: 0.15, min: 0.01, max: 0.4, step: 0.01, label: 'Noise Level' },
  };

  function predict(x) { return weight * x + bias; }

  function step(lr) {
    const n = data.length;
    let dw = 0, db = 0;
    for (const [x, y] of data) {
      const err = predict(x) - y;
      dw += (2 / n) * err * x;
      db += (2 / n) * err;
    }
    weight -= lr * dw;
    bias   -= lr * db;
    epoch++;
    const loss = meanSquaredError(data.map(([x]) => predict(x)), data.map(([, y]) => y));
    lossHistory.push(loss);

    // Convergence detection
    if (lossHistory.length > 10) {
      const recent = lossHistory.slice(-10);
      const diff = Math.abs(recent[0] - recent[recent.length - 1]);
      if (diff < 1e-6) _converged = true;
    }
    return loss;
  }

  function reset(paramValues, externalData = null) {
    weight = Math.random() * 0.5;
    bias   = Math.random() * 0.5;
    epoch  = 0;
    lossHistory = [];
    _converged = false;
    if (externalData && externalData.points && externalData.points.length > 0) {
      // Use external data — points are [[x, y], ...] pairs for regression
      data = externalData.points.map(p => [p[0], p[1]]);
    } else {
      data = generateLinearData(paramValues.dataPoints || 60, 1.5, 0.2, paramValues.noise || 0.15);
    }
  }

  function render(renderer) {
    renderer.clear();
    renderer.drawGrid();
    renderer.drawAxes('Feature X', 'Target Y');

    // T10: Draw residual lines (error visualization)
    if (showResiduals && epoch > 0) {
      const ctx = renderer.ctx;
      for (const [x, y] of data) {
        const predY = predict(x);
        const [px, py_actual] = renderer.toPixel(x, y);
        const [, py_pred] = renderer.toPixel(x, predY);

        // Dashed vertical error line
        ctx.beginPath();
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = 'rgba(255, 180, 171, 0.3)';
        ctx.lineWidth = 1;
        ctx.moveTo(px, py_actual);
        ctx.lineTo(px, py_pred);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    renderer.drawPoints(data, null, 4);

    // Draw regression line with glow
    renderer.drawLine(0, predict(0), 1, predict(1), '#00d1ff', 2.5);

    // T10: Show weight/bias on canvas
    if (epoch > 0) {
      const ctx = renderer.ctx;
      const w = renderer.width;
      ctx.fillStyle = 'rgba(11,19,38,0.85)';
      ctx.beginPath();
      ctx.roundRect(w - 170, 16, 154, 48, 8);
      ctx.fill();
      ctx.strokeStyle = 'rgba(164,230,255,0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#00d1ff';
      ctx.font = 'bold 10px "Space Grotesk"';
      ctx.textAlign = 'left';
      ctx.fillText(`w = ${weight.toFixed(4)}`, w - 158, 34);
      ctx.fillStyle = '#d0bcff';
      ctx.fillText(`b = ${bias.toFixed(4)}`, w - 158, 50);
      ctx.fillStyle = 'rgba(164,230,255,0.4)';
      ctx.font = '8px "Space Grotesk"';
      ctx.textAlign = 'right';
      ctx.fillText(`Epoch ${epoch}`, w - 24, 34);

      if (_converged) {
        ctx.fillStyle = '#34d399';
        ctx.font = 'bold 9px "Space Grotesk"';
        ctx.fillText('Converged ✓', w - 24, 50);
      }
    }
  }

  function getPredVsActual() {
    return data.map(([x, y]) => ({ predicted: predict(x), actual: y, x }));
  }

  function getParamExplanation(paramKey, value) {
    const expl = {
      learningRate: value < 0.05
        ? '⚠️ Very small learning rate — convergence will be very slow. The line moves in tiny steps toward the optimum.'
        : value < 0.3
          ? '✓ Small-moderate learning rate — stable, reliable convergence. Good starting point.'
          : value < 1.0
            ? '✓ Moderate learning rate — fast convergence. Watch for slight oscillation near the minimum.'
            : '⚠️ High learning rate — risk of overshooting the optimum. Loss may oscillate or diverge. Reduce if loss spikes.',
      epochs: value < 50
        ? '⚠️ Very few epochs — model may not converge fully. Increase if final loss is still high.'
        : value < 200
          ? '✓ Moderate epochs — sufficient for most linear problems with a good learning rate.'
          : '✓ Many epochs — ensures thorough convergence. Diminishing returns after the loss flattens.',
      dataPoints: `Using ${value} data points. More points give a more reliable estimate of the true relationship, but slow training.`,
      noise: value < 0.05
        ? '✓ Low noise — data closely follows the linear trend. R² will be very high.'
        : value < 0.2
          ? '✓ Moderate noise — realistic scenario. Some scatter around the line, but the trend is clear.'
          : '⚠️ High noise — data has a lot of scatter. Linear regression will still find the best-fit line, but R² will be lower.',
    };
    return expl[paramKey] || '';
  }

  function getExplanation() {
    const loss = lossHistory.length > 0 ? lossHistory[lossHistory.length - 1] : null;
    return {
      title: 'Linear Regression',
      currentStep: _converged ? `Converged at Epoch ${epoch}` : `Epoch ${epoch}`,
      formula: `y = ${weight.toFixed(4)}x + ${bias.toFixed(4)}`,
      parameters: [
        { name: 'Weight (w)', value: weight.toFixed(4), color: 'primary' },
        { name: 'Bias (b)',   value: bias.toFixed(4),   color: 'secondary' },
        { name: 'Loss (MSE)', value: loss !== null ? loss.toFixed(6) : '—', color: loss < 0.01 ? 'success' : 'warning' },
      ],
      insight: epoch === 0
        ? 'Press RUN to begin gradient descent. The line adjusts its slope and intercept to minimise Mean Squared Error — the average of squared prediction errors. Watch the residual lines (dashed red) shrink as the model fits.'
        : _converged
          ? `Converged! The model has found a good fit with MSE = ${loss.toFixed(6)}. The residual lines show the remaining error for each point. The line now represents the best linear relationship in your data.`
          : `Gradient descent is adjusting weight (w) and bias (b) to reduce loss. The dashed red lines show individual point errors being minimised. Current direction: w ${weight > 0 ? '↗' : '↘'}.`,
      theory: 'Linear Regression finds the line ŷ = wx + b that minimises the Mean Squared Error (MSE). Gradient descent iteratively adjusts w and b by moving in the direction of the negative gradient: w ← w - α·(∂MSE/∂w). The dashed residual lines visualize the error each data point contributes.',
    };
  }

  function getMetrics() {
    const loss = lossHistory.length > 0 ? lossHistory[lossHistory.length - 1] : null;
    const predictions = data.map(([x]) => predict(x));
    const targets     = data.map(([, y]) => y);
    const ss_res = predictions.reduce((s, p, i) => s + (p - targets[i]) ** 2, 0);
    const mean_y = targets.reduce((a, b) => a + b, 0) / targets.length;
    const ss_tot = targets.reduce((s, y) => s + (y - mean_y) ** 2, 0);
    const r2  = ss_tot > 0 ? 1 - ss_res / ss_tot : 0;
    const mae = predictions.reduce((s, p, i) => s + Math.abs(p - targets[i]), 0) / predictions.length;
    return {
      'Epochs':      epoch,
      'Loss (MSE)':  loss !== null ? loss.toFixed(6) : '—',
      'MAE':         mae.toFixed(4),
      'R² Score':    r2.toFixed(4),
      'Weight':      weight.toFixed(4),
      'Bias':        bias.toFixed(4),
    };
  }

  // No confusion matrix for regression
  function getConfusionMatrix() { return null; }

  return {
    params,
    predict: (x, y) => predict(x) > y ? 0 : 1,
    step, reset, render, getExplanation, getMetrics, getConfusionMatrix, getParamExplanation, getPredVsActual,
    get lossHistory() { return lossHistory; },
    get epoch()       { return epoch; },
    get data()        { return data; },
    get converged()   { return _converged; },
  };
}
