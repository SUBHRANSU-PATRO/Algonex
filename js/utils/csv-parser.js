// ═══════════════════════════════════════════════════
// CSV Parser
// ═══════════════════════════════════════════════════

export function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return { headers: [], rows: [], numericCols: [] };

  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    if (values.length === headers.length) {
      const row = {};
      headers.forEach((h, j) => {
        const num = parseFloat(values[j]);
        row[h] = isNaN(num) ? values[j] : num;
      });
      rows.push(row);
    }
  }

  // Detect numeric columns
  const numericCols = headers.filter(h => {
    return rows.every(r => typeof r[h] === 'number' && !isNaN(r[h]));
  });

  return { headers, rows, numericCols };
}
