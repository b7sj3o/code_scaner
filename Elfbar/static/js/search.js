import { productHandler } from "./fetchProduct.js";
import { modal } from "./modal.js";

class ProductSearch {
    constructor() {
        this.searchInput = document.getElementById("search-input");
        this.resultsContainer = document.getElementById("search-results");
        this.arrivalProductsParent = document.querySelector(".product-form");
        this.searchBtnsAdd = null;
        this.searchBtnsArrival = null;

        this.initialize()
    }

    initialize() {
        this.addInputListener()
    }

    async addInputListener() {
        this.searchInput.addEventListener("input", async () => {
            const query = this.searchInput.value.trim();
            
            if (query.length >= 2) {
                const response = await productHandler.searchProduct(query);
                const results = response.results;
                this.resultsContainer.innerHTML = "";
                if (results.length > 0) {
                    results.forEach(product => {
                        const productElement = document.createElement("div");
                        productElement.classList.add("product-item");
                        productElement.setAttribute("id", product.id)
                        productElement.innerHTML = `
                            <h5 class="search-product-name">${product.name}</h5>
                            <p class="search-product-producer">Виробник: ${product.producer__name}</p>
                            <p class="search-product-type">Тип продукту: ${product.product_type__name}</p>
                            <p>Залишилось: ${product.amount}</p>
                            <button class="search-item-add">+1</button>
                            <button class="search-item-arrival">+</button>
                        `;
                        this.resultsContainer.appendChild(productElement);
                    });
                    this.searchBtnsAdd = document.querySelectorAll(".search-item-add")
                    this.searchBtnsArrival = document.querySelectorAll(".search-item-arrival")
                    this.addBtnsAddListener()
                    this.addBtnsArrivalListener()

                } else {
                    this.resultsContainer.innerHTML = "<p>Нічого не знайдено</p>";
                }
            } else {
                this.resultsContainer.innerHTML = "";
            }
        });
    }

    addBtnsAddListener() {
        if (this.searchBtnsAdd.length) {
            this.searchBtnsAdd.forEach(btn => {
                btn.addEventListener("click", () => {
                    const productID = btn.parentElement.id;
                    productHandler.addSale(productID, 1)
                    .then(data => {
                        modal.showModalMessage(data.message)
                    })
                })
            });
        }
    }

    addBtnsArrivalListener() {
        if (this.searchBtnsArrival.length) {
            this.searchBtnsArrival.forEach(btn => {
                const productName = btn.parentElement.querySelector(".search-product-name").textContent;
                const productProducer = btn.parentElement.querySelector(".search-product-producer").textContent.split(":")[1].trim();
                const productType = btn.parentElement.querySelector(".search-product-type").textContent.split(":")[1].trim();
                btn.addEventListener("click", () => {
                    const child = document.createElement("div")
                    child.classList.add("product-form-item");
                    child.innerHTML = `
                    <div class="product-form__header">
                    <h3 class="product-name">${productName}</h3>
                    <p class="product-producer">${productProducer} - ${productType}</p>
                    </div>

                    <div class="product-form-inline">
                        <input type="number" id="buy-price" class="input-field" placeholder="Ціна закупки" />
                        <input type="number" id="sell-price" class="input-field" placeholder="Ціна продажу" />
                        <input type="number" id="amount" class="input-field" placeholder="Кількість" />
                    </div>
                    `

                    this.arrivalProductsParent.appendChild(child)
                })
            });
        }
    }
}

const productSearch = new ProductSearch() 