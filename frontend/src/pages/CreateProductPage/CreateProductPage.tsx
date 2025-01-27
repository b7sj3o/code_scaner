import React, { useEffect, useState } from "react";
import "./CreateProductPage.scss";
import { createProduct, findProductByBarcode, getProductForeignKeys } from "../../services/api";
import { ProductForm, ProductForeignKeys, Producer } from '../../types/product-form';
import { useModalMessage } from "../../context/ModalMessageContext";
import { useLocation } from 'react-router-dom';

const CreateProductPage: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const barcodeFromScanner = searchParams.get("scannerBarcode");
    const barcodeFromProducts = searchParams.get("productBarcode");

    const [formData, setFormData] = useState<ProductForm>({
        product_type: "",
        producer: "",
        name: '',
        buy_price: 0,
        sell_price: 0,
        amount: 0,
        drop_sell_price: 0,
        barcode: ""
    });

    const [productForeignKeys, setProductForeignKeys] = useState<ProductForeignKeys>();
    const [filteredProducers, setFilteredProducers] = useState<Producer[]>([]);
    const { showModal } = useModalMessage();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedProductForeignKeys = await getProductForeignKeys();
                setProductForeignKeys(fetchedProductForeignKeys);

                if (barcodeFromScanner) {
                    setFormData((prevData) => ({
                        ...prevData,
                        barcode: barcodeFromScanner
                    }));
                } else if (barcodeFromProducts) {
                    const result = await findProductByBarcode(barcodeFromProducts);

                    if (result.success) {
                        const product = result.data;

                        setFormData((prevData) => ({
                            ...prevData,
                            product_type: product.product_type_name || "",
                            producer: product.producer_name || "",
                            volume: product.volume || "",
                            strength: product.strength || "",
                            puffs_amount: product.puffs_amount || "",
                            resistance: product.resistance || "",
                            pod_model: product.pod_model || "",
                            buy_price: product.buy_price || 0,
                            sell_price: product.sell_price || 0,
                            drop_sell_price: product.drop_sell_price || 0,
                        }));

                    } else {
                        showModal(`Трапилась помилка: ${result.error}, повідомте Віталіка`);
                    }
                }

            } catch (error) {
                console.error('Error loading data:', error);
            }
        };
        fetchData();
    }, [barcodeFromScanner, barcodeFromProducts, showModal]);

    useEffect(() => {
        if (formData.product_type) {
            filterProducers(formData.product_type)
        }
    }, [formData.product_type]);


    const filterProducers = (type: string) => {
        if (productForeignKeys) {
            const filtered = productForeignKeys.producers.filter((producer) =>
                producer.producer_type__value.toLowerCase() === type.toLowerCase()
            );
            setFilteredProducers(filtered);
        }
    };


    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = e.target.value;

        setFormData((prevData) => ({
            ...prevData,
            product_type: selectedType,
            producer: "",
            volume: "",
            strength: "",
            puffs_amount: "",
            resistance: "",
            pod_model: "",
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await createProduct(formData);
            showModal(response.message);

            setFormData({
                product_type: "",
                producer: "",
                name: '',
                buy_price: 0,
                sell_price: 0,
                amount: 0,
                drop_sell_price: 0,
                barcode: ""
            });
            setFilteredProducers([]);

        } catch (error) {
            showModal(`creating product: ${error}`);
        }
    };

    return (
        <div className="form-container">
            <h2>Створити продукт</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Тип продукту:</label>
                    <select name="product_type" value={formData.product_type} onChange={handleTypeChange} required>
                        <option value="" disabled>--------</option>
                        {productForeignKeys?.product_types.map(type => (
                            <option key={type.id} value={type.value}>{type.value}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Виробник:</label>
                    <select name="producer" value={formData.producer} onChange={handleChange} required>
                        <option value="" disabled>--------</option>
                        {filteredProducers.map(producer => (
                            <option key={producer.id} value={producer.value}>{producer.value}</option>
                        ))}
                    </select>
                </div>

                {(formData.product_type === 'Готова жижа' || formData.product_type === 'Самозаміс') && (
                    <>
                        <div className="form-group">
                            <label>Об'єм:</label>
                            <select name="volume" value={formData.volume} onChange={handleChange} required>
                                <option value="" disabled>--------</option>
                                {productForeignKeys?.volumes.map(volume => (
                                    <option key={volume.id} value={volume.value}>{volume.value}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Міцність:</label>
                            <select name="strength" value={formData.strength} onChange={handleChange} required>
                                <option value="" disabled>--------</option>
                                {productForeignKeys?.strengths.map(strength => (
                                    <option key={strength.id} value={strength.value}>{strength.value}</option>
                                ))}
                            </select>
                        </div>
                    </>
                )}

                {formData.product_type === 'Одноразка' && (
                    <div className="form-group">
                        <label>Кількість тяг:</label>
                        <select name="puffs_amount" value={formData.puffs_amount} onChange={handleChange} required>
                            <option value="" disabled>--------</option>
                            {productForeignKeys?.puffs_amounts.map(puffs_amount => (
                                <option key={puffs_amount.id} value={puffs_amount.value}>{puffs_amount.value}</option>
                            ))}
                        </select>
                    </div>
                )}

                {formData.product_type === 'Картридж' && (
                    <div className="form-group">
                        <label>Опір:</label>
                        <select name="resistance" value={formData.resistance} onChange={handleChange} required>
                            <option value="" disabled>--------</option>
                            {productForeignKeys?.resistances.map(resistance => (
                                <option key={resistance.id} value={resistance.value}>{resistance.value}</option>
                            ))}
                        </select>
                    </div>
                )}

                {formData.product_type === 'Под' && (
                    <div className="form-group">
                        <label>Pod Model:</label>
                        <select name="pod_model" value={formData.pod_model} onChange={handleChange}>
                            <option value="">--------</option>
                            {productForeignKeys?.pod_models.map(model => (
                                <option key={model.id} value={model.value}>{model.value}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="form-group">
                    <label>Смак (жижа|одноразка) | Колір (под) | Модель (картридж):</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Закупочна ціна:</label>
                    <input type="tel" name="buy_price" value={formData.buy_price} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Продажна ціна:</label>
                    <input type="tel" name="sell_price" value={formData.sell_price} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Дроп ціна:</label>
                    <input type="tel" name="drop_sell_price" value={formData.drop_sell_price} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>К-сть:</label>
                    <input type="tel" name="amount" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Штрих-код:</label>
                    <input type="tel" name="barcode" value={formData.barcode} onChange={handleChange} required />
                </div>
                <button type="submit" className="submit-btn">Create Product</button>
            </form>
        </div>
    );
}

export default CreateProductPage;