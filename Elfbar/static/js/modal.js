class Modal {
    constructor() {
        this.modalOverlay = document.querySelector(".modal-overlay");
        this.foundProductBlock = document.querySelector(".found-product");
        this.foundProductName = document.querySelector(".found-product__name");
        this.foundProductProducer = document.querySelector(".found-product__producer");
        this.foundProductAmount = document.querySelector(".found-product__amount");
        this.foundProductAdded = document.getElementById("addAmountButton");

        this.modalMessages = document.querySelector(".modal-messages")
        this.modalMessage = document.querySelector(".modal-message")
        

        this.notFoundProductBarcode = document.querySelector(".not-found-product__barcode");
        this.notFoundProductBlock = document.querySelector(".not-found-product");
    }

    showProductInfo(product) {
        this.foundProductBlock.classList.add("open");
        this.modalOverlay.classList.add("open");

        this.foundProductName.textContent = product.name;
        this.foundProductProducer.textContent = product.producer;
        this.foundProductAmount.textContent = product.amount;
    }

    hideProductInfo() {
        if (this.foundProductBlock.classList.contains("open")) {
            this.foundProductBlock.classList.remove("open");
            this.modalOverlay.classList.remove("open");
        }
    }

    showNotFound(barcode) {
        this.notFoundProductBlock.classList.add("open");
        this.notFoundProductBarcode.textContent = barcode;
    }

    hideNotFound() {
        if (this.notFoundProductBlock.classList.contains("open")) {
            this.notFoundProductBlock.classList.remove("open");
        }
    }

    showModalMessage(text) {
        this.modalMessages.classList.add("open")
        this.modalMessage.textContent = text

        setTimeout(() => {
            this.modalMessages.classList.remove("open")

        }, 3000)
    }
}

export const modal = new Modal();


