/* ═══ Data: Quotes, Biases, Readings ═══ */

const QUOTES = [
  { source: "周易", original: "天行健，君子以自强不息。", en: "As heaven moves with vigor, the noble person ceaselessly strengthens themselves.", practice: { zh: "今日做一件需要勇气的事，不借命运之名回避它。", en: "Do one thing today that requires courage — don't defer it to fate." } },
  { source: "道德经", original: "知人者智，自知者明。", en: "Knowing others is intelligence; knowing yourself is true clarity.", practice: { zh: "写下一条你最近听到的「命运判断」，问：这是描述还是定义？", en: "Write a recent 'fate judgment' you heard. Ask: is it describing or defining you?" } },
  { source: "庄子", original: "知其不可奈何而安之若命，德之至也。", en: "Accepting what cannot be changed with equanimity is the highest virtue — yet discernment precedes acceptance.", practice: { zh: "区分「不可改变」与「被叙事禁止改变」——两者往往不是同一回事。", en: "Distinguish what cannot change from what narratives forbid you to change." } },
  { source: "论语", original: "君子不器。", en: "The noble person is not a single-purpose vessel.", practice: { zh: "拒绝一个将你固定在某一种角色里的标签。", en: "Reject one label that fixes you into a single role." } },
  { source: "孟子", original: "尽其心者，知其性也。知其性，则知天矣。", en: "Fully realizing one's heart-mind is to know one's nature; knowing one's nature is to know heaven.", practice: { zh: "今日倾听自己的真实感受，而非「应该」有的感受。", en: "Listen to what you actually feel today, not what you 'should' feel." } },
  { source: "楚辞", original: "路漫漫其修远兮，吾将上下而求索。", en: "The road is long and arduous; I will search high and low without ceasing.", practice: { zh: "你的探索本身即是答案的一部分。", en: "Your searching is itself part of the answer." } },
  { source: "周易", original: "地势坤，君子以厚德载物。", en: "The earth is receptive; the noble person carries all things with deep virtue.", practice: { zh: "「承载」不等于「承受一切不合理」——今日设定一个边界。", en: "Carrying is not the same as accepting all injustice. Set one boundary today." } },
  { source: "道德经", original: "上善若水，水善利万物而不争。", en: "The highest good is like water, benefiting all without contention.", practice: { zh: "温柔与顺从不是同义词。", en: "Gentleness and submission are not synonyms." } },
  { source: "庄子", original: "至人无己，神人无功，圣人无名。", en: "The perfected person has no fixed self; the spirit person seeks no merit; the sage claims no name.", practice: { zh: "你不需要被任何叙事「命名」才能存在。", en: "You don't need to be named by any narrative to exist." } },
  { source: "论语", original: "学而不思则罔，思而不学则殆。", en: "Learning without thought is labor lost; thought without learning is perilous.", practice: { zh: "读一条命理解释时，同时问：它的来源是什么？", en: "When reading a fate interpretation, ask: what is its source?" } },
  { source: "孟子", original: "人皆可以为尧舜。", en: "Every person can become like Yao and Shun.", practice: { zh: "「命定」与「可能」——今日选择相信后者一次。", en: "Between 'destined' and 'possible' — choose the latter once today." } },
  { source: "楚辞", original: "亦余心之所善兮，虽九死其犹未悔。", en: "For what my heart holds dear, though I die nine times I shall not regret.", practice: { zh: "你的坚持不需要被命理叙事批准。", en: "Your persistence needs no approval from fate narratives." } },
  { source: "周易", original: "穷则变，变则通，通则久。", en: "When exhausted, change; through change, breakthrough; through breakthrough, endurance.", practice: { zh: "感到困顿时，先改变叙事框架，而非认定自己有问题。", en: "When stuck, change the narrative frame before assuming something is wrong with you." } },
  { source: "道德经", original: "祸兮福之所倚，福兮祸之所伏。", en: "Misfortune rests upon fortune; fortune hides within misfortune.", practice: { zh: "警惕用「祸福」标签简化复杂的人生处境。", en: "Beware simplifying complex life situations with fortune/misfortune labels." } },
  { source: "庄子", original: "彼亦一是非，此亦一是非。", en: "That too has its right and wrong; this too has its right and wrong.", practice: { zh: "同一命盘，不同解读——今日记住：解读不是唯一。", en: "Same chart, different readings — remember today: interpretation is never singular." } },
  { source: "论语", original: "己所不欲，勿施于人。", en: "Do not impose on others what you yourself do not desire.", practice: { zh: "你也不应被强加不愿接受的命运定义。", en: "Neither should unwanted fate-definitions be imposed on you." } },
  { source: "孟子", original: "生于忧患，死于安乐。", en: "Life emerges from hardship; death comes from complacency.", practice: { zh: "「忧患」叙事不应成为限制女性发展的借口。", en: "Hardship narratives should not become excuses to limit women's growth." } },
  { source: "楚辞", original: "长太息以掩涕兮，哀民生之多艰。", en: "I sigh deeply and wipe my tears, grieving the hardships of the people.", practice: { zh: "共情是力量，不是软弱的证据。", en: "Empathy is strength, not evidence of weakness." } },
  { source: "周易", original: "二人同心，其利断金。", en: "Two people of one mind can cut through metal.", practice: { zh: "寻找与你共同质疑叙事的人，而非共同恐惧命运的人。", en: "Find those who question narratives with you, not those who share fate-fear." } },
  { source: "道德经", original: "大音希声，大象无形。", en: "The greatest sound is silence; the greatest form is formless.", practice: { zh: "最深刻的真相往往不在最响亮的预言里。", en: "The deepest truths are rarely in the loudest prophecies." } },
  { source: "庄子", original: "吾生也有涯，而知也无涯。", en: "My life has boundaries, yet knowledge has none.", practice: { zh: "有限的生命，不应被单一的命理解释所束缚。", en: "A finite life should not be bound by a singular fate interpretation." } },
  { source: "论语", original: "三人行，必有我师焉。", en: "Walking among three people, one of them is surely my teacher.", practice: { zh: "包括过去的你——向自己的经历学习。", en: "Including your past self — learn from your own experience." } },
  { source: "孟子", original: "富贵不能淫，贫贱不能移，威武不能屈。", en: "Wealth cannot corrupt, poverty cannot shift, power cannot bend the principled.", practice: { zh: "命运预言也不应弯曲你的核心原则。", en: "Fate prophecies should not bend your core principles either." } },
  { source: "楚辞", original: "举世皆浊我独清，众人皆醉我独醒。", en: "When all the world is muddy, I alone am clear; when all are drunk, I alone am sober.", practice: { zh: "清醒不等于孤独——找到你的同伴。", en: "Clarity doesn't mean loneliness — find your companions." } },
  { source: "周易", original: "君子以思患而预防之。", en: "The noble person anticipates difficulty and prepares.", practice: { zh: "预防不等于预言恐惧——区分准备与焦虑。", en: "Preparation is not prophetic fear — distinguish readiness from anxiety." } },
  { source: "道德经", original: "合抱之木，生于毫末；九层之台，起于累土。", en: "A tree you can embrace grows from a tiny sprout; a nine-story tower rises from piled earth.", practice: { zh: "你的故事从当下这一笔开始写，而非从命盘里读出。", en: "Your story begins with this moment's pen stroke, not from a chart's reading." } },
  { source: "庄子", original: "相濡以沫，不如相忘于江湖。", en: "Better to forget each other in the rivers and lakes than to moisten each other with saliva.", practice: { zh: "有些叙事束缚了彼此——有时解放比坚守更需要勇气。", en: "Some narratives bind us — sometimes liberation takes more courage than holding on." } },
  { source: "论语", original: "知者不惑，仁者不忧，勇者不惧。", en: "The wise are free from confusion, the humane from anxiety, the brave from fear.", practice: { zh: "质疑命理中的恐惧叙事，是勇敢的第一步。", en: "Questioning fear narratives in fate-reading is the first act of courage." } },
  { source: "孟子", original: "万物皆备于我。", en: "All things are complete within me.", practice: { zh: "你内在已有足够资源——不必向外寻求命运的许可。", en: "You carry sufficient resources within — no need to seek fate's permission without." } },
  { source: "楚辞", original: "制芰荷以为衣兮，集芙蓉以为裳。", en: "I fashion lotus leaves as my robe, gather hibiscus as my skirt.", practice: { zh: "美与身份由自己定义，不由命盘决定。", en: "Beauty and identity are self-defined, not chart-determined." } },
  { source: "道德经", original: "道可道，非常道；名可名，非常名。", en: "The Way that can be spoken is not the eternal Way; the name that can be named is not the eternal name.", practice: { zh: "任何对你的命名，都只是命名，不是全部的你。", en: "Any name given to you is only a name — not the whole of you." } },
  { source: "周易", original: "见龙在田，利见大人。", en: "The dragon appears in the field — it is beneficial to meet the great person.", practice: { zh: "潜力正在显现——你不需要等待「吉时」才开始。", en: "Potential is emerging — you need not wait for an auspicious hour to begin." } },
  { source: "庄子", original: "天地与我并生，而万物与我为一。", en: "Heaven, earth, and I were born together; the ten thousand things and I are one.", practice: { zh: "你与宇宙相连，但这种连接不意味着被动接受一切安排。", en: "You are connected to the cosmos — but connection is not passive acceptance of all arrangements." } }
];

