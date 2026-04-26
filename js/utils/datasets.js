// ═══════════════════════════════════════════════════
// Preloaded Datasets
// ═══════════════════════════════════════════════════

export const PRELOADED_DATASETS = [
  {
    id: 'iris',
    name: 'Iris',
    description: 'Classic multiclass classification dataset with 3 species of flowers.',
    rows: 150,
    features: 4,
    icon: 'local_florist',
    color: 'var(--primary)',
  },
  {
    id: 'housing',
    name: 'Housing Prices',
    description: 'Predict house prices based on features like area, rooms, and location.',
    rows: 506,
    features: 13,
    icon: 'home',
    color: 'var(--secondary)',
  },
  {
    id: 'titanic',
    name: 'Titanic',
    description: 'Binary classification — predict survival based on passenger data.',
    rows: 891,
    features: 7,
    icon: 'sailing',
    color: 'var(--tertiary)',
  },
  {
    id: 'diabetes',
    name: 'Diabetes',
    description: 'Pima Indians binary classification — predict diabetes onset from health indicators.',
    rows: 768,
    features: 8,
    icon: 'medical_information',
    color: 'var(--error)',
  },
  {
    id: 'synthetic',
    name: 'Synthetic 2D',
    description: 'Configurable blob clusters for visualization. Choose classes, points, and spread.',
    rows: '~100',
    features: 2,
    icon: 'scatter_plot',
    color: 'var(--success)',
  },
];

// Simplified iris subset (sepal length, sepal width) for 2D visualization
export function getIrisData() {
  const data = {
    points: [
      [0.22,0.63],[0.17,0.42],[0.11,0.50],[0.08,0.46],[0.19,0.67],
      [0.31,0.79],[0.08,0.58],[0.19,0.58],[0.03,0.38],[0.17,0.46],
      [0.31,0.71],[0.14,0.58],[0.14,0.42],[0.00,0.42],[0.42,0.83],
      [0.39,0.92],[0.31,0.79],[0.22,0.63],[0.39,0.75],[0.22,0.75],
      [0.31,0.58],[0.22,0.71],[0.08,0.67],[0.22,0.54],[0.14,0.58],
      [0.19,0.42],[0.19,0.58],[0.25,0.63],[0.25,0.58],[0.11,0.50],
      [0.14,0.46],[0.31,0.58],[0.25,0.88],[0.33,0.92],[0.17,0.46],
      [0.19,0.50],[0.33,0.63],[0.17,0.63],[0.03,0.42],[0.22,0.58],
      [0.19,0.63],[0.06,0.21],[0.03,0.50],[0.19,0.63],[0.22,0.75],
      [0.14,0.42],[0.22,0.75],[0.08,0.50],[0.28,0.71],[0.19,0.54],
      [0.75,0.50],[0.58,0.50],[0.72,0.46],[0.33,0.13],[0.61,0.29],
      [0.39,0.33],[0.56,0.54],[0.17,0.13],[0.64,0.33],[0.25,0.25],
      [0.19,0.00],[0.44,0.42],[0.47,0.08],[0.50,0.38],[0.36,0.33],
      [0.67,0.46],[0.36,0.42],[0.42,0.21],[0.53,0.17],[0.36,0.21],
      [0.44,0.50],[0.50,0.33],[0.56,0.21],[0.50,0.33],[0.56,0.38],
      [0.64,0.42],[0.69,0.33],[0.67,0.42],[0.47,0.38],[0.39,0.21],
      [0.33,0.17],[0.33,0.13],[0.42,0.29],[0.47,0.58],[0.31,0.42],
      [0.47,0.58],[0.67,0.46],[0.56,0.13],[0.36,0.42],[0.33,0.21],
      [0.33,0.25],[0.50,0.42],[0.42,0.25],[0.17,0.17],[0.36,0.29],
      [0.39,0.42],[0.39,0.38],[0.53,0.38],[0.22,0.21],[0.39,0.33],
      [0.56,0.54],[0.42,0.33],[0.78,0.54],[0.56,0.38],[0.61,0.42],
      [0.92,0.42],[0.17,0.21],[0.83,0.38],[0.67,0.21],[0.81,0.67],
      [0.61,0.50],[0.58,0.38],[0.69,0.33],[0.42,0.21],[0.53,0.33],
      [0.58,0.50],[0.61,0.42],[1.00,0.75],[1.00,0.33],[0.44,0.08],
      [0.72,0.50],[0.39,0.33],[0.78,0.42],[0.53,0.17],[0.69,0.58],
      [0.72,0.46],[0.44,0.29],[0.50,0.42],[0.56,0.33],[0.69,0.58],
      [0.56,0.54],[0.58,0.38],[0.64,0.42],[0.75,0.25],[0.81,0.58],
      [0.89,0.42],[0.64,0.50],[0.53,0.21],[0.56,0.54],[0.78,0.54],
      [0.50,0.38],[0.61,0.42],[0.58,0.46],[0.72,1.00],[0.56,0.38],
      [0.58,0.50],[0.56,0.42],[0.61,0.42],[0.53,0.58],[0.61,0.46],
    ],
    labels: [
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
      2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
    ],
    classNames: ['Setosa', 'Versicolor', 'Virginica'],
  };
  return data;
}

