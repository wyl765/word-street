const fs = require('fs');
const path = require('path');

const dir = '/Users/percy/.openclaw/workspace/projects/word-street';

const audioIndex = JSON.parse(fs.readFileSync(path.join(dir, 'audio-index.json'), 'utf8'));

// Find all words in words-level*.js
let wordLevels = {};
const files = fs.readdirSync(dir).filter(f => f.startsWith('words-level') && f.endsWith('.js'));
for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const levelMatch = f.match(/words-level(.*?)\.js/);
  const level = levelMatch ? levelMatch[1] : 'unknown';
  
  // parse the object structure: module.exports = { "word": {...} }
  try {
      // Very hacky but fast:
      const matches = content.match(/"([^"]+)"\s*:\s*\{/g);
      if (matches) {
          matches.forEach(m => {
              const w = m.split('"')[1];
              wordLevels[w] = level;
          });
      }
  } catch (e) {
      console.error(e);
  }
}

const allWords = Object.keys(audioIndex.files);
let results = [];
let safeCount = 0;
let warnCount = 0;
let dangerCount = 0;
let dangerWords = [];

for (const word of allWords) {
  let fileInfo = audioIndex.files[word] || {};
  let source = fileInfo.source || 'unknown';
  let ipa = fileInfo.ipa || '/-/'; 
  
  let status = 'SAFE';
  let reason = '';
  let level = wordLevels[word] || 'X'; 

  if (!fileInfo.file) {
      status = 'DANGER';
      reason = '音频文件缺失';
  } else if (!fs.existsSync(path.join(dir, 'audio', fileInfo.file))) {
      status = 'DANGER';
      reason = '音频文件不存在';
  } else if (word.includes(' ') && source.includes('samantha')) {
      status = 'WARN';
      reason = '短语/复合结构，TTS可能断句或重音异常';
  } else if (source.includes('samantha')) {
      status = 'WARN';
      reason = 'IPA由在线ARPABET回退转换，建议人工抽检';
  }

  let line = '';
  if (status === 'SAFE') {
      safeCount++;
      line = `✅ ${word} — ${ipa} — ${source} — SAFE — level:${level}`;
  } else if (status === 'WARN') {
      warnCount++;
      line = `⚠️ ${word} — ${ipa} — ${source} — 🟡 WARN — ${reason} — level:${level}`;
  } else {
      dangerCount++;
      dangerWords.push(word);
      line = `🔴 ${word} — ${ipa} — ${source} — 🔴 DANGER — ${reason} — level:${level}`;
  }
  results.push(line);
}

const md = `# PRONUNCIATION AUDIT (GEMINI)

${results.join('\n')}

## 统计
- 总词数: ${allWords.length}
- SAFE: ${safeCount}
- WARN: ${warnCount}
- DANGER: ${dangerCount}

### DANGER词列表
${dangerWords.length > 0 ? dangerWords.map(w => '- ' + w).join('\n') : '无'}
`;

fs.writeFileSync(path.join(dir, 'PRONUNCIATION-AUDIT-GEMINI.md'), md);
console.log('Done.');
