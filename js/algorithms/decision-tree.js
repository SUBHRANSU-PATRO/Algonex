// ═══════════════════════════════════════════════════
// Decision Tree — enhanced with P/R/F1, confusion matrix, param explanations
// + getTreeStructure() for node-link diagram rendering
// ═══════════════════════════════════════════════════

import { generateBlobs } from '../utils/math-helpers.js';

export function createDecisionTree() {
  let data = { points: [], labels: [] };
  let tree = null;
  let maxDepth = 4;
  let minSamples = 5;
  let treeBuilt = false;
  let revealDepth = 0; // how many depth levels are visible in animation

  const params = {
    maxDepth:   { value: 4, min: 1, max: 10, step: 1, label: 'Max Depth' },
    minSamples: { value: 5, min: 2, max: 20, step: 1, label: 'Min Samples Split' },
    dataPoints: { value: 40, min: 15, max: 80, step: 5, label: 'Points per Class' },
    spread:     { value: 0.13, min: 0.05, max: 0.25, step: 0.01, label: 'Cluster Spread' },
  };

  function giniImpurity(labels) {
    const counts = {};
    for (const l of labels) counts[l] = (counts[l] || 0) + 1;
    let imp = 1;
    for (const c in counts) { const p = counts[c] / labels.length; imp -= p * p; }
    return imp;
  }

  function majorityClass(labels) {
    const counts = {};
    for (const l of labels) counts[l] = (counts[l] || 0) + 1;
    let best = labels[0], bestCount = 0;
    for (const [l, c] of Object.entries(counts)) { if (c > bestCount) { best = parseInt(l); bestCount = c; } }
    return best;
  }

  function classCounts(labels) {
    const counts = {};
    for (const l of labels) counts[l] = (counts[l] || 0) + 1;
    return counts;
  }

  function buildTree(indices, depth) {
    const labels = indices.map(i => data.labels[i]);
    if (depth >= maxDepth || indices.length < minSamples || giniImpurity(labels) === 0) {
      return { leaf: true, prediction: majorityClass(labels), samples: indices.length, classDist: classCounts(labels) };
    }
    let bestFeature = 0, bestThreshold = 0.5, bestGini = Infinity;
    let bestLeftIdx = [], bestRightIdx = [];
    for (let feature = 0; feature < 2; feature++) {
      const values = indices.map(i => data.points[i][feature]).sort((a, b) => a - b);
      const thresholds = [];
      for (let i = 1; i < values.length; i++) {
        if (values[i] !== values[i - 1]) thresholds.push((values[i] + values[i - 1]) / 2);
      }
      for (const thresh of thresholds) {
        const leftIdx  = indices.filter(i => data.points[i][feature] <= thresh);
        const rightIdx = indices.filter(i => data.points[i][feature] > thresh);
        if (!leftIdx.length || !rightIdx.length) continue;
        const gini = (leftIdx.length * giniImpurity(leftIdx.map(i => data.labels[i])) +
                      rightIdx.length * giniImpurity(rightIdx.map(i => data.labels[i]))) / indices.length;
        if (gini < bestGini) { bestGini = gini; bestFeature = feature; bestThreshold = thresh; bestLeftIdx = leftIdx; bestRightIdx = rightIdx; }
      }
    }
    if (!bestLeftIdx.length || !bestRightIdx.length) {
      return { leaf: true, prediction: majorityClass(labels), samples: indices.length, classDist: classCounts(labels) };
    }
    return {
      leaf: false, feature: bestFeature, threshold: bestThreshold, gini: bestGini, samples: indices.length,
      classDist: classCounts(labels),
      left: buildTree(bestLeftIdx, depth + 1), right: buildTree(bestRightIdx, depth + 1),
    };
  }

  function predictPoint(x, y, node = tree, depth = 0, maxDepthLimit = 99) {
    if (!node) return 0;
    if (node.leaf || depth >= maxDepthLimit) return node.prediction ?? 0;
    const val = node.feature === 0 ? x : y;
    return val <= node.threshold
      ? predictPoint(x, y, node.left, depth + 1, maxDepthLimit)
      : predictPoint(x, y, node.right, depth + 1, maxDepthLimit);
  }

  function reset(paramValues) {
    maxDepth = paramValues.maxDepth || 4;
    minSamples = paramValues.minSamples || 5;
    data = generateBlobs(paramValues.dataPoints || 40, [[0.3, 0.7], [0.7, 0.3]], paramValues.spread || 0.13);
    tree = null; treeBuilt = false; revealDepth = 0;
  }

  function step() {
    if (!treeBuilt) {
      tree = buildTree(data.points.map((_, i) => i), 0);
      treeBuilt = true;
      revealDepth = 0; // start with no reveal; animate via repeated step calls
    } else {
      // Each subsequent step reveals one more depth level
      revealDepth = Math.min(revealDepth + 1, treeDepth(tree));
    }
  }

  function render(renderer) {
    renderer.clear(); renderer.drawGrid(); renderer.drawAxes('Feature 1', 'Feature 2');
    if (treeBuilt && tree) {
      // Draw boundary and splits only up to revealDepth
      const effectiveDepth = revealDepth >= treeDepth(tree) ? 99 : revealDepth;
      renderer.drawDecisionBoundary((x, y) => predictPoint(x, y, tree, 0, effectiveDepth), 80);
      drawSplits(renderer, tree, 0, 1, 0, 1, 0, effectiveDepth);
    }
    renderer.drawPoints(data.points, data.labels, 5);
  }

  function drawSplits(renderer, node, xMin, xMax, yMin, yMax, depth = 0, maxReveal = 99) {
    if (!node || node.leaf || depth > maxReveal) return;
    const ctx = renderer.ctx;
    // Deeper splits appear more faint
    const alpha = Math.max(0.12, 0.4 - depth * 0.06);
    ctx.strokeStyle = `rgba(164, 230, 255, ${alpha})`; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
    if (node.feature === 0) {
      const [px, py0] = renderer.toPixel(node.threshold, yMin);
      const [, py1]   = renderer.toPixel(node.threshold, yMax);
      ctx.beginPath(); ctx.moveTo(px, py0); ctx.lineTo(px, py1); ctx.stroke();
      drawSplits(renderer, node.left,  xMin, node.threshold, yMin, yMax, depth + 1, maxReveal);
      drawSplits(renderer, node.right, node.threshold, xMax, yMin, yMax, depth + 1, maxReveal);
    } else {
      const [px0, py] = renderer.toPixel(xMin, node.threshold);
      const [px1]     = renderer.toPixel(xMax, node.threshold);
      ctx.beginPath(); ctx.moveTo(px0, py); ctx.lineTo(px1, py); ctx.stroke();
      drawSplits(renderer, node.left,  xMin, xMax, yMin, node.threshold, depth + 1, maxReveal);
      drawSplits(renderer, node.right, xMin, xMax, node.threshold, yMax, depth + 1, maxReveal);
    }
    ctx.setLineDash([]);
  }

  function countNodes(node) {
    if (!node) return 0;
    if (node.leaf) return 1;
    return 1 + countNodes(node.left) + countNodes(node.right);
  }

  function treeDepth(node) {
    if (!node || node.leaf) return 0;
    return 1 + Math.max(treeDepth(node.left), treeDepth(node.right));
  }

  // T06: Expose tree structure for the tree-renderer diagram
  function getTreeStructure() {
    return tree;
  }

  function getParamExplanation(paramKey, value) {
    const expl = {
      maxDepth: value <= 2
        ? '✓ Very shallow tree — simple rules, fast to explain. May underfit complex patterns.'
        : value <= 5
          ? '✓ Moderate depth — captures meaningful splits without excessive complexity.'
          : '⚠️ Deep tree — learns very detailed rules. High risk of overfitting on training data. Use with pruning.',
      minSamples: value <= 2
        ? '⚠️ Very small minimum — tree will split even tiny groups. May overfit noisy data.'
        : value <= 8
          ? '✓ Reasonable threshold — prevents overly specific splits while capturing real patterns.'
          : '✓ Conservative split — tree stays general and avoids noise. Good when data is limited.',
      dataPoints: `Using ${value} points per class (${value * 2} total). More samples give the tree more split candidates to evaluate.`,
      spread: value < 0.1
        ? '✓ Tight clusters — tree will find clean, axis-aligned splits easily.'
        : value < 0.18
          ? '✓ Moderate spread — realistic overlap near boundaries. Decision tree will use multiple splits.'
          : '⚠️ High spread — significant overlap. Deeper trees or different algorithms may perform better.',
    };
    return expl[paramKey] || '';
  }

  function computeClassMetrics() {
    if (!treeBuilt) return null;
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
      const prec = cm[c].tp / (cm[c].tp + (cm[c].fp||0) + 1e-9);
      const rec  = cm[c].tp / (cm[c].tp + cm[c].fn + 1e-9);
      f1Sum += (2 * prec * rec) / (prec + rec + 1e-9);
      precSum += prec; recSum += rec; n++;
    }
    return { precision: precSum/n, recall: recSum/n, f1: f1Sum/n };
  }

  function getConfusionMatrix() {
    if (!treeBuilt) return null;
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
    const actualDepth = tree ? treeDepth(tree) : 0;
    return {
      title: 'Decision Tree',
      currentStep: !treeBuilt ? 'Ready' : revealDepth >= actualDepth ? 'Tree Complete' : `Revealing Depth ${revealDepth}/${actualDepth}`,
      formula: `Gini = 1 - Σpᵢ²`,
      parameters: [
        { name: 'Max Depth',    value: maxDepth, color: 'primary' },
        { name: 'Min Samples',  value: minSamples, color: 'secondary' },
        { name: 'Nodes',        value: tree ? countNodes(tree) : '—', color: 'success' },
        { name: 'Actual Depth', value: tree ? actualDepth : '—', color: 'warning' },
      ],
      insight: !treeBuilt
        ? 'Press RUN to build the decision tree. Use Step to reveal splits level-by-level and watch how the tree partitions the space.'
        : revealDepth < actualDepth
          ? `Showing depth ${revealDepth} of ${actualDepth}. Press Step to reveal the next split level — watch how each boundary further refines the classification regions.`
          : `Tree complete with ${countNodes(tree)} nodes at depth ${actualDepth}. ${maxDepth > 6 ? 'Deep trees capture fine detail but risk memorising training data.' : 'Shallower trees generalise better to new data.'}`,
      theory: 'A Decision Tree splits data using axis-aligned boundaries. At each node, it picks the feature threshold that produces the purest child partitions (lowest Gini impurity). Simple to interpret — you can trace any prediction step by step.',
    };
  }

  function getMetrics() {
    if (!treeBuilt) return { 'Status': 'Run to see metrics' };
    let correct = 0;
    for (let i = 0; i < data.points.length; i++) {
      if (predictPoint(data.points[i][0], data.points[i][1]) === data.labels[i]) correct++;
    }
    const acc = correct / data.points.length;
    const cm = computeClassMetrics();
    return {
      'Accuracy':  (acc * 100).toFixed(1) + '%',
      'Precision': (cm.precision * 100).toFixed(1) + '%',
      'Recall':    (cm.recall * 100).toFixed(1) + '%',
      'F1 Score':  (cm.f1 * 100).toFixed(1) + '%',
      'Nodes':     countNodes(tree),
      'Tree Depth': treeDepth(tree),
    };
  }

  return {
    params,
    predict: (x, y) => predictPoint(x, y),
    step, reset, render, getExplanation, getMetrics, getConfusionMatrix, getParamExplanation,
    getTreeStructure,
    get data() { return data; },
    get revealDepth() { return revealDepth; },
    get converged() { return treeBuilt && revealDepth >= treeDepth(tree); },
  };
}
