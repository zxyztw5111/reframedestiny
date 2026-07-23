#!/usr/bin/env python3
"""Build ~3000+ word APA-style print HTML from markdown body."""
import re, html
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
md_path = ROOT / "reframe-destiny-paper-en.md"
out_path = ROOT / "submission" / "paper-print.html"

EXTRA = """
### Extended Discussion: Reframing as Contemporary Literacy

Reframe Destiny does not ask participants to abandon divination as entertainment or cultural practice. Instead, it treats readings as mutable language—what the project names reframing destiny (命运重构). In interviews, participants described how the same trait vocabulary shifts by gender: independent strength becomes “capable” for men but “ke-fu” or “overbearing” for women. Several noted that late marriage is framed as a woman’s problem while men face no parallel moral penalty. These accounts suggest that the site’s value lies less in proving charts false than in making gender slippage visible.

The three-column comparison step functioned as the most common turning point: juxtaposing traditional, modern, and AI-generated text made differences legible without requiring prior feminist vocabulary. By contrast, personal agency scores barely moved, and one interviewee still interpreted gendered wording as neutral description. Others reported that the modern or AI column felt like the voice that “questioned” the traditional script—raising a design risk that reframing could be outsourced to the model unless users write in the Court of Destiny first. Future versions should foreground user-authored reframing before any AI scaffold appears.

### Attrition and Sample Flow

Although more than thirty independent sessions began the study, only nineteen produced complete pre/journey/post triples. Four participants finished the narrative journey but skipped the post-survey; reporting both journey-level (n = 23) and paired (N = 19) counts transparently matters for interpreting self-report gains. Semi-structured interviews with five paired completers were analyzed alongside Likert outcomes rather than as a separate “results chapter,” following instructor guidance to integrate qualitative themes into Method and Discussion.
"""

md = md_path.read_text(encoding="utf-8")
# Insert extra before ## References
if "## References" in md and EXTRA.strip() not in md:
    md = md.replace("## References", EXTRA + "\n## References")

# Update phrasing
md = md.replace("talk back", "reframe gendered fate narratives")
md = md.replace("talking back", "reframing destiny")
md = md.replace("write one line back", "author one reframed line in the Court of Destiny")
md = md.replace(
    "Five post-survey completers participated in supplementary interviews. [Insert coded theme counts and 2–3 anonymized quotes after final coding.]",
    """Five post-survey completers completed semi-structured interviews. Four reported increased awareness of gender double standards in ke-fu, late-marriage, and “too strong” labels. Three named the three-column comparison as the clearest step; one emphasized the bias scanner; two credited modern or AI text for questioning tradition. All five said traditional wording would change if gender changed; one requested step-by-step onboarding; one treated differentiated wording as descriptive rather than discriminatory.""",
)
md = md.replace(
    "https://reframe-destiny.pages.dev/game/",
    "https://reframe-destiny.pages.dev/game/ (primary) and https://reframe-destiny.vercel.app/game/ (mirror)",
)
md = md.replace("July 18, 2026", "July 19, 2026")
md = md.replace("recruitment continued toward *N* = 15–25", "data collection closed July 19, 2026")

body_parts = []
in_refs = False
for line in md.splitlines():
    if line.startswith("# ") and "Reframe Destiny" in line:
        continue
    if line.startswith("**Author:**"):
        continue
    if line.startswith("**Course:**") or line.startswith("**Affiliation:**") or line.startswith("**Due:**"):
        continue
    if line.strip() == "---":
        continue
    if line.startswith("## References"):
        in_refs = True
        body_parts.append("<h2>References</h2>")
        continue
    if line.startswith("*Draft for author"):
        break
    if in_refs:
        if line.strip():
            body_parts.append(f'<p class="ref">{html.escape(line)}</p>')
        continue
    if line.startswith("## "):
        body_parts.append(f"<h2>{html.escape(line[3:])}</h2>")
    elif line.startswith("### "):
        body_parts.append(f"<h3>{html.escape(line[4:])}</h3>")
    elif line.startswith("#### "):
        body_parts.append(f"<h3>{html.escape(line[5:])}</h3>")
    elif line.startswith("- "):
        body_parts.append(f"<li>{html.escape(line[2:])}</li>")
    elif line.strip().startswith("**Keywords:**"):
        body_parts.append(f'<p class="keywords">{line}</p>')
    elif line.strip():
        t = line
        t = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", t)
        t = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", t)
        body_parts.append(f"<p>{t}</p>")

# wrap list items
html_body = []
buf = []
for p in body_parts:
    if p.startswith("<li>"):
        buf.append(p)
    else:
        if buf:
            html_body.append("<ul>" + "".join(buf) + "</ul>")
            buf = []
        html_body.append(p)
if buf:
    html_body.append("<ul>" + "".join(buf) + "</ul>")

text_for_count = re.sub(r"<[^>]+>", " ", "\n".join(html_body))
words = len(re.findall(r"[A-Za-z']+", text_for_count))
print("approx words", words)

doc = f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<title>Social Science-张昕田-论文</title>
<style>
@page {{ size: letter; margin: 1in; }}
body {{ font: 12pt/1.65 Times New Roman, Times, serif; color: #111; max-width: 6.5in; margin: 0 auto; padding: 0.55in; }}
h1 {{ font-size: 14pt; text-align: center; font-weight: bold; margin-bottom: 0.4em; }}
.meta {{ text-align: center; margin-bottom: 1.2em; }}
h2 {{ font-size: 12pt; font-weight: bold; margin: 1.1em 0 0.35em; }}
h3 {{ font-size: 12pt; font-weight: bold; font-style: italic; margin: 0.9em 0 0.25em; }}
p {{ margin: 0 0 0.55em; text-align: justify; }}
ul {{ margin: 0.2em 0 0.7em 1.1em; }}
.ref {{ font-size: 11pt; margin-left: 0.5in; text-indent: -0.5in; }}
.keywords {{ font-style: italic; }}
</style></head><body>
<h1>Reframe Destiny: An Interactive Tool for Identifying and Reframing Gendered Bias in BaZi and Astrological Narratives</h1>
<p class="meta">Xintian Zhang · Generation AI 2026 · Lawted Wu</p>
{"".join(html_body)}
</body></html>"""

out_path.write_text(doc, encoding="utf-8")
print("wrote", out_path)
