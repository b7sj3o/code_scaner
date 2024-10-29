import { productHandler } from "./fetchProduct.js";
import { isMobile } from "./utils.js";
import { modal } from "./modal.js";

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
                    productHandler.findProduct(this.lastBarcode);
                    this.videoElement.pause();
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
