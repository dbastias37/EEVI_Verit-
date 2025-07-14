'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const words1 = ['SONIDO', 'IMAGEN', 'SOLUCIÓN'];
  const words2 = ['AUTÉNTICOS', 'ORIGINALES', 'INSPIRADORES', 'VIBRANTES', 'PROFESIONALES', 'MAGNIFICOS'];
  const el1 = document.getElementById('wordPrimary');
  const el2 = document.getElementById('wordSecondary');

  let i1 = 0;
  let i2 = 0;

  const fadeIn = 1000;
  const fadeOut = 500;
  const minVisible = 4000;
  const maxVisible = 7000;

  function randomVisible() {
    return Math.floor(Math.random() * (maxVisible - minVisible + 1)) + minVisible;
  }

  function cyclePrimary() {
    const visible = randomVisible();
    el1.classList.remove('show');
    setTimeout(() => {
      i1 = (i1 + 1) % words1.length;
      el1.textContent = words1[i1];
      el1.classList.add('show');
    }, fadeOut);
    setTimeout(cyclePrimary, fadeOut + fadeIn + visible);
  }

  function cycleSecondary() {
    const visible = randomVisible();
    el2.classList.remove('show');
    setTimeout(() => {
      i2 = (i2 + 1) % words2.length;
      el2.textContent = words2[i2];
      el2.classList.add('show');
    }, fadeOut);
    setTimeout(cycleSecondary, fadeOut + fadeIn + visible);
  }

  el1.classList.add('show');
  el2.classList.add('show');

  const start1 = randomVisible();
  let start2 = randomVisible();
  if (Math.abs(start1 - start2) < 500) {
    start2 += 1000;
  }
  setTimeout(cyclePrimary, fadeOut + fadeIn + start1);
  setTimeout(cycleSecondary, fadeOut + fadeIn + start2);
});
