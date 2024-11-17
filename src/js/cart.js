import { getLocalStorage } from "./utils.mjs";


function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p> <!-- Fijo en 1 -->
  <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>
</li>`;

  return newItem;
}

renderCartContents();

document.addEventListener('DOMContentLoaded', () => {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartFooter = document.querySelector('.cart-footer');
  const cartTotalAmount = document.getElementById('cart-total-amount');

  if (cartItems.length > 0) {
    cartFooter.classList.remove('hide');
    const total = cartItems.reduce((sum, item) => {
      const price = parseFloat(item.FinalPrice) || 0;
      return sum + price; 
    }, 0);
    cartTotalAmount.textContent = total.toFixed(2);
  }
  
});