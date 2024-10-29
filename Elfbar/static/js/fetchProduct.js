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

    async addSale(product_id, amount) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "/add_sale",
                type: "POST",
                dataType: "json",
                csrfmiddlewaretoken: '{{ csrf_token }}',
                data: JSON.stringify({ 
                    product_id: product_id,
                    amount: amount
                }),
                contentType: "application/json",
                success: (data) => {
                    scanner.continueScanning();
                    resolve(data);
                },
                error: (err) => {
                    reject(err);
                },
            });
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

    async getProduct(id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/get_product/${id}`,
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

