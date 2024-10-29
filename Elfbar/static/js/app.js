import { scanner } from "./scanner.js";
import { productHandler } from "./fetchProduct.js";
import { changeProductAmount, redirectToCreateProduct } from "./utils.js";
import { modal } from "./modal.js";
import { lastProduct } from "./config.js";


// scanner btns
document.getElementById("scanButton").addEventListener("click", () => scanner.openScanner());
document.getElementById("scannerFlashButton").addEventListener("click", () => scanner.toggleFlash());
document.getElementById("scannerExitButton").addEventListener("click", () => scanner.closeScanner());

// scanner modal btns
document.getElementById("addSaleButton").addEventListener("click", async () => {
    try {
        const amount = document.querySelector(".found-product__add").textContent;
        const response = await productHandler.addSale(lastProduct.id, amount);
        modal.showModalMessage(response["message"]);
    } catch (error) {
        console.error("Error adding sale:", error);
    }
});
document.getElementById("AddProductButton").addEventListener("click", () => redirectToCreateProduct());
document.getElementById("ContinueScanningButton").addEventListener("click", () => scanner.continueScanning());

modal.foundProductAdded.addEventListener("click", () => changeProductAmount());

