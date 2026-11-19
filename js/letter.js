// Birthday letter: the envelope appears after the bouquet has bloomed,
// tapping the wax seal opens it and shows the full letter.
(() => {
  const stage = document.getElementById('envelope-stage');
  const envelope = document.getElementById('envelope');
  const seal = document.getElementById('seal');
  const hint = document.getElementById('envelope-hint');
  const view = document.getElementById('letter-view');
  const closeBtn = document.getElementById('letter-close');

  // Time after page load before the envelope slides in (bouquet finishes ~6s).
  // Add ?letter to the URL to show it straight away while testing.
  const SHOW_AFTER_MS = new URLSearchParams(location.search).has('letter') ? 300 : 7500;
  const OPEN_ANIMATION_MS = 1500;

  let opening = false;

  window.addEventListener('load', () => {
    setTimeout(() => stage.classList.add('is-visible'), SHOW_AFTER_MS);
  });

  function showLetter() {
    stage.classList.add('is-away');
    view.classList.add('is-open');
    view.setAttribute('aria-hidden', 'false');
    closeBtn.focus({ preventScroll: true });
  }

  function hideLetter() {
    view.classList.remove('is-open');
    view.setAttribute('aria-hidden', 'true');
    stage.classList.remove('is-away');
    hint.textContent = 'tap to read again ♡';
    envelope.focus({ preventScroll: true });
  }

  seal.addEventListener('click', (event) => {
    event.stopPropagation();
    if (opening) return;
    opening = true;
    stage.classList.add('is-opening');
    hint.textContent = '';

    setTimeout(() => {
      stage.classList.remove('is-opening');
      stage.classList.add('is-opened');
      envelope.setAttribute('role', 'button');
      envelope.setAttribute('tabindex', '0');
      envelope.setAttribute('aria-label', 'Read the letter again');
      showLetter();
    }, OPEN_ANIMATION_MS);
  });

  // After the first opening, tapping the envelope shows the letter again.
  envelope.addEventListener('click', () => {
    if (stage.classList.contains('is-opened')) showLetter();
  });
  envelope.addEventListener('keydown', (event) => {
    if ((event.key === 'Enter' || event.key === ' ') && stage.classList.contains('is-opened')) {
      event.preventDefault();
      showLetter();
    }
  });

  closeBtn.addEventListener('click', hideLetter);
  view.addEventListener('click', (event) => {
    if (event.target === view) hideLetter();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && view.classList.contains('is-open')) hideLetter();
  });
})();
