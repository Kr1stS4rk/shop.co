const topBanner = document.getElementById('topBanner');
const closeBtn = topBanner.querySelector('.top-banner__close');

closeBtn.addEventListener('click', () => {
  topBanner.classList.add('top-banner--hidden');
});
const ratingBlocks = document.querySelectorAll(".product__rating");

ratingBlocks.forEach(function (ratingBlock) {
  const ratingValue = Number(ratingBlock.dataset.rating);
  const starsContainer = ratingBlock.querySelector(".product__stars");
  const ratingCurrent = ratingBlock.querySelector(".product__rating-current");

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.classList.add("star");

    const starFill = document.createElement("span");
    starFill.classList.add("star-fill");

    if (ratingValue >= i) {
      starFill.style.width = "100%";
    } else if (ratingValue > i - 1) {
      starFill.style.width = (ratingValue - (i - 1)) * 100 + "%";
    } else {
      starFill.style.width = "0%";
    }

    star.appendChild(starFill);
    starsContainer.appendChild(star);
  }

  ratingCurrent.textContent = ratingValue.toFixed(1);
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