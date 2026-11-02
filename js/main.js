(function () {
  var tiles = Array.prototype.slice.call(document.querySelectorAll('.tile'));

  /* Reveal tiles as they enter the viewport */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px' });
    tiles.forEach(function (t) { io.observe(t); });
  } else {
    tiles.forEach(function (t) { t.classList.add('in'); });
  }

  /* Lightbox */
  var lb = document.getElementById('lightbox');
  if (!lb || typeof lb.showModal !== 'function') return;
  var img = lb.querySelector('.lb-img');
  var count = lb.querySelector('.lb-count');
  var current = 0;

  function show(i) {
    current = (i + tiles.length) % tiles.length;
    var t = tiles[current];
    img.src = t.dataset.full;
    img.alt = t.querySelector('img').alt;
    count.textContent = (current + 1) + ' / ' + tiles.length;
    var next = tiles[(current + 1) % tiles.length];
    new Image().src = next.dataset.full;
  }
  function open(i) { show(i); if (!lb.open) lb.showModal(); }

  tiles.forEach(function (t, i) { t.addEventListener('click', function (e) { e.preventDefault(); open(i); }); });
  lb.querySelector('.lb-close').addEventListener('click', function () { lb.close(); });
  lb.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
  lb.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
  lb.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') show(current + 1);
    if (e.key === 'ArrowLeft') show(current - 1);
  });
})();
