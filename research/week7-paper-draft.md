# Week 7 Paper Draft — Reframe Destiny

**Student:** Xintian Zhang (张昕田)  
**Cluster:** B — tool ready, sample empty  
**Status:** Methods locked · Results + Discussion draft (N = 3 paired) · Recruitment ongoing

---

## Exit Ticket 1 · Placeholder Abstract (English)

Young people often read a fortune-teller's script as a neutral map of their fate, quietly absorbing its gender roles: the same chart makes a man an "ambitious leader" and a woman "too strong" or "fated to harm her husband." Bias-detection tools target workplace language; fortune-telling apps optimize insight, not critique—neither hands a young reader the move to talk back. We built **Reframe Destiny**, a bilingual browser journey in which participants choose a BaZi or Western astrology chart, read one traditional gendered reading, tag the bias they see (marriage centrism, husband-harming, fear narrative), compare a constrained AI-reframed teaching script (not a live oracle), and write one line in a "Court of Destiny." Using a matched pre/post five-item Likert scale, we tested whether participants improved at spotting, questioning, and rewriting gendered fate-talk. In an initial convenience sample (N = 3 complete pre/journey/post sessions), bias awareness and reframing confidence rose (ΔM = +1.0 each), while personal agency did not increase (ΔM = −0.33). Findings are preliminary and limited by small N and high post-survey attrition.

---

## Exit Ticket 1 · 占位摘要（中文）

年轻人常把算命的说辞当成对命运的中性描述，不知不觉就把里面的性别脚本内化了：同一张命盘，男人是「有魄力的领导者」，女人却是「太强势」「晚婚」乃至「克夫」。现有的偏见检测工具只盯着职场话术，AI 命理 App 只顾算得更准、从不教人反问——没有一个把「回嘴」这一步交到年轻读者手里。我们做了 **Reframe Destiny（命运重构）**：一段短小的双语网页旅程——选八字或星盘，读一段传统的性别化解读，勾出你看到的偏见（婚姻中心论、克夫叙事、恐惧叙事），并排对照一版受约束的 AI 重构解读（教学脚本，不是真占卜），并在「命运法庭」写下自己的一句改写。我们用前测/后测 5 题 Likert 量表检验能力变化。初步便利样本（N = 3 完整配对）显示：偏见觉察与重构信心均上升（ΔM = +1.0），个人主体性未升（ΔM = −0.33）。结论为早期信号，受小样本与高后测流失限制。

---

## Method

### Artifact

We deployed **Reframe Destiny**, a bilingual single-page web prototype publicly accessible via GitHub Pages ([TODO: confirm final study URL at data collection]). On first visit, participants saw an informed-consent screen and, upon agreeing, could enter the site in Chinese or English. Before the narrative task, the site administered a five-item pre-survey; after journey completion, it administered the same five items as a post-survey. The core experience was a seven-step journey: (1) choose BaZi or Western astrology; (2) choose a narrative lens (traditional, modern, or AI-framed); (3) read a simulated gendered reading based on a fixed example chart—no real birth data were collected; (4) use an interactive “bias scanner” to identify gendered labels; (5) write one open sentence in a “Court of Destiny” text box; (6) view the original reading beside an AI-reframed version; and (7) finish the session. The interface displayed traditional readings, bias tags (e.g., marriage centrism, husband-harming, fear narrative), scanner scores, and side-by-side reframed text. Upon completion, the site logged anonymous rows to Supabase, including submission type, a session identifier linking pre- and post-surveys, chosen system, narrative lens, identified bias IDs, scanner scores, reflection text, survey answers, and UI language.

**Material boundary.** Traditional readings and preset reframes were **curated mock text** written for this study. When the server-side DeepSeek proxy was available, reframes were generated under a fixed teaching prompt; if the proxy failed, the site fell back to the curated preset. The tool was designed as a critical literacy intervention, not as live fortune-telling or metaphysical prediction (Bender et al., 2021).

### Design

This was a **within-subjects pre/post survey design**. The independent variable was exposure to the Reframe Destiny interactive journey (absent at pre-test; present between pre- and post-test). The dependent variables were five matched Likert items (1 = strongly disagree, 5 = strongly agree) administered before and after the journey, measuring: (a) noticing gender bias in divination language (*bias_awareness*), (b) confidence in rewriting or questioning biased fate narratives (*reframe_confidence*), (c) asking whether the same reading would apply if gender differed (*gender_lens*), (d) rejecting the idea that fate-talk should decide who one must become (*personal_agency*), and (e) recognizing stereotype labels such as “ke-fu,” “late marriage,” or “too strong” (*spot_stereotypes*). Outcomes were compared by examining pre- versus post-survey responses overall and by item, and by thematically coding the one-sentence Court of Destiny reflections.

### Consent

Participation was **voluntary, anonymous, and non-clinical**. The first screen stated that no names or identifying birth data were collected, that participation was optional, that participants could leave at any time, and that responses were used only for class research. Participants entered the study only after clicking “I agree—continue.”

### Recruitment, coding, and analysis

We planned to recruit **15–25** young people aged **15–35** (men and women) who had encountered BaZi, astrology, or similar fate narratives. Recruitment was conducted through [TODO: list final channels—e.g., classmates, WeChat, Xiaohongshu]. Each participant completed consent, the pre-survey, one full journey (~15 minutes), and the post-survey in a single sitting. Open responses from the Court of Destiny were coded inductively into themes such as marriage centrism, ke-fu narrative, fear narrative, agency/reframe, or no critique named. For the Likert items, we computed descriptive statistics (means per item at pre- and post-test) and examined paired change within this sample; claims were limited to this sample and were not generalized beyond N = 15–25. [TODO: note whether optional semi-structured interviews with 3–5 participants were conducted.]