const BIASES = [
  { id: "kefu", zh: "说女性会害伴侣", en: "Woman as Harmful", desc: { zh: "把伴侣或家庭的不顺归到女性身上。", en: "Blaming a woman for a partner's or family's misfortune." } },
  { id: "xianqi", zh: "只夸顺从牺牲", en: "Obedient Wife Ideal", desc: { zh: "把顺从、持家、牺牲说成女性最重要的价值。", en: "Treating obedience, homemaking, and sacrifice as a woman's highest value." } },
  { id: "marriage", zh: "人生只看婚姻", en: "Life Defined by Marriage", desc: { zh: "好像婚姻顺不顺就能决定一个人的全部人生。", en: "Making marriage seem like the measure of an entire life." } },
  { id: "latemarriage", zh: "晚婚就焦虑", en: "Late Marriage Pressure", desc: { zh: "用年龄制造压力，把不早婚说成问题。", en: "Using age pressure to frame not marrying early as a problem." } },
  { id: "doomed", zh: "一开口就说没希望", en: "Doomed Framing", desc: { zh: "把某种命盘结构直接说成失败，忽略人的选择。", en: "Treating a chart pattern as failure while ignoring choice." } },
  { id: "moral", zh: "把性格说成道德问题", en: "Moral Labeling", desc: { zh: "把独立、敏感或犹豫直接变成好坏评判。", en: "Turning traits like independence or sensitivity into moral judgments." } },
  { id: "genderrole", zh: "男女必须固定样子", en: "Fixed Gender Roles", desc: { zh: "默认男生该怎样、女生该怎样。", en: "Assuming men and women must behave in fixed ways." } },
  { id: "depend", zh: "转机要靠男性", en: "Must Depend on Men", desc: { zh: "暗示女性的人生转机要靠父亲、丈夫或儿子。", en: "Suggesting a woman's future depends on father, husband, or son." } },
  { id: "procreate", zh: "用生育评价人生", en: "Judged by Childbearing", desc: { zh: "用有没有孩子、孩子多少来评价一个人的命运。", en: "Judging fate through whether or how many children someone has." } },
  { id: "beauty", zh: "外貌决定命运", en: "Beauty Decides Fate", desc: { zh: "把外貌和桃花、婚恋、运气直接绑在一起。", en: "Linking appearance directly to romance, luck, and fate." } },
  { id: "emotion", zh: "把情绪说成弱点", en: "Emotion as Weakness", desc: { zh: "把敏感、犹豫、多想说成天生缺陷。", en: "Framing sensitivity or hesitation as a built-in flaw." } },
  { id: "submissive", zh: "温顺才是好命", en: "Submission as Good Fate", desc: { zh: "把温柔、忍让、听话包装成最好的命。", en: "Packaging gentleness, endurance, and obedience as ideal fate." } },
  { id: "binary", zh: "事业家庭只能二选一", en: "Career vs Family Trap", desc: { zh: "暗示一个人不能同时拥有事业和家庭。", en: "Suggesting a person must choose between career and family." } },
  { id: "blame", zh: "家里出事怪到个人", en: "Family Blame", desc: { zh: "把家庭不顺归因到某个人的命格上。", en: "Attributing family problems to one person's chart." } },
  { id: "romancecurse", zh: "恋爱都说成劫", en: "Romance as Disaster", desc: { zh: "把感情经历只说成灾难，而不是成长的一部分。", en: "Framing romance only as disaster, not part of growth." } },
  { id: "chastity", zh: "用感情经历审判人", en: "Judged by Romance History", desc: { zh: "用恋爱经历评判一个人的价值和道德。", en: "Judging someone's worth through romantic history." } },
  { id: "strongfate", zh: "独立就说太强势", en: "Independence as Threat", desc: { zh: "把独立、有主见说成会伤害别人。", en: "Treating independence and strong will as harmful to others." } },
  { id: "wangfu", zh: "价值只看旺不旺伴侣", en: "Value Through Partner", desc: { zh: "只用对伴侣有没有好处来评价一个人。", en: "Valuing someone only by their impact on a partner." } },
  { id: "filial", zh: "把人生绑在婆家责任上", en: "In-Law Duty Trap", desc: { zh: "把照顾婆家当成女性命运的核心任务。", en: "Making service to in-laws the center of a woman's fate." } },
  { id: "fatalism", zh: "一句天命堵住改变", en: "Fate Stops Change", desc: { zh: "用天命、注定、没办法来压住人的选择。", en: "Using destiny or inevitability to close down choice." } }
];

