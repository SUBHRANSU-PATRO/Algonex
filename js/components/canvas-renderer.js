// ═══════════════════════════════════════════════════
// Canvas Renderer — shared visualization helpers
// ═══════════════════════════════════════════════════

const COLORS = [
  '#00d1ff', // cyan
  '#d0bcff', // purple
  '#34d399', // green
  '#fbbf24', // yellow
  '#ffb4ab', // red-pink
  '#f9a1ff', // magenta
  '#4cd6ff', // light cyan
  '#ff6b6b', // red
];

const COLORS_TRANSLUCENT = COLORS.map(c => c + '40');

export class CanvasRenderer {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.padding = options.padding || 50;
    this.dpr = window.devicePixelRatio || 1;
    this.resize();
    this._resizeHandler = () => this.resize();
    window.addEventListener('resize', this._resizeHandler);
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  // Map data coordinates [0,1] to canvas pixel coordinates
  toPixel(x, y) {
    const px = this.padding + x * (this.width - 2 * this.padding);
    const py = (this.height - this.padding) - y * (this.height - 2 * this.padding);
    return [px, py];
  }

  // Map pixel coordinates to data coordinates [0,1]
  toData(px, py) {
    const x = (px - this.padding) / (this.width - 2 * this.padding);
    const y = ((this.height - this.padding) - py) / (this.height - 2 * this.padding);
    return [x, y];
  }

  drawGrid(gridColor = 'rgba(164, 230, 255, 0.04)') {
    const ctx = this.ctx;
    const steps = 10;
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const [x, y0] = this.toPixel(t, 0);
      const [, y1] = this.toPixel(t, 1);
      ctx.beginPath();
      ctx.moveTo(x, y0);
      ctx.lineTo(x, y1);
      ctx.stroke();

      const [x0, y] = this.toPixel(0, t);
      const [x1] = this.toPixel(1, t);
      ctx.beginPath();
      ctx.moveTo(x0, y);
      ctx.lineTo(x1, y);
      ctx.stroke();
    }
  }

  drawAxes(xLabel = 'X', yLabel = 'Y') {
    const ctx = this.ctx;
    ctx.strokeStyle = 'rgba(164, 230, 255, 0.15)';
    ctx.lineWidth = 1.5;

    // X axis
    const [x0, y0] = this.toPixel(0, 0);
    const [x1] = this.toPixel(1, 0);
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y0);
    ctx.stroke();

    // Y axis
    const [, y1] = this.toPixel(0, 1);
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x0, y1);
    ctx.stroke();

    // Labels
    ctx.fillStyle = 'rgba(164, 230, 255, 0.35)';
    ctx.font = '10px "Space Grotesk"';
    ctx.textAlign = 'center';
    ctx.fillText(xLabel.toUpperCase(), (x0 + x1) / 2, y0 + 30);

    ctx.save();
    ctx.translate(x0 - 30, (y0 + y1) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(yLabel.toUpperCase(), 0, 0);
    ctx.restore();

    // Tick marks
    ctx.fillStyle = 'rgba(164, 230, 255, 0.2)';
    ctx.font = '9px "Space Grotesk"';
    for (let i = 0; i <= 5; i++) {
      const t = i / 5;
      const [tx, ty] = this.toPixel(t, 0);
      ctx.textAlign = 'center';
      ctx.fillText(t.toFixed(1), tx, ty + 16);

      if (i > 0) {
        const [, ly] = this.toPixel(0, t);
        ctx.textAlign = 'right';
        ctx.fillText(t.toFixed(1), x0 - 8, ly + 4);
      }
    }
  }

  drawPoints(points, labels = null, radius = 4) {
    const ctx = this.ctx;

    points.forEach((pt, i) => {
      const [px, py] = this.toPixel(pt[0], pt[1]);
      const colorIdx = labels ? labels[i] : 0;
      const color = COLORS[colorIdx % COLORS.length];

      // Glow
      ctx.beginPath();
      ctx.arc(px, py, radius + 3, 0, Math.PI * 2);
      ctx.fillStyle = color + '20';
      ctx.fill();

      // Point
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });
  }

  drawLine(x1, y1, x2, y2, color = '#00d1ff', width = 2) {
    const ctx = this.ctx;
    const [px1, py1] = this.toPixel(x1, y1);
    const [px2, py2] = this.toPixel(x2, y2);

    // Glow
    ctx.strokeStyle = color + '40';
    ctx.lineWidth = width + 4;
    ctx.beginPath();
    ctx.moveTo(px1, py1);
    ctx.lineTo(px2, py2);
    ctx.stroke();

    // Line
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(px1, py1);
    ctx.lineTo(px2, py2);
    ctx.stroke();
  }

  drawDecisionBoundary(predictFn, resolution = 80) {
    const ctx = this.ctx;
    const w = this.width - 2 * this.padding;
    const h = this.height - 2 * this.padding;
    const cellW = w / resolution;
    const cellH = h / resolution;

    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        const x = i / resolution;
        const y = j / resolution;
        const cls = predictFn(x, y);
        const color = COLORS_TRANSLUCENT[cls % COLORS_TRANSLUCENT.length];
        const [px, py] = this.toPixel(x, y);
        ctx.fillStyle = color;
        ctx.fillRect(px - cellW / 2, py - cellH / 2, cellW + 0.5, cellH + 0.5);
      }
    }
  }

  drawCentroids(centroids, size = 10) {
    const ctx = this.ctx;
    centroids.forEach((c, i) => {
      const [px, py] = this.toPixel(c[0], c[1]);
      const color = COLORS[i % COLORS.length];

      // Glow ring
      ctx.beginPath();
      ctx.arc(px, py, size + 6, 0, Math.PI * 2);
      ctx.strokeStyle = color + '50';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Diamond shape
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = color;
      ctx.fillRect(-size / 2, -size / 2, size, size);
      ctx.restore();

      // Inner glow
      ctx.beginPath();
      ctx.arc(px, py, size / 2, 0, Math.PI * 2);
      ctx.fillStyle = color + '80';
      ctx.fill();
    });
  }

  getColor(index) {
    return COLORS[index % COLORS.length];
  }

  destroy() {
    window.removeEventListener('resize', this._resizeHandler);
  }
}
