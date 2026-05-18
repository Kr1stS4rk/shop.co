const topBanner = document.getElementById('topBanner');
const closeBtn = topBanner.querySelector('.top-banner__close');

closeBtn.addEventListener('click', () => {
  topBanner.classList.add('top-banner--hidden');
});
const ratingBlocks = document.querySelectorAll(".product__rating, .review__rating");

ratingBlocks.forEach(function (ratingBlock) {
  const ratingValue = Number(ratingBlock.dataset.rating);
  const starsContainer = ratingBlock.querySelector(".product__stars");
  const ratingCurrent = ratingBlock.querySelector(".product__rating-current");

  if (!starsContainer) return;

  starsContainer.innerHTML = "";

  const fullStars = Math.floor(ratingValue);
  const hasPartialStar = ratingValue % 1 !== 0;
  const totalVisibleStars = fullStars + (hasPartialStar ? 1 : 0);

  for (let i = 1; i <= totalVisibleStars; i++) {
    const star = document.createElement("span");
    star.classList.add("star");

    const starFill = document.createElement("span");
    starFill.classList.add("star-fill");

    if (i <= fullStars) {
      starFill.style.width = "100%";
    } else {
      starFill.style.width = (ratingValue - fullStars) * 100 + "%";
    }

    star.appendChild(starFill);
    starsContainer.appendChild(star);
  }

  if (ratingCurrent) {
    ratingCurrent.textContent = ratingValue.toFixed(1);
  }
});

const productCards = document.querySelectorAll(".product__card");

productCards.forEach(function (card) {
  const price = card.dataset.price;
  const oldPrice = card.dataset.oldPrice;
  const discount = card.dataset.discount;

  const currentPriceElement = card.querySelector(".product__price-current");
  const oldPriceElement = card.querySelector(".product__price-old");
  const discountElement = card.querySelector(".product__price-discount");

  if (price) {
    currentPriceElement.textContent = `$${price}`;
  }

  if (oldPrice) {
    oldPriceElement.textContent = `$${oldPrice}`;
  } else {
    oldPriceElement.remove();
  }

  if (discount) {
    discountElement.textContent = `-${discount}%`;
  } else {
    discountElement.remove();
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.reviews__sliders');
  const prevBtn = document.querySelector('.reviews__arrow-prev');
  const nextBtn = document.querySelector('.reviews__arrow-next');

  // Получаем ширину одной карточки + gap
  const slide = slider.querySelector('.review__slider');
  let gap = parseInt(getComputedStyle(slider).gap) || 0;
  let slideWidth = slide.offsetWidth + gap;

  // ==== Кнопки ====
  nextBtn.addEventListener('click', () => {
    slider.scrollBy({ left: slideWidth, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -slideWidth, behavior: 'smooth' });
  });

  // ==== Drag / Swipe ====
  let isDown = false;
  let startX;
  let scrollLeftDrag;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeftDrag = slider.scrollLeft;
    slider.classList.add('active');
  });

  slider.addEventListener('mouseleave', () => { isDown = false; slider.classList.remove('active'); });
  slider.addEventListener('mouseup', () => { 
    isDown = false; 
    slider.classList.remove('active'); 
    snapToSlide();
  });

  slider.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = startX - x;
    slider.scrollLeft = scrollLeftDrag + walk;
  });

  slider.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeftDrag = slider.scrollLeft;
  });

  slider.addEventListener('touchend', () => { 
    isDown = false; 
    snapToSlide();
  });

  slider.addEventListener('touchmove', (e) => {
    if(!isDown) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = startX - x;
    slider.scrollLeft = scrollLeftDrag + walk;
  });

  // ==== Функция «прилипание» к ближайшей карточке ====
  function snapToSlide() {
    const scroll = slider.scrollLeft;
    const index = Math.round(scroll / slideWidth);
    slider.scrollTo({ left: index * slideWidth, behavior: 'smooth' });
  }

  // ==== Обновление slideWidth при ресайзе ====
  window.addEventListener('resize', () => {
    const gapNew = parseInt(getComputedStyle(slider).gap) || 0;
    slideWidth = slider.querySelector('.review__slider').offsetWidth + gapNew;
  });
});