const BIAS_CATEGORIES = [
  { key: "gender", zh: "性别偏见", en: "Gender Bias" },
  { key: "marriage", zh: "婚姻中心论", en: "Marriage Centrism" },
  { key: "fatalism", zh: "命运决定论", en: "Fatalism" },
  { key: "fear", zh: "恐惧叙事", en: "Fear Narrative" },
  { key: "moral", zh: "道德审判", en: "Moral Judgment" },
  { key: "hetero", zh: "异性恋默认", en: "Heteronormativity" },
  { key: "class", zh: "阶级叙事", en: "Class Narrative" }
];

const WANDERER_PROMPTS = [
  { zh: "如果这句话用于男性，结论会一样吗？", en: "If this were said about a man, would the conclusion be the same?" },
  { zh: "故事来自过去，但解释权属于现在。", en: "Stories come from the past, but the right to interpret belongs to the present." },
  { zh: "你听到的，是预测还是规训？", en: "What you hear — is it prediction or discipline?" },
  { zh: "命运是一面镜子，还是一扇门？", en: "Is fate a mirror, or a door?" },
  { zh: "谁在讲述这个故事？谁从中受益？", en: "Who tells this story? Who benefits from it?" },
  { zh: "我不负责算命。我负责提问。", en: "I don't tell fortunes. I ask questions." },
  { zh: "沙粒聚散，形态无常——你亦然。", en: "Sand gathers and scatters, formless — so too are you." },
  { zh: "每一次探索，只点亮一部分星空。", en: "Each journey lights only part of the constellation." }
];

