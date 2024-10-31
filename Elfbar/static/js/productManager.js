import { productHandler } from "./fetchProduct.js";
import { modal } from "./modal.js";

class ProductManager {
    constructor() {
        this.productsParent = document.querySelector(".products-option__blocks");
        this.getBackButton = document.querySelector(".return-back");
        this.chosenPath = null;
        this.isLastProduct = true;
        this.productsTypeRow = null;
        this.pathStack = [];

        this.initialize();
    }

    async initialize() {
        this.chosenPath = await productHandler.getProductTree();
        this.showProductTypes();

        this.getBackButton.addEventListener("click", () => this.handleBackButton());
    }

    showProductTypes() {
        // Видаляємо минулі категорії
        this.productsParent.innerHTML = "";

        for (let key in this.chosenPath) {
            if (this.isProduct(this.chosenPath[key])) {
                this.productsParent.appendChild(this.createProductBlock(this.chosenPath[key]));
            } else {
                this.productsParent.appendChild(this.createCategoryBlock(key));
            }
        }

        this.productsTypeRow = document.querySelectorAll(".products-option__block:not(.product__block)");

        if (this.isLastProduct) {
            this.addProductButtonsListeners();
            this.addSubmitProductListeners()
        } else {
            this.addProductListeners();
        }
    }

    addProductListeners() {
        this.productsTypeRow.forEach(product => {
            product.addEventListener("click", () => {
                this.pathStack.push(this.chosenPath);
                this.chosenPath = this.chosenPath[product.textContent];
                this.showProductTypes();

                if (!this.getBackButton.classList.contains("open")) {
                    this.getBackButton.classList.add("open");
                }
            });
        });
    }

    addProductButtonsListeners() {
        const handleProductChangeAmount = (e) => {
            const btn = e.target;
            const changeAmountElement = btn.parentElement.querySelector(".product__block-amount-added");
    
            if (!changeAmountElement) return;
    
            let changeAmount = 0;
    
            if (btn.classList.contains("product__block-minus-5")) {
                changeAmount = -5;
            } else if (btn.classList.contains("product__block-minus-1")) {
                changeAmount = -1;
            } else if (btn.classList.contains("product__block-plus-1")) {
                changeAmount = 1;
            } else if (btn.classList.contains("product__block-plus-5")) {
                changeAmount = 5;
            }

            changeAmountElement.textContent = parseInt(changeAmountElement.textContent) + changeAmount
    
        };
    
        this.productsParent.querySelectorAll(".product__block-minus-5, .product__block-minus-1, .product__block-plus-1, .product__block-plus-5")
            .forEach(btn => {
                btn.removeEventListener("click", handleProductChangeAmount);
                btn.addEventListener("click", handleProductChangeAmount);
            });
    }
    
    async addSubmitProductListeners() {
        const productSubmitButtons = document.querySelectorAll(".product__block-submit");

        productSubmitButtons.forEach(btn => {
            const handleProductSubmit = async () => {
                const product = btn.parentElement;
                const changeAmountElement = product.querySelector(".product__block-amount-added");
                const changeAmount = changeAmountElement.textContent;
                
                changeAmountElement.textContent = 0
    
                const response = await productHandler.addSale(product.id, changeAmount);
                modal.showModalMessage(response["message"])
                
                const productAmount = product.querySelector(".product__block-amount").children[1]
                const productAmountSold = product.querySelector(".product__block-amount-sold").children[1]

                productAmount.textContent = parseInt(productAmount.textContent) - parseInt(changeAmount)
                productAmountSold.textContent = parseInt(productAmountSold.textContent) + parseInt(changeAmount)
            };

            btn.removeEventListener("click", handleProductSubmit)
            btn.addEventListener("click", handleProductSubmit)
        })
    }

    createProductBlock(product) {
        const productBlock = document.createElement("div");
        productBlock.classList.add("products-option__block", "product__block");
        productBlock.setAttribute("id", product.id)
        productBlock.innerHTML = `
            <div class="product__block-pair product__block-texts">
                <div class="product__block-name">${product["name"]}</div>
                <div class="product__block-barcode">${product["barcode"]}</div>
            </div>
            <div class="product__block-pair product__block-amount">
                <p>К-сть:</p>
                <span>${product["amount"]}</span>
            </div>
            <div class="product__block-pair product__block-amount-sold">
                <p>К-сть продано:</p>
                <span>${product["sold_amount"]}</span>
            </div>
            <div class="product__block-pair product__block-buy-price">
                <p>Закупочна:</p>
                <span>${product["buy_price"]}</span>
            </div>
            <div class="product__block-pair product__block-sell-price">
                <p>Продажна:</p>
                <span>${product["sell_price"]}</span>
            </div>
            <div class="product__block-add">
                <div class="product__block-minus-5">-</div>
                <div class="product__block-minus-1">-</div>
                <div class="product__block-amount-added">0</div>
                <div class="product__block-plus-1">+</div>
                <div class="product__block-plus-5">+</div>
            </div>
            <button class="product__block-submit">Добавити</button>
        `;
        return productBlock;
    }

    createCategoryBlock(categoryName) {
        const categoryBlock = document.createElement("a");
        categoryBlock.classList.add("products-option__block");
        categoryBlock.href = "#";
        categoryBlock.textContent = categoryName;
        return categoryBlock;
    }

    isProduct(item) {
        this.isLastProduct = Boolean(item["name"]);
        return this.isLastProduct;
    }

    handleBackButton() {
        if (this.pathStack.length) {
            this.chosenPath = this.pathStack.pop();
            this.showProductTypes();
        } 

        if (!this.pathStack.length) {
            this.getBackButton.classList.remove("open")
        }
    }
}

export const productManager = new ProductManager();
