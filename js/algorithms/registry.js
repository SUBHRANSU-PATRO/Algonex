// ═══════════════════════════════════════════════════
// Algorithm Registry — central catalog
// ═══════════════════════════════════════════════════

export const ALGORITHMS = [
  {
    id: 'linear-regression',
    name: 'Linear Regression',
    category: 'Supervised Learning',
    difficulty: 'Beginner',
    icon: 'show_chart',
    description: 'Fit a line to data using gradient descent. Understand how weights and bias update to minimize the loss function.',
    formula: 'y = wx + b',
  },
  {
    id: 'knn',
    name: 'K-Nearest Neighbors',
    category: 'Supervised Learning',
    difficulty: 'Beginner',
    icon: 'hub',
    description: 'Classify points by majority vote of their K closest neighbors. Watch decision boundaries shift with K.',
    formula: 'd(p, q) = √Σ(pᵢ - qᵢ)²',
  },
  {
    id: 'decision-tree',
    name: 'Decision Tree',
    category: 'Supervised Learning',
    difficulty: 'Intermediate',
    icon: 'account_tree',
    description: 'Recursive binary splitting to create axis-aligned decision boundaries. Visualize tree growth in real time.',
    formula: 'Gini = 1 - Σpᵢ²',
  },
  {
    id: 'random-forest',
    name: 'Random Forest',
    category: 'Supervised Learning',
    difficulty: 'Advanced',
    icon: 'forest',
    description: 'Ensemble of Decision Trees trained on bootstrap samples. Combines multiple weak learners via majority voting.',
    formula: 'Ŷ = mode(T₁..Tₙ)',
  },
  {
    id: 'kmeans',
    name: 'K-Means Clustering',
    category: 'Unsupervised Learning',
    difficulty: 'Beginner',
    icon: 'scatter_plot',
    description: 'Partition data into K clusters by iteratively updating centroids. Watch clusters form step by step.',
    formula: 'J = Σ||xᵢ - μₖ||²',
  },
  {
    id: 'svm',
    name: 'Support Vector Machine',
    category: 'Supervised Learning',
    difficulty: 'Intermediate',
    icon: 'space_dashboard',
    description: 'Maximize the margin between classes using hinge loss gradient descent. Visualize margin lines, support vectors, and boundary evolution.',
    formula: 'max 2/||w||  s.t. yᵢ(w·x+b)≥1',
  },
  {
    id: 'neural-network',
    name: 'Neural Network',
    category: 'Deep Learning',
    difficulty: 'Advanced',
    icon: 'psychology',
    description: 'Simple multi-layer perceptron with forward pass and backpropagation. See weights and activations update live.',
    formula: 'z = σ(Wx + b)',
  },
];

export function getAlgorithmById(id) {
  return ALGORITHMS.find(a => a.id === id);
}
