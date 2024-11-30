import ProductData from "./ProductData.mjs";
import { ProductListing } from "./productList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";
import { cartSuperScript } from "./cartSuperscript.mjs";

document.addEventListener("DOMContentLoaded", () => {
    loadHeaderFooter().then(() => {
      const category = getParams('category');
  
      const dataSource = new ProductData();
  
      const listElement = document.querySelector(".product-list");
  
      const productsListing = new ProductListing(category, dataSource, listElement);
  
      productsListing.init();

      // Actualizar el título de la página
      document.title = `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;

      const element = document.querySelector(".cart");
      if (element) {
        const iconSuperScript = new cartSuperScript(element);
        iconSuperScript.init();
      } else {
        console.error('Element not found for selector: .cart');
      }
    });  
});
