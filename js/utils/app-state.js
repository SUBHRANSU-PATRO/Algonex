// ═══════════════════════════════════════════════════
// AppState — Global State Store
// Connects all pages: Playground → Preprocessing → Split → Workspace
// ═══════════════════════════════════════════════════

const _listeners = {};

export const AppState = {
  // Dataset (set by Playground or preloaded)
  dataset: null,         // { headers, rows, numericCols, name, meta }
  datasetName: null,     // e.g. 'Iris', 'Housing', 'user-upload.csv'

  // Preprocessing
  preprocessingDone: false,

  // Train-Test Split
  splitRatio: 0.8,
  trainData: null,       // { points, labels }
  testData: null,        // { points, labels }
  splitDone: false,

  // Active algorithm
  activeAlgo: null,

  // Subscribe to state changes
  on(event, fn) {
    if (!_listeners[event]) _listeners[event] = [];
    _listeners[event].push(fn);
  },

  // Emit state change
  emit(event, data) {
    if (_listeners[event]) _listeners[event].forEach(fn => fn(data));
  },

  // Set dataset and emit
  setDataset(dataset, name) {
    this.dataset = dataset;
    this.datasetName = name || 'Custom';
    this.preprocessingDone = false;
    this.splitDone = false;
    this.trainData = null;
    this.testData = null;
    this.emit('datasetChanged', { dataset, name });
  },

  // Set split and emit
  setSplit(ratio, trainData, testData) {
    this.splitRatio = ratio;
    this.trainData = trainData;
    this.testData = testData;
    this.splitDone = true;
    this.emit('splitChanged', { ratio, trainData, testData });
  },

  // Quick summary for navbar pill
  getSummary() {
    if (!this.datasetName) return null;
    const splitLabel = this.splitDone ? `${Math.round(this.splitRatio * 100)}/${Math.round((1 - this.splitRatio) * 100)}` : '—';
    return {
      name: this.datasetName,
      rows: this.dataset?.rows?.length || '—',
      split: splitLabel,
    };
  },

  // Reset all state
  clear() {
    this.dataset = null;
    this.datasetName = null;
    this.preprocessingDone = false;
    this.splitRatio = 0.8;
    this.trainData = null;
    this.testData = null;
    this.splitDone = false;
    this.activeAlgo = null;
    this.emit('cleared');
  },
};
