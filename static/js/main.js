document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.latest-topic-card, .service-card, .pack-card').forEach(el => {
    observer.observe(el);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const reveal = (el) => {
    el.classList.add('visible');
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) reveal(e.target); });
  }, { threshold: 0.1 });

  document.querySelectorAll('.forum-new main > *').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('.nav-link').forEach(link =>
      link.addEventListener('click', () => nav.classList.remove('open'))
    );
  }
});


function drawWaveform(url, canvas, ctx) {
  fetch(url)
    .then(r => r.arrayBuffer())
    .then(buf => ctx.decodeAudioData(buf))
    .then(data => {
      const raw = data.getChannelData(0);
      const step = Math.ceil(raw.length / canvas.width);
      const amp = canvas.height / 2;
      const c = canvas.getContext('2d');
      c.clearRect(0, 0, canvas.width, canvas.height);
      c.fillStyle = '#00d4b8';
      for (let i = 0; i < canvas.width; i++) {
        let min = 1.0;
        let max = -1.0;
        for (let j = 0; j < step; j++) {
          const datum = raw[i * step + j];
          if (datum < min) min = datum;
          if (datum > max) max = datum;
        }
        c.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
      }
    })
    .catch(() => {});
}

function initWavePlayers() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioCtx();
  document.querySelectorAll('[data-audio]').forEach(container => {
    const url = container.dataset.audio;
    const audio = new Audio(url);
    const control = container.querySelector('.audio-control');
    const playIcon = control.querySelector('.play');
    const pauseIcon = control.querySelector('.pause');
    const canvas = container.querySelector('canvas');
    drawWaveform(url, canvas, audioCtx);
    control.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
      } else {
        audio.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initWavePlayers);
