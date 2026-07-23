# Reframe Destiny: An Interactive Tool for Identifying and Reframing Gendered Bias in BaZi and Astrological Narratives

**Author:** Xintian Zhang  
**Course:** Generation AI: AI for Social Sciences · Lawted Wu  
**Affiliation:** Generation AI 2026 Research Project  
**Due:** August 2026 (draft submitted July 21, 2026)

---

## Abstract

Young people read a fortune-teller's script as a neutral map of their fate, quietly absorbing its gender roles: the same chart makes a man an "ambitious leader" and a woman "too strong" or "fated to harm her husband." Bias-detection tools target workplace language; fortune-telling apps optimize insight, not critique—neither hands a young reader the move to talk back. We built *Reframe Destiny*, a short bilingual web journey: pick a BaZi or astrology chart, read one traditional gendered reading, and tag the bias you see—marriage centrism, husband-harming, fear. The reader then compares an AI-reframed version—a constrained teaching script, not an oracle—and writes one line in a "Court of Destiny." Using a pre/post five-item Likert scale in a convenience sample of paired sessions (*N* = 19 as of July 18, 2026; recruitment continued toward *N* = 15–25), we tested whether players improved at spotting, questioning, and rewriting gendered fate-talk. Mean scores rose on bias awareness (Δ*M* = +0.31), reframing confidence (Δ*M* = +0.47), and gender lens (Δ*M* = +0.31), while personal agency showed little change (Δ*M* = −0.11). Five supplementary semi-structured interviews suggested that noticing bias and deferring to AI authority can coexist. Findings are preliminary and limited by convenience sampling and self-report measures.

**Keywords:** gender bias, divination, BaZi, astrology, narrative literacy, AI reframe, digital humanities

---

## Introduction

Fortune-telling is not only a prediction industry; it is a *narrative* industry. Whether in Chinese BaZi ("Eight Characters") or Western astrology, practitioners and apps translate birth information into stories about who a person is, whom they should marry, and how strong they are allowed to be. Feminist theorists have long argued that such stories do not merely describe gender—they help produce it through repeated cultural scripts (Butler, 1990). The same technical chart can therefore yield different moral verdicts depending on whether the reader is coded as male or female: ambition becomes "leadership" for men and *ke-fu* (husband-harming) risk for women; emotional depth becomes "charisma" or "instability" along parallel gender lines.

Young people in China increasingly encounter these narratives through digital channels. Industry surveys report that a majority of youth have tried AI-assisted fortune-telling, with BaZi and astrology among the most common modalities. Yet critical tools rarely meet users where they actually read fate. Workplace-oriented bias detectors scan job ads, not *shang-guan* female labels or "late marriage" tropes. AI divination products optimize personalization and companionship rather than teaching readers to question narrative authority (Bender et al., 2021). Digital-humanities exhibitions have exposed ritual mechanics but seldom combine gender critique with a hands-on reframe workflow in one short session.

This gap motivates *Reframe Destiny* ("reshaping fate"), an interactive website that treats divination as discourse to be read critically—not as metaphysical truth to be proved or dismissed. The design follows a single pedagogical loop: *read a traditional gendered text, name the bias, compare alternative framings, write one line back.* The tool is deliberately bilingual (Chinese/English) because BaZi discourse and global astrology circulate together in youth media ecosystems.

### Research Question and Hypothesis

**Research question.** How does an AI-assisted interactive website affect young people's ability to identify and reframe gendered narrative bias in traditional BaZi and Western astrological readings?

**Hypothesis.** I hypothesize that after using Reframe Destiny, young people will show increased awareness of gender bias in divination narratives and greater confidence in reframing these narratives for themselves.

### Literature Review

#### Gender and Divination as Narrative