const READINGS = {
  bazi: {
    traditional: {
      zh: "此造日主乙木，生于仲春，木旺当令。官星透干，然七杀暗藏，主性格外柔内刚。女命以官为夫，官星坐劫，恐有克夫之嫌；婚姻之路波折，宜晚婚以避其冲。命中桃花不旺，情感多依赖他人指引。宜守妇道，以静制动，方可转危为安。",
      en: "This chart shows Yi Wood as day master, born in mid-spring when wood is dominant. The Official Star appears in the stem, yet Seven Killings hides beneath — suggesting outward gentleness with inner strength. For women, the Official represents the husband; with Robbery seated upon it, there is suspicion of 'ke-fu' (harming the husband). The marriage path is turbulent; late marriage is advised to avoid clashes. Peach Blossom is weak — emotional life depends heavily on others' guidance. One should uphold wifely virtue, stillness over action, to transform danger into safety."
    },
    modern: {
      zh: "日主乙木得令，象征旺盛的成长力与适应力。官杀并存，说明你兼具自我标准（官）与突破常规的勇气（杀）——这是复杂而完整的性格结构，而非「混乱」。情感模式倾向于深度连接；你需要的不是「依赖指引」，而是辨识哪些指引来自他人期待、哪些来自内心。",
      en: "Yi Wood in season symbolizes vigorous growth and adaptability. Official and Killings coexisting means you hold both self-standards (Official) and courage to break norms (Killings) — a complex, complete structure, not 'confusion.' Your relational pattern favors depth; what you need is not 'dependence on guidance' but discernment between others' expectations and your inner voice."
    },
    reframed: {
      zh: "此造日主乙木，生于仲春——你拥有旺盛的生命力与成长势能。官星透干，象征你对秩序、责任与自我标准有清晰感知；七杀暗藏，说明你内在有突破常规的勇气。情感关系中，你倾向于深度连接而非表面社交——这不是「依赖」，而是对真实关系的追求。所谓「晚婚」不是命运的限制，而是社会时钟的叙事；你的节奏，由你定义。",
      en: "This chart shows Yi Wood as day master, born in mid-spring — you carry vigorous life force and growth potential. The Official Star indicates clear awareness of order, responsibility, and personal standards; hidden Seven Killings reveals inner courage to break conventions. In relationships, you seek depth over surface — this is not 'dependence' but pursuit of authentic connection. So-called 'late marriage' is not a fate constraint but a social-clock narrative; your rhythm is yours to define."
    }
  },
  astrology: {
    traditional: {
      zh: "太阳落在双鱼座，月亮天蝎，上升巨蟹——典型的「水象三重奏」，情感丰沛但易陷入情绪漩涡。金星与土星呈硬相位，暗示感情中多阻碍，早年恋爱不顺，恐有晚婚之象。第七宫主星落陷，伴侣缘分薄，需靠家庭安排。火星强势，性格刚烈，女命不宜过于强势，恐克夫伤子。",
      en: "Sun in Pisces, Moon in Scorpio, Cancer rising — a classic 'water trinity,' emotionally rich but prone to emotional whirlpools. Venus square Saturn suggests relational obstacles, early romance difficulties, and signs of late marriage. The 7th house ruler is debilitated — thin partner karma, requiring family arrangement. Strong Mars indicates fierce temperament; women should not be too strong, lest they harm husband and children."
    },
    modern: {
      zh: "水象三重奏赋予你深层情感智慧与直觉力。金星—土星相位反映你在关系中重视承诺与边界——这不是「阻碍」，而是你对深度连接的审慎。第七宫配置指向灵魂层面的伴侣选择，而非社交层面的条件匹配。",
      en: "The water trinity grants deep emotional wisdom and intuition. Venus-Saturn aspects reflect your valuing commitment and boundaries in relationships — not 'obstacles' but your care in seeking depth. Your 7th house points toward soul-level partnership choices, not social-condition matching."
    },
    reframed: {
      zh: "太阳双鱼、月亮天蝎、上升巨蟹——你拥有深层的情感智慧与直觉力。金星与土星的相位不是「阻碍」，而是你在关系中重视承诺、不轻率付出的特质。第七宫的配置说明你倾向于选择灵魂层面的连接，而非社交层面的匹配。火星的能量是你行动力的来源——「强势」不是缺陷，而是未被社会允许的女性力量。",
      en: "Sun in Pisces, Moon in Scorpio, Cancer rising — you possess deep emotional wisdom and intuition. Venus-Saturn aspects aren't 'obstacles' but reflect your valuing commitment and not giving lightly in relationships. Your 7th house configuration suggests you seek soul-level connection over social matching. Mars energy is your source of action — 'strength' is not a flaw but female power society hasn't permitted."
    }
  }
};

