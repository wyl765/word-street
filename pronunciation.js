/**
 * Word Street — Pronunciation Engine
 * Loads audio-index.json once, provides playback via HTML5 Audio API.
 */
(function() {
  'use strict';

  let audioIndex = null;
  let loading = false;
  let loadPromise = null;
  let currentAudio = null;

  function ensureIndex() {
    if (audioIndex) return Promise.resolve(audioIndex);
    if (loadPromise) return loadPromise;
    loading = true;
    loadPromise = fetch('audio-index.json')
      .then(r => r.json())
      .then(data => { audioIndex = data.files || {}; loading = false; return audioIndex; })
      .catch(() => { audioIndex = {}; loading = false; return audioIndex; });
    return loadPromise;
  }

  // Preload index immediately
  ensureIndex();

  function getAudioFile(word) {
    if (!audioIndex) return null;
    const key = word.toLowerCase().trim();
    const entry = audioIndex[key];
    return entry ? entry.file : null;
  }

  function playWord(word, onEnd) {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    const file = getAudioFile(word);
    if (!file) return false;
    currentAudio = new Audio('audio/' + file);
    currentAudio.volume = 0.85;
    currentAudio.play().catch(() => {});
    if (onEnd) currentAudio.addEventListener('ended', onEnd, { once: true });
    return true;
  }

  /**
   * Create an elegant pronunciation button element.
   * Returns a <button> DOM element. Caller positions it.
   * Options:
   *   size: 'sm' | 'md' (default 'md')
   *   theme: 'light' | 'dark' (default 'light')
   */
  function createPronounceBtn(word, opts) {
    opts = opts || {};
    const size = opts.size || 'md';
    const theme = opts.theme || 'light';

    const btn = document.createElement('button');
    btn.className = 'ws-pronounce-btn';
    btn.setAttribute('aria-label', 'Play pronunciation');
    btn.setAttribute('data-word', word);
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;

    // Sizing
    const dim = size === 'sm' ? '36px' : '48px';
    const iconDim = size === 'sm' ? '18px' : '24px';

    // Colors
    const isLight = theme === 'light';
    const baseColor = isLight ? 'rgba(184,146,106,0.55)' : 'rgba(212,184,150,0.6)';
    const hoverBg = isLight ? 'rgba(184,146,106,0.08)' : 'rgba(253,251,247,0.08)';
    const activeColor = isLight ? '#B8926A' : '#D4B896';

    Object.assign(btn.style, {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dim,
      height: dim,
      borderRadius: '50%',
      border: '1.5px solid rgba(184,146,106,0.25)',
      background: 'rgba(184,146,106,0.06)',
      color: baseColor,
      cursor: 'pointer',
      padding: '0',
      transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
      flexShrink: '0',
      outline: 'none',
      WebkitTapHighlightColor: 'transparent',
    });

    const svg = btn.querySelector('svg');
    Object.assign(svg.style, {
      width: iconDim,
      height: iconDim,
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.background = hoverBg;
      btn.style.color = activeColor;
      btn.style.transform = 'scale(1.08)';
    });
    btn.addEventListener('mouseleave', () => {
      if (!btn.classList.contains('ws-playing')) {
        btn.style.background = 'transparent';
        btn.style.color = baseColor;
        btn.style.transform = 'scale(1)';
      }
    });

    // Check availability
    ensureIndex().then(() => {
      const file = getAudioFile(word);
      if (!file) {
        btn.style.opacity = '0.2';
        btn.style.pointerEvents = 'none';
      }
    });

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      btn.classList.add('ws-playing');
      btn.style.color = activeColor;
      btn.style.background = hoverBg;
      btn.style.transform = 'scale(1.12)';

      const played = playWord(word, () => {
        btn.classList.remove('ws-playing');
        btn.style.color = baseColor;
        btn.style.background = 'transparent';
        btn.style.transform = 'scale(1)';
      });
      if (!played) {
        btn.classList.remove('ws-playing');
        btn.style.transform = 'scale(1)';
      }
    });

    return btn;
  }

  // Expose globally
  window.WordStreetAudio = {
    ensureIndex,
    getAudioFile,
    playWord,
    createPronounceBtn,
  };
})();
