import { productHandler } from "./fetchProduct.js";

class ChangeForm {
    constructor() {
        this.productTypeSelect = document.getElementById("product_type");
        this.producerSelect = document.getElementById("producer");
        this.volumeField = document.getElementById("volume").parentElement;
        this.strengthField = document.getElementById("strength").parentElement;
        this.podModel = document.getElementById("pod_model").parentElement;
        this.puffsAmountField = document.getElementById("puffs_amount").parentElement;
        this.resistanceField = document.getElementById("resistance").parentElement;
        this.selectedType = this.productTypeSelect.options[this.productTypeSelect.selectedIndex].text;
        
        this.initialize()
    }

    initialize() {
        this.productTypeSelect.selectedIndex = 0;
        
        this.toggleFields();
        this.addProductTypeListener();

    }

    toggleFields() {        
        this.volumeField.style.display = "none";
        this.strengthField.style.display = "none";
        this.puffsAmountField.style.display = "none";
        this.resistanceField.style.display = "none";
        this.podModel.style.display = "none";
        
        if (this.selectedType === "готова жижа" || this.selectedType === "самозаміс") {
            this.volumeField.style.display = "block";
            this.strengthField.style.display = "block";
        } else if (this.selectedType === "одноразка") {
            this.puffsAmountField.style.display = "block";
        } else if (this.selectedType === "картридж") {
            this.resistanceField.style.display = "block";
        } else if (this.selectedType === "под") {
            this.podModel.style.display = "block";
        }
    }

    async updateProducers() {
        const response = await productHandler.filterProducers(this.selectedType);
        const producers = response.producers;

        console.log(producers)

        if (!producers.length) {
            this.producerSelect.innerHTML = "";
            alert("Для цієї категорії не знайдено виробників")
            return;
        }

        this.producerSelect.innerHTML = "";
        producers.forEach(producer => {
            const option = document.createElement("option");
            option.value = producer.id;
            option.textContent = producer.name;
            this.producerSelect.appendChild(option);
        });
    }

    addProductTypeListener() {
        this.productTypeSelect.addEventListener("change", () => {
            this.selectedType = this.productTypeSelect.options[this.productTypeSelect.selectedIndex].text;

            this.toggleFields();
            this.updateProducers();
            
        });
    }
}

const changeForm = new ChangeForm()