const COURT_DIALOGUES = {
  scholar: {
    zh: "从经典命理体系来看，此造确有官杀混杂之象。古书云：「女命官杀混杂，不清不白。」这是千年经验的总结，非我一人之见。",
    en: "From classical fate-reading, this chart shows mixed Official and Seven Killings. Ancient texts state: 'When a woman's Official and Killings mix, clarity is lost.' This summarizes millennia of observation, not one person's opinion."
  },
  ai: {
    zh: "「不清不白」是一个道德框架，而非命理必然。同一配置在男性命盘中常解读为「权谋」或「魄力」。差异不在命盘，在解读者的性别预设。",
    en: "'Loss of clarity' is a moral frame, not a chart necessity. The same configuration in men's charts is often read as 'strategic mind' or 'boldness.' The difference lies not in the chart but in the interpreter's gender assumptions."
  }
};

const BADGES = [
  { id: "first_journey", zh: "初探命运", en: "First Journey", req: (s) => s.journeys >= 1 },
  { id: "five_biases", zh: "偏见猎手", en: "Bias Hunter", req: (s) => s.unlockedBiases.length >= 5 },
  { id: "ten_biases", zh: "叙事解构者", en: "Narrative Deconstructor", req: (s) => s.unlockedBiases.length >= 10 },
  { id: "all_biases", zh: "星空全亮", en: "Full Constellation", req: (s) => s.unlockedBiases.length >= 20 },
  { id: "three_journeys", zh: "持续追问", en: "Persistent Questioner", req: (s) => s.journeys >= 3 },
  { id: "five_quotes", zh: "经典收藏家", en: "Classic Collector", req: (s) => s.savedQuotes.length >= 5 },
  { id: "reflection", zh: "反思者", en: "Reflector", req: (s) => s.reflections.length >= 1 }
];

const FRAGMENTS_PER_JOURNEY = 3;

function getRandomBiases(count, exclude = []) {
  const available = BIASES.filter(b => !exclude.includes(b.id));
  const shuffled = available.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function getRandomQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

function getScannerScores() {
  return BIAS_CATEGORIES.map(cat => ({
    ...cat,
    score: 0.3 + Math.random() * 0.65
  }));
}
