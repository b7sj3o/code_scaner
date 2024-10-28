import { productHandler } from "./fetchProduct.js"


productHandler.getProductTree().then((data) => {
    console.log(data)
});