import { renderListWithTemplate } from "./utils.mjs";

function productCartTemplate(product){  
  const discount = product.SuggestedRetailPrice.toFixed(2) - product.FinalPrice.toFixed(2);
  const discountFlag = (discount * 100) / product.SuggestedRetailPrice.toFixed(2);
    return `<li class="product-card">
          <a href="/product_pages/index.html?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">$${product.FinalPrice}  <span class="discount"> save $${discount.toFixed(2)} </span> <span class="discount_flag">${discountFlag.toFixed(0)} % off!</span>
            </p>
          </a>
        </li>`;
}

export class ProductListing {
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.products = [];
    }
    async init(){
        this.products = await this.dataSource.getData(this.category);
        this.renderList(this.products);
    }
    renderList(list){
        renderListWithTemplate(productCartTemplate, this.listElement, list);
    }
    sortProducts(criteria) {
        let sortedProducts;
        if (criteria === 'name') {
            sortedProducts = this.products.sort((a, b) => a.Name.localeCompare(b.Name));
        } else if (criteria === 'price') {
            sortedProducts = this.products.sort((a, b) => a.FinalPrice - b.FinalPrice);
        }
        this.renderList(sortedProducts);
    }
}
