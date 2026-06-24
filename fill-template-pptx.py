#!/usr/bin/env python3
"""Fill official Generation AI midterm template with Reframe Destiny content."""
from copy import deepcopy
from pptx import Presentation
from pptx.util import Pt
from pptx.dml.color import RGBColor
import shutil
import os

TEMPLATE = os.path.expanduser("~/Desktop/副本Generation-AI 中期汇报模版.pptx")
OUTPUT = os.path.join(os.path.dirname(__file__), "midterm-final.pptx")

NAME = "Xinyun Zhang (张馨云)"
ADVISOR = "Lawted Wu"
TITLE = "Reframe Destiny: Detecting and Reframing Gendered Narrative Bias in BaZi and Western Astrology"

SLIDES = {
    2: {  # Title (slide index 1-based in file; slide1 is instructions)
        "title": TITLE,
        "body": f"Student Name: {NAME}\nResearch Advisor: {ADVISOR}\nGeneration AI 2026 · Social Science Track"
    },
    3: {
        "title": "Research Question",
        "body": (
            "Research Question:\n"
            "How does an AI-assisted interactive website affect young women's ability to "
            "identify and reframe gendered narrative bias in traditional BaZi and Western "
            "astrological readings?\n\n"
            "Hypothesis:\n"
            "I hypothesize that after using Reframe Destiny, young women will show increased "
            "awareness of gender bias in divination narratives and greater confidence in "
            "reframing these narratives for themselves."
        )
    },
    4: {
        "title": "Background",
        "body": (
            "• Many young women encounter BaZi or astrology through family, social media, or apps.\n"
            "• These systems tell stories about marriage, morality, and life paths — not just personality.\n"
            "• The same chart element can mean \"ambitious leader\" for men but \"too strong\" or "
            "\"harmful to husband\" for women.\n"
            "• This project does NOT ask whether divination is true. It asks: who narrates your fate, "
            "and does that narration carry gender bias?\n"
            "• Reframe Destiny is an interactive critical tool — not a fortune-telling app."
        )
    },
    5: {
        "title": "Literature Review",
        "body": (
            "• Butler (1990): Gender is performed through cultural narratives — divination labels "
            "like \"good wife\" perform gender.\n"
            "• Foucault (1972): Discourse shapes what counts as knowledge; fortune-telling language "
            "can discipline without claiming to be political.\n"
            "• Haraway (1988): Who interprets matters — same chart, different meanings.\n"
            "• Bender et al. (2021): AI reproduces bias; here AI is a lens for critique, not an oracle.\n"
            "• Gap: No interactive tool lets users compare gender perspectives and reframe narratives.\n"
            "• My contribution: cross-cultural (BaZi + astrology) + interactive bias discovery."
        )
    },
    6: {
        "title": "Research Design / Method",
        "body": (
            "Artifact: Reframe Destiny — bilingual website, 7-step Journey:\n"
            "BaZi or astrology → traditional reading → Bias Scanner (7 categories) → "
            "Court of Destiny → AI Reframe → collect bias fragments.\n\n"
            "Planned participants: 15–25 young women, age 17–34.\n"
            "Procedure: Pre-survey → 15-min session → post-survey → 5 interviews.\n"
            "Analysis: Pre/post Likert scores; bias category frequency; reflection themes.\n"
            "Content analysis: Coding 40 traditional readings for 7 bias types.\n"
            "Note: User study NOT yet run — midterm shows design only."
        )
    },
    7: {
        "title": "Research Plan and Challenges",
        "body": (
            "Timeline:\n"
            "• Week 2: Idea + GitHub — Done\n"
            "• Week 3–4: Research archive + interactive prototype — Done\n"
            "• Midterm (June 25): Defense — In progress\n"
            "• Late June: User study (n=15–25) — Planned\n"
            "• July: Final paper (3000–5000 words, APA) — Planned\n\n"
            "Challenges: Missed 4–5 classes; user study not started; need 2 more academic sources.\n"
            "Plan: Run user study after midterm; add mentor's \"gender switch\" level to Journey."
        )
    },
    8: {
        "title": "Preliminary Results — Expected Results — user study not yet run",
        "body": (
            "I have NOT collected user data yet. Expected outcomes:\n\n"
            "• Users will most often identify marriage centrism and gender role stereotypes.\n"
            "• Pre/post bias-awareness scores will increase after one session.\n"
            "• Side-by-side traditional vs. reframed reading will feel more empowering.\n"
            "• Informal prototype testing (n=1–2): 7-step flow works; 3 bias fragments unlock per journey.\n\n"
            "[Insert prototype screenshot here — Bias Scanner or homepage]"
        )
    },
    9: {
        "title": "References",
        "body": (
            "Bender, E. M., Gebru, T., McMillan-Major, A., & Shmitchell, S. (2021). On the dangers "
            "of stochastic parrots. FAccT, 610–623.\n\n"
            "Butler, J. (2006). Gender trouble. Routledge.\n\n"
            "Foucault, M. (1972). The archaeology of knowledge. Pantheon.\n\n"
            "Haraway, D. (1988). Situated knowledges. Feminist Studies, 14(3), 575–599.\n\n"
            "Vyse, S. (2018). Believing in magic. Oxford University Press."
        )
    },
    10: {
        "title": "Thank you for your constructive feedbacks!",
        "body": f"Student Name: {NAME}\nResearch Advisor: {ADVISOR}"
    },
}


