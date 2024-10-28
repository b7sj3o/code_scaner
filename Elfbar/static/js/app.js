import { scanner } from "./scanner.js";
import { productHandler } from "./fetchProduct.js";
import { changeProductAmount } from "./utils.js";
import { modal } from "./modal.js";

document.getElementById("scanButton").addEventListener("click", () => scanner.openScanner());
document.getElementById("flashButton").addEventListener("click", () => scanner.toggleFlash());
document.getElementById("addSaleButton").addEventListener("click", () => productHandler.addSale());
document.getElementById("ContinueScanningButton").addEventListener("click", () => scanner.continueScanning());
modal.foundProductAdded.addEventListener("click", () => changeProductAmount());
