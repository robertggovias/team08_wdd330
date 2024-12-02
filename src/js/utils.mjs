import { initializeSearchBar } from "./searchBar.mjs";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParams(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product;
}

// Checks to see if parent element is empty or not. If it is not, empty it.
// If it is create a template for each object in the array label "list"
// Insert the html templates into the parent element.
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterBegin",  clear = false){
  if (parentElement) {
    if (clear) parentElement.innerHTML = "";
    const htmlStrings = list.map(templateFn);
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
  } else {
    console.error();
  }
}

export function renderWithTemplate(templateFn, parentElement, data, callback){
  if (parentElement) {
    parentElement.insertAdjacentHTML("afterbegin", templateFn(data));
    if (callback) {
      callback(data);
    }
  } else {
    console.error(`Element not found for selector: ${parentElement}`);
  }
}

async function loadTemplate (path) {
  const respond = await fetch(path);
  const data = await respond.text();
  return data;
}

export async function loadHeaderFooter() {
    const headerpath = await loadTemplate('../partials/header.html');
    const footerpath = await loadTemplate('../partials/footer.html');
    const header = document.getElementById('main-header');
    const footer = document.getElementById('main-footer');
    if (header) {
        renderWithTemplate((data) => headerpath, header);
    } else {
        console.error();
        // console.error('Header element not found');         //pz
    }
    if (footer) {
        renderWithTemplate((data) => footerpath, footer);
    } else {
        console.error('Footer element not found');
    }

    initializeSearchBar()
}


/***************** Checkout Processes ****************/
export function getElement(query) {
  return document.querySelector(query);
}

export function getCartItems() {
  return getLocalStorage("so-cart");
}

//Add up the total and pass it to the html cart-total
export function calculateTotalPrice() {
  const cartItems = getCartItems();
  if (cartItems != null || cartItems != undefined) {
    const totalPrice = parseFloat(cartItems.reduce(
      (acc, item) => acc + item.FinalPrice * item.Quantity,
      0,
    ).toFixed(2));
    return totalPrice
  } else {
    return 0
  }
}

export function alertMessage(message, scroll = true){
  const mainElement = getElement("main")
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (err) {
    if(err.target.innerText == "X"){
      mainElement.removeChild(this)
    }
  });
  mainElement.prepend(alert);

  if(scroll) window.scrollTo(0,0);
}

export function removeAlerts(){
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}