---

## APA citation note (for the full paper)

**In-text (author–date)—use one form consistently:**

- Parenthetical: Gender is reproduced through repeated cultural narratives (Butler, 1990).
- Narrative: Butler (1990) argued that gender is performed rather than fixed.

**Reference list—one entry example:**

Butler, J. (1990). *Gender trouble: Feminism and the subversion of identity*. Routledge.

*(Journal article with DOI: Author, A. A. (Year). Title of article. *Journal Name*, *volume*(issue), pages. https://doi.org/xxxxx)*

---

## Results

### Sample and exclusions

Of 31 anonymous submissions collected between July 11, 2026, 11 duplicate rows were excluded prior to analysis (same `session_id` and `submission_type`; earliest row retained), leaving 20 event rows across 11 independent sessions. Six sessions (55%, *n* = 6) completed the narrative journey; three sessions (27%, *n* = 3) completed the full pre-survey, journey, and post-survey sequence required for paired analysis. All exclusion criteria were defined before data collection and were not modified after examining the results (see `research/data/exports/data-cleaning-report_2026-07-11.md`).

### Pre/post Likert change (paired sample, *N* = 3)

Among the three paired sessions, pre-test scores were moderate on bias awareness (*M* = 3.33, *SD* = 1.15) and reframe confidence (*M* = 2.67, *SD* = 0.58). Post-test scores were higher on bias awareness (*M* = 4.33, *SD* = 1.15) and reframe confidence (*M* = 3.67, *SD* = 1.15). Mean within-person change was +1.00 for bias awareness (*SD* = 0.00), +1.00 for reframe confidence (*SD* = 1.00), +0.67 for gender lens (*SD* = 0.58), +0.33 for spot stereotypes (*SD* = 0.58), and −0.33 for personal agency (*SD* = 0.58). No inferential statistics are reported given *N* = 3.

### Journey-level patterns (*n* = 6)

All six journey completions used the traditional narrative lens. Four chose Western astrology and two chose BaZi. Five of six participants selected at least one bias tag; the most frequent tags were virtuous-wife (`xianqi`, *n* = 2), gender-role fixation (`genderrole`, *n* = 2), and chastity judgment (`chastity`, *n* = 2). Automated scanner scores averaged highest for heteronormativity (*M* = 0.74) and moral judgment (*M* = 0.72) and lowest for gender bias (*M* = 0.44).

### Court of Destiny themes

Two of six journey completions included open-text reflections. One reflection deferred interpretive authority to the AI analyst ("The AI analyst is right"). Another normalized biased language ("Isn't everyone like this?") while post-survey scores reached ceiling on all five items.

---

## Discussion

### Core finding

Preliminary results suggest that a single ~15-minute Reframe Destiny session may increase self-reported bias awareness and reframing confidence in a small paired sample (*N* = 3). Participants who completed the journey most often tagged marriage-, family-, and morality-centered bias themes (virtuous wife, gender roles, chastity, husband-harming), aligning with prior discourse samples collected for this project.

### Hypothesis and research question

The hypothesis that awareness and reframing confidence would rise received partial support in this pilot: both items showed a mean increase of 1.0 point on a 5-point scale. However, personal agency---the item closest to rejecting fate-talk as a script for who one must become---did not improve and decreased slightly on average, with one participant dropping from 2 to 1 while writing that the AI analyst was "right." This pattern cautions against equating "seeing bias" with "talking back."

### Literature connections

These patterns are consistent with discourse-oriented accounts treating divination as repetitive gender scripting (Butler, 1990; Foucault, 1972) rather than neutral description. The gap between user-selected tags (explicit ke-fu, chastity, marriage themes) and higher scanner scores for heteronormativity and moral judgment supports the project's claim that some biases are easier to name than others. The deferral-to-AI reflection echoes warnings that LLM outputs can function as narrative authorities if framed as analysts rather than critique scaffolds (Bender et al., 2021).

### Limitations

Limitations include a convenience sample far below the planned *N* = 15--25, 50% post-survey attrition among journey completers, self-report measures, single-session exposure, template-dependent readings, and no inferential testing at *N* = 3. Several pre-survey responses showed straight-line responding (all 5s) and were flagged for review but not excluded. Results should not be generalized beyond this sample.

### Implications and future work

For design, the tool shows that bias tagging and side-by-side reframing can be embedded inside divination media. For research, priority next steps are recruiting additional complete sessions, reducing post-survey drop-off, and adding 3--5 short interviews to explain cases where survey scores and Court of Destiny text diverge.

### AI disclosure

The authors used an AI assistant to convert the manuscript into APA 7 LaTeX, to query Supabase for descriptive statistics, and to help fix compilation errors. All research content, data-cleaning decisions, analysis interpretation, and references were produced and verified by the author.

---

## Exit Ticket 3 · One concrete data move before next class

**Recruit 5 classmates this week** to run the full flow end-to-end (consent → pre-survey → journey → post-survey) and confirm each session appears in Supabase as three rows (`survey_pre`, `journey_complete`, `survey_post`) linked by `session_id`.

---

## References (starter set — verify before final paper)

Bender, E. M., Gebru, T., McMillan-Major, A., & Shmitchell, S. (2021). On the dangers of stochastic parrots: Can language models be too big? *Proceedings of FAccT*, 610–623.

Butler, J. (1990). *Gender trouble: Feminism and the subversion of identity*. Routledge.

Foucault, M. (1972). *The archaeology of knowledge*. Pantheon Books.

Haraway, D. (1988). Situated knowledges: The science question in feminism and the privilege of partial perspective. *Feminist Studies*, 14(3), 575–599.
