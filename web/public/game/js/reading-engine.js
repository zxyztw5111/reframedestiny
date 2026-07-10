/* ═══ Personalized readings from real chart data ═══ */

const EL_TRAITS = {
  wood: {
    zh: { growth: '成长与伸展', virtue: '仁慈、向上', shadow: '优柔、依赖', bias: '「太软」「没主见」「宜依附他人」' },
    en: { growth: 'growth and flexibility', virtue: 'kindness, upward drive', shadow: 'indecision, dependence', bias: '"too soft," "no backbone," "should lean on others"' },
  },
  fire: {
    zh: { growth: '表达与热情', virtue: '光明、行动力', shadow: '急躁、冲动', bias: '「脾气大」「克夫」「不宜太强势」' },
    en: { growth: 'expression and warmth', virtue: 'visibility, action', shadow: 'impatience, burnout', bias: '"too fiery," "harms husband," "women shouldn\'t be strong"' },
  },
  earth: {
    zh: { growth: '承载与稳定', virtue: '信实、包容', shadow: '固执、拖延', bias: '「太闷」「宜守不宜攻」「以夫为天」' },
    en: { growth: 'grounding and reliability', virtue: 'steadfastness', shadow: 'stubbornness, stagnation', bias: '"dull," "should stay home," "husband-centered"' },
  },
  metal: {
    zh: { growth: '标准与边界', virtue: '果断、原则', shadow: '苛刻、冷硬', bias: '「太强」「克夫伤子」「女命不宜刚毅」' },
    en: { growth: 'standards and boundaries', virtue: 'decisiveness', shadow: 'harshness', bias: '"too strong," "ke-fu," "women shouldn\'t be rigid"' },
  },
  water: {
    zh: { growth: '感知与流动', virtue: '智慧、变通', shadow: '多虑、漂泊', bias: '「多情」「桃花旺」「感情不专一」' },
    en: { growth: 'intuition and flow', virtue: 'wisdom, adaptability', shadow: 'worry, drift', bias: '"too emotional," "peach blossom," "unstable in love"' },
  },
};

const BRANCH_BIAS = {
  子: '子时出生常被说成「夜猫子、感情多变」',
  午: '午火旺时，女命易被贴上「桃花、热情过度」标签',
  卯: '卯木桃花，传统文本常联婚缘、异性缘过旺',
  酉: '酉金桃花，易被解读为「外表出众、感情复杂」',
  辰: '辰为湿土，有时被说成「心思重、晚婚」',
  戌: '戌土刑冲，传统说法爱提「波折、阻碍」',
};

