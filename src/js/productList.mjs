import { renderListWithTemplate } from "./utils.mjs";

function productCartTemplate(product){
    return `<li class="product-card">
          <a href="product_pages/index.html?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">${product.FinalPrice}</p>
          </a>
        </li>`;
}


export class ProductListing {
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init(){
        // Gets an array of object from a data source
        const list = await this.dataSource.getData(this.category);
        // Stores the new array into the variable limitToFour
        const limitToFour = this.limitProductsToFour(list);
        // Calls the renderList function and pass in the new array
        // with the four elements
        this.renderList(limitToFour);}

    /* this.renderList(list){}
        document.querySelector(".title").innerHTML = this.category;
    } */
    // A function that takes accepts an array or objects and calls
    // another function responsible for listing the products.
    renderList(list){
        renderListWithTemplate(productCartTemplate, this.listElement, list)
    }

    // Takes the list of products (array) and creats a new
    // array out of it having only 4 products.
    limitProductsToFour(list){
        return list.slice(0, 4);
    }

    // renderList(list) {
    //     const htmlStrings = list.map(productCardTemplate);
    //     this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
    // }
}