// words that will replace "Creadores de contenido"
const words = [
  "Filmmakers",
  "Desarrolladores de videojuegos",
  "Editores",
  "Audiovisuales",
  "Youtubers"
];

const span   = document.getElementById("dynamic-word");
let index    = 0;

function rotate() {
  // remove previous animation class to restart it
  span.classList.remove("word-anim");
  // queue the DOM update so the animation restarts
  requestAnimationFrame(() => {
    span.textContent = words[index];
    span.classList.add("word-anim");
    index = (index + 1) % words.length;
  });
}
rotate();                               // first run
setInterval(rotate, 10000);             // 10 s = 1 s fade-in + 8 s visible + 1 s fade-out
