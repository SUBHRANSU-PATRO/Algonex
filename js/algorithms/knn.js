// ═══════════════════════════════════════════════════
// K-Nearest Neighbors — enhanced with P/R/F1 + param explanations
// ═══════════════════════════════════════════════════

import { generateBlobs, euclideanDistance } from '../utils/math-helpers.js';

export function createKNN() {
  let data = { points: [], labels: [] };
  let k = 5;
  let boundaryDrawn = false;

  const params = {
    k: { value: 5, min: 1, max: 25, step: 2, label: 'K (Neighbors)' },
    dataPoints: { value: 40, min: 10, max: 80, step: 5, label: 'Points per Class' },
    spread: { value: 0.12, min: 0.05, max: 0.25, step: 0.01, label: 'Cluster Spread' },
  };

  function predictPoint(x, y) {
    const distances = data.points.map((pt, i) => ({
      dist: euclideanDistance([x, y], pt),
      label: data.labels[i],
    }));
    distances.sort((a, b) => a.dist - b.dist);
    const topK = distances.slice(0, k);
    const votes = {};
    for (const d of topK) votes[d.label] = (votes[d.label] || 0) + 1;
    let maxVotes = 0, winner = 0;
    for (const [label, count] of Object.entries(votes)) {
      if (count > maxVotes) { maxVotes = count; winner = parseInt(label); }
    }
    return winner;
  }

  function reset(paramValues, externalData = null) {
    k = paramValues.k || 5;
    if (externalData && externalData.points && externalData.points.length > 0 && externalData.labels) {
      data = { points: externalData.points, labels: externalData.labels };
    } else {
      const nPerCluster = paramValues.dataPoints || 40;
      const spread = paramValues.spread || 0.12;
      data = generateBlobs(nPerCluster, [[0.25, 0.75], [0.75, 0.25], [0.75, 0.75]], spread);
    }
    boundaryDrawn = false;
  }

  function step() { boundaryDrawn = true; }

  // Returns indices of K nearest neighbors for a query point
  function getNeighbors(qx, qy) {
    const distances = data.points.map((pt, i) => ({
      idx: i,
      dist: euclideanDistance([qx, qy], pt),
      label: data.labels[i],
    }));
    distances.sort((a, b) => a.dist - b.dist);
    return distances.slice(0, k);
  }

  function render(renderer) {
    renderer.clear();
    renderer.drawGrid();
    renderer.drawAxes('Feature 1', 'Feature 2');
    if (boundaryDrawn) renderer.drawDecisionBoundary((x, y) => predictPoint(x, y), 60);
    renderer.drawPoints(data.points, data.labels, 5);
  }

  function computeClassMetrics() {
    const classes = [...new Set(data.labels)];
    const cm = {};
    for (const c of classes) cm[c] = { tp: 0, fp: 0, fn: 0 };
    for (let i = 0; i < data.points.length; i++) {
      const pred = predictPoint(data.points[i][0], data.points[i][1]);
      const actual = data.labels[i];
      if (pred === actual) cm[actual].tp++;
      else { cm[pred] = cm[pred] || { tp:0, fp:0, fn:0 }; cm[pred].fp++; cm[actual].fn++; }
    }
    let precSum = 0, recSum = 0, f1Sum = 0, n = 0;
    for (const c of classes) {
      const prec = cm[c].tp / (cm[c].tp + (cm[c].fp || 0) + 1e-9);
      const rec  = cm[c].tp / (cm[c].tp + cm[c].fn + 1e-9);
      const f1   = (2 * prec * rec) / (prec + rec + 1e-9);
      precSum += prec; recSum += rec; f1Sum += f1; n++;
    }
    return { precision: precSum / n, recall: recSum / n, f1: f1Sum / n, confMatrix: cm, classes };
  }

  function getParamExplanation(paramKey, value) {
    const expl = {
      k: value <= 1
        ? '⚠️ K=1 memorises training data exactly — maximum variance, zero bias. Very sensitive to noise and outliers.'
        : value <= 5
          ? '✓ Small K captures local patterns well. Good for complex boundaries but can overfit noisy data.'
          : value <= 15
            ? '✓ Moderate K smooths the decision boundary. Balances bias and variance well.'
            : '📊 Large K creates very smooth boundaries. Low variance but may miss fine-grained class separations (high bias).',
      dataPoints: `Using ${value} points per class. More data generally improves KNN accuracy and boundary quality.`,
      spread: value < 0.08
        ? '✓ Tight clusters — classes are well-separated. KNN will find clean, clear boundaries.'
        : value < 0.15
          ? '✓ Moderate spread — some overlap near boundaries. Realistic scenario for real-world data.'
          : '⚠️ High spread — significant class overlap. KNN may struggle at the boundaries. Try increasing K.',
    };
    return expl[paramKey] || '';
  }

  function getExplanation() {
    return {
      title: 'K-Nearest Neighbors',
      currentStep: boundaryDrawn ? 'Boundary Computed' : 'Ready',
      formula: `d(p,q) = √Σ(pᵢ - qᵢ)²`,
      parameters: [
        { name: 'K', value: k, color: 'primary' },
        { name: 'Classes', value: '3', color: 'secondary' },
        { name: 'Points', value: data.points.length, color: 'success' },
      ],
      insight: boundaryDrawn
        ? `With K=${k}, each point is classified by majority vote of its ${k} nearest neighbours. ${k > 10 ? 'Higher K → smoother boundaries, but may miss local patterns.' : 'Lower K → tighter boundaries that follow the data more closely.'}`
        : 'Press RUN to compute the decision boundary. KNN classifies each region of the space by polling its K nearest training samples.',
      theory: 'KNN is a lazy learner — it stores all training data and classifies via distance-weighted voting at prediction time. No explicit model is trained. Complexity is O(n) per prediction, making it slow for large datasets.',
    };
  }

  function getMetrics() {
    let correct = 0;
    for (let i = 0; i < data.points.length; i++) {
      if (predictPoint(data.points[i][0], data.points[i][1]) === data.labels[i]) correct++;
    }
    const acc = correct / data.points.length;
    if (!boundaryDrawn) return { 'Status': 'Run to see metrics' };
    const cm = computeClassMetrics();
    return {
      'Accuracy':  (acc * 100).toFixed(1) + '%',
      'Precision': (cm.precision * 100).toFixed(1) + '%',
      'Recall':    (cm.recall * 100).toFixed(1) + '%',
      'F1 Score':  (cm.f1 * 100).toFixed(1) + '%',
      'K':         k,
      'Total Points': data.points.length,
    };
  }

  function getConfusionMatrix() {
    if (!boundaryDrawn) return null;
    const classes = [...new Set(data.labels)].sort();
    const matrix = classes.map(() => classes.map(() => 0));
    for (let i = 0; i < data.points.length; i++) {
      const pred   = predictPoint(data.points[i][0], data.points[i][1]);
      const actual = data.labels[i];
      const ri = classes.indexOf(actual);
      const ci = classes.indexOf(pred);
      if (ri >= 0 && ci >= 0) matrix[ri][ci]++;
    }
    return { matrix, classes };
  }

  return {
    params,
    predict: predictPoint,
    step, reset, render, getExplanation, getMetrics, getConfusionMatrix, getParamExplanation,
    getNeighbors,
    get data() { return data; },
    get k() { return k; },
    get boundaryDrawn() { return boundaryDrawn; },
  };
}
