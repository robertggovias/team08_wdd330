import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { ProductDetails } from "./productDetails.mjs";
import { cartSuperScript } from "./cartSuperscript.mjs";

const dataSource = new ProductData("tents");
const productId = getParams("product");
const product = new ProductDetails(productId, dataSource);
product.init();


// Adding super script to the cart icon to display the
// number of items in the cart
const element = document.querySelector(".cart");
const iconSuperScript = new cartSuperScript(element)
iconSuperScript.init();


// console.log(dataSource.findProductById(product));

// Gets an an object or an empty array where product would be pushed into
// and push the key value pair object into.
// function addProductToCart(product) {
//   const currentCart = getLocalStorage("so-cart") || [];
//   currentCart.push(product);
//   setLocalStorage("so-cart", currentCart);
// }
// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addToCart(product);
// }

// add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
