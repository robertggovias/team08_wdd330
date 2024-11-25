export class SearchBar {
    constructor(input, button){
        this.input = document.querySelector("#search-bar-input");
        this.button = document.querySelector("#search-bar-button");
        this.init()
    }

    init(){
        this.initializeListener()
    }

    initializeListener(){
        this.input.addEventListener("keyup", (event) => this.handleInput(event.key));
        this.button.addEventListener("click", () => this.searchValue());
    }

    handleInput(key){
        if(key === "Enter"){
            this.searchValue()
        }
    }

    searchValue(){
        if(this.input.validity.valid){
            window.location.assign(`/product-listing/index.html?search=${this.input.value}`);
        }
    }
}

export function initializeSearchBar(){
    new SearchBar()
}