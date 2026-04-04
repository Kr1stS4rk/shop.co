const topBanner = document.getElementById('topBanner');
const closeBtn = topBanner.querySelector('.top-banner__close');

closeBtn.addEventListener('click', () => {
  topBanner.classList.add('top-banner--hidden');
});