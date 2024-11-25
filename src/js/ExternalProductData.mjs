const baseURL = import.meta.env.VITE_SERVER_URL


function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalProductData {
  constructor() {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getExternalData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    console.log(data);
    return data.Result;
    // return fetch(this.path)
    //   .then(convertToJson)
    //   .then((data) => data);
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
    // return products.find((item) => item.Id === id);
  }
}