function baziReading(chart, lens, lang) {
  const dm = chart.dayMaster;
  const trait = EL_TRAITS[dm.el] || EL_TRAITS.earth;
  const pillars = chart.pillars;
  const gz = pillars.map(p => p.gz).join(lang === 'zh' ? '、' : ', ');
  const dayBranch = pillars[2]?.branch || '';
  const hourPillar = pillars[3]?.gz || '';
  const branchNote = BRANCH_BIAS[dayBranch] || BRANCH_BIAS[pillars[3]?.branch] || '';

  if (lens === 'traditional') {
    if (lang === 'zh') {
      return [
        `【命局总览】依你所输生辰，排出四柱「${gz}」。日主为${dm.zh}，五行属${EL_ZH[dm.el]}。传统命理会先给一句「总论」：${dm.zh}日主，${trait.zh.virtue}，但也容易被说成${trait.shadow}。`,
        `【性格与强弱】${EL_ZH[dm.el]}命常被描述为「${trait.growth}」。若再套入性别模板，女命可能听到${trait.bias}；男命则可能听到相反的「不够有担当」。——同一套字，因性别而不同。`,
        `【情感与婚姻】时柱「${hourPillar}」、日支「${pillars[2]?.gz || ''}」是传统看婚恋的重点。常见断语包括：宜晚婚、夫妻宫有冲、桃花不旺/过旺。${branchNote ? branchNote + '。' : ''}这些说法往往预设了「婚姻是人生主轴」。`,
        `【事业与运势】年柱管早年、月柱管青年、日柱为自己、时柱管晚年。传统文本爱把「行运」说成命中注定，并用「克、冲、合」制造紧迫感——这正是我们要扫描的偏见叙事，而非你的真实能力上限。`,
        `【十神与性别话术】以日主${dm.zh}论：正官、七杀常被说成「夫星」；偏财、正财则联到「妻财」。女命听到「官杀混杂、婚姻不顺」的概率远高于男命；男命则常被要求「财星旺、能养家」。同一套十神名称，背后是不同的社会角色剧本。`,
        `【五行生克】${EL_ZH[dm.el]}命在经典书里还会被放进生克链条：谁生你、谁克你、谁泄你。传统说法常把「克」解释成灾难，把「生」解释成贵人——但克也可以是被塑造的压力，生也可以是过度依赖。请把这些词当作叙事线索，而不是人生判决书。`,
      ].join('\n\n');
    }
    return [
      `[Overview] From your birth data: Four Pillars ${gz}. Day Master ${dm.en} (${dm.el}). Traditional texts open with a verdict: ${trait.en.virtue}, yet also ${trait.en.shadow}.`,
      `[Character] ${dm.el} charts are read as ${trait.en.growth}. Gender templates add ${trait.en.bias} for women, or the opposite “not responsible enough” for men — same characters, different story.`,
      `[Love & Marriage] Hour pillar ${hourPillar} and day pillar ${pillars[2]?.gz || ''} anchor traditional romance scripts: late marriage, palace clash, weak/strong peach blossom. These assume marriage is life's main axis.`,
      `[Career & Luck] Year/month/day/hour pillars map life stages. Traditional copy turns transits into fate sentences with “clash/harm” urgency — narrative bias to scan, not your real ceiling.`,
      `[Ten Gods & gender] With Day Master ${dm.en}, Officer and Seven Killings become husband stars for women; Wealth stars become wife/property for men. Women hear “mixed officers, rocky marriage” far more often — same labels, different social scripts.`,
      `[Five Elements] ${dm.el} charts sit in generate/overcome chains. Classic texts treat “overcome” as disaster and “generate” as blessing — but overcome can mean shaping pressure; generate can mean dependency. Read these as narrative cues, not verdicts.`,
    ].join('\n\n');
  }
  if (lens === 'modern') {
    return lang === 'zh'
      ? `【现代视角】四柱「${gz}」，日主${dm.zh}。现代命理更关注心理动力：${trait.growth}是你可用的资源，${trait.shadow}是需要觉察的压力模式，而非「命中注定」。婚恋、事业节奏应结合你的现实选择，不宜套用「克夫」「晚婚」一类标签。`
      : `【Modern lens】Pillars ${gz}, Day Master ${dm.en}. Modern readings focus on psychology: ${trait.en.growth} as resource, ${trait.en.shadow} as stress pattern — not fate. Timing in love/career follows your choices, not labels like "ke-fu" or "late marriage."`;
  }
  return lang === 'zh'
    ? `【重构】四柱「${gz}」，日主${dm.zh}——你拥有${trait.growth}的势能。传统里的${trait.bias}是社会性别脚本，不是命理必然。你可以阅读这些符号，但不必让它们定义你是谁、何时结婚、强还是弱。`
    : `【Reframed】Pillars ${gz}, Day Master ${dm.en} — you carry ${trait.en.growth}. Traditional ${trait.en.bias} is social scripting, not cosmic law. Read the symbols; don't let them define you.`;
}

