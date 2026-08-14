// Minimal RFC4180-style CSV parser — handles quoted fields (with embedded
// commas and "" escaped quotes). Used at build time to turn the fictional
// sample CSVs in src/data/catalog-samples/ into preview tables; the site
// never parses untrusted/user-supplied CSV, so this stays intentionally small.
export interface ParsedCsv {
  headers: string[];
  rows: string[][];
}

function parseLine(line: string): string[] {
  const cells: string[] = [];
  let cell = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"') {
        if (line[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      cells.push(cell);
      cell = '';
    } else {
      cell += char;
    }
  }
  cells.push(cell);
  return cells;
}

export function parseCsv(raw: string): ParsedCsv {
  const lines = raw.trim().split(/\r?\n/);
  const [headerLine, ...rowLines] = lines;
  return {
    headers: parseLine(headerLine),
    rows: rowLines.map(parseLine),
  };
}
