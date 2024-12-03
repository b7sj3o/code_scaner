import axios from "axios";
import { ProductTree, Product, BarcodeProduct, ArrivalProducts, OptProducts } from "../types/product";
import {
    ProductType,
    PodModel,
    Producer,
    ProductForeignKeys,
    ProductForm
} from "../types/product-form";
import { MessageResponse } from "../types/layout";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
    "Content-Type": "application/json",
    },
});

// add arrival
export const addArrival = async (products: ArrivalProducts[]): Promise<{ success: boolean, data: string }> => {
    try {
        const response = await api.post("add-arrival/", { products });
        return { success: true, data: response.data };
    } catch (error: any) {
        const message = error.response?.data?.message || "An error occurred.";
        return { success: false, data: message };
    }
};

// add opt
export const addOpt = async (products: OptProducts[]): Promise<{ success: boolean, data: string }> => {
    try {
        const response = await api.post("add-opt/", { products });
        return { success: true, data: response.data };
    } catch (error: any) {
        const message = error.response?.data?.message || "An error occurred.";
        return { success: false, data: message };
    }
};

// check if there is a product by given barcode
export const findProductByBarcode = async (barcode: string): Promise<{ success: boolean; data: BarcodeProduct | string }> => {
    try {
        const response = await api.post<BarcodeProduct>("check-barcode/", { barcode });
        return { success: true, data: response.data }; // Повертаємо об'єкт із продуктом
    } catch (error: any) {
        const message = error.response?.data?.message || "An error occurred.";
        return { success: false, data: message }; // Повертаємо об'єкт із повідомленням
    }
};

// subtract x items from y product (you sold them)
export const addSale = async (product_id: number, amount: number): Promise<MessageResponse> => {
    try {
        const response = await api.post<MessageResponse>("add-sale/", {
            product_id,
            amount,
        });
        return response.data;

    } catch (error: any) {
        if (error.response) {
            return { "message": error.response.data.message };
        } else {
            return { "message": "An error occurred." };
        }
    }
};

// Create product
export const createProduct = async (product: ProductForm): Promise<MessageResponse> => {
    const response = await api.post<MessageResponse>("create-product/", product);
    return response.data;
};


// Get all the products
export const getProducts = async (): Promise<Product[]> => {
    const response = await api.get("products/");
    return response.data;
};

// Get all not required fields that exist in product, so we can do select-option in the most effective way
export const getProductForeignKeys = async (): Promise<ProductForeignKeys> => {
    const response = await api.get<ProductForeignKeys>("product-foreign-keys/");
    return response.data;
};

// filter products by [name, producer, puffs amount, ...]
export const filterProducts = async (query: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`filter-products?query=${query}`);
    return response.data;
};

export const getProductTree = async (): Promise<ProductTree> => {
    const response = await api.get<ProductTree>("product-tree/");
    return response.data;
};

// Get all product types (Одноразка,Жижа,...)
export const getProductTypes = async (): Promise<ProductType[]> => {
    const response = await api.get<ProductType[]>("product-types/");
    return response.data;
};

// Get all producers (Vaporesso, Elfbar, Elfliq, ...)
export const getProducers = async (): Promise<Producer[]> => {
    const response = await api.get<Producer[]>("producers/");
    return response.data;
};

// Get all pod models (Xros3, Xros4, Oxva xlim, ...)
export const getPodModels = async (): Promise<PodModel[]> => {
    const response = await api.get<PodModel[]>("pod-models/");
    return response.data;
};

