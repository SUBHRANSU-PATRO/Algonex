// ═══════════════════════════════════════════════════
// Random Forest Visualization
// ═══════════════════════════════════════════════════

import { generateBlobs, euclideanDistance } from '../utils/math-helpers.js';

export function createRandomForest() {
  let data = { points: [], labels: [] };
  let trees = [];
  let nTrees = 5;
  let maxDepth = 4;
  let minSamples = 5;
  let bootstrapRatio = 0.8;
  let currentTreeIdx = 0;
  let forestBuilt = false;
  let buildingAnimation = false;

  const params = {
    nTrees: { value: 5, min: 3, max: 15, step: 1, label: 'Number of Trees' },
    maxDepth: { value: 4, min: 1, max: 8, step: 1, label: 'Max Depth' },
    minSamples: { value: 5, min: 2, max: 15, step: 1, label: 'Min Samples Split' },
    dataPoints: { value: 40, min: 15, max: 80, step: 5, label: 'Points per Class' },
    spread: { value: 0.13, min: 0.05, max: 0.25, step: 0.01, label: 'Cluster Spread' },
  };

  // ── Decision Tree helpers ──
  function giniImpurity(labels) {
    const counts = {};
    for (const l of labels) counts[l] = (counts[l] || 0) + 1;
    let imp = 1;
    for (const c in counts) {
      const p = counts[c] / labels.length;
      imp -= p * p;
    }
    return imp;
  }

  function majorityClass(labels) {
    const counts = {};
    for (const l of labels) counts[l] = (counts[l] || 0) + 1;
    let best = labels[0], bestCount = 0;
    for (const [l, c] of Object.entries(counts)) {
      if (c > bestCount) { best = parseInt(l); bestCount = c; }
    }
    return best;
  }

  function buildTree(points, labels, indices, depth) {
    const lbls = indices.map(i => labels[i]);
    if (depth >= maxDepth || indices.length < minSamples || giniImpurity(lbls) === 0) {
      return { leaf: true, prediction: majorityClass(lbls), samples: indices.length };
    }

    let bestFeature = 0, bestThreshold = 0.5, bestGini = Infinity;
    let bestLeftIdx = [], bestRightIdx = [];

    // Random feature subset (sqrt of features)
    const features = [0, 1];
    const featureSubset = Math.random() > 0.5 ? [0, 1] : [features[Math.floor(Math.random() * 2)]];

    for (const feature of featureSubset) {
      const values = indices.map(i => points[i][feature]).sort((a, b) => a - b);
      const thresholds = [];
      for (let i = 1; i < values.length; i++) {
        if (values[i] !== values[i - 1]) {
          thresholds.push((values[i] + values[i - 1]) / 2);
        }
      }

      for (const thresh of thresholds) {
        const leftIdx = indices.filter(i => points[i][feature] <= thresh);
        const rightIdx = indices.filter(i => points[i][feature] > thresh);
        if (leftIdx.length === 0 || rightIdx.length === 0) continue;

        const leftLabels = leftIdx.map(i => labels[i]);
        const rightLabels = rightIdx.map(i => labels[i]);
        const gini = (leftIdx.length * giniImpurity(leftLabels) + rightIdx.length * giniImpurity(rightLabels)) / indices.length;

        if (gini < bestGini) {
          bestGini = gini;
          bestFeature = feature;
          bestThreshold = thresh;
          bestLeftIdx = leftIdx;
          bestRightIdx = rightIdx;
        }
      }
    }

    if (bestLeftIdx.length === 0 || bestRightIdx.length === 0) {
      return { leaf: true, prediction: majorityClass(lbls), samples: indices.length };
    }

    return {
      leaf: false,
      feature: bestFeature,
      threshold: bestThreshold,
      gini: bestGini,
      samples: indices.length,
      left: buildTree(points, labels, bestLeftIdx, depth + 1),
      right: buildTree(points, labels, bestRightIdx, depth + 1),
    };
  }

  function predictWithTree(tree, x, y) {
    if (!tree) return 0;
    if (tree.leaf) return tree.prediction;
    const val = tree.feature === 0 ? x : y;
    return val <= tree.threshold
      ? predictWithTree(tree.left, x, y)
      : predictWithTree(tree.right, x, y);
  }

  function bootstrapSample(indices) {
    const n = Math.floor(indices.length * bootstrapRatio);
    const sample = [];
    for (let i = 0; i < n; i++) {
      sample.push(indices[Math.floor(Math.random() * indices.length)]);
    }
    return sample;
  }

  // ── Ensemble prediction: majority vote ──
  function predictPoint(x, y) {
    if (trees.length === 0) return 0;
    const activeTrees = trees.slice(0, currentTreeIdx + 1);
    const votes = {};
    for (const tree of activeTrees) {
      const pred = predictWithTree(tree.root, x, y);
      votes[pred] = (votes[pred] || 0) + 1;
    }
    let best = 0, bestCount = 0;
    for (const [label, count] of Object.entries(votes)) {
      if (count > bestCount) { best = parseInt(label); bestCount = count; }
    }
    return best;
  }

  function getVotesForPoint(x, y) {
    const activeTrees = trees.slice(0, currentTreeIdx + 1);
    return activeTrees.map((tree, i) => ({
      treeIndex: i,
      prediction: predictWithTree(tree.root, x, y),
    }));
  }

  function reset(paramValues) {
    nTrees = paramValues.nTrees || 5;
    maxDepth = paramValues.maxDepth || 4;
    minSamples = paramValues.minSamples || 5;
    const n = paramValues.dataPoints || 40;
    const spread = paramValues.spread || 0.13;
    data = generateBlobs(n, [[0.3, 0.7], [0.7, 0.3]], spread);
    trees = [];
    currentTreeIdx = 0;
    forestBuilt = false;
    buildingAnimation = false;
  }

  function step() {
    if (forestBuilt && currentTreeIdx >= trees.length - 1) return;

    if (trees.length === 0) {
      // Build all trees
      const allIndices = data.points.map((_, i) => i);
      for (let t = 0; t < nTrees; t++) {
        const sample = bootstrapSample(allIndices);
        const oob = allIndices.filter(i => !sample.includes(i));
        const root = buildTree(data.points, data.labels, sample, 0);
        trees.push({ root, bootstrapIndices: sample, oobIndices: oob });
      }
      currentTreeIdx = 0;
      buildingAnimation = true;
    } else if (currentTreeIdx < trees.length - 1) {
      currentTreeIdx++;
    }

    if (currentTreeIdx >= trees.length - 1) {
      forestBuilt = true;
      buildingAnimation = false;
    }
  }

  function render(renderer) {
    renderer.clear();
    renderer.drawGrid();
    renderer.drawAxes('Feature 1', 'Feature 2');

    // Draw ensemble decision boundary if trees exist
    if (trees.length > 0) {
      renderer.drawDecisionBoundary((x, y) => predictPoint(x, y), 60);
    }

    // Draw data points
    renderer.drawPoints(data.points, data.labels, 5);

    // Draw voting panel overlay
    if (trees.length > 0) {
      drawForestOverlay(renderer);
    }
  }

  function drawForestOverlay(renderer) {
    const ctx = renderer.ctx;
    const w = renderer.width;

    const boxW = 180;
    const boxH = Math.min(30 + trees.length * 28, 260);
    const boxX = w - boxW - 16;
    const boxY = 16;

    ctx.fillStyle = 'rgba(11, 19, 38, 0.88)';
    ctx.strokeStyle = 'rgba(164, 230, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = 'rgba(164, 230, 255, 0.5)';
    ctx.font = '9px "Space Grotesk"';
    ctx.textAlign = 'center';
    ctx.fillText('RANDOM FOREST ENSEMBLE', boxX + boxW / 2, boxY + 16);

    // Query point = center of data
    const qx = 0.5, qy = 0.5;
    const colors = ['#00d1ff', '#d0bcff', '#34d399', '#fbbf24'];

    for (let t = 0; t < trees.length; t++) {
      const y = boxY + 28 + t * 25;
      const isActive = t <= currentTreeIdx;
      const pred = predictWithTree(trees[t].root, qx, qy);

      // Tree indicator
      ctx.fillStyle = isActive ? 'rgba(164, 230, 255, 0.9)' : 'rgba(164, 230, 255, 0.2)';
      ctx.font = '10px "Space Grotesk"';
      ctx.textAlign = 'left';
      ctx.fillText(`Tree ${t + 1}`, boxX + 12, y + 4);

      if (isActive) {
        // Prediction badge
        const badgeColor = colors[pred % colors.length];
        ctx.fillStyle = badgeColor + '30';
        ctx.beginPath();
        ctx.roundRect(boxX + boxW - 60, y - 8, 44, 18, 4);
        ctx.fill();
        ctx.fillStyle = badgeColor;
        ctx.font = '9px "Space Grotesk"';
        ctx.textAlign = 'center';
        ctx.fillText(`Class ${pred}`, boxX + boxW - 38, y + 4);
      } else {
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.font = '9px "Space Grotesk"';
        ctx.textAlign = 'center';
        ctx.fillText('—', boxX + boxW - 38, y + 4);
      }

      // Progress bar
      ctx.fillStyle = isActive ? 'rgba(52, 211, 153, 0.3)' : 'rgba(255,255,255,0.05)';
      ctx.fillRect(boxX + 60, y - 4, 60, 6);
      if (isActive) {
        ctx.fillStyle = 'rgba(52, 211, 153, 0.8)';
        ctx.fillRect(boxX + 60, y - 4, 60, 6);
      }
    }
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

  function computeOOBAccuracy() {
    if (trees.length === 0) return 0;
    let correct = 0, total = 0;
    for (let i = 0; i < data.points.length; i++) {
      const oobTrees = trees.filter(t => t.oobIndices.includes(i));
      if (oobTrees.length === 0) continue;
      const votes = {};
      for (const t of oobTrees) {
        const pred = predictWithTree(t.root, data.points[i][0], data.points[i][1]);
        votes[pred] = (votes[pred] || 0) + 1;
      }
      let best = 0, bestCount = 0;
      for (const [l, c] of Object.entries(votes)) {
        if (c > bestCount) { best = parseInt(l); bestCount = c; }
      }
      if (best === data.labels[i]) correct++;
      total++;
    }
    return total > 0 ? correct / total : 0;
  }

  function getParamExplanation(paramKey, value) {
    const explanations = {
      nTrees: value <= 3
        ? 'Few trees — the ensemble may not capture data diversity well. Variance remains high.'
        : value <= 8
          ? 'Moderate ensemble size — good balance between performance and computation.'
          : 'Large forest — predictions become more stable, but computation increases.',
      maxDepth: value <= 2
        ? 'Shallow trees — simpler base learners. May underfit individually but ensemble compensates.'
        : value <= 5
          ? 'Moderate depth — each tree captures reasonable detail.'
          : 'Deep trees — each tree is complex. Risk of individual overfitting but ensemble averaging helps.',
      minSamples: value <= 3
        ? 'Small split threshold — trees can fit very small groups, capturing fine detail.'
        : value <= 10
          ? 'Balanced split threshold — prevents overly specific splits.'
          : 'Large split threshold — conservative splitting, simpler trees.',
      dataPoints: `Using ${value} points per class for a total of ${value * 2} training samples.`,
      spread: value < 0.1
        ? 'Low spread — clusters are tight and well-separated. Easier to classify.'
        : value < 0.18
          ? 'Moderate spread — some class overlap near boundaries.'
          : 'High spread — significant class overlap. Tests the ensemble\'s ability to handle noise.',
    };
    return explanations[paramKey] || '';
  }

  function getExplanation() {
    const totalNodes = trees.reduce((s, t) => s + countNodes(t.root), 0);
    const avgDepth = trees.length > 0 ? (trees.reduce((s, t) => s + treeDepth(t.root), 0) / trees.length).toFixed(1) : '—';

    return {
      title: 'Random Forest',
      currentStep: forestBuilt ? 'Forest Complete' : trees.length > 0 ? `Building Tree ${currentTreeIdx + 1}/${nTrees}` : 'Ready',
      formula: `Ŷ = mode(T₁(x), T₂(x), ..., Tₙ(x))`,
      parameters: [
        { name: 'Trees Built', value: `${Math.min(currentTreeIdx + 1, trees.length)}/${nTrees}`, color: 'primary' },
        { name: 'Total Nodes', value: totalNodes || '—', color: 'secondary' },
        { name: 'Avg Depth', value: avgDepth, color: 'success' },
        { name: 'OOB Accuracy', value: forestBuilt ? (computeOOBAccuracy() * 100).toFixed(1) + '%' : '—', color: 'warning' },
      ],
      insight: !trees.length
        ? 'Press RUN to build the forest. Each tree trains on a random bootstrap sample. Step through to watch trees added one by one.'
        : forestBuilt
          ? `Forest complete with ${nTrees} trees (${totalNodes} total nodes). Each tree votes on the class. The majority vote determines the ensemble prediction. OOB accuracy shows generalization.`
          : `Building tree ${currentTreeIdx + 1} of ${nTrees}. Each tree sees a different bootstrap sample and random feature subset, creating diversity in the ensemble.`,
      theory: 'Random Forest combines multiple Decision Trees trained on bootstrap samples with random feature subsets. This bagging approach reduces variance while maintaining low bias. The ensemble prediction is the majority vote across all trees.',
    };
  }

  function getMetrics() {
    if (trees.length === 0) return { 'Status': 'Not trained' };

    let correct = 0;
    for (let i = 0; i < data.points.length; i++) {
      if (predictPoint(data.points[i][0], data.points[i][1]) === data.labels[i]) correct++;
    }
    const acc = correct / data.points.length;

    // Compute per-class precision, recall, F1
    const classes = [...new Set(data.labels)];
    const confMatrix = {};
    for (const c of classes) confMatrix[c] = { tp: 0, fp: 0, fn: 0 };

    for (let i = 0; i < data.points.length; i++) {
      const pred = predictPoint(data.points[i][0], data.points[i][1]);
      const actual = data.labels[i];
      if (pred === actual) {
        confMatrix[actual].tp++;
      } else {
        confMatrix[pred].fp++;
        confMatrix[actual].fn++;
      }
    }

    let precSum = 0, recSum = 0, f1Sum = 0;
    for (const c of classes) {
      const prec = confMatrix[c].tp / (confMatrix[c].tp + confMatrix[c].fp || 1);
      const rec = confMatrix[c].tp / (confMatrix[c].tp + confMatrix[c].fn || 1);
      precSum += prec;
      recSum += rec;
      f1Sum += (2 * prec * rec) / (prec + rec || 1);
    }

    return {
      'Accuracy': (acc * 100).toFixed(1) + '%',
      'Precision': (precSum / classes.length * 100).toFixed(1) + '%',
      'Recall': (recSum / classes.length * 100).toFixed(1) + '%',
      'F1 Score': (f1Sum / classes.length * 100).toFixed(1) + '%',
      'Trees': `${Math.min(currentTreeIdx + 1, trees.length)}/${nTrees}`,
      'OOB Acc': forestBuilt ? (computeOOBAccuracy() * 100).toFixed(1) + '%' : '—',
    };
  }

  return {
    params,
    predict: predictPoint,
    step,
    reset,
    render,
    getExplanation,
    getMetrics,
    getParamExplanation,
    getVotesForPoint,
    get data() { return data; },
    get epoch() { return currentTreeIdx; },
    get converged() { return forestBuilt; },
  };
}
