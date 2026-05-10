// Helper: parse word bank JS file to JSON
// Usage: node parse-words.cjs words-level1.js
const fs = require('fs');
const path = require('path');
const filePath = process.argv[2];
const src = fs.readFileSync(filePath, 'utf-8');
const m = src.match(/=\s*(\[[\s\S]*)/);
if (!m) { process.exit(1); }
let s = m[1];
// Find matching ] accounting for strings
let i = 0, depth = 0, inStr = false, esc = false;
for (; i < s.length; i++) {
  if (esc) { esc = false; continue; }
  if (s[i] === '\\') { esc = true; continue; }
  if (s[i] === '"' && !inStr) { inStr = true; continue; }
  if (s[i] === '"' && inStr) { inStr = false; continue; }
  if (!inStr && s[i] === '[') depth++;
  if (!inStr && s[i] === ']') { depth--; if (depth === 0) { i++; break; } }
}
process.stdout.write(s.slice(0, i));
