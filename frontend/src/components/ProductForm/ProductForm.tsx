import React, { useEffect, useState } from "react";
import "./ProductForm.scss";
import { createProduct, getProductForeignKeys, getProductTree } from "../../services/api";
import { ProductTree } from "../../types/product";
import { ProductForm, ProductForeignKeys, Producer, ForeignKeyItem } from '../../types/product-form';
import { useModalMessage } from "../../context/ModalMessageContext";

const CreateProduct: React.FC = () => {
    const [formData, setFormData] = useState<ProductForm>({
        product_type: "",
        producer: "",
        name: '',
        buy_price: 0,
        sell_price: 0,
        amount: 0,
        drop_sell_price: 0,
        barcode: ''
    });

    const [productForeignKeys, setProductForeignKeys] = useState<ProductForeignKeys>();
    const [filteredProducers, setFilteredProducers] = useState<Producer[]>([]);
    const [path, setPath] = useState<string[]>([]);
    const [selectedType, setSelectedType] = useState<string>(""); 
    const { showModal } = useModalMessage()

    useEffect(() => {
        const fetchData = async () => { 
            try {
                const [fetchedProductForeignKeys] = await Promise.all([
                    getProductForeignKeys(),
                ]);
                
                setProductForeignKeys(fetchedProductForeignKeys);

            } catch (error) {
                console.error('Error loading data:', error);
            }
        };
        fetchData();

    }, []);


    const filterProducers = (type: string) => {
        if (productForeignKeys) {
            const filteredProducers = productForeignKeys.producers.filter((producer) =>
                producer.producer_type__value.toLowerCase() === type.toLowerCase()
            );
            setFilteredProducers(filteredProducers);
        }
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // get selected <option> text
        const text = e.target.options[e.target.selectedIndex].text

        setSelectedType(text);

        setPath([...path, text]);

        setFormData({
            ...formData,
            product_type: e.target.value,
            volume: '',
            strength: '',
            puffs_amount: '',
            resistance: '',
            pod_model: ''
        });
        
        filterProducers(text);


    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (e.target instanceof HTMLSelectElement) {
            const text = e.target.options[e.target.selectedIndex].text;
            setPath([...path, text]);
        }

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await createProduct(formData);
            showModal(response.message)

            // TODO: clear form
            
            // setFormData({
            //     product_type: "",
            //     producer: "",
            //     name: '',
            //     buy_price: 0,
            //     sell_price: 0,
            //     amount: 0,
            //     drop_sell_price: 0,
            //     barcode: ''
            // })
        } catch (error) {
            console.error("Error creating product: ", error);
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
                            <option key={type.id} value={type.id}>{type.value}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Виробник:</label>
                    <select name="producer" value={formData.producer} onChange={handleChange} required>
                        <option value="" disabled>--------</option>
                        {filteredProducers.map(producer => (
                            <option key={producer.id} value={producer.id}>{producer.value}</option>
                        ))}
                    </select>
                </div>

                {(selectedType === 'Готова жижа' || selectedType === 'Самозаміс') && (
                    <>
                        <div className="form-group">
                            <label>Об'єм:</label>
                            <select name="volume" value={formData.volume} onChange={handleChange} required>
                                <option value="" disabled>--------</option>
                                {productForeignKeys?.volumes.map(volume => (
                                    <option key={volume.id} value={volume.id}>{volume.value}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Міцність:</label>
                            <select name="strength" value={formData.strength} onChange={handleChange} required>
                                <option value="" disabled>--------</option>
                                {productForeignKeys?.strengths.map(strength => (
                                    <option key={strength.id} value={strength.id}>{strength.value}</option>
                                ))}
                            </select>
                        </div>
                    </>
                )}

                {selectedType === 'Одноразка' && (
                    <div className="form-group">
                        <label>Кількість тяг:</label>
                        <select name="puffs_amount" value={formData.puffs_amount} onChange={handleChange} required>
                            <option value="" disabled>--------</option>
                            {productForeignKeys?.puffs_amounts.map(puffs_amount => (
                                <option key={puffs_amount.id} value={puffs_amount.id}>{puffs_amount.value}</option>
                            ))}
                        </select>
                    </div>
                )}

                {selectedType === 'Картридж' && (
                    <div className="form-group">
                        <label>Опір:</label>
                        <select name="resistance" value={formData.resistance} onChange={handleChange} required>
                            <option value="" disabled>--------</option>
                            {productForeignKeys?.resistances.map(resistance => (
                                <option key={resistance.id} value={resistance.id}>{resistance.value}</option>
                            ))}
                        </select>
                    </div>
                )}

                {selectedType === 'Под' && (
                    <div className="form-group">
                        <label>Pod Model:</label>
                        <select name="pod_model" value={formData.pod_model} onChange={handleChange}>
                            <option value="">--------</option>
                            {productForeignKeys?.pod_models.map(model => (
                                <option key={model.id} value={model.id}>{model.value}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="form-group">
                    <label>Смак (жижа|одноразка) | Колір (под) | Модель (картридж):</label>
                    <input type="text" name="name" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Закупочна ціна:</label>
                    <input type="tel" name="buy_price" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Продажна ціна:</label>
                    <input type="tel" name="sell_price" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Дроп ціна:</label>
                    <input type="tel" name="drop_sell_price" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>К-сть:</label>
                    <input type="tel" name="amount" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Штрих-код:</label>
                    <input type="tel" name="barcode" onChange={handleChange} required />
                </div>
                <button type="submit" className="submit-btn">Create Product</button>
            </form>
        </div>
    );
}

export default CreateProduct;
