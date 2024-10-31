class ProductHandler {
    async findProduct(barcode) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "/check-barcode",
                type: "POST",
                dataType: "json",
                csrfmiddlewaretoken: '{{ csrf_token }}',
                data: JSON.stringify({ barcode: barcode }),
                contentType: "application/json",
                success: (data) => {
                    resolve(data)
                },
                error: (err) => {
                    reject(err);
                }
            });
        });
    }

    async addSale(product_id, amount) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "/add-sale",
                type: "POST",
                dataType: "json",
                csrfmiddlewaretoken: '{{ csrf_token }}',
                data: JSON.stringify({ 
                    product_id: product_id,
                    amount: amount
                }),
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

    async getProductTree() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "/product-tree",
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
                url: `/get-product/${id}`,
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

    async searchProduct(query) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/search-products?query=${query}`,
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
    
    async filterProducers(producer_type) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/filter-producers?product_type=${producer_type}`,
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

