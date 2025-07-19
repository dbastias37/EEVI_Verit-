(function(){
  document.querySelector('a[href="/dashboard"]').onclick = (e)=>{
     if(!window.currentUser){ e.preventDefault(); window.location='/forum#login'; }
  };
  document.querySelector('a[href="/forum#search"]').onclick = (e)=>{
     if(!window.currentUser){ e.preventDefault(); window.location='/forum#login'; }
  };
})();
