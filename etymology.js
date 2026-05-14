/**
 * Word Street — Etymology / Word Roots Engine
 * Provides root/prefix/suffix breakdown for vocabulary words.
 * Data is generated offline and loaded as a static JSON.
 */
(function() {
  'use strict';

  // Common prefixes with meanings
  const PREFIXES = {
    'a-': { meaning: 'not, without', origin: 'Greek' },
    'ab-': { meaning: 'away from', origin: 'Latin' },
    'ad-': { meaning: 'toward, to', origin: 'Latin' },
    'ambi-': { meaning: 'both', origin: 'Latin' },
    'ante-': { meaning: 'before', origin: 'Latin' },
    'anti-': { meaning: 'against', origin: 'Greek' },
    'auto-': { meaning: 'self', origin: 'Greek' },
    'bene-': { meaning: 'good, well', origin: 'Latin' },
    'bi-': { meaning: 'two', origin: 'Latin' },
    'circum-': { meaning: 'around', origin: 'Latin' },
    'co-': { meaning: 'together, with', origin: 'Latin' },
    'com-': { meaning: 'together, with', origin: 'Latin' },
    'con-': { meaning: 'together, with', origin: 'Latin' },
    'contra-': { meaning: 'against', origin: 'Latin' },
    'counter-': { meaning: 'against, opposite', origin: 'Latin' },
    'de-': { meaning: 'down, away, reverse', origin: 'Latin' },
    'dis-': { meaning: 'not, apart', origin: 'Latin' },
    'en-': { meaning: 'put into, cause', origin: 'Latin/French' },
    'em-': { meaning: 'put into, cause', origin: 'Latin/French' },
    'epi-': { meaning: 'upon, over', origin: 'Greek' },
    'ex-': { meaning: 'out of, former', origin: 'Latin' },
    'extra-': { meaning: 'beyond', origin: 'Latin' },
    'fore-': { meaning: 'before', origin: 'Old English' },
    'hyper-': { meaning: 'over, excessive', origin: 'Greek' },
    'hypo-': { meaning: 'under, below', origin: 'Greek' },
    'il-': { meaning: 'not', origin: 'Latin' },
    'im-': { meaning: 'not, into', origin: 'Latin' },
    'in-': { meaning: 'not, into', origin: 'Latin' },
    'inter-': { meaning: 'between, among', origin: 'Latin' },
    'intra-': { meaning: 'within', origin: 'Latin' },
    'ir-': { meaning: 'not', origin: 'Latin' },
    'macro-': { meaning: 'large', origin: 'Greek' },
    'mal-': { meaning: 'bad, wrongly', origin: 'Latin' },
    'micro-': { meaning: 'small', origin: 'Greek' },
    'mid-': { meaning: 'middle', origin: 'Old English' },
    'mis-': { meaning: 'wrongly, badly', origin: 'Old English' },
    'mono-': { meaning: 'one, single', origin: 'Greek' },
    'multi-': { meaning: 'many', origin: 'Latin' },
    'neo-': { meaning: 'new', origin: 'Greek' },
    'non-': { meaning: 'not', origin: 'Latin' },
    'ob-': { meaning: 'against, toward', origin: 'Latin' },
    'omni-': { meaning: 'all', origin: 'Latin' },
    'out-': { meaning: 'surpassing, external', origin: 'Old English' },
    'over-': { meaning: 'excessive, above', origin: 'Old English' },
    'pan-': { meaning: 'all', origin: 'Greek' },
    'para-': { meaning: 'beside, beyond', origin: 'Greek' },
    'per-': { meaning: 'through, thoroughly', origin: 'Latin' },
    'peri-': { meaning: 'around', origin: 'Greek' },
    'poly-': { meaning: 'many', origin: 'Greek' },
    'post-': { meaning: 'after', origin: 'Latin' },
    'pre-': { meaning: 'before', origin: 'Latin' },
    'pro-': { meaning: 'forward, in favor of', origin: 'Latin/Greek' },
    'proto-': { meaning: 'first, original', origin: 'Greek' },
    'pseudo-': { meaning: 'false', origin: 'Greek' },
    're-': { meaning: 'again, back', origin: 'Latin' },
    'retro-': { meaning: 'backward', origin: 'Latin' },
    'semi-': { meaning: 'half, partial', origin: 'Latin' },
    'sub-': { meaning: 'under, below', origin: 'Latin' },
    'super-': { meaning: 'above, beyond', origin: 'Latin' },
    'syn-': { meaning: 'together, with', origin: 'Greek' },
    'sym-': { meaning: 'together, with', origin: 'Greek' },
    'trans-': { meaning: 'across, beyond', origin: 'Latin' },
    'tri-': { meaning: 'three', origin: 'Latin/Greek' },
    'ultra-': { meaning: 'beyond, extreme', origin: 'Latin' },
    'un-': { meaning: 'not, reverse', origin: 'Old English' },
    'under-': { meaning: 'below, insufficient', origin: 'Old English' },
    'uni-': { meaning: 'one', origin: 'Latin' },
  };

  // Common roots with meanings
  const ROOTS = {
    'act': { meaning: 'do, drive', origin: 'Latin agere' },
    'aud': { meaning: 'hear', origin: 'Latin audire' },
    'bene': { meaning: 'good', origin: 'Latin bene' },
    'bio': { meaning: 'life', origin: 'Greek bios' },
    'cap': { meaning: 'take, seize', origin: 'Latin capere' },
    'ced': { meaning: 'go, yield', origin: 'Latin cedere' },
    'cede': { meaning: 'go, yield', origin: 'Latin cedere' },
    'chron': { meaning: 'time', origin: 'Greek chronos' },
    'cid': { meaning: 'kill, cut', origin: 'Latin caedere' },
    'cis': { meaning: 'cut', origin: 'Latin caedere' },
    'clude': { meaning: 'close, shut', origin: 'Latin claudere' },
    'clus': { meaning: 'close, shut', origin: 'Latin claudere' },
    'cogn': { meaning: 'know', origin: 'Latin cognoscere' },
    'corp': { meaning: 'body', origin: 'Latin corpus' },
    'cred': { meaning: 'believe', origin: 'Latin credere' },
    'cur': { meaning: 'run, course', origin: 'Latin currere' },
    'dict': { meaning: 'say, speak', origin: 'Latin dicere' },
    'doc': { meaning: 'teach', origin: 'Latin docere' },
    'duc': { meaning: 'lead', origin: 'Latin ducere' },
    'duct': { meaning: 'lead', origin: 'Latin ducere' },
    'equ': { meaning: 'equal', origin: 'Latin aequus' },
    'fac': { meaning: 'make, do', origin: 'Latin facere' },
    'fact': { meaning: 'make, do', origin: 'Latin facere' },
    'fer': { meaning: 'carry, bear', origin: 'Latin ferre' },
    'fid': { meaning: 'faith, trust', origin: 'Latin fidere' },
    'flect': { meaning: 'bend', origin: 'Latin flectere' },
    'form': { meaning: 'shape', origin: 'Latin forma' },
    'fort': { meaning: 'strong', origin: 'Latin fortis' },
    'fract': { meaning: 'break', origin: 'Latin frangere' },
    'gen': { meaning: 'birth, origin, kind', origin: 'Latin/Greek' },
    'geo': { meaning: 'earth', origin: 'Greek ge' },
    'graph': { meaning: 'write', origin: 'Greek graphein' },
    'gress': { meaning: 'step, go', origin: 'Latin gradi' },
    'hab': { meaning: 'have, hold', origin: 'Latin habere' },
    'ject': { meaning: 'throw', origin: 'Latin jacere' },
    'jud': { meaning: 'judge', origin: 'Latin judicare' },
    'jur': { meaning: 'law, swear', origin: 'Latin jus' },
    'lect': { meaning: 'read, choose', origin: 'Latin legere' },
    'loc': { meaning: 'place', origin: 'Latin locus' },
    'log': { meaning: 'word, reason, study', origin: 'Greek logos' },
    'luc': { meaning: 'light', origin: 'Latin lux' },
    'man': { meaning: 'hand', origin: 'Latin manus' },
    'mand': { meaning: 'order, command', origin: 'Latin mandare' },
    'mem': { meaning: 'remember', origin: 'Latin memor' },
    'ment': { meaning: 'mind', origin: 'Latin mens' },
    'mit': { meaning: 'send', origin: 'Latin mittere' },
    'miss': { meaning: 'send', origin: 'Latin mittere' },
    'mob': { meaning: 'move', origin: 'Latin movere' },
    'mot': { meaning: 'move', origin: 'Latin movere' },
    'mor': { meaning: 'death', origin: 'Latin mors' },
    'mort': { meaning: 'death', origin: 'Latin mors' },
    'nat': { meaning: 'born', origin: 'Latin nasci' },
    'nom': { meaning: 'name, law', origin: 'Latin/Greek' },
    'nov': { meaning: 'new', origin: 'Latin novus' },
    'oper': { meaning: 'work', origin: 'Latin operari' },
    'path': { meaning: 'feeling, disease', origin: 'Greek pathos' },
    'ped': { meaning: 'foot, child', origin: 'Latin pes / Greek pais' },
    'pel': { meaning: 'drive, push', origin: 'Latin pellere' },
    'pend': { meaning: 'hang, weigh', origin: 'Latin pendere' },
    'phil': { meaning: 'love', origin: 'Greek philein' },
    'phon': { meaning: 'sound', origin: 'Greek phone' },
    'plic': { meaning: 'fold', origin: 'Latin plicare' },
    'pon': { meaning: 'place, put', origin: 'Latin ponere' },
    'port': { meaning: 'carry', origin: 'Latin portare' },
    'pos': { meaning: 'place, put', origin: 'Latin ponere' },
    'prim': { meaning: 'first', origin: 'Latin primus' },
    'quer': { meaning: 'seek, ask', origin: 'Latin quaerere' },
    'rupt': { meaning: 'break', origin: 'Latin rumpere' },
    'scrib': { meaning: 'write', origin: 'Latin scribere' },
    'script': { meaning: 'write', origin: 'Latin scribere' },
    'sect': { meaning: 'cut', origin: 'Latin secare' },
    'sens': { meaning: 'feel', origin: 'Latin sentire' },
    'sent': { meaning: 'feel', origin: 'Latin sentire' },
    'sequ': { meaning: 'follow', origin: 'Latin sequi' },
    'spec': { meaning: 'look, see', origin: 'Latin specere' },
    'spect': { meaning: 'look, see', origin: 'Latin specere' },
    'spir': { meaning: 'breathe', origin: 'Latin spirare' },
    'sta': { meaning: 'stand', origin: 'Latin stare' },
    'struct': { meaning: 'build', origin: 'Latin struere' },
    'tact': { meaning: 'touch', origin: 'Latin tangere' },
    'temp': { meaning: 'time', origin: 'Latin tempus' },
    'ten': { meaning: 'hold', origin: 'Latin tenere' },
    'tend': { meaning: 'stretch', origin: 'Latin tendere' },
    'terr': { meaning: 'earth, land', origin: 'Latin terra' },
    'tract': { meaning: 'pull, draw', origin: 'Latin trahere' },
    'val': { meaning: 'worth, strong', origin: 'Latin valere' },
    'ven': { meaning: 'come', origin: 'Latin venire' },
    'vent': { meaning: 'come', origin: 'Latin venire' },
    'ver': { meaning: 'truth', origin: 'Latin verus' },
    'vert': { meaning: 'turn', origin: 'Latin vertere' },
    'vers': { meaning: 'turn', origin: 'Latin vertere' },
    'vid': { meaning: 'see', origin: 'Latin videre' },
    'vis': { meaning: 'see', origin: 'Latin videre' },
    'vit': { meaning: 'life', origin: 'Latin vita' },
    'viv': { meaning: 'live', origin: 'Latin vivere' },
    'voc': { meaning: 'voice, call', origin: 'Latin vocare' },
    'vol': { meaning: 'will, wish', origin: 'Latin velle' },
  };

  // Common suffixes
  const SUFFIXES = {
    '-able': { meaning: 'capable of', type: 'adj' },
    '-ible': { meaning: 'capable of', type: 'adj' },
    '-al': { meaning: 'relating to', type: 'adj' },
    '-ance': { meaning: 'state, quality', type: 'noun' },
    '-ence': { meaning: 'state, quality', type: 'noun' },
    '-ant': { meaning: 'one who, causing', type: 'noun/adj' },
    '-ent': { meaning: 'one who, causing', type: 'noun/adj' },
    '-ary': { meaning: 'relating to, place', type: 'adj/noun' },
    '-ate': { meaning: 'cause, make', type: 'verb' },
    '-ation': { meaning: 'action, process', type: 'noun' },
    '-tion': { meaning: 'action, process', type: 'noun' },
    '-sion': { meaning: 'action, process', type: 'noun' },
    '-dom': { meaning: 'state, realm', type: 'noun' },
    '-ful': { meaning: 'full of', type: 'adj' },
    '-fy': { meaning: 'make, cause', type: 'verb' },
    '-ify': { meaning: 'make, cause', type: 'verb' },
    '-ism': { meaning: 'belief, practice', type: 'noun' },
    '-ist': { meaning: 'one who practices', type: 'noun' },
    '-ity': { meaning: 'state, quality', type: 'noun' },
    '-ive': { meaning: 'tending to', type: 'adj' },
    '-less': { meaning: 'without', type: 'adj' },
    '-ly': { meaning: 'in the manner of', type: 'adv' },
    '-ment': { meaning: 'result, action', type: 'noun' },
    '-ness': { meaning: 'state, quality', type: 'noun' },
    '-or': { meaning: 'one who', type: 'noun' },
    '-er': { meaning: 'one who, more', type: 'noun/adj' },
    '-ous': { meaning: 'full of, having', type: 'adj' },
    '-ious': { meaning: 'full of, having', type: 'adj' },
    '-ure': { meaning: 'action, process', type: 'noun' },
    '-ward': { meaning: 'direction', type: 'adv/adj' },
  };

  /**
   * Analyze a word for morphological components
   * Returns { prefix, root, suffix, breakdown }
   */
  function analyze(word) {
    const w = word.toLowerCase().trim();
    if (w.includes(' ')) return null; // skip phrases

    const result = { prefix: null, root: null, suffix: null, breakdown: [] };

    // Check prefix
    const sortedPrefixes = Object.keys(PREFIXES).sort((a, b) => b.length - a.length);
    for (const p of sortedPrefixes) {
      const pClean = p.replace('-', '');
      if (w.startsWith(pClean) && w.length > pClean.length + 2) {
        result.prefix = { text: pClean, ...PREFIXES[p] };
        result.breakdown.push({ part: pClean, type: 'prefix', meaning: PREFIXES[p].meaning });
        break;
      }
    }

    // Check suffix
    const sortedSuffixes = Object.keys(SUFFIXES).sort((a, b) => b.length - a.length);
    for (const s of sortedSuffixes) {
      const sClean = s.replace('-', '');
      if (w.endsWith(sClean) && w.length > sClean.length + 2) {
        result.suffix = { text: sClean, ...SUFFIXES[s] };
        result.breakdown.push({ part: sClean, type: 'suffix', meaning: SUFFIXES[s].meaning });
        break;
      }
    }

    // Check root in remaining part
    let core = w;
    if (result.prefix) core = core.slice(result.prefix.text.length);
    if (result.suffix) core = core.slice(0, -result.suffix.text.length);

    if (core.length >= 3) {
      const sortedRoots = Object.keys(ROOTS).sort((a, b) => b.length - a.length);
      for (const r of sortedRoots) {
        if (core.includes(r) && core.length <= r.length + 3) {
          result.root = { text: r, ...ROOTS[r] };
          result.breakdown.splice(result.prefix ? 1 : 0, 0, { part: r, type: 'root', meaning: ROOTS[r].meaning });
          break;
        }
      }
    }

    // Only return if we found something useful
    if (result.breakdown.length === 0) return null;
    return result;
  }

  /**
   * Get a formatted etymology hint for display
   */
  function getHint(word) {
    const analysis = analyze(word);
    if (!analysis || analysis.breakdown.length === 0) return null;

    const parts = analysis.breakdown.map(b => {
      const labels = { prefix: '前缀', root: '词根', suffix: '后缀' };
      return `<span class="etym-${b.type}">${b.part}</span> (${labels[b.type]}: ${b.meaning})`;
    });

    return parts.join(' + ');
  }

  // Expose
  window.WordStreetEtymology = {
    PREFIXES,
    ROOTS,
    SUFFIXES,
    analyze,
    getHint,
  };
})();
