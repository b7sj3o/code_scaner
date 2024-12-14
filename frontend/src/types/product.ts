export interface Product {
    id: number;
    product_type: string;
    producer: string;
    volume?: string;
    strength?: string;
    puffs_amount?: string;
    resistance?: string;
    pod_model?: string;
    name: string;
    buy_price: number;
    sell_price: number;
    drop_sell_price: number;
    amount: number;
    barcode: string;
}


export interface ArrivalProducts {
    id: number;
    amount: number;
    price: number;
}

export interface OptProducts extends ArrivalProducts {};

export interface ProductInfo {
    id: number;
    name: string;
    barcode: string;
    amount: number;
    buy_price: number;
    sell_price: number;
}

export interface ReadyMixProduct {
    [strength: string]: ProductInfo[];
}

export interface VolumeGroupedProducts {
    [volume: string]: ReadyMixProduct;
}

export interface DisposableProduct {
    [puffsAmount: string]: ProductInfo[];
}

export interface CartridgeProduct {
    [resistance: string]: ProductInfo[];
}

export interface PodProduct {
    [podModel: string]: ProductInfo[];
}

export interface ProductTypeGroup {
    [producer: string]: VolumeGroupedProducts | DisposableProduct | CartridgeProduct | PodProduct;
}

export interface ProductTree {
    [productType: string]: ProductTypeGroup;
}

export interface ProductSearchProps {
    showAddButton?: boolean;
    onProductAdd?: (product: Product) => void;
}