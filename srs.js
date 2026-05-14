/**
 * Word Street — Spaced Repetition Engine (SM-2 Algorithm)
 * Tracks per-word memory strength and schedules reviews.
 * Also handles wrong-answer tracking and weak word identification.
 */
(function() {
  'use strict';

  const SRS_KEY = 'wordstreet_srs';
  const MISTAKES_KEY = 'wordstreet_mistakes';

  // SM-2 defaults
  const DEFAULT_EF = 2.5; // easiness factor
  const MIN_EF = 1.3;

  /**
   * SRS card structure:
   * {
   *   word: string,
   *   ef: number,        // easiness factor (2.5 default)
   *   interval: number,  // days until next review
   *   repetition: number,// successful review count
   *   nextReview: string, // ISO date string
   *   lastReview: string,
   *   totalCorrect: number,
   *   totalWrong: number,
   * }
   */

  function loadSRS() {
    try {
      const raw = localStorage.getItem(SRS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch(e) { return {}; }
  }

  function saveSRS(data) {
    localStorage.setItem(SRS_KEY, JSON.stringify(data));
  }

  function loadMistakes() {
    try {
      const raw = localStorage.getItem(MISTAKES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch(e) { return []; }
  }

  function saveMistakes(data) {
    localStorage.setItem(MISTAKES_KEY, JSON.stringify(data));
  }

  /**
   * SM-2 algorithm implementation
   * @param {object} card - existing card or null for new
   * @param {number} quality - 0-5 rating (0-2 fail, 3-5 success)
   * @returns {object} updated card
   */
  function sm2(card, quality) {
    if (!card) {
      card = { ef: DEFAULT_EF, interval: 0, repetition: 0, totalCorrect: 0, totalWrong: 0 };
    }

    // Update EF
    const newEF = Math.max(MIN_EF, card.ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

    let interval, repetition;

    if (quality >= 3) {
      // Successful recall
      card.totalCorrect++;
      if (card.repetition === 0) {
        interval = 1;
      } else if (card.repetition === 1) {
        interval = 6;
      } else {
        interval = Math.round(card.interval * newEF);
      }
      repetition = card.repetition + 1;
    } else {
      // Failed recall — reset
      card.totalWrong++;
      interval = 1;
      repetition = 0;
    }

    const now = new Date();
    const next = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);

    return {
      ...card,
      ef: newEF,
      interval: interval,
      repetition: repetition,
      nextReview: next.toISOString().split('T')[0],
      lastReview: now.toISOString().split('T')[0],
    };
  }

  /**
   * Get words due for review today
   * @param {object} srsData - all cards
   * @returns {string[]} - word keys due
   */
  function getDueWords(srsData) {
    const today = new Date().toISOString().split('T')[0];
    const due = [];
    for (const [word, card] of Object.entries(srsData)) {
      if (card.nextReview && card.nextReview <= today) {
        due.push(word);
      }
    }
    // Sort by overdue days (most overdue first)
    due.sort((a, b) => {
      return (srsData[a].nextReview || '').localeCompare(srsData[b].nextReview || '');
    });
    return due;
  }

  /**
   * Get weakest words (lowest EF, most mistakes)
   * @param {object} srsData
   * @param {number} limit
   * @returns {Array} [{word, ef, totalWrong, totalCorrect, accuracy}]
   */
  function getWeakWords(srsData, limit = 20) {
    const entries = Object.entries(srsData)
      .filter(([_, card]) => (card.totalCorrect + card.totalWrong) >= 2)
      .map(([word, card]) => ({
        word,
        ef: card.ef,
        totalWrong: card.totalWrong,
        totalCorrect: card.totalCorrect,
        accuracy: card.totalCorrect / (card.totalCorrect + card.totalWrong),
        interval: card.interval,
      }))
      .sort((a, b) => a.accuracy - b.accuracy || a.ef - b.ef);
    return entries.slice(0, limit);
  }

  /**
   * Record a mistake with context
   */
  function recordMistake(word, chosenAnswer, correctAnswer, mode) {
    const mistakes = loadMistakes();
    mistakes.push({
      word,
      chosen: chosenAnswer,
      correct: correctAnswer,
      mode,
      date: new Date().toISOString(),
    });
    // Keep last 500 mistakes
    if (mistakes.length > 500) mistakes.splice(0, mistakes.length - 500);
    saveMistakes(mistakes);
  }

  /**
   * Get mistake stats grouped by word
   */
  function getMistakeStats() {
    const mistakes = loadMistakes();
    const stats = {};
    for (const m of mistakes) {
      if (!stats[m.word]) stats[m.word] = { count: 0, recent: null, choices: [] };
      stats[m.word].count++;
      stats[m.word].recent = m.date;
      stats[m.word].choices.push(m.chosen);
    }
    return Object.entries(stats)
      .map(([word, s]) => ({ word, ...s }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Get SRS stats summary
   */
  function getStats(srsData) {
    const cards = Object.values(srsData);
    const today = new Date().toISOString().split('T')[0];
    return {
      totalCards: cards.length,
      dueToday: cards.filter(c => c.nextReview && c.nextReview <= today).length,
      mastered: cards.filter(c => c.interval >= 21).length, // 21+ day interval = mastered
      learning: cards.filter(c => c.interval > 0 && c.interval < 21).length,
      new: cards.filter(c => c.interval === 0 || !c.interval).length,
      avgEF: cards.length > 0 ? (cards.reduce((s, c) => s + c.ef, 0) / cards.length).toFixed(2) : 0,
    };
  }

  // Expose globally
  window.WordStreetSRS = {
    loadSRS,
    saveSRS,
    loadMistakes,
    saveMistakes,
    sm2,
    getDueWords,
    getWeakWords,
    recordMistake,
    getMistakeStats,
    getStats,
    DEFAULT_EF,
  };
})();