Butler (1990) accounts for gender as performative repetition, which helps explain why divination texts feel personal: they restate normative scripts in second-person form. Haraway (1988) adds that knowledge is situated—who speaks (master, app, AI) and for whom (gendered addressee) shapes what counts as a plausible reading. In BaZi, classical compilations such as *San Ming Tong Hui* encode wife- and motherhood-centered judgments for women's charts. Contemporary SEO fortune-telling and AI BaZi products recycle fear labels ("fierce fate," "husband harm") rather than removing them. Western astrology shows parallel heteronormative defaults in Mars–Venus rules and zodiac marketing.

#### Discourse, Power, and Algorithmic Spirituality

Foucault (1972) frames discourse as that which constrains what can be said and by whom. Applied to divination, the issue is not only whether a chart is "accurate" but which social roles the reading makes imaginable. Recent work on algorithmic spirituality shows how recommendation systems and AI chat oracles can function as external authorities (Cotter, 2022; Cearns, 2024). Nikolić (2023) traces genealogical links between pattern-making in astrology and machine learning, warning that predictive systems can inherit stereotyped training narratives. For youth, short-form platforms repackage traditional gender roles as "feminine/masculine energy," blending spirituality with prescriptive relationship norms.

#### Psychology of Belief and Youth Practice

People often turn to divination under uncertainty (Vyse, 2018). Ethnographic work cautions against assuming women are "more superstitious" by nature; gendered use patterns may reflect social roles and anxiety-sharing norms rather than essential traits. For this study, the relevant psychological outcome is not belief in fate per se but *meta-linguistic awareness*: can participants name a stereotype label and rewrite it?

#### Comparable Tools and the Remaining Gap

Comparable projects include bias-tagging games in hiring contexts, critical divination exhibits, and mechanically transparent ritual works. AI fortune apps optimize engagement. No widely available public prototype combines BaZi *and* Western astrology with gender-bias tagging and constrained AI reframing in a 15-minute critical literacy journey aimed at adolescents and young adults. Reframe Destiny occupies this middle position: critical without being dismissive, interactive without claiming oracle authority (Bender et al., 2021).

---

## Method

### Participants

We planned to recruit **15–25** participants aged **15–35** (men and women) who had encountered BaZi, astrology, or similar fate narratives. Recruitment was conducted through classmates, WeChat groups, and Xiaohongshu study invitations. Each participant completed consent, the pre-survey, one full journey (~15 minutes), and the post-survey in a single sitting. Inferential claims are limited to this convenience sample.

### Materials

We deployed *Reframe Destiny*, a bilingual web application accessible at https://reframe-destiny.pages.dev/game/. On first visit, participants saw an informed-consent screen stating that participation was voluntary and anonymous, that no names or server-stored birth data were collected, that participation was optional, that participants could leave at any time, and that responses were used only for class research. Participants proceeded only after clicking "I understand and agree to enter." The site supported Chinese or English UI throughout.

The core experience was a **six-step journey**:

1. Choose BaZi or Western astrology  
2. Enter birth date, time, and city (computed locally in the browser; not transmitted as identifiable records)  
3. Read a **traditional** gender-differentiated interpretation generated from the computed chart  
4. Use an interactive "bias scanner" to identify gendered labels  
5. Write one open sentence in a "Court of Destiny" text box  
6. View a three-column comparison of traditional, modern, and AI-reframed readings  

Participants did *not* choose a "modern" or "AI" lens before seeing the traditional text, because the pedagogical goal is to encounter bias in classical framing first.

Traditional readings were generated from real calendar and astronomy libraries in the browser. Wording templates were authored to surface gender-differentiated tropes (e.g., marriage centrism, ke-fu, fear narrative) while labeling them as narrative material for critique. AI reframes were produced through a server-side large-language-model proxy under a fixed teaching prompt when available; if the proxy failed, the site displayed a curated fallback reframe. The tool was positioned as a critical literacy intervention, not live fortune-telling (Bender et al., 2021).

### Measures

Before the narrative task, the site administered a five-item pre-survey; after journey completion, it administered the same five items as a post-survey. The dependent variables were five matched Likert items (1 = strongly disagree, 5 = strongly agree):

