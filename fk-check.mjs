#!/usr/bin/env node
/**
 * FK Readability + Word Frequency checker for Word Street
 * Checks if definitions use words appropriate for the target level
 */
import fs from 'fs';
import path from 'path';

const DIR = path.dirname(new URL(import.meta.url).pathname);

// Flesch-Kincaid Grade Level formula
function syllableCount(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function fkGradeLevel(text) {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.split(/\s+/).filter(w => w.match(/[a-z]/i));
  if (sentences.length === 0 || words.length === 0) return 0;
  const totalSyllables = words.reduce((sum, w) => sum + syllableCount(w), 0);
  const avgWordsPerSentence = words.length / sentences.length;
  const avgSyllablesPerWord = totalSyllables / words.length;
  return 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;
}

// Grade 1-2 word list (common words a 7-8 year old knows)
// Used to check if definitions use words the child already knows
const GRADE_1_2_WORDS = new Set([
  'a','an','the','is','are','was','were','be','been','am',
  'i','you','he','she','it','we','they','me','him','her','us','them',
  'my','your','his','its','our','their','mine','yours',
  'this','that','these','those','what','which','who','when','where','how','why',
  'and','or','but','if','so','not','no','yes',
  'in','on','at','to','for','with','from','by','of','up','down','out','off',
  'can','will','do','did','does','has','have','had','may','must','should','would','could',
  'go','come','get','make','see','look','find','give','take','put','say','tell','ask',
  'know','think','want','like','love','need','use','try','help','let','start','stop',
  'big','small','little','good','bad','new','old','long','short','hot','cold',
  'happy','sad','fast','slow','hard','soft','high','low','light','dark',
  'one','two','three','four','five','six','seven','eight','nine','ten',
  'man','woman','boy','girl','child','people','person','friend','family',
  'day','night','time','year','today','now','then','here','there',
  'house','home','room','door','window','table','chair','bed','floor','wall',
  'water','food','eat','drink','sleep','walk','run','play','work','read','write',
  'very','much','many','some','all','more','most','other','same','different',
  'thing','way','place','part','side','end','back','hand','head','eye','face',
  'just','also','too','still','even','only','always','never','sometimes',
  'about','after','before','over','under','between','through','around','near','far',
  'because','than','while','until','since','during','without',
  'something','nothing','everything','someone','anyone','everyone',
  'again','away','together','enough','really','already','almost',
  'animal','bird','fish','dog','cat','tree','flower','sun','moon','star',
  'car','bus','book','ball','game','story','picture','song','color',
  'mother','father','brother','sister','baby','teacher','school','class',
]);

function checkDefinitionReadability(entries) {
  const issues = [];
  for (const e of entries) {
    const level = e.level || 0;
    const def = e.definition || '';
    const fk = fkGradeLevel(def);
    
    // FK grade should roughly match the level
    const maxFK = level <= 1 ? 4 : level <= 2 ? 5 : level <= 3 ? 7 : 9;
    
    if (fk > maxFK && def.split(/\s+/).length > 3) {
      issues.push({
        severity: fk > maxFK + 3 ? 'HIGH' : 'MEDIUM',
        file: e._file,
        word: e.word,
        level: level,
        fk: fk.toFixed(1),
        maxFK,
        detail: `FK grade ${fk.toFixed(1)} exceeds max ${maxFK} for Level ${level}`
      });
    }
    
    // For L1-L2, check if definition uses words outside Grade 1-2 vocabulary
    if (level <= 2) {
      const defWords = def.toLowerCase().split(/\s+/).map(w => w.replace(/[^a-z]/g, '')).filter(w => w.length > 2);
      const hardWords = defWords.filter(w => !GRADE_1_2_WORDS.has(w) && w.length > 4);
      if (hardWords.length > 0 && hardWords.length >= defWords.length * 0.3) {
        issues.push({
          severity: 'MEDIUM',
          file: e._file,
          word: e.word,
          level: level,
          detail: `L${level} definition uses hard words: ${hardWords.slice(0,5).join(', ')}`,
          fk: fk.toFixed(1)
        });
      }
    }
  }
  return issues;
}

// Load all entries
function loadWords() {
  const files = fs.readdirSync(DIR).filter(f => f.match(/^words-level.*\.js$/)).sort();
  const allEntries = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(DIR, file), 'utf8');
    const match = content.match(/\[(.+)\]/s);
    if (!match) continue;
    try {
      const arr = JSON.parse('[' + match[1] + ']');
      arr.forEach((entry, idx) => allEntries.push({ ...entry, _file: file, _line: idx + 1 }));
    } catch(e) {}
  }
  return allEntries;
}

const entries = loadWords();
console.log(`📖 FK Readability Check — ${entries.length} entries\n`);

const issues = checkDefinitionReadability(entries);
const high = issues.filter(i => i.severity === 'HIGH');
const medium = issues.filter(i => i.severity === 'MEDIUM');

console.log(`📊 Results: ${high.length} HIGH | ${medium.length} MEDIUM\n`);

if (high.length > 0) {
  console.log('🔴 HIGH (definition way too complex for level):');
  high.slice(0, 20).forEach(i => console.log(`  ${i.file} | ${i.word} (L${i.level}) | FK ${i.fk} > max ${i.maxFK}`));
  if (high.length > 20) console.log(`  ... and ${high.length - 20} more`);
}

if (medium.length > 0) {
  console.log('\n🟡 MEDIUM (definition uses hard words):');
  medium.slice(0, 20).forEach(i => console.log(`  ${i.file} | ${i.word} (L${i.level}) | ${i.detail}`));
  if (medium.length > 20) console.log(`  ... and ${medium.length - 20} more`);
}

// Save report
const report = `# FK Readability Report — ${new Date().toISOString().slice(0,10)}\n\nEntries: ${entries.length}\nHIGH: ${high.length} | MEDIUM: ${medium.length}\n\n## HIGH\n${high.map(i=>`- ${i.file} | ${i.word} (L${i.level}) | FK ${i.fk}`).join('\n')}\n\n## MEDIUM\n${medium.map(i=>`- ${i.file} | ${i.word} (L${i.level}) | ${i.detail}`).join('\n')}\n`;
fs.writeFileSync(path.join(DIR, `FK-REPORT-${new Date().toISOString().slice(0,10)}.md`), report);
console.log(`\n📝 Report saved.`);
