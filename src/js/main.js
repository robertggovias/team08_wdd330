import ProductData from "./ProductData.mjs";
import ProductList from './ProductList.mjs';


const category = 'Tents'; 
const dataSource = new ProductData("tents"); 
const listElement = document.querySelector('.product-list'); 

const productList = new ProductList(category, dataSource, listElement);
productList.init();