def set_run_font(run, size=14, bold=False):
    run.font.name = "Times New Roman"
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = RGBColor(0x33, 0x33, 0x33)


def replace_slide_content(slide, title_text, body_text):
    """Replace text in slide shapes while keeping layout."""
    if not slide.shapes:
        return

    # Find title and content placeholders
    title_shape = None
    body_shape = None

    for shape in slide.shapes:
        if not shape.has_text_frame:
            continue
        try:
            ph = shape.placeholder_format
            if ph.type == 1:
                title_shape = shape
            elif ph.type in (2, 7, 14):
                body_shape = shape
        except ValueError:
            pass

    # Fallback: use first two text shapes
    text_shapes = [s for s in slide.shapes if s.has_text_frame]
    if title_shape is None and text_shapes:
        title_shape = text_shapes[0]
    if body_shape is None and len(text_shapes) > 1:
        body_shape = text_shapes[1]

    if title_shape:
        tf = title_shape.text_frame
        tf.clear()
        p = tf.paragraphs[0]
        run = p.add_run()
        run.text = title_text
        set_run_font(run, size=28, bold=True)

    if body_shape:
        tf = body_shape.text_frame
        tf.clear()
        tf.word_wrap = True
        lines = body_text.split('\n')
        for i, line in enumerate(lines):
            p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
            p.level = 0
            run = p.add_run()
            run.text = line
            set_run_font(run, size=14)
            p.line_spacing = 1.15


def main():
    if not os.path.exists(TEMPLATE):
        print(f"Template not found: {TEMPLATE}")
        return 1

    shutil.copy(TEMPLATE, OUTPUT)
    prs = Presentation(OUTPUT)

    # Remove slide 1 (instructions) — index 0
    rId = prs.slides._sldIdLst[0].rId
    prs.part.drop_rel(rId)
    del prs.slides._sldIdLst[0]

    # Now slides are re-indexed: 0=title, 1=RQ, etc.
    # Map original slide numbers to new indices (original - 2)
    mapping = {2: 0, 3: 1, 4: 2, 5: 3, 6: 4, 7: 5, 8: 6, 9: 7, 10: 8}

    for orig_num, content in SLIDES.items():
        idx = mapping[orig_num]
        if idx < len(prs.slides):
            replace_slide_content(
                prs.slides[idx],
                content["title"],
                content["body"]
            )

    prs.save(OUTPUT)
    print(f"Created: {OUTPUT}")
    print(f"Slides: {len(prs.slides)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
