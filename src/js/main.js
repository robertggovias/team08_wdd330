import ProductData from "./ProductData.mjs";
import { ProductListing } from "./productList.mjs";

// Instantiates the product data class and store
// creates a data source.
const dataSource = new ProductData("tents");
// Get an element on the DOM.
const listElement = document.querySelector(".product-list");
//Create an instance of ProductListing class and pass in the
//product category, data soure to get data and the element where products are listed.
const productsListing = new ProductListing("Tents", dataSource, listElement);

// initialize the function.
productsListing.init();
