// src/components/Layout.tsx
import React, { useState, useEffect } from "react";
import "./ProductSearch.scss";
import { Product, ProductSearchProps } from "../../types/product";
import { getProducts } from "../../services/api";



const ProductSearch: React.FC<ProductSearchProps> = ({ showAddButton = false, onProductAdd }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [inputQuery, setInputQuery] = useState<string>("");
    const [hideSearch, setHideSearch] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedProducts = await getProducts();
                setProducts(fetchedProducts);
                setFilteredProducts(fetchedProducts);
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (query: string) => {
        setInputQuery(query)
        const lowerQuery = query.toLowerCase().trim();

        const filtered = products.filter((product) =>
            // Must-have fields
            product.name.toLowerCase().includes(lowerQuery) ||
            product.product_type_name.toLowerCase().includes(lowerQuery) ||
            product.producer_name.toLowerCase().includes(lowerQuery) ||
            product.barcode.includes(lowerQuery) ||

            // Non-must-have fields
            (product.volume_amount || "").toLowerCase().includes(lowerQuery) ||
            (product.strength_amount || "").toLowerCase().includes(lowerQuery) ||
            (product.puffs_amount_value || "").toLowerCase().includes(lowerQuery) ||
            (product.resistance_amount || "").toLowerCase().includes(lowerQuery) ||
            (product.pod_model_name || "").toLowerCase().includes(lowerQuery)
        );
        setFilteredProducts(filtered);
    };

    const handleHideSearch = () => {
        setHideSearch(!hideSearch);
    }

    return (
        <div className="product-search">
            <div className="product-search__header">
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Пошук продуктів"
                    className="product-search__input"
                />
                <button className="product-search__button" type="submit" onClick={handleHideSearch}>
                    {hideSearch ? (
                        <img src="/images/eye.png" alt="Показати форму" />
                    ) : (
                        <img src="/images/no-eye.png" alt="Сховати форму" />
                    )}
                </button>
            </div>

            <ul className="product-search__results">
                {hideSearch ? (
                    // Якщо форма схована, нічого не показувати
                    inputQuery.length >= 1 && filteredProducts.length === 0 ? (
                        // Якщо введений запит, але немає результатів
                        <h1>Not found</h1>
                    ) : (
                        // Якщо запит є або його немає, показувати відповідні продукти
                        (inputQuery.length >= 1 ? filteredProducts : products).map((product) => (
                            <li key={product.id} className="product-search__item">
                                <h3 className="product-search__name">{product.name}</h3>
                                <p className="product-search__detail">К-сть: {product.amount}</p>
                                <p className="product-search__detail">Виробник: {product.producer_name}</p>
                                <p className="product-search__detail">Тип товару: {product.product_type_name}</p>
                                {showAddButton && (
                                  <button
                                      onClick={() => onProductAdd?.(product)}
                                      className="product-search__add-button">
                                      +
                                  </button>
                                )}
                            </li>
                        ))
                    )
                ):null}
            </ul>
            
        </div>
    );
};

export default ProductSearch;
