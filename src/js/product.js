import { getParams, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { ProductDetails } from "./productDetails.mjs";
import { cartSuperScript } from "./cartSuperscript.mjs";

const dataSource = new ProductData("tents");
const productId = getParams("product");
const product = new ProductDetails(productId, dataSource);
product.init();

// w03 init fixed pz
document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(() => {
    // Adding super script to the cart icon to display the number of items in the cart
    const element = document.querySelector(".cart");
    if (element) {
      const iconSuperScript = new cartSuperScript(element);
      iconSuperScript.init();
    } else {
      console.error("Element not found for selector: .cart");
    }
  });
});
