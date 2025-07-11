function voteTopic(id, direction){
  fetch('/forum/vote-topic',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:id,direction:direction})});
}
function votePost(id, direction){
  fetch('/forum/vote-post',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:id,direction:direction})});
}
function showNewTopic(){document.getElementById('modal-new').style.display='block';}
function hideNewTopic(){document.getElementById('modal-new').style.display='none';}
