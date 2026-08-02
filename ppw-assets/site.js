/* Close the mobile nav menu when a link inside it is tapped */
document.addEventListener('click', function(e){
  var link = e.target.closest('header.nav .nav-links a');
  if (link) { var h = link.closest('header.nav'); if (h) h.classList.remove('open'); }
});