- *bias_awareness*: noticing gender bias in divination language  
- *reframe_confidence*: confidence in rewriting or questioning biased fate narratives  
- *gender_lens*: asking whether the same reading would apply if gender differed  
- *personal_agency*: rejecting the idea that fate-talk should decide who one must become  
- *spot_stereotypes*: recognizing stereotype labels such as "ke-fu," "late marriage," or "too strong"  

Open responses from the Court of Destiny were coded inductively into themes such as marriage centrism, ke-fu narrative, fear narrative, agency/reframe, or no critique named.

### Supplementary Interviews

After completing the post-survey, five participants from the paired sample completed optional 10–15-minute semi-structured interviews via WeChat (voice or text). Five open-ended prompts targeted: (1) baseline noticing of gendered fate-talk before vs. after the site; (2) which journey step best supported identification; (3) whether the Court of Destiny or AI reframe felt like "talking back" vs. deferring to authority; (4) whether the same chart would be read differently for another gender; (5) one redesign priority. Responses were anonymized and coded for themes.

### Design

This was a **within-subjects pre/post survey design**. The independent variable was exposure to the Reframe Destiny interactive journey (absent at pre-test; present between pre- and post-test). Outcomes were analyzed by comparing pre- versus post-survey responses by item and by thematically coding Court of Destiny sentences and interview excerpts.

### Procedure

Upon completion, the site logged anonymous rows to a Supabase table (`research_submissions`), including submission type (`survey_pre`, `journey_complete`, `survey_post`), a session identifier linking surveys, chosen system, identified bias IDs, scanner scores, reflection text, survey answers, and UI language. Each complete session produced three linked rows sharing one `session_id`.

### AI and Writing Disclosure

The author used an AI assistant to convert the manuscript into APA 7 LaTeX, to query Supabase for descriptive statistics, and to help fix compilation errors. All research content, data-cleaning decisions, analysis interpretation, and references were produced and verified by the author.

---

## Results

*[This section reports descriptive outcomes only; interpretation appears in Discussion. Statistics below are provisional as of July 18, 2026.]*

### Sample and Exclusions

As of July 18, 2026, the database contained 119 anonymous submission rows. After deduplication (same `session_id` and `submission_type`; earliest row retained), 76 event rows remained across 34 independent sessions. Twenty-three sessions (68%) completed the narrative journey; nineteen sessions (56%) completed the full pre-survey, journey, and post-survey sequence required for paired analysis. Four journey completers (17%) did not submit a post-survey.

### Pre/Post Likert Scores

Among the nineteen paired sessions, pre-test means (*M* ± *SD*) were: bias awareness 3.74 ± 1.05, reframe confidence 3.79 ± 0.98, gender lens 3.37 ± 1.26, personal agency 4.74 ± 0.73, and spot stereotypes 4.32 ± 0.89. Post-test means were: bias awareness 4.05 ± 0.97, reframe confidence 4.26 ± 0.81, gender lens 3.68 ± 1.25, personal agency 4.63 ± 1.01, and spot stereotypes 4.32 ± 1.00. Mean within-person change (Δ*M*) was +0.31 for bias awareness, +0.47 for reframe confidence, +0.31 for gender lens, −0.11 for personal agency, and 0.00 for spot stereotypes.

### Journey-Level Counts

Of 23 journey completions, 13 chose Western astrology and 10 chose BaZi. Eight participants submitted a non-empty Court of Destiny reflection. The most frequently selected user bias tags were moral judgment, chastity judgment, ke-fu narrative, virtuous-wife framing, and submissive-role framing (*n* = 5 each among tagged sessions), followed by doomed/fatalism, gender-role fixation, and fear narrative (*n* = 4 each).

### Interview Sample

Five post-survey completers participated in supplementary interviews. [Insert coded theme counts and 2–3 anonymized quotes after final coding.]

### Inferential Statistics

Inferential tests will be reported in the final manuscript if *N* reaches the planned range after recruitment closes.

---

## Discussion

### What We Built and Tested

