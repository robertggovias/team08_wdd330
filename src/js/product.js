import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Gets an an object or an empty array where product would be pushed into
// and push the key value pair object into.
function addProductToCart(product) {
  const currentCart = getLocalStorage("so-cart") || [];
  currentCart.push(product);
  setLocalStorage("so-cart", currentCart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
