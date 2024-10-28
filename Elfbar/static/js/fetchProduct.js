import { modal } from "./modal.js";
import { setLastProduct, lastProduct, setProductTree, productTree } from "./config.js";
import { scanner } from "./scanner.js";

class ProductHandler {
    async findProduct(result) {
        $.ajax({
            url: "/check_for_barcode",
            type: "POST",
            dataType: "json",
            csrfmiddlewaretoken: '{{ csrf_token }}',
            data: JSON.stringify({ barcode: result }),
            contentType: "application/json",
            success: function(data) {
                if (data.status === "success") {
                    setLastProduct(data.product);
                    modal.showProductInfo(data.product);
                } else {
                    modal.showNotFound(result);
                }
            },
        });
    }

    async addSale() {
        $.ajax({
            url: "/add_sale",
            type: "POST",
            dataType: "json",
            csrfmiddlewaretoken: '{{ csrf_token }}',
            data: JSON.stringify({ 
                product_id: lastProduct.id,
                amount: document.querySelector(".found-product__add").textContent
            }),
            contentType: "application/json",
            success: function(data) {
                scanner.continueScanning();
            },
        });
    }

    async getProductTree() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "/product_tree",
                type: "GET",
                dataType: "json",
                csrfmiddlewaretoken: '{{ csrf_token }}',
                contentType: "application/json",
                success: (data) => {
                    resolve(data);
                },
                error: (err) => {
                    reject(err);
                },
            });
        });
    }
}


export const productHandler = new ProductHandler();

