import { productHandler } from "./fetchProduct.js";
import { modal } from "./modal.js";
class ProductsFilter {
    constructor() {
        this.searchInput = document.getElementById("search-input");
        this.resultsContainer = document.getElementById("search-results");
        this.arrivalProductsSearch = document.getElementById("arrivalProductsSearch");
        this.arrivalProducts = document.getElementById("arrivalProducts");
        this.searchArrivalForm = document.querySelector(".search-arrival-form")
        this.arrivalProductsCart = [];
        this.arrivalProductsAll = [];
        this.searchBtnsAdd = null;
        this.searchBtnsArrival = null;

        this.initialize()
    }

    initialize() {
        this.addInputListener()
        this.addReadyButtonListener()
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
        this.searchBtnsArrival.forEach(btn => {
            btn.addEventListener("click", () => {
                if (this.arrivalProductsAll.includes(btn.parentElement)) {
                    modal.showModalMessage("Вже є таке")
                    return;
                }

                const productName = btn.parentElement.querySelector(".search-product-name").textContent;
                const productProducer = btn.parentElement.querySelector(".search-product-producer").textContent.split(":")[1].trim();
                const productType = btn.parentElement.querySelector(".search-product-type").textContent.split(":")[1].trim();

                const child = document.createElement("div")
                child.classList.add("product-form-item");
                child.innerHTML = `
                <div class="product-form__header">
                    <h3 class="product-name">${productName}</h3>
                </div>
                `

                this.arrivalProductsCart.push(btn.parentElement)
                this.arrivalProductsAll.push(btn.parentElement)
                this.arrivalProductsSearch.appendChild(child)
            })
        });
    }

    addReadyButtonListener() {
        this.searchArrivalForm.addEventListener("submit", (e) => {
            e.preventDefault()
            
            const buyPrice = this.searchArrivalForm.elements["buy-price"].value;
            const sellPrice = this.searchArrivalForm.elements["sell-price"].value;

            this.arrivalProductsCart.forEach((product) => {
                const productName = product.querySelector(".search-product-name").textContent
                const productProducer = product.querySelector(".search-product-producer").textContent
                
                const child = document.createElement("div")
                child.classList.add("product-form-item");
                child.innerHTML = `
                <div class="product-form__header">
                    <h3 class="product-name">${productName}</h3>
                    <h3 class="product-producer">${productProducer}</h3>
                </div>
                <div class="product-form-inline">
                    <input type="number" id="buy-price" class="input-field" placeholder="Ціна закупки" value="${buyPrice}" />
                    <input type="number" id="sell-price" class="input-field" placeholder="Ціна продажу" value="${sellPrice}" />
                    <input type="number" id="amount" class="input-field" placeholder="Кількість" />
                </div>  
                `

                this.arrivalProducts.appendChild(child)
            })

            this.arrivalProductsCart = [];
            this.arrivalProductsSearch.innerHTML = "";

        })
    }
}

const productSearch = new ProductsFilter() 



