/* ═══ Personalized readings from real chart data ═══ */

const EL_TRAITS = {
  wood: {
    zh: { growth: '成长与伸展', shadow: '过度迎合或摇摆' },
    en: { growth: 'growth and flexibility', shadow: 'over-adaptation or wavering' },
  },
  fire: {
    zh: { growth: '表达与热情', shadow: '急躁或燃尽' },
    en: { growth: 'expression and warmth', shadow: 'impatience or burnout' },
  },
  earth: {
    zh: { growth: '承载与稳定', shadow: '过度承担或停滞' },
    en: { growth: 'grounding and reliability', shadow: 'over-responsibility or stagnation' },
  },
  metal: {
    zh: { growth: '标准与边界', shadow: '苛刻或自我压缩' },
    en: { growth: 'standards and boundaries', shadow: 'harshness or self-constriction' },
  },
  water: {
    zh: { growth: '感知与流动', shadow: '情绪淹没或逃避' },
    en: { growth: 'intuition and flow', shadow: 'emotional flooding or avoidance' },
  },
};

function baziReading(chart, lens, lang) {
  const dm = chart.dayMaster;
  const trait = EL_TRAITS[dm.el] || EL_TRAITS.earth;
  const pillars = chart.pillars.map(p => p.gz).join(lang === 'zh' ? '、' : ', ');

  if (lens === 'traditional') {
    return lang === 'zh'
      ? `依你所输生辰排得四柱「${pillars}」，日主为${dm.zh}。传统说法常把${EL_ZH[dm.el]}命与「${trait.shadow}」绑在一起，并依性别追加婚育、强弱之类断语——这正是本研究要检视的叙事模板，而非你的真实上限。`
      : `From your birth data: pillars ${pillars}, Day Master ${dm.en}. Traditional texts often tie ${dm.el} nature to “${trait.en.shadow}” and add gendered marriage or strength scripts — a narrative template this project examines, not your actual ceiling.`;
  }
  if (lens === 'modern') {
    return lang === 'zh'
      ? `你的日柱为${dm.zh}（${EL_ZH[dm.el]}），整体结构是${pillars}。现代命理视角会把${dm.zh}读成「${trait.growth}」的资源，而非单一吉凶标签；关系、事业节奏应回到你的选择与环境，而非套用统一模板。`
      : `Your Day Master is ${dm.en} (${dm.el}), full pillars ${pillars}. A modern reading frames this as ${trait.en.growth}, not a fixed luck label; relationships and timing belong to your choices and context, not one-size templates.`;
  }
  return lang === 'zh'
    ? `四柱「${pillars}」，日主${dm.zh}——你自带${trait.growth}的势能。所谓「${trait.shadow}」不是命运判决，而是未被命名的压力；你可以读这些符号，但解释权在你手里。`
    : `Pillars ${pillars}, Day Master ${dm.en} — you carry ${trait.en.growth}. So-called “${trait.en.shadow}” is not a verdict but unnamed pressure; you may read the symbols, but interpretation stays yours.`;
}

function astroReading(chart, lens, lang) {
  const sun = chart.sunSign;
  const moon = chart.moonSign;
  const place = chart.place?.label || (lang === 'zh' ? '出生地' : 'birth place');

  if (lens === 'traditional') {
    return lang === 'zh'
      ? `据${place}经纬换算，太阳落在${sun.zh}座，月亮在${moon.zh}座。传统星盘文本常在此组合上叠加「感情阻碍、晚婚、不宜太强」等性别化断语——同一行星位置，叙事却因性别而大相径庭。`
      : `For ${place}, your Sun is in ${sun.en}, Moon in ${moon.en}. Traditional copy often adds gendered scripts about relational blocks, “late marriage,” or “don’t be too strong” — same sky, different story by gender.`;
  }
  if (lens === 'modern') {
    return lang === 'zh'
      ? `太阳${sun.zh}、月亮${moon.zh}（${place}）。当代占星会把这读成情感需求（月亮）与自我表达（太阳）的配搭，强调心理动力而非预言；硬相位代表张力，不是「诅咒」。`
      : `Sun in ${sun.en}, Moon in ${moon.en} (${place}). Contemporary astrology reads this as how expression (Sun) meets emotional needs (Moon) — psychological dynamics, not prophecy; hard aspects mean tension, not curse.`;
  }
  return lang === 'zh'
    ? `你的星盘核心：太阳${sun.zh}、月亮${moon.zh}。它们描述的是内在语言，不是社交标签；任何「不宜、克、晚」的说法，都值得追问：这是星体在说话，还是社会期待在借星体说话？`
    : `Core chart: Sun ${sun.en}, Moon ${moon.en}. They describe inner language, not social labels; any “unfit, harm, late” claim deserves the question: is the planet speaking, or social expectation speaking through it?`;
}

const ReadingEngine = {
  getReading(system, lens, lang, chartData) {
    if (!chartData) {
      const fallback = READINGS[system]?.[lens === 'ai' ? 'reframed' : lens === 'modern' ? 'modern' : 'traditional'];
      return fallback ? (lang === 'zh' ? fallback.zh : fallback.en) : '';
    }
    if (system === 'bazi' && chartData.bazi) {
      const key = lens === 'ai' ? 'reframed' : lens;
      return baziReading(chartData.bazi, key, lang);
    }
    if (system === 'astro' && chartData.astro) {
      const key = lens === 'ai' ? 'reframed' : lens;
      return astroReading(chartData.astro, key, lang);
    }
    return '';
  },
};
