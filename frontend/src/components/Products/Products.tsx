import React, { useState, useEffect } from "react";
import { addSale, getProductTree } from "../../services/api";
import { CartridgeProduct, DisposableProduct, PodProduct, Product, ProductInfo, ProductTree, ProductTypeGroup, ReadyMixProduct, VolumeGroupedProducts } from "../../types/api";
import "./Products.scss";

const Products: React.FC = () => {
    const [productTree, setProductTree] = useState<ProductTree>({});
    const [path, setPath] = useState<string[]>([]);
    const [saleTriggered, setSaleTriggered] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedProducts = await getProductTree();
                setProductTree(fetchedProducts);
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };
        fetchData();
    }, [saleTriggered]);

    const getCurrentLevel = () => {
        let currentLevel: any = productTree;
        for (const key of path) {
            if (currentLevel && typeof currentLevel === "object") {
                currentLevel = currentLevel[key];
            }
        }
        return currentLevel;
    };

    const handleItemClick = (key: string) => {
        setPath([...path, key]);
    };

    const handleGoBack = () => {
        setPath(path.slice(0, -1));
    };

    const renderObject = (currentLevel: ProductTree | ProductTypeGroup | VolumeGroupedProducts | DisposableProduct | CartridgeProduct | PodProduct | ReadyMixProduct) => {
        return Object.entries(currentLevel).map(([key, value]) => (
            <div key={key} className="button-item" onClick={() => handleItemClick(key)}>
                <h3>{key}</h3>
            </div>
        ));
    };

    
    const renderProductList = (currentLevel: ProductInfo[]) => {
        return currentLevel.map((product: ProductInfo) => (
            <div key={product.id} className="product-item">
                <h4>{product.name}</h4>
                <p>Barcode: {product.barcode}</p>
                <p>Amount: {product.amount}</p>
                <p>Price: {product.sell_price}</p>
                <br />
                <button onClick={() => handleAddSale(product)}>Добавити продажу</button>
            </div>
        ));
    };

    const handleAddSale = async (product: ProductInfo) => {
        try {
            if (product.id) {
                const response = await addSale(product.id, 1);
                alert(response.message)
                setSaleTriggered(!saleTriggered)
            }
        } catch (error) {
            console.error("Error loading data:", error);
        }
    }

    const renderCurrentLevel = () => {
        if (Array.isArray(currentLevel)) {
            return renderProductList(currentLevel);
        } else {
            return renderObject(currentLevel);
        }
    }

    const currentLevel = getCurrentLevel();

    return (
        <div className="products-container">
            <h2 className="title">Products</h2>
            {path.length > 0 && (
                <button className="back-button" onClick={handleGoBack}>Back</button>
            )}

            <div className="buttons-container">
                {renderCurrentLevel()}
            </div>
        </div>
    );
};

export default Products;
