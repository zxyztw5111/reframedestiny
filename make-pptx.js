/**
 * Generate midterm.pptx from midterm-draft.md
 * Generation AI 2026 — official format
 */
const fs = require('fs');
const path = require('path');
const pptxgen = require('pptxgenjs');

const FONT = 'Times New Roman';
const TITLE_SIZE = 28;
const BODY_SIZE = 14;
const LINE_SP = 1.15;

function parseDraft(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const sections = {};
  const parts = text.split(/^## /m).slice(1);
  for (const part of parts) {
    const nl = part.indexOf('\n');
    const title = part.slice(0, nl).trim();
    const body = part.slice(nl + 1).trim();
    sections[title] = body;
  }
  return sections;
}

function addSlide(pptx, title, bullets, options = {}) {
  const slide = pptx.addSlide();
  slide.addText(title, {
    x: 0.5, y: 0.35, w: 9, h: 0.8,
    fontFace: FONT, fontSize: TITLE_SIZE, bold: true, color: '1a1a2e'
  });

  if (options.placeholder) {
    slide.addText(bullets, {
      x: 0.5, y: 1.3, w: 4.5, h: 5,
      fontFace: FONT, fontSize: BODY_SIZE, lineSpacingMultiple: LINE_SP,
      color: '333333', valign: 'top'
    });
    slide.addShape(pptx.shapes.RECTANGLE, {
      x: 5.3, y: 1.8, w: 4, h: 3.5,
      fill: { color: 'F5F5F5' },
      line: { color: '999999', width: 1, dashType: 'dash' }
    });
    slide.addText('Insert prototype screenshot here', {
      x: 5.3, y: 3.1, w: 4, h: 0.6,
      fontFace: FONT, fontSize: 12, color: '888888', align: 'center'
    });
    return;
  }

  slide.addText(bullets, {
    x: 0.5, y: 1.2, w: 9, h: 5.5,
    fontFace: FONT, fontSize: BODY_SIZE, lineSpacingMultiple: LINE_SP,
    color: '333333', valign: 'top'
  });
}

function bodyToBullets(text, maxLines = 8) {
  const lines = text
    .split('\n')
    .map(l => l.replace(/^[-*#]\s*/, '').replace(/\*\*/g, '').trim())
    .filter(l => l && !l.startsWith('TODO') && !l.startsWith('|') && !l.startsWith('---'));
  return lines.slice(0, maxLines).map(l => ({ text: l, options: { bullet: true, breakLine: true } }));
}

async function main() {
  const draftPath = path.join(__dirname, 'midterm-draft.md');
  if (!fs.existsSync(draftPath)) {
    console.error('midterm-draft.md not found');
    process.exit(1);
  }

  const s = parseDraft(draftPath);
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Xinyun Zhang';

  // Slide 1 — Title
  const slide1 = pptx.addSlide();
  slide1.addText('Reframe Destiny', {
    x: 0.5, y: 2.0, w: 9, h: 1,
    fontFace: FONT, fontSize: 36, bold: true, align: 'center', color: '1a1a2e'
  });
  slide1.addText('Detecting and Reframing Gendered Narrative Bias\nin BaZi and Western Astrology', {
    x: 0.5, y: 2.9, w: 9, h: 0.8,
    fontFace: FONT, fontSize: 18, align: 'center', color: '444444'
  });
  slide1.addText('Xinyun Zhang (张馨云)\nResearch Advisor: Lawted Wu\nGeneration AI 2026 · Social Science Track', {
    x: 0.5, y: 4.2, w: 9, h: 1.2,
    fontFace: FONT, fontSize: BODY_SIZE, align: 'center', color: '666666', lineSpacingMultiple: LINE_SP
  });

  // Slide 2 — RQ
  addSlide(pptx, 'Research Question & Hypothesis', [
    { text: 'Research Question:', options: { bold: true, breakLine: true } },
    { text: 'How does an AI-assisted interactive website affect young women\'s ability to identify and reframe gendered narrative bias in traditional BaZi and Western astrological readings?', options: { bullet: true, breakLine: true } },
    { text: 'Hypothesis:', options: { bold: true, breakLine: true } },
    { text: 'I hypothesize that after using Reframe Destiny, young women will show increased awareness of gender bias in divination narratives and greater confidence in reframing these narratives for themselves.', options: { bullet: true, breakLine: true } }
  ]);

  // Slide 3 — Background
  addSlide(pptx, 'Background', bodyToBullets(s['Background'] || '', 6));

  // Slide 4 — Literature Review
  addSlide(pptx, 'Literature Review', bodyToBullets(s['Literature Review'] || '', 7));

  // Slide 5 — Method
  addSlide(pptx, 'Research Design / Method', bodyToBullets(s['Research Design / Method'] || '', 8));

  // Slide 6 — Plan
  addSlide(pptx, 'Research Plan & Challenges', bodyToBullets(s['Research Plan & Challenges'] || '', 8));

  // Slide 7 — Expected Results (official title)
  addSlide(pptx, 'Preliminary Results — Expected Results — user study not yet run', bodyToBullets(s['Preliminary Results — Expected Results — user study not yet run'] || '', 6), { placeholder: true });

  // Slide 8 — References
  const refs = (s['References'] || '').split('\n').filter(l => l.trim() && !l.startsWith('---'));
  addSlide(pptx, 'References', refs.map(r => ({ text: r.trim(), options: { bullet: true, breakLine: true, fontSize: 12 } })));

  // Slide 9 — Acknowledgements
  addSlide(pptx, 'Acknowledgements', bodyToBullets(s['Acknowledgements'] || 'Thank you to Research Advisor Lawted Wu.', 3));

  const outPath = path.join(__dirname, 'midterm.pptx');
  await pptx.writeFile({ fileName: outPath });
  console.log('Created:', outPath);
}

main().catch(err => { console.error(err); process.exit(1); });