export function getHousingData() {
  // Simplified 2D: area vs price
  const points = [];
  for (let i = 0; i < 80; i++) {
    const area = 0.1 + Math.random() * 0.8;
    const price = 0.15 + area * 0.65 + (Math.random() - 0.5) * 0.15;
    points.push([area, Math.max(0.05, Math.min(0.95, price))]);
  }
  return { points, labels: null };
}

export function getTitanicData() {
  // Simplified 2D: age vs fare, label = survived
  const points = [];
  const labels = [];
  for (let i = 0; i < 100; i++) {
    const age = Math.random();
    const fare = Math.random();
    const survived = (fare > 0.5 && age < 0.6) || (fare > 0.7) ? 1 : 0;
    points.push([age, fare + (Math.random() - 0.5) * 0.15]);
    labels.push(survived);
  }
  return { points, labels, classNames: ['Died', 'Survived'] };
}

export function getDiabetesData() {
  // Simplified 2D Pima Indians: glucose vs BMI, label = diabetic
  const points = [];
  const labels = [];
  for (let i = 0; i < 120; i++) {
    const glucose = 0.1 + Math.random() * 0.8;
    const bmi = 0.1 + Math.random() * 0.8;
    const diabetic = (glucose > 0.55 && bmi > 0.45) || (glucose > 0.7 && bmi > 0.3) ? 1 : 0;
    const noise = (Math.random() - 0.5) * 0.1;
    points.push([glucose + noise * 0.5, bmi + noise * 0.5]);
    labels.push(diabetic);
  }
  return { points, labels, classNames: ['Healthy', 'Diabetic'] };
}

export function getSyntheticData(nClasses = 3, pointsPerClass = 30, spread = 0.1) {
  // Generate configurable 2D blob clusters
  const centers = [];
  for (let c = 0; c < nClasses; c++) {
    centers.push([0.15 + Math.random() * 0.7, 0.15 + Math.random() * 0.7]);
  }
  const points = [];
  const labels = [];
  for (let c = 0; c < nClasses; c++) {
    for (let i = 0; i < pointsPerClass; i++) {
      const x = centers[c][0] + (Math.random() - 0.5) * spread * 2;
      const y = centers[c][1] + (Math.random() - 0.5) * spread * 2;
      points.push([Math.max(0.02, Math.min(0.98, x)), Math.max(0.02, Math.min(0.98, y))]);
      labels.push(c);
    }
  }
  const classNames = Array.from({ length: nClasses }, (_, i) => `Class ${i}`);
  return { points, labels, classNames };
}

