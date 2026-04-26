// ═══════════════════════════════════════════════════
// Neural Network (MLP) — enhanced with P/R/F1, confusion matrix, param explanations
// ═══════════════════════════════════════════════════

import { generateMoonsData, sigmoid, sigmoidDerivative } from '../utils/math-helpers.js';

export function createNeuralNetwork() {
  let data = { points: [], labels: [] };
  let weights = {};
  let epoch = 0;
  let lossHistory = [];
  let layers = [2, 6, 6, 1];

  const params = {
    learningRate: { value: 1.0, min: 0.1, max: 5, step: 0.1, label: 'Learning Rate' },
    epochs:       { value: 300, min: 50, max: 1000, step: 50, label: 'Max Epochs' },
    hiddenSize:   { value: 6, min: 2, max: 12, step: 1, label: 'Neurons per Layer' },
    dataPoints:   { value: 50, min: 20, max: 100, step: 5, label: 'Points per Class' },
  };

  function initWeights() {
    weights = {};
    for (let l = 1; l < layers.length; l++) {
      weights[`w${l}`] = []; weights[`b${l}`] = [];
      for (let j = 0; j < layers[l]; j++) {
        weights[`w${l}`][j] = [];
        for (let i = 0; i < layers[l - 1]; i++) {
          weights[`w${l}`][j][i] = (Math.random() - 0.5) * 2 / Math.sqrt(layers[l - 1]);
        }
        weights[`b${l}`][j] = 0;
      }
    }
  }

  function forward(input) {
    const activations = [input], zValues = [input];
    let current = input;
    for (let l = 1; l < layers.length; l++) {
      const newLayer = [], newZ = [];
      for (let j = 0; j < layers[l]; j++) {
        let z = weights[`b${l}`][j];
        for (let i = 0; i < layers[l - 1]; i++) z += weights[`w${l}`][j][i] * current[i];
        newZ.push(z); newLayer.push(sigmoid(z));
      }
      zValues.push(newZ); activations.push(newLayer); current = newLayer;
    }
    return { activations, zValues };
  }

  function trainStep(lr) {
    let totalLoss = 0;
    for (let idx = 0; idx < data.points.length; idx++) {
      const { activations, zValues } = forward(data.points[idx]);
      const output = activations[activations.length - 1][0];
      const error  = output - data.labels[idx];
      totalLoss += error * error;
      const deltas = [];
      for (let l = 0; l < layers.length; l++) deltas.push([]);
      deltas[layers.length - 1] = [error * sigmoidDerivative(zValues[layers.length - 1][0])];
      for (let l = layers.length - 2; l >= 1; l--) {
        for (let i = 0; i < layers[l]; i++) {
          let sum = 0;
          for (let j = 0; j < layers[l + 1]; j++) sum += weights[`w${l + 1}`][j][i] * deltas[l + 1][j];
          deltas[l][i] = sum * sigmoidDerivative(zValues[l][i]);
        }
      }
      for (let l = 1; l < layers.length; l++) {
        for (let j = 0; j < layers[l]; j++) {
          for (let i = 0; i < layers[l - 1]; i++) weights[`w${l}`][j][i] -= lr * deltas[l][j] * activations[l - 1][i];
          weights[`b${l}`][j] -= lr * deltas[l][j];
        }
      }
    }
    epoch++;
    const avgLoss = totalLoss / data.points.length;
    lossHistory.push(avgLoss);
    return avgLoss;
  }

  function predictPoint(x, y) {
    const { activations } = forward([x, y]);
    return activations[activations.length - 1][0] > 0.5 ? 1 : 0;
  }

  function reset(paramValues) {
    const hs = paramValues.hiddenSize || 6;
    layers = [2, hs, hs, 1];
    data = generateMoonsData(paramValues.dataPoints || 50, 0.08);
    epoch = 0; lossHistory = [];
    initWeights();
  }

  function step(lr) { return trainStep(lr); }

  function render(renderer) {
    renderer.clear(); renderer.drawGrid(); renderer.drawAxes('X₁', 'X₂');
    if (epoch > 0) renderer.drawDecisionBoundary((x, y) => predictPoint(x, y), 50);
    renderer.drawPoints(data.points, data.labels, 4);
    drawNetworkDiagram(renderer);
  }

  function drawNetworkDiagram(renderer) {
    const ctx = renderer.ctx, w = renderer.width, h = renderer.height;
    const boxW = 160, boxH = 180, boxX = w - boxW - 20, boxY = 20;
    ctx.fillStyle = 'rgba(11, 19, 38, 0.85)';
    ctx.strokeStyle = 'rgba(164, 230, 255, 0.15)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(boxX, boxY, boxW, boxH, 12); ctx.fill(); ctx.stroke();
    ctx.fillStyle = 'rgba(164, 230, 255, 0.5)'; ctx.font = '9px "Space Grotesk"'; ctx.textAlign = 'center';
    ctx.fillText('NETWORK ARCHITECTURE', boxX + boxW / 2, boxY + 16);
    const layerX = [], spacing = boxW / (layers.length + 1);
    for (let l = 0; l < layers.length; l++) layerX.push(boxX + spacing * (l + 1));
    const sample = data.points.length > 0 ? data.points[0] : [0.5, 0.5];
    const { activations } = forward(sample);
    for (let l = 1; l < layers.length; l++) {
      const pn = Math.min(layers[l - 1], 6), cn = Math.min(layers[l], 6);
      const ps = (boxH - 50) / (pn + 1), cs = (boxH - 50) / (cn + 1);
      for (let i = 0; i < pn; i++) {
        for (let j = 0; j < cn; j++) {
          const wVal = weights[`w${l}`] && weights[`w${l}`][j] ? Math.abs(weights[`w${l}`][j][i] || 0) : 0;
          ctx.strokeStyle = `rgba(164, 230, 255, ${Math.min(0.5, wVal * 0.3)})`; ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(layerX[l - 1], boxY + 30 + ps * (i + 1));
          ctx.lineTo(layerX[l],     boxY + 30 + cs * (j + 1));
          ctx.stroke();
        }
      }
    }
    for (let l = 0; l < layers.length; l++) {
      const nodes = Math.min(layers[l], 6), ns = (boxH - 50) / (nodes + 1);
      for (let i = 0; i < nodes; i++) {
        const nx = layerX[l], ny = boxY + 30 + ns * (i + 1);
        const act = activations[l] ? (activations[l][i] || 0) : 0;
        const brightness = Math.floor(act * 200);
        ctx.beginPath(); ctx.arc(nx, ny, 5, 0, Math.PI * 2);
        ctx.fillStyle = l === 0 ? `rgba(0, 209, 255, 0.8)` : `rgba(${brightness}, ${brightness + 50}, 255, 0.9)`;
        ctx.fill();
        ctx.strokeStyle = 'rgba(164, 230, 255, 0.3)'; ctx.lineWidth = 0.5; ctx.stroke();
      }
    }
  }

  function countParams() {
    let total = 0;
    for (let l = 1; l < layers.length; l++) total += layers[l] * layers[l - 1] + layers[l];
    return total;
  }

  function getParamExplanation(paramKey, value) {
    const expl = {
      learningRate: value < 0.3
        ? '⚠️ Small learning rate — stable but may need many epochs to converge. Good for fine-tuning.'
        : value < 2.0
          ? '✓ Moderate learning rate — good balance of speed and stability for this network.'
          : '⚠️ High learning rate — risk of overshooting. Loss may oscillate. Reduce if the boundary looks erratic.',
      epochs: value < 100
        ? '⚠️ Few epochs — the network may not learn the non-linear pattern. Increase for better results.'
        : value < 400
          ? '✓ Sufficient epochs for this network size. Watch the boundary emerge gradually.'
          : '✓ Many epochs — thorough training. Useful for complex patterns but watch for overfitting.',
      hiddenSize: value <= 2
        ? '⚠️ Very small hidden layers — limited capacity. May not capture non-linear patterns well.'
        : value <= 6
          ? '✓ Moderate neuron count — good capacity for the moon dataset without over-parameterisation.'
          : '✓ Large hidden layers — high capacity. Good for complex boundaries. More parameters to train.',
      dataPoints: `Using ${value} points per class (${value * 2} total). Neural networks typically need more data than simpler models.`,
    };
    return expl[paramKey] || '';
  }

  function computeClassMetrics() {
    const classes = [...new Set(data.labels)];
    const cm = {};
    for (const c of classes) cm[c] = { tp: 0, fp: 0, fn: 0 };
    for (let i = 0; i < data.points.length; i++) {
      const pred   = predictPoint(data.points[i][0], data.points[i][1]);
      const actual = data.labels[i];
      if (pred === actual) cm[actual].tp++;
      else { cm[pred] = cm[pred] || { tp:0, fp:0, fn:0 }; cm[pred].fp++; cm[actual].fn++; }
    }
    let precSum = 0, recSum = 0, f1Sum = 0, n = 0;
    for (const c of classes) {
      const prec = cm[c].tp / (cm[c].tp + (cm[c].fp||0) + 1e-9);
      const rec  = cm[c].tp / (cm[c].tp + cm[c].fn + 1e-9);
      f1Sum += (2 * prec * rec) / (prec + rec + 1e-9);
      precSum += prec; recSum += rec; n++;
    }
    return { precision: precSum/n, recall: recSum/n, f1: f1Sum/n };
  }

  function getConfusionMatrix() {
    if (epoch === 0) return null;
    const classes = [...new Set(data.labels)].sort();
    const matrix = classes.map(() => classes.map(() => 0));
    for (let i = 0; i < data.points.length; i++) {
      const pred   = predictPoint(data.points[i][0], data.points[i][1]);
      const actual = data.labels[i];
      const ri = classes.indexOf(actual), ci = classes.indexOf(pred);
      if (ri >= 0 && ci >= 0) matrix[ri][ci]++;
    }
    return { matrix, classes };
  }

  function getExplanation() {
    const loss = lossHistory.length > 0 ? lossHistory[lossHistory.length - 1] : null;
    return {
      title: 'Neural Network (MLP)',
      currentStep: `Epoch ${epoch}`,
      formula: `z = σ(Wx + b)`,
      parameters: [
        { name: 'Architecture', value: layers.join(' → '), color: 'primary' },
        { name: 'Epoch',        value: epoch, color: 'secondary' },
        { name: 'Loss',         value: loss !== null ? loss.toFixed(6) : '—', color: loss && loss < 0.1 ? 'success' : 'warning' },
        { name: 'Parameters',  value: countParams(), color: 'primary' },
      ],
      insight: epoch === 0
        ? 'Press RUN to train. The network learns non-linear boundaries by adjusting weights through backpropagation — error flows backward to update each connection.'
        : loss && loss < 0.05
          ? `Network converging! Loss is ${loss.toFixed(4)}. The decision boundary now captures the curved moon pattern.`
          : `Backpropagation is adjusting ${countParams()} parameters. Watch the boundary emerge as training progresses.`,
      theory: 'A Multi-Layer Perceptron uses layers of neurons with sigmoid activations. Error backpropagates through the chain rule, updating each weight proportional to its contribution to the total error.',
    };
  }

  function getMetrics() {
    const loss = lossHistory.length > 0 ? lossHistory[lossHistory.length - 1] : null;
    let correct = 0;
    for (let i = 0; i < data.points.length; i++) {
      if (predictPoint(data.points[i][0], data.points[i][1]) === data.labels[i]) correct++;
    }
    if (epoch === 0) return { 'Status': 'Run to see metrics' };
    const cm = computeClassMetrics();
    return {
      'Epochs':      epoch,
      'Loss':        loss !== null ? loss.toFixed(6) : '—',
      'Accuracy':    data.points.length > 0 ? ((correct / data.points.length) * 100).toFixed(1) + '%' : '—',
      'Precision':   (cm.precision * 100).toFixed(1) + '%',
      'Recall':      (cm.recall * 100).toFixed(1) + '%',
      'F1 Score':    (cm.f1 * 100).toFixed(1) + '%',
      'Parameters':  countParams(),
    };
  }

  return {
    params,
    predict: predictPoint, step, reset, render, getExplanation, getMetrics, getConfusionMatrix, getParamExplanation,
    get data()        { return data; },
    get lossHistory() { return lossHistory; },
    get epoch()       { return epoch; },
  };
}
