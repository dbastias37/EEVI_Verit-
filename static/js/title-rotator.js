'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const words1 = ['SONIDO', 'IMAGEN', 'SOLUCIÓN'];
  const words2 = ['AUTÉNTICOS', 'ORIGINALES', 'INSPIRADORES', 'VIBRANTES', 'PROFESIONALES', 'MAGNIFICOS'];
  const el1 = document.getElementById('wordPrimary');
  const el2 = document.getElementById('wordSecondary');

  let i1 = 0;
  let i2 = 0;

  const fadeIn = 4000;
  const fadeOut = 1000;
  const visible1 = 10000;
  const visibleOptions = [12000, 13000, 15000];

  function cyclePrimary() {
    el1.classList.remove('show');
    setTimeout(() => {
      i1 = (i1 + 1) % words1.length;
      el1.textContent = words1[i1];
      el1.classList.add('show');
    }, fadeOut);
    setTimeout(cyclePrimary, fadeOut + fadeIn + visible1);
  }

  function cycleSecondary() {
    const visible2 = visibleOptions[Math.floor(Math.random() * visibleOptions.length)];
    el2.classList.remove('show');
    setTimeout(() => {
      i2 = (i2 + 1) % words2.length;
      el2.textContent = words2[i2];
      el2.classList.add('show');
    }, fadeOut);
    setTimeout(cycleSecondary, fadeOut + fadeIn + visible2);
  }

  el1.classList.add('show');
  el2.classList.add('show');
  setTimeout(cyclePrimary, fadeOut + fadeIn + visible1);
  setTimeout(cycleSecondary, fadeOut + fadeIn + visibleOptions[Math.floor(Math.random() * visibleOptions.length)]);
});
