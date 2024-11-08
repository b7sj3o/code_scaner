import { productHandler } from "./fetchProduct.js";
import { isMobile } from "./utils.js";
import { modal } from "./modal.js";
import { setLastProduct } from "./config.js";

class Scanner {
    constructor(videoElement, scannerContainer) {
        this.codeReader = new ZXing.BrowserMultiFormatReader();
        this.videoElement = videoElement;
        this.scannerContainer = scannerContainer;
        this.lastBarcode = null;
        this.track = null;
        this.scanning = true;
        this.isTorchOn = false;
    }

    async openScanner() {
        // TODO: enable for production
        // if (!isMobile()) {
        //     alert("Works only for mobile phones or tablets");
        //     return;
        // }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            this.track = stream.getVideoTracks()[0];
            this.videoElement.srcObject = stream;

            this.scannerContainer.style.display = "block";

            this.codeReader.decodeFromVideoDevice(null, "video", async (result, err) => {
                if (result && this.scanning) {
                    this.lastBarcode = result.text;
                    this.scanning = false;
                    const response = await productHandler.findProduct(this.lastBarcode);
                    
                    this.videoElement.pause();

                    if (response.status === "success") {
                        setLastProduct(response.product);
                        modal.showProductInfo(response.product);
                    } else {
                        modal.showNotFound(result.text);
                    }

                }
            });
        } catch (err) {
            alert(err);
        }
    }

    toggleFlash() {
        if (this.track) {
            const capabilities = this.track.getCapabilities();
            if (capabilities.torch) {
                this.isTorchOn = !this.isTorchOn;
                this.track.applyConstraints({ advanced: [{ torch: this.isTorchOn }] });
            }
        }
    }

    closeScanner() {
        this.scannerContainer.style.display = "none";
        if (this.isTorchOn) this.toggleFlash();
    }

    continueScanning() {
        this.scanning = true;
        this.videoElement.play();
        modal.hideProductInfo();
        modal.hideNotFound();
    }
}

export const scanner = new Scanner(document.getElementById("video"), document.querySelector(".scanner-container"));

scanner.openScanner()

// scanner btns
document.getElementById("scannerFlashButton").addEventListener("click", () => scanner.toggleFlash());
document.getElementById("scannerExitButton").addEventListener("click", () => scanner.closeScanner());

document.getElementById("addSaleButton").addEventListener("click", async () => {
    try {
        const amount = document.querySelector(".found-product__add").textContent;
        const response = await productHandler.addSale(lastProduct.id, amount);
        
        if (response.status == "success") {
            scanner.continueScanning();
        }
        
        modal.showModalMessage(response.message);

    } catch (error) {
        console.error("Error adding sale:", error);
    }
});

document.getElementById("ContinueScanningButton").addEventListener("click", () => scanner.continueScanning());