This study asked whether a short, bilingual interactive website could help young people *see* gendered bias in BaZi and Western astrological readings and *practice talking back*. Rather than treating divination as something to prove or dismiss, *Reframe Destiny* treats fate-talk as discourse: a script that can be read, tagged, compared, and rewritten. Participants entered through informed consent, completed a five-item pre-survey, then moved through a six-step journey, and completed the same five survey items immediately afterward.

The pedagogical sequence was deliberate. Participants always encountered the **traditional** gendered reading first. Bias tags made implicit stereotypes visible as selectable objects. The AI reframe was positioned as a **constrained teaching script**—not an oracle—so the site could scaffold alternative wording without replacing one external authority with another (Bender et al., 2021).

### Interpreting Preliminary Patterns

Provisional descriptive results (*N* = 19) show mean increases on bias awareness, reframing confidence, and gender lens, with little change on spot stereotypes and a slight decrease on personal agency. These patterns partially support the hypothesis that a single session may raise awareness and confidence, but they also echo an important distinction: *noticing* bias is not the same as *rejecting* fate-talk as a script for who one must become.

Court of Destiny reflections illustrated this gap. One participant wrote, "The AI analyst is right," deferring judgment to the tool; another normalized biased language ("Isn't everyone like this?"). Others pushed back more directly ("Isn't this pure moral blackmail?" / "I now realize these definitions are frameworks and bias against women"). Interview responses [to be integrated after coding] are expected to clarify whether participants experienced the bias scanner or the Court step as the main "talk-back" move.

The most frequent user-selected bias themes (virtuous-wife, chastity, ke-fu, moral judgment) align with feminist readings of divination as repetitive gender scripting (Butler, 1990; Foucault, 1972) and with discourse samples collected for this project.

### Relation to Prior Work

Workplace bias detectors and engagement-oriented fortune apps leave young readers without a rehearsed "talk-back" move. *Reframe Destiny* tests whether narrative literacy can be taught *in situ*—inside the same media genre where youth already encounter ke-fu, late-marriage, and "too strong" labels.

### Limitations

Limitations include a convenience sample, post-survey attrition among journey completers, self-report measures, single-session exposure, template-dependent readings, and descriptive rather than inferential analysis at this stage. Several sessions show ceiling responding on pre-test items. Results should not be generalized beyond this sample.

### Implications and Next Steps

For design, bias tagging, side-by-side reframing, and a one-sentence rewrite task can be embedded inside divination media in under 15 minutes. For research, future iterations should make the Court of Destiny step more central—requiring a user-authored counter-narrative before showing any AI reframe—especially if agency scores remain flat while awareness rises.

---

## References

Bender, E. M., Gebru, T., McMillan-Major, A., & Shmitchell, S. (2021). On the dangers of stochastic parrots: Can language models be too big? *Proceedings of the 2021 ACM Conference on Fairness, Accountability, and Transparency*, 610–623. https://doi.org/10.1145/3442188.3445922

Butler, J. (1990). *Gender trouble: Feminism and the subversion of identity*. Routledge.

Cearns, M. (2024). *Divining truth: The epistemology of artificial intelligence* [Verify publication details before final submission].

Cotter, K. (2022). Algorithmic conspirituality. *International Journal of Communication*, *16*, 1–20.

Foucault, M. (1972). *The archaeology of knowledge*. Pantheon Books.

Haraway, D. (1988). Situated knowledges: The science question in feminism and the privilege of partial perspective. *Feminist Studies*, *14*(3), 575–599. https://doi.org/10.2307/3178066

Nikolić, M. (2023). An astrological genealogy of artificial intelligence [Verify publication details before final submission].

Vyse, S. A. (2018). *Believing in magic: The psychology of superstition* (Updated ed.). Oxford University Press.

Zhang, X. (2026). *Reframe Destiny* [Interactive web application]. https://reframe-destiny.pages.dev/game/

---

*Draft for author review · Update Results N and Interview subsection after July 19 final data collection.*
