const codeReader = new ZXing.BrowserMultiFormatReader();
const videoElement = document.getElementById('video');
const scannerContainer = document.querySelector(".scanner-container");

const foundProductBlock = document.querySelector(".found-product")
const modalOverlay = document.querySelector(".modal-overlay");
const foundProductName = document.querySelector(".found-product__name");
const foundProductProducer = document.querySelector(".found-product__producer");
const foundProductAmount = document.querySelector(".found-product__amount");
const foundProductAdded = document.querySelector(".found-product__add");

const notFoundProductBlock = document.querySelector(".not-found-product");

let track = null;
let isTorchOn = false;
let lastProduct = null;
let lastBarcode = 48235611121543;


async function openScanner() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then((stream) => {
        track = stream.getVideoTracks()[0];
        videoElement.srcObject = stream;

        scannerContainer.style.display = "block";
        codeReader.decodeFromVideoDevice(null, 'video', async (result, err) => {
            if (result) {
                lastBarcode = result.text;
                lastProduct = await findProduct(result)
            }
        });

    })
    .catch((err) => console.error(err));

}

async function findProduct(result) {
    const response = await fetch("/check_for_barcode", {
        method: "POST",
        body: JSON.stringify({
            'barcode': result.text,
        }),
    })

    const data = await response.json();
  
    if (data.status == "success") {
        foundProductBlock.classList.add("open");
        modalOverlay.classList.add("open");
        
        foundProductName.textContent = data.products.name; 
        foundProductProducer.textContent = data.products.producer; 
        foundProductAmount.textContent = data.products.amount; 
        // lastProduct = data.products
        return data.products
        
    } else {
        notFoundProductBlock.classList.add("open")
        return;
    }


}

function toggleFlash() {
    if (track) {
        const capabilities = track.getCapabilities();
        if (capabilities.torch) {
            isTorchOn = !isTorchOn;
            track.applyConstraints({ advanced: [{ torch: isTorchOn }] });
        }
    }
}

modalOverlay.addEventListener("click", () => {
    foundProductBlock.classList.remove("open")
    modalOverlay.classList.remove("open")
})


async function addAmount() {
    foundProductAdded.textContent = parseInt(foundProductAdded.textContent) + 1
    foundProductAmount.textContent = parseInt(foundProductAmount.textContent) - 1
}


async function addSale() {
    await fetch("/add_sale", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'product_id': lastProduct.id,
            'amount': foundProductAdded.textContent
        }),
    })
    .then(response => response.json())
    .then(data => {
        foundProductBlock.classList.remove("open");
        modalOverlay.classList.remove("open");
        foundProductAdded.textContent = "0"; 

        // Перевіряємо статус і, якщо успішно, показуємо повідомлення
        if (data.status === "success") {
            // Створюємо новий елемент для повідомлення
            const alertContainer = document.querySelector('.alert-container');

            // Додаємо HTML для нового повідомлення
            const newAlert = document.createElement('div');
            newAlert.className = `alert alert-success alert-dismissible fade show`;
            newAlert.setAttribute('role', 'alert');
            newAlert.innerHTML = `
                ${data.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;

            // Додаємо нове повідомлення у контейнер
            alertContainer.appendChild(newAlert);

            // Автоматично видаляємо повідомлення через певний час (наприклад, 5 секунд)
            setTimeout(() => {
                newAlert.classList.remove('show');
                newAlert.classList.add('fade');
                alertContainer.removeChild(newAlert);
            }, 5000); // Змінюйте час, як потрібно
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
}


function redirectToCreateProduct() {
    window.location.href = `/create_product?barcode=${lastBarcode}`;
    // notFoundProductBlock.classList.remove("open")
}


async function testProduct(barcode) {
    await findProduct(barcode)
}


// testProduct({"text": 4823561111543})