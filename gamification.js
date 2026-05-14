/**
 * Word Street — Gamification Engine
 * Handles XP, levels, daily challenges, achievements, and streaks.
 * Persists to localStorage.
 */
(function() {
  'use strict';

  const STORAGE_KEY = 'wordstreet_profile';
  const DAILY_KEY = 'wordstreet_daily';

  // XP curve: each level requires more XP
  const XP_PER_LEVEL = [
    0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 3800,
    4700, 5700, 6800, 8000, 9500, 11200, 13000, 15000, 17500, 20000,
    23000, 26500, 30000, 34000, 38500, 43500, 49000, 55000, 62000, 70000
  ];
  const MAX_LEVEL = XP_PER_LEVEL.length - 1;

  // Achievement definitions
  const ACHIEVEMENTS = {
    first_blood:    { name: 'First Blood',       icon: '🗡️', desc: 'Answer your first question correctly' },
    combo_3:        { name: 'Hot Streak',        icon: '🔥', desc: 'Get a 3× combo' },
    combo_5:        { name: 'On Fire',           icon: '🔥', desc: 'Get a 5× combo' },
    combo_10:       { name: 'Unstoppable',       icon: '💥', desc: 'Get a 10× combo' },
    combo_20:       { name: 'Legendary',         icon: '⚡', desc: 'Get a 20× combo' },
    daily_1:        { name: 'Daily Learner',     icon: '📅', desc: 'Complete your first daily challenge' },
    daily_7:        { name: 'Week Warrior',      icon: '🏅', desc: '7-day streak' },
    daily_30:       { name: 'Monthly Master',    icon: '👑', desc: '30-day streak' },
    words_50:       { name: 'Vocabulary Scout',  icon: '📖', desc: 'Answer 50 words correctly' },
    words_200:      { name: 'Word Collector',    icon: '📚', desc: 'Answer 200 words correctly' },
    words_500:      { name: 'Lexicon Master',    icon: '🎓', desc: 'Answer 500 words correctly' },
    words_1000:     { name: 'Word Sage',         icon: '🧙', desc: 'Answer 1000 words correctly' },
    speed_demon:    { name: 'Speed Demon',       icon: '⚡', desc: 'Answer 5 in a row under 2 seconds' },
    perfect_wave:   { name: 'Flawless',          icon: '💎', desc: 'Complete a wave with no mistakes' },
    level_5:        { name: 'Rising Star',       icon: '⭐', desc: 'Reach level 5' },
    level_10:       { name: 'Veteran',           icon: '🌟', desc: 'Reach level 10' },
    level_20:       { name: 'Grand Master',      icon: '✨', desc: 'Reach level 20' },
    all_levels:     { name: 'Explorer',          icon: '🗺️', desc: 'Play all 5 difficulty levels' },
    score_1000:     { name: 'Thousand Club',     icon: '🎯', desc: 'Score 1000+ in one session' },
    score_5000:     { name: 'High Roller',       icon: '💰', desc: 'Score 5000+ in one session' },
  };

  // Default profile
  function defaultProfile() {
    return {
      xp: 0,
      level: 1,
      totalCorrect: 0,
      totalAnswered: 0,
      bestCombo: 0,
      achievements: [],
      levelsPlayed: [],
      streak: 0,
      lastDailyDate: null,
      dailiesCompleted: 0,
      fastAnswers: 0, // consecutive fast answers for speed_demon
      createdAt: new Date().toISOString(),
    };
  }

  function loadProfile() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...defaultProfile(), ...JSON.parse(raw) };
    } catch(e) {}
    return defaultProfile();
  }

  function saveProfile(p) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  }

  // Daily challenge state
  function getTodayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  function loadDaily() {
    try {
      const raw = localStorage.getItem(DAILY_KEY);
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return null;
  }

  function saveDaily(d) {
    localStorage.setItem(DAILY_KEY, JSON.stringify(d));
  }

  // Seeded random for daily challenge (consistent questions per day)
  function seededRandom(seed) {
    let s = seed;
    return function() {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      return s / 0x7fffffff;
    };
  }

  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  // XP helpers
  function xpForLevel(level) {
    if (level >= MAX_LEVEL) return XP_PER_LEVEL[MAX_LEVEL];
    return XP_PER_LEVEL[level] || 0;
  }

  function xpProgress(profile) {
    const currentLevelXp = xpForLevel(profile.level - 1);
    const nextLevelXp = xpForLevel(profile.level);
    const xpInLevel = profile.xp - currentLevelXp;
    const xpNeeded = nextLevelXp - currentLevelXp;
    return { xpInLevel, xpNeeded, pct: Math.min(100, (xpInLevel / xpNeeded) * 100) };
  }

  function checkLevelUp(profile) {
    let leveled = false;
    while (profile.level < MAX_LEVEL && profile.xp >= xpForLevel(profile.level)) {
      profile.level++;
      leveled = true;
    }
    return leveled;
  }

  // Achievement check
  function checkAchievements(profile, context) {
    const newAchievements = [];
    const has = (id) => profile.achievements.includes(id);
    const grant = (id) => { if (!has(id)) { profile.achievements.push(id); newAchievements.push(id); } };

    if (profile.totalCorrect >= 1) grant('first_blood');
    if (profile.totalCorrect >= 50) grant('words_50');
    if (profile.totalCorrect >= 200) grant('words_200');
    if (profile.totalCorrect >= 500) grant('words_500');
    if (profile.totalCorrect >= 1000) grant('words_1000');
    if (profile.bestCombo >= 3) grant('combo_3');
    if (profile.bestCombo >= 5) grant('combo_5');
    if (profile.bestCombo >= 10) grant('combo_10');
    if (profile.bestCombo >= 20) grant('combo_20');
    if (profile.level >= 5) grant('level_5');
    if (profile.level >= 10) grant('level_10');
    if (profile.level >= 20) grant('level_20');
    if (profile.streak >= 7) grant('daily_7');
    if (profile.streak >= 30) grant('daily_30');
    if (profile.dailiesCompleted >= 1) grant('daily_1');
    if (profile.levelsPlayed.length >= 5) grant('all_levels');
    if (context && context.sessionScore >= 1000) grant('score_1000');
    if (context && context.sessionScore >= 5000) grant('score_5000');
    if (context && context.perfectWave) grant('perfect_wave');
    if (profile.fastAnswers >= 5) grant('speed_demon');

    return newAchievements;
  }

  // Expose globally
  window.WordStreetGame = {
    ACHIEVEMENTS,
    XP_PER_LEVEL,
    MAX_LEVEL,
    loadProfile,
    saveProfile,
    loadDaily,
    saveDaily,
    getTodayKey,
    seededRandom,
    hashString,
    xpForLevel,
    xpProgress,
    checkLevelUp,
    checkAchievements,
    defaultProfile,
  };
})();
