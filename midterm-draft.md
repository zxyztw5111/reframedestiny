## Title

Reframe Destiny — Detecting and Reframing Gendered Narrative Bias in BaZi and Western Astrology

Xintian Zhang (张昕田)

Research Advisor: Lawted Wu

## Research Question & Hypothesis

**Research Question:** How does an AI-assisted interactive website affect young people's ability to identify and reframe gendered narrative bias in traditional BaZi and Western astrological readings?

**Hypothesis:** I hypothesize that after using Reframe Destiny, young people will show increased awareness of gender bias in divination narratives and greater confidence in reframing these narratives for themselves.

## Background

Many young people in China (ages 15–35) encounter BaZi or Western astrology through family, social media, or apps. These systems do not only describe personality — they tell stories about marriage, ambition, and life paths.

The same chart element can mean "ambitious leader" for a man but "too strong" or "harmful to husband" for a woman. Classical BaZi texts and AI fortune-telling apps recycle these gendered labels.

This project does not ask whether divination is true. It asks: **Who has the right to narrate your fate? Does that narration carry gender bias?** A stranger should care because these narratives shape how young people see their options in work, love, and identity.

## Literature Review

**Butler (1990), *Gender Trouble*:** Gender is performed through repeated cultural narratives, not a fixed inner essence — relevant to how fate-readings assign roles.

**Foucault (1972), *The Archaeology of Knowledge*:** Discourse shapes what can be said and who may speak — fate language can normalize gender hierarchy.

**Haraway (1988), "Situated Knowledges":** Knowledge is partial and situated; the interpreter's position (including gender) changes meaning — the same chart, different stories.

**Bender et al. (2021), "On the Dangers of Stochastic Parrots":** Large language models reproduce training-data bias; AI should assist critique, not pose as an oracle.

**Valussi (2020), *Men Built Religion, Women Made It Superstitious*:** In modern China, "superstition" was gendered female while "religion" was gendered male — divination sits in a gendered power field.

**Gap:** Existing gender-bias tools (Gender Decoder) target workplace language, not divination. AI命理 apps optimize insight, not critique. No public tool combines BaZi + astrology + bias tagging + AI reframe for young users.

**My angle:** Digital humanities + feminist narrative analysis + AI-assisted reframing in one short interactive journey.

## Research Design / Method

**Artifact:** Reframe Destiny — a web prototype where users choose BaZi or astrology, read a simulated traditional reading, scan for bias categories, compare an AI-reframed version, and write one sentence of their own response.

**Participants:** 15–25 young people (ages 15–35, men and women) who have encountered divination narratives.

**Data collection:** Pre/post 5-item Likert survey on bias awareness and reframing confidence; log chosen system, identified bias tags, one written reflection, completion status, and a 1–5 usefulness rating. Optional 3–5 short interviews.

**Analysis:** Compare pre/post Likert means; thematic coding of written reflections. No real birth data collected; readings are simulated.

**Limits:** Small sample, self-selected users, prototype uses mock AI text (not live API yet), short session (~15 min).

## Research Plan & Challenges

| Phase | Target | Status |
|-------|--------|--------|
| Literature review | May 2026 | Done — research/ folder |
| MVP prototype | June 2026 | Done — live on GitHub Pages |
| Midterm defense | June 20, 2026 | Done |
| User study (15–25) | July 2026 | Not started |
| Supabase data backend + live AI | June–July 2026 | In progress |
| Final paper (3000–5000 words) | August 2026 | Not started |

**Challenges:** Collecting enough participants; ensuring AI reframe quality without leaking API keys; China network access to hosting.

**Plan B:** If live AI is delayed, run the study with curated mock reframes and note this limit honestly in the paper.

## Expected Results — user study not yet run

I expect that after one Reframe Destiny session, participants will:

- Score higher on items like "I can recognize gender stereotypes in BaZi or astrology readings."
- Score higher on "I feel able to question a reading instead of accepting it as destiny."
- Write reflections that name specific bias types (marriage centrism, ke-fu narrative, fear narrative).

I have **not** run the user study yet. There are no user counts, percentages, or statistical results to report.

The live prototype demonstrates the core loop: read → tag bias → compare reframe → write one sentence. A screenshot of the deployed site will go on this slide.

## References

Bender, E. M., Gebru, T., McMillan-Major, A., & Shmitchell, S. (2021). On the dangers of stochastic parrots: Can language models be too big? *Proceedings of FAccT*, 610–623.

Butler, J. (1990). *Gender trouble: Feminism and the subversion of identity*. Routledge.

Foucault, M. (1972). *The archaeology of knowledge*. Pantheon Books.

Haraway, D. (1988). Situated knowledges: The science question in feminism and the privilege of partial perspective. *Feminist Studies*, 14(3), 575–599.

Valussi, E. (2020). Men built religion, women made it superstitious: Gender and the discourse on superstition in early 20th century China. *Journal of Chinese Religions*, 48(2), 127–152.

## Acknowledgements

Thank you to Research Advisor Lawted Wu for guidance on scoping this project and for feedback during the midterm defense.