function astroReading(chart, lens, lang) {
  const sun = chart.sunSign;
  const moon = chart.moonSign;
  const asc = chart.ascSign;
  const place = chart.place?.label || (lang === 'zh' ? '出生地' : 'birth place');
  const houseLines = (chart.planets || [])
    .filter(p => p.house)
    .map(p => lang === 'zh' ? `${p.zh}在第${p.house}宫（${p.sign.zh}）` : `${p.en} in House ${p.house} (${p.sign.en})`)
    .join(lang === 'zh' ? '；' : '; ');

  if (lens === 'traditional') {
    if (lang === 'zh') {
      return [
        `【星盘总览】出生地${place}。上升${asc.zh}座，太阳${sun.zh}，月亮${moon.zh}。传统占星会先把这三个位置定成「人格底色」。`,
        `【行星落宫】${houseLines || '（行星位置见轮盘）'}。传统文本常据此推断：感情是否顺利、是否晚婚、是否「不宜太强势」。`,
        `【性别化断语】同一星盘，对男女说法往往不同：女命太阳${sun.zh}可能被说成「感情丰富但易受伤」；男命则可能被说成「有魅力但难安定」。月亮${moon.zh}则常被用来解释「内心需求」与「是否适合结婚」。`,
        `【需警惕的叙事】留意这些词：克、阻、晚婚、桃花劫、不宜、太强。它们把复杂的人生经验压缩成一句预言——这正是本研究的扫描对象。`,
      ].join('\n\n');
    }
    return [
      `[Overview] Birth place ${place}. Rising ${asc.en}, Sun ${sun.en}, Moon ${moon.en}. Traditional astrology treats these three as your core tone.`,
      `[Houses] ${houseLines || '(see chart wheel)'}. Classic texts infer romance luck, late marriage, or "don't be too strong."`,
      `[Gender scripts] Same chart, different gender copy: Sun in ${sun.en} may mean "emotional but fragile" for women vs "charismatic but restless" for men.`,
      `[Watch for] Words like harm, block, late marriage, peach-blossom curse, "unfit," "too strong" — prophecy language to scan, not truth.`,
    ].join('\n\n');
  }
  if (lens === 'modern') {
    return lang === 'zh'
      ? `【现代视角】上升${asc.zh}、太阳${sun.zh}、月亮${moon.zh}。当代占星把它们读成心理语言：你如何 outward 表达（太阳）、情感如何被滋养（月亮）、世界如何第一眼看你（上升）。${houseLines ? '落宫提示生活领域：' + houseLines + '。' : ''}硬相位是张力，不是诅咒。`
      : `【Modern】Rising ${asc.en}, Sun ${sun.en}, Moon ${moon.en} as psychological language: expression, emotional needs, first impression. House placements show life arenas. Hard aspects = tension, not curse.`;
  }
  return lang === 'zh'
    ? `【重构】你的星盘核心：升${asc.zh}、日${sun.zh}、月${moon.zh}。它们描述内在语言，不是社交判决。任何「不宜、克、晚」都值得追问：是星体在说话，还是社会期待在借星体说话？`
    : `【Reframed】Core: Rising ${asc.en}, Sun ${sun.en}, Moon ${moon.en} — inner language, not social verdict. Question any "unfit/harm/late" line: planet or society speaking?`;
}

const ReadingEngine = {
  getReading(system, lens, lang, chartData) {
    const sys = system === 'astrology' ? 'astrology' : system;
    if (!chartData) {
      const fallback = READINGS[sys]?.[lens === 'ai' ? 'reframed' : lens === 'modern' ? 'modern' : 'traditional'];
      return fallback ? (lang === 'zh' ? fallback.zh : fallback.en) : '';
    }
    if (sys === 'bazi' && chartData.bazi) {
      const key = lens === 'ai' ? 'reframed' : lens;
      return baziReading(chartData.bazi, key, lang);
    }
    if (sys === 'astrology' && chartData.astro) {
      const key = lens === 'ai' ? 'reframed' : lens;
      return astroReading(chartData.astro, key, lang);
    }
    return '';
  },
};
