import { getLocalStorage, calculateTotalPrice, getCartItems, setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs"

function packageItems(items){
  return items.map(item =>{
    const returnItem = {
      id: item.id,
      name: item.name,
      price: parseFloat(item.FinalPrice.toFixed(2)),
      quantity: item.Quantity 
    }
    return returnItem;
  })
    
}

function formDataToJSON(formElement) {
  const formData = new FormData(formElement)
  convertToJSON = {}
  formData.forEach(function(value, key){
    convertToJSON[key] = value;
  })
  return convertToJSON;
}


export default class CheckoutProcess {
    constructor() {
      this.init();
    }
  
    init() {
      this.subTotal = calculateTotalPrice();
      this.itemCount = getCartItems().length;
      this.externalServices = new ExternalServices()
    }

    async checkout(form) {
        const tax = parseFloat((this.subTotal * 0.06).toFixed(2))
        const shipping = parseFloat(10 + ((this.itemCount - 1) * 2))
        const total = (this.subTotal + tax + shipping).toFixed(2)
        // build the data object from the calculated fields, the items in the cart, and the information entered into the form
        const formJSON = formDataToJSON(form)
        const orderObject = {
            orderDate: new Date(),
            fname: formJSON.fname,
            lname: formJSON.lname,
            street: formJSON.street,
            city: formJSON.city,
            state: formJSON.state,
            zip: formJSON.zip,
            cardNumber: formJSON.cardNumber,
            expiration: formJSON.expiration,
            code: formJSON.code,
            items: packageItems(getCartItems()),
            orderTotal: total,
            shipping: shipping,
            tax: tax.toFixed(2)
        }
        
        try {
          const response = await this.externalServices.checkout(orderObject);
          setLocalStorage("so-cart", []);
          // location.assign("checkout/success.html");
          console.log(response);
        }catch(err) {
          console.log(err)
        }
      }
  
    renderCheckoutSubtotal() {
      // calculate and display the total amount of the items in the cart, and the number of items.
      const subTotalElement = document.querySelector(".subtotal");
      if(subTotal> 0){
        subTotalElement.textContent = `$${this.subTotal}`;
      }else{
        subTotalElement.textContent = "$0.00";
      }
      
    }

    renderTotal(){
      const tax = parseFloat((this.subTotal * 0.06).toFixed(2));
      const shipping = parseFloat(10 + ((this.itemCount -1) * 2).toFixed(2));
      const total = parseFloat(this.subTotal + tax + shipping);
      return {
        subtotal: this.subTotal,
        tax: tax,
        shipping: shipping,
        total: total
      }
    }
  
    // calculateOrdertotal() {
    //   // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
  
    //   // display the totals.
    //   this.displayOrderTotals();
    // }
  
    // displayOrderTotals() {
    //   // once the totals are all calculated display them in the order summary page
  
    // }

  }





