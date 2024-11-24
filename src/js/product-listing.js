import { getParams, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { ProductListing } from "./productList.mjs";
import { cartSuperScript } from "./cartSuperscript.mjs";

// Individual 03 try
loaderHeaderFooter();
    const category = getParams('category');
    const dataSource = new ProductData();

    // Get an element on the DOM.
    const listElement = document.querySelector(".product-list");

    // Create an instance of ProductListing class and pass in the
    // product category, data source to get data and the element where products are listed.
    const listing = new ProductListing(category, dataSource, listElement);

    // Initialize the function.
    listing.init();



// w03 fixed
document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(() => {
    // Instantiates the product data class and store
    // creates a data source.
    const category = getParams('category');
    const dataSource = new ProductData();

    // Get an element on the DOM.
    const listElement = document.querySelector(".product-list");

    // Create an instance of ProductListing class and pass in the
    // product category, data source to get data and the element where products are listed.
    const productsListing = new ProductListing(category, dataSource, listElement);

    // Initialize the function.
    productsListing.init();

    //titulod e la página
    document.title = `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;
    

    // Adding super script to the cart icon to display the number of items in the cart
    const element = document.querySelector(".cart");
    if (element) {
      const iconSuperScript = new cartSuperScript(element);
      iconSuperScript.init();
    } else {
      console.error('Element not found for selector: .cart');
    }
  });
}); 