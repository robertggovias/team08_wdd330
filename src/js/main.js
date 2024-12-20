import ExternalServices from "./ExternalServices.mjs";
import Alert from "./alerts.mjs";
import { cartSuperScript } from "./cartSuperscript.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// w03 fixed
document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(() => {
    // // Instantiates the product data class and store
    // // creates a data source.
    // const dataSource = new ExternalServices("tents");

    // // Get an element on the DOM.
    // const listElement = document.querySelector(".product-list");

    // // Create an instance of ProductListing class and pass in the
    // // product category, data source to get data and the element where products are listed.
    // const productsListing = new ProductListing("Tents", dataSource, listElement);

    // // Initialize the function.
    // productsListing.init();

    // UP MOVED TO Product-Listing.js PZ

    // Instantiating and creating an alert object.
    const aletrtsDataSource = new ExternalServices("alerts");
    const alertMessages = new Alert("alerts", aletrtsDataSource);
    alertMessages.init();

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
