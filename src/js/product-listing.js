import { ProductListing} from "./productList.mjs";
import { cartSuperScript } from "./cartSuperscript.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";
import ExternalProductData from "./ExternalProductData.mjs";
import { capitalizingAString } from "./utils.mjs";

// w03 fixed
document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(() => {
    // Instantiates the External (from theproduct data class and store
    // creates a data source.
    const category = getParams("category")
    const dataSource = new ExternalProductData();
    
    // Get an element on the DOM.
    const listElement = document.querySelector(".product-list");

    // Create an instance of ProductListing class and pass in the
    // product category, data source to get data and the element where products are listed.
    const productsListing = new ProductListing(category, dataSource, listElement);
    // Initialize the function.
    productsListing.init();

    // Call the dynamic product title funcyion
    dynamicProductTitle(category)

    // Instantiating and creating an alert object.
    // const aletrtsDataSource = new ProductData("alerts");
    // const alertMessages = new Alert("alerts", aletrtsDataSource);
    // alertMessages.init();

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

function dynamicProductTitle(category){
  const listElement = document.querySelector(".title");
  listElement.textContent =  `${capitalizingAString(category)}`;
}
