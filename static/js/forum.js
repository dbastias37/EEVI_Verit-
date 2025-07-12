function voteTopic(id, direction){
  fetch('/forum/vote-topic',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:id,direction:direction})});
}
function votePost(id, direction){
  fetch('/forum/vote-post',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:id,direction:direction})});
}
function showNewTopic(){document.getElementById('modal-new').style.display='block';}
function hideNewTopic(){document.getElementById('modal-new').style.display='none';}

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.quote-slide');
  let idx = 0;
  const showSlide = i => {
    slides.forEach((s, j) => s.classList.toggle('active', j === i));
  };
  showSlide(idx);
  setInterval(() => {
    idx = (idx + 1) % slides.length;
    showSlide(idx);
  }, 16000); // 14s visible + 2s fade transitions
});
