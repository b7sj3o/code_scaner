export interface ProductForm {
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

export interface ProductForeignKeys {
    product_types: ForeignKeyItem[];
    producers: Producer[];
    volumes: ForeignKeyItem[];
    strengths: ForeignKeyItem[];
    puffs_amounts: ForeignKeyItem[];
    resistances: ForeignKeyItem[];
    pod_models: ForeignKeyItem[];
}

export interface ForeignKeyItem {
    id: number;
    value: string | number;
}

export interface ProductType {
    id: number;
    value: string;
}

export interface Producer {
    id: number;
    value: string;
    producer_type__value: string;
}

export interface PodModel {
    id: number;
    value: string;
}
