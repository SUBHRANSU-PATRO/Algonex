// ═══════════════════════════════════════════════════
// K-Means Clustering Visualization
// ═══════════════════════════════════════════════════

import { generateBlobs, euclideanDistance } from '../utils/math-helpers.js';

export function createKMeans() {
  let data = { points: [], labels: [] };
  let centroids = [];
  let assignments = [];
  let iteration = 0;
  let converged = false;
  let k = 3;
  let centroidHistory = []; // [ [[cx,cy], ...], ... ] per iteration

  const params = {
    k: { value: 3, min: 2, max: 8, step: 1, label: 'Clusters (K)' },
    maxIterations: { value: 30, min: 5, max: 100, step: 5, label: 'Max Iterations' },
    dataPoints: { value: 50, min: 20, max: 100, step: 5, label: 'Points per Cluster' },
    spread: { value: 0.1, min: 0.04, max: 0.2, step: 0.01, label: 'Cluster Spread' },
  };

  function initCentroids() {
    centroids = [];
    const shuffled = [...data.points].sort(() => Math.random() - 0.5);
    for (let i = 0; i < k; i++) {
      centroids.push([...shuffled[i]]);
    }
    assignments = new Array(data.points.length).fill(0);
  }

  function assignStep() {
    let changed = false;
    for (let i = 0; i < data.points.length; i++) {
      let minDist = Infinity, minIdx = 0;
      for (let j = 0; j < centroids.length; j++) {
        const d = euclideanDistance(data.points[i], centroids[j]);
        if (d < minDist) { minDist = d; minIdx = j; }
      }
      if (assignments[i] !== minIdx) changed = true;
      assignments[i] = minIdx;
    }
    return changed;
  }

  function updateStep() {
    for (let j = 0; j < k; j++) {
      const cluster = data.points.filter((_, i) => assignments[i] === j);
      if (cluster.length > 0) {
        centroids[j] = [
          cluster.reduce((s, p) => s + p[0], 0) / cluster.length,
          cluster.reduce((s, p) => s + p[1], 0) / cluster.length,
        ];
      }
    }
  }

  function step() {
    if (converged) return;
    const changed = assignStep();
    updateStep();
    iteration++;
    // Record centroid positions for trail
    centroidHistory.push(centroids.map(c => [...c]));
    if (!changed) converged = true;
  }

  function reset(paramValues) {
    k = paramValues.k || 3;
    const n = paramValues.dataPoints || 50;
    const spread = paramValues.spread || 0.1;

    // Generate ground-truth blobs
    const centers = [];
    for (let i = 0; i < k; i++) {
      centers.push([0.15 + Math.random() * 0.7, 0.15 + Math.random() * 0.7]);
    }
    data = generateBlobs(n, centers, spread);
    iteration = 0;
    converged = false;
    centroidHistory = [];
    initCentroids();
  }

  function render(renderer) {
    renderer.clear();
    renderer.drawGrid();
    renderer.drawAxes('Dimension 1', 'Dimension 2');

    // Draw points with cluster colors
    renderer.drawPoints(data.points, assignments, 4);

    // Draw centroid trail paths
    const ctx = renderer.ctx;
    if (centroidHistory.length > 1) {
      for (let j = 0; j < k; j++) {
        const color = renderer.getColor(j);
        ctx.setLineDash([3, 4]);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = color + '50';
        ctx.beginPath();
        for (let t = 0; t < centroidHistory.length; t++) {
          const [px, py] = renderer.toPixel(centroidHistory[t][j][0], centroidHistory[t][j][1]);
          t === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        // Connect trail to current centroid
        const [cpx, cpy] = renderer.toPixel(centroids[j][0], centroids[j][1]);
        ctx.lineTo(cpx, cpy);
        ctx.stroke();
        ctx.setLineDash([]);
        // Draw small dots along trail
        for (let t = 0; t < centroidHistory.length; t++) {
          const [px, py] = renderer.toPixel(centroidHistory[t][j][0], centroidHistory[t][j][1]);
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = color + '60';
          ctx.fill();
        }
      }
    }

    // Draw centroids
    renderer.drawCentroids(centroids, 10);

    // Draw lines from points to centroids
    for (let i = 0; i < data.points.length; i++) {
      const [px, py] = renderer.toPixel(data.points[i][0], data.points[i][1]);
      const [cx, cy] = renderer.toPixel(centroids[assignments[i]][0], centroids[assignments[i]][1]);
      ctx.strokeStyle = renderer.getColor(assignments[i]) + '15';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(cx, cy);
      ctx.stroke();
    }
  }

  function inertia() {
    let total = 0;
    for (let i = 0; i < data.points.length; i++) {
      total += euclideanDistance(data.points[i], centroids[assignments[i]]) ** 2;
    }
    return total;
  }

  function getExplanation() {
    return {
      title: 'K-Means Clustering',
      currentStep: converged ? 'Converged' : `Iteration ${iteration}`,
      formula: `J = Σ||xᵢ - μₖ||²`,
      parameters: [
        { name: 'K', value: k, color: 'primary' },
        { name: 'Iteration', value: iteration, color: 'secondary' },
        { name: 'Inertia', value: iteration > 0 ? inertia().toFixed(4) : '—', color: converged ? 'success' : 'warning' },
      ],
      insight: converged
        ? `Converged after ${iteration} iterations! Centroids no longer move — each point is assigned to its nearest cluster center.`
        : iteration === 0
          ? 'Press RUN to start. Each step: (1) Assign points to nearest centroid, (2) Recompute centroid positions.'
          : 'Centroids are moving toward cluster centers. Watch the assignments shift as boundaries update.',
      theory: 'K-Means minimizes total within-cluster sum of squares (inertia). It alternates between assigning points to the nearest centroid and recalculating centroids as cluster means.',
    };
  }

  function getMetrics() {
    return {
      'K': k,
      'Iterations': iteration,
      'Inertia': iteration > 0 ? inertia().toFixed(4) : '—',
      'Converged': converged ? 'Yes' : 'No',
      'Points': data.points.length,
    };
  }

  function getConfusionMatrix() { return null; }

  return {
    params, predict: null, step, reset, render, getExplanation, getMetrics, getConfusionMatrix,
    get data() { return data; },
    get converged() { return converged; },
    get centroidHistory() { return centroidHistory; },
    get iteration() { return iteration; },
  };
}
