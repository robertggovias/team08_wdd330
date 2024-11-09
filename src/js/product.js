import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Obtener los artículos del carrito desde localStorage
  let cartItems = getLocalStorage("so-cart") || [];

  // Verificar si cartItems es un array, si no, convertirlo en uno
  if (!Array.isArray(cartItems)) {
    cartItems = [cartItems];
  }

  // Agregar el nuevo artículo al array
  cartItems.push(product);

  // Guardar el array actualizado en localStorage
  setLocalStorage("so-cart", cartItems);
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
