/* Pre/post Likert survey — same 5 questions, tied to research hypothesis */

const SURVEY_SESSION_KEY = 'rd-research-session';
const SURVEY_PRE_DONE_KEY = 'rd-pre-done';

const SURVEY_QUESTIONS = [
  { id: 'bias_awareness', i18n: 'survey.q1' },
  { id: 'reframe_confidence', i18n: 'survey.q2' },
  { id: 'gender_lens', i18n: 'survey.q3' },
  { id: 'personal_agency', i18n: 'survey.q4' },
  { id: 'spot_stereotypes', i18n: 'survey.q5' }
];

function getResearchSessionId() {
  return sessionStorage.getItem(SURVEY_SESSION_KEY);
}

function ensureResearchSessionId() {
  let id = getResearchSessionId();
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SURVEY_SESSION_KEY, id);
  }
  return id;
}

function hasPreSurveyForSession() {
  return sessionStorage.getItem(SURVEY_PRE_DONE_KEY) === 'yes' && !!getResearchSessionId();
}

function clearResearchSession() {
  sessionStorage.removeItem(SURVEY_SESSION_KEY);
  sessionStorage.removeItem(SURVEY_PRE_DONE_KEY);
}

function renderSurveyQuestions() {
  const list = document.getElementById('survey-questions');
  if (!list) return;

  list.innerHTML = SURVEY_QUESTIONS.map((q, i) => `
    <fieldset class="survey-item" data-qid="${q.id}">
      <legend class="survey-item__label">${i + 1}. ${t(q.i18n)}</legend>
      <div class="survey-scale" role="radiogroup" aria-label="${t(q.i18n)}">
        ${[1, 2, 3, 4, 5].map(n => `
          <label class="survey-scale__option">
            <input type="radio" name="survey-${q.id}" value="${n}">
            <span class="survey-scale__num">${n}</span>
            <span class="survey-scale__hint">${n === 1 ? t('survey.scaleLow') : n === 5 ? t('survey.scaleHigh') : ''}</span>
          </label>
        `).join('')}
      </div>
    </fieldset>
  `).join('');
}

function collectSurveyAnswers() {
  const answers = {};
  for (const q of SURVEY_QUESTIONS) {
    const picked = document.querySelector(`input[name="survey-${q.id}"]:checked`);
    if (!picked) return null;
    answers[q.id] = Number(picked.value);
  }
  return answers;
}

function openSurveyModal(phase, onDone) {
  const gate = document.getElementById('survey-gate');
  const title = document.getElementById('survey-title');
  const lead = document.getElementById('survey-lead');
  const submitBtn = document.getElementById('survey-submit');
  const err = document.getElementById('survey-error');

  if (!gate) {
    onDone?.();
    return;
  }

  title.textContent = phase === 'pre' ? t('survey.preTitle') : t('survey.postTitle');
  lead.textContent = phase === 'pre' ? t('survey.preLead') : t('survey.postLead');
  submitBtn.textContent = phase === 'pre' ? t('survey.preSubmit') : t('survey.postSubmit');
  err.textContent = '';
  err.hidden = true;

  renderSurveyQuestions();
  gate.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  submitBtn.onclick = async () => {
    const answers = collectSurveyAnswers();
    if (!answers) {
      err.textContent = t('survey.errorIncomplete');
      err.hidden = false;
      return;
    }

    const sessionId = ensureResearchSessionId();
    const ok = await submitResearch({
      submission_type: phase === 'pre' ? 'survey_pre' : 'survey_post',
      session_id: sessionId,
      survey_answers: answers,
      lang: currentLang
    });

    if (!ok) {
      err.textContent = t('survey.errorSubmit');
      err.hidden = false;
      return;
    }

    if (phase === 'pre') {
      sessionStorage.setItem(SURVEY_PRE_DONE_KEY, 'yes');
    } else {
      clearResearchSession();
    }

    gate.classList.add('hidden');
    document.body.style.overflow = '';
    onDone?.();
  };
}

function showPreSurvey(onDone) {
  openSurveyModal('pre', onDone);
}

function showPostSurvey(onDone) {
  openSurveyModal('post', onDone);
}

function onSurveyLangChange() {
  if (!document.getElementById('survey-gate')?.classList.contains('hidden')) {
    renderSurveyQuestions();
  }
}
