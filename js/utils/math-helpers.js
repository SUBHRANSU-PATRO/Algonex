// ═══════════════════════════════════════════════════
// Math Helpers for ML algorithms
// ═══════════════════════════════════════════════════

export function euclideanDistance(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += (a[i] - b[i]) ** 2;
  }
  return Math.sqrt(sum);
}

export function manhattanDistance(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += Math.abs(a[i] - b[i]);
  }
  return sum;
}

export function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

export function sigmoidDerivative(x) {
  const s = sigmoid(x);
  return s * (1 - s);
}

export function relu(x) {
  return Math.max(0, x);
}

export function reluDerivative(x) {
  return x > 0 ? 1 : 0;
}

export function tanh(x) {
  return Math.tanh(x);
}

export function tanhDerivative(x) {
  const t = Math.tanh(x);
  return 1 - t * t;
}

export function softmax(arr) {
  const max = Math.max(...arr);
  const exps = arr.map(x => Math.exp(x - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map(e => e / sum);
}

export function meanSquaredError(predictions, targets) {
  let sum = 0;
  for (let i = 0; i < predictions.length; i++) {
    sum += (predictions[i] - targets[i]) ** 2;
  }
  return sum / predictions.length;
}

export function normalize(data) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  return data.map(v => (v - min) / range);
}

export function normalize2D(points) {
  const xs = points.map(p => p[0]);
  const ys = points.map(p => p[1]);
  const xMin = Math.min(...xs), xMax = Math.max(...xs);
  const yMin = Math.min(...ys), yMax = Math.max(...ys);
  const xRange = xMax - xMin || 1;
  const yRange = yMax - yMin || 1;
  return points.map(p => [(p[0] - xMin) / xRange, (p[1] - yMin) / yRange]);
}

export function randomGaussian(mean = 0, stddev = 1) {
  const u1 = Math.random();
  const u2 = Math.random();
  return mean + stddev * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

export function generateBlobs(nPerCluster, centers, spread = 0.1) {
  const points = [];
  const labels = [];
  centers.forEach((center, idx) => {
    for (let i = 0; i < nPerCluster; i++) {
      points.push([
        center[0] + randomGaussian(0, spread),
        center[1] + randomGaussian(0, spread),
      ]);
      labels.push(idx);
    }
  });
  return { points, labels };
}

export function generateLinearData(n, slope = 1.5, intercept = 0.2, noise = 0.15) {
  const points = [];
  for (let i = 0; i < n; i++) {
    const x = Math.random();
    const y = slope * x + intercept + randomGaussian(0, noise);
    points.push([x, y]);
  }
  return points;
}

export function generateCircleData(nPerClass, noise = 0.05) {
  const points = [];
  const labels = [];
  for (let i = 0; i < nPerClass; i++) {
    const angle = Math.random() * 2 * Math.PI;
    points.push([
      0.5 + 0.2 * Math.cos(angle) + randomGaussian(0, noise),
      0.5 + 0.2 * Math.sin(angle) + randomGaussian(0, noise),
    ]);
    labels.push(0);
  }
  for (let i = 0; i < nPerClass; i++) {
    const angle = Math.random() * 2 * Math.PI;
    points.push([
      0.5 + 0.45 * Math.cos(angle) + randomGaussian(0, noise),
      0.5 + 0.45 * Math.sin(angle) + randomGaussian(0, noise),
    ]);
    labels.push(1);
  }
  return { points, labels };
}

export function generateMoonsData(nPerClass, noise = 0.08) {
  const points = [];
  const labels = [];
  for (let i = 0; i < nPerClass; i++) {
    const angle = Math.PI * (i / nPerClass);
    points.push([
      0.3 + 0.3 * Math.cos(angle) + randomGaussian(0, noise),
      0.4 + 0.3 * Math.sin(angle) + randomGaussian(0, noise),
    ]);
    labels.push(0);
    points.push([
      0.7 - 0.3 * Math.cos(angle) + randomGaussian(0, noise),
      0.6 - 0.3 * Math.sin(angle) + randomGaussian(0, noise),
    ]);
    labels.push(1);
  }
  return { points, labels };
}

export function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function argmax(arr) {
  let maxIdx = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[maxIdx]) maxIdx = i;
  }
  return maxIdx;
}

export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function mapRange(value, inMin, inMax, outMin, outMax) {
  return outMin + (value - inMin) * (outMax - outMin) / (inMax - inMin);
}
