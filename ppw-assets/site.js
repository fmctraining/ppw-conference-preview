/* Close the mobile nav menu when a link inside it is tapped */
document.addEventListener('click', function(e){
  var link = e.target.closest('header.nav .nav-links a');
  if (link) { var h = link.closest('header.nav'); if (h) h.classList.remove('open'); }
});

/* In-page lightbox for gallery images (replaces open-in-new-tab) */
(function(){
  var css = '\
.ppw-lb{position:fixed;inset:0;z-index:9999;background:rgba(5,8,14,.94);display:none;align-items:center;justify-content:center;padding:18px}\
.ppw-lb.on{display:flex}\
.ppw-lb img{max-width:94vw;max-height:90vh;border-radius:8px;box-shadow:0 30px 90px rgba(0,0,0,.6);user-select:none}\
.ppw-lb-x{position:fixed;top:16px;right:18px;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.32);color:#fff;font-size:24px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(6px)}\
.ppw-lb-nav{position:fixed;top:50%;transform:translateY(-50%);width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.28);color:#fff;font-size:30px;line-height:0;padding-bottom:4px;cursor:pointer;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(6px)}\
.ppw-lb-nav.prev{left:14px}.ppw-lb-nav.next{right:14px}\
.ppw-lb-x:hover,.ppw-lb-nav:hover{background:rgba(255,255,255,.26)}\
@media(max-width:600px){.ppw-lb-nav{width:42px;height:42px;font-size:26px}.ppw-lb-x{top:12px;right:12px}}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  var lb=document.createElement('div'); lb.className='ppw-lb';
  lb.innerHTML='<button class="ppw-lb-x" aria-label="Close">×</button>'
    +'<button class="ppw-lb-nav prev" aria-label="Previous">‹</button>'
    +'<img alt="">'
    +'<button class="ppw-lb-nav next" aria-label="Next">›</button>';
  document.body.appendChild(lb);
  var img=lb.querySelector('img'), navs=lb.querySelectorAll('.ppw-lb-nav');
  var group=[], idx=0;

  function isImgLink(a){ return a && /\.(webp|jpe?g|png)$/i.test(a.getAttribute('href')||'') && a.querySelector('img'); }
  function show(i){ if(!group.length)return; idx=(i+group.length)%group.length; img.src=group[idx].getAttribute('href'); }
  function open(a){
    var parent=a.parentElement;
    group=Array.prototype.slice.call(parent.querySelectorAll('a')).filter(isImgLink);
    if(group.indexOf(a)<0) group=[a];
    idx=group.indexOf(a); img.src=a.getAttribute('href');
    for(var n=0;n<navs.length;n++) navs[n].style.display = group.length>1?'flex':'none';
    lb.classList.add('on'); document.body.style.overflow='hidden';
  }
  function close(){ lb.classList.remove('on'); document.body.style.overflow=''; img.src=''; }

  document.addEventListener('click', function(e){
    var a=e.target.closest('a'); if(isImgLink(a)){ e.preventDefault(); open(a); }
  });
  lb.querySelector('.ppw-lb-x').addEventListener('click', close);
  lb.addEventListener('click', function(e){ if(e.target===lb) close(); });
  lb.querySelector('.prev').addEventListener('click', function(e){ e.stopPropagation(); show(idx-1); });
  lb.querySelector('.next').addEventListener('click', function(e){ e.stopPropagation(); show(idx+1); });
  document.addEventListener('keydown', function(e){
    if(!lb.classList.contains('on'))return;
    if(e.key==='Escape')close(); else if(e.key==='ArrowLeft')show(idx-1); else if(e.key==='ArrowRight')show(idx+1);
  });
  var sx=0;
  lb.addEventListener('touchstart', function(e){ sx=e.touches[0].clientX; }, {passive:true});
  lb.addEventListener('touchend', function(e){
    var dx=e.changedTouches[0].clientX - sx;
    if(Math.abs(dx)>45 && group.length>1) show(idx+(dx<0?1:-1));
  });
})();
