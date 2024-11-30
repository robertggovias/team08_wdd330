import { getElement, loadHeaderFooter } from "./utils.mjs";
import { CheckoutProcess } from "./CheckoutProcess.mjs";
const zipInput = getElement("#zipcode");
const checkoutProcess = new CheckoutProcess();
const formButton = getElement(".purchaseButton");
const formElement = getElement(".checkoutForm")

async function main() {
  checkoutProcess.renderCheckoutSubtotal();
  await loadHeaderFooter();
}

zipInput.addEventListener("change", () => {
  const totals = checkoutProcess.renderTotals();
  getElement(".shippingEstimate").innerHTML = `$${totals.shipping.toFixed(2)}`;
  getElement(".orderTotal").innerHTML = `$${totals.total.toFixed(2)}`;
  getElement(".tax").innerHTML = `$${totals.tax.toFixed(2)}`;
})

formButton.addEventListener("click", (event) =>{
  event.preventDefault();
  const form = document.forms[0];
  form.reportValidity();
  const status = form.checkValidity();
  if(status){
    checkoutProcess.checkout(formElement);
  }
});

main();


// import { loadHeaderFooter } from "./utils.mjs";

// loadHeaderFooter();
