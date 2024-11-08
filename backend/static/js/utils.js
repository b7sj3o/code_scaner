import { modal } from "./modal.js";
import { scanner } from "./scanner.js";

export function isMobile() {
    let check = false;
    (function(a){
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)) {
            check = true;
        }
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

export function changeProductAmount() {
    modal.foundProductAdded.textContent = parseInt(modal.foundProductAdded.textContent) + 1
    modal.foundProductAmount.textContent = parseInt(modal.foundProductAmount.textContent) - 1
}

export function redirectToCreateProduct() {
    window.location.href = `/create-product?barcode=${scanner.lastBarcode}`;
}

document.getElementById("AddProductButton").addEventListener("click", () => redirectToCreateProduct());
