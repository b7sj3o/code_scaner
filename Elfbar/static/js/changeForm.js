const productTypeSelect = document.getElementById("product_type");
const volumeField = document.getElementById("volume").parentElement;
const strengthField = document.getElementById("strength").parentElement;
const podModel = document.getElementById("pod_model").parentElement;
const puffsAmountField = document.getElementById("puffs_amount").parentElement;
const resistanceField = document.getElementById("resistance").parentElement;

function toggleFields() {
    const selectedType = productTypeSelect.options[productTypeSelect.selectedIndex].text;
    
    volumeField.style.display = "none";
    strengthField.style.display = "none";
    puffsAmountField.style.display = "none";
    resistanceField.style.display = "none";
    podModel.style.display = "none";
    
    if (selectedType === "Готова жижа" || selectedType === "Самозаміс") {
        volumeField.style.display = "block";
        strengthField.style.display = "block";
    } else if (selectedType === "Одноразка") {
        puffsAmountField.style.display = "block";
        strengthField.style.display = "block";
    } else if (selectedType === "Картридж") {
        resistanceField.style.display = "block";
    } else if (selectedType === "Под") {
        podModel.style.display = "block";
    }
}

productTypeSelect.addEventListener("change", () => {
    toggleFields();
});


toggleFields();