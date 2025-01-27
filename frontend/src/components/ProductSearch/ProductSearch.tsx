// src/components/Layout.tsx
import React, { useState, useEffect } from "react";
import "./ProductSearch.scss";
import { Product, ProductSearchProps } from "../../types/product";
import { useSelector } from "react-redux";
import { getProducts } from "../../services/api";



const ProductSearch: React.FC<ProductSearchProps> = ({ showAddButton = false, onProductAdd }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [inputQuery, setInputQuery] = useState<string>("");
    
    const settings = useSelector((state: any) => state.settings);
    
    const [isSearchVisible, setSearchVisibility] = useState(settings.isSearchVisible)

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
        if (query.length > 0 && !isSearchVisible) {
            setSearchVisibility(true);
        } else if (query.length === 0 && isSearchVisible) {
            setSearchVisibility(false);
        }

        setInputQuery(query)
        const queries = query.toLowerCase().trim().split(/\s+/);

        const filtered = products.filter((product) => {
            return queries.every((word) =>
                // Must-have fields
                product.name.toLowerCase().includes(word) ||
                product.product_type_name.toLowerCase().includes(word) ||
                product.producer_name.toLowerCase().includes(word) ||

                // Non-must-have fields
                (product.volume || "").toLowerCase().includes(word) ||
                (product.strength || "").toLowerCase().includes(word) ||
                (product.puffs_amount || "").toLowerCase().includes(word) ||
                (product.resistance || "").toLowerCase().includes(word) ||
                (product.pod_model || "").toLowerCase().includes(word)
            )
        }
            
            
        );
        setFilteredProducts(filtered);
    };

    const handleShowSearch = () => {
        setSearchVisibility(!isSearchVisible);
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
                <button className="product-search__button" type="submit" onClick={handleShowSearch}>
                    {isSearchVisible ? (
                        <img src="/images/eye.png" alt="Сховати форму" title="Сховати форму" />
                    ) : (
                        <img src="/images/no-eye.png" alt="Показати форму" title="Показати форму" />
                    )}
                </button>
            </div>

            <ul className="product-search__results">
                {isSearchVisible ? (
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
