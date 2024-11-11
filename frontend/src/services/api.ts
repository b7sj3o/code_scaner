import axios from "axios";
import {
    ProductType,
    PodModel,
    Producer,
    Product,
    AddSaleResponse,
    ProductTree,
} from "../types/api";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
    "Content-Type": "application/json",
    },
});

// check if there is a product by given barcode
const findProductByBarcode = async (barcode: string): Promise<Product> => {
    const response = await api.post<Product>("check-barcode/", { barcode });
    return response.data;
};

// subtract x items from y product (you sold them)
const addSale = async (product_id: number, amount: number): Promise<AddSaleResponse> => {
    try {
        const response = await api.post<AddSaleResponse>("add-sale/", {
            product_id,
            amount,
        });
        return response.data;

    } catch (error: any) {
        if (error.response) {
            return { message: error.response.data.message };
        } else {
            return { message: "An error occurred." };
        }
    }
};


// Get all the products
const getProducts = async (): Promise<Product[]> => {
    const response = await api.get("products/");
    return response.data;
};

// filter products by [name, producer, puffs amount, ...]
const filterProducts = async (query: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`filter-products?query=${query}`);
    return response.data;
};

const getProductTree = async (): Promise<ProductTree> => {
    const response = await api.get<ProductTree>("product-tree/");
    return response.data;
};

// Get all product types (Одноразка,Жижа,...)
const getProductTypes = async (): Promise<ProductType[]> => {
    const response = await api.get<ProductType[]>("product-types/");
    return response.data;
};

// Get all producers (Vaporesso, Elfbar, Elfliq, ...)
const getProducers = async (): Promise<Producer[]> => {
    const response = await api.get<Producer[]>("producers/");
    return response.data;
};

// Get all pod models (Xros3, Xros4, Oxva xlim, ...)
const getPodModels = async (): Promise<PodModel[]> => {
    const response = await api.get<PodModel[]>("pod-models/");
    return response.data;
};

export {
    getProductTypes,
    getProducers,
    getPodModels,
    findProductByBarcode,
    addSale,
    getProducts,
    filterProducts,
    getProductTree,
};
