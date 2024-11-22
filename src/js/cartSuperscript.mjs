import { getLocalStorage } from "./utils.mjs";

export class cartSuperScript {
    constructor(element){
        this.element = element;
    }

    init(){
        this.getCartCount();
    }

    getCartCount(){
        const cartList = getLocalStorage("so-cart") || [];
        const numberOfItems = cartList.length;
        if (numberOfItems > 0){
            const span = document.createElement("span");
            span.setAttribute("class", "super-script");
            span.textContent = numberOfItems;

            if (this.element) {
                this.element.appendChild(span);
            } else {
                console.error();
            }
        }
    }
}
