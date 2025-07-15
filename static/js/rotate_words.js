// words that will replace "Creadores de contenido"
const words = [
  "Filmmakers",
  "Desarrolladores de videojuegos",
  "Editores",
  "Audiovisuales",
  "Youtubers"
];

document.addEventListener('DOMContentLoaded', () => {
  const span = document.getElementById('dynamic-word');
  let index = 0;

  const fadeIn = 1000;
  const fadeOut = 500;
  const minVisible = 4000;
  const maxVisible = 7000;

  function randomVisible() {
    return Math.floor(Math.random() * (maxVisible - minVisible + 1)) + minVisible;
  }

  function cycle() {
    const visible = randomVisible();
    span.classList.remove('show');
    setTimeout(() => {
      index = (index + 1) % words.length;
      span.textContent = words[index];
      span.classList.add('show');
    }, fadeOut);
    setTimeout(cycle, fadeOut + fadeIn + visible);
  }

  span.classList.add('rotator', 'fade', 'show');
  const start = randomVisible();
  setTimeout(cycle, fadeOut + fadeIn + start);
});
