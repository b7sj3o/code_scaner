import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductForm.scss";
import { getPodModels, getProducers, getProductTypes } from "../../services/api";
import { ProductType, Producer, PodModel, Product } from "../../types/api";

// interface ProductFormData {
//     product_type: string;
//     producer: string;
//     volume?: string;
//     strength?: string;
//     puffs_amount?: string;
//     resistance?: string;
//     pod_model?: string;
//     name: string;
//     buy_price: number;
//     sell_price: number;
//     drop_sell_price: number;
//     amount: number;
//     barcode: string;
// }

interface ProductFormData extends Product {}


const ProductForm: React.FC = () => {
    const [formData, setFormData] = useState<ProductFormData>({
        product_type_name: "",
        producer_name: "",
        name: '',
        buy_price: 0,
        sell_price: 0,
        amount: 0,
        drop_sell_price: 0,
        barcode: ''
    });

    const [productTypes, setProductTypes] = useState<ProductType[]>([]);
    const [podModels, setPodModels] = useState<PodModel[]>([]);
    const [producers, setProducers] = useState<Producer[]>([]);
    const [filteredProducers, setFilteredProducers] = useState<Producer[]>([]);

    const [selectedType, setSelectedType] = useState<string>(""); 

    useEffect(() => {
        const fetchData = async () => { 
            try {
                const [productTypesData, producersData, podModelsData] = await Promise.all([
                    getProductTypes(),
                    getProducers(),
                    getPodModels()
                ]);
                console.log(true)
                setProductTypes(productTypesData);
                setProducers(producersData);
                setPodModels(podModelsData);
                setFilteredProducers(producersData);
                 
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };
        fetchData();
    }, []);

    const filterProducers = (type: string) => {
        const filtered = producers.filter(producer => producer.producer_type_name.toLowerCase() === type.toLowerCase());
        setFilteredProducers(filtered);
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setSelectedType(value.toLowerCase());
        setFormData({
            ...formData,
            product_type_name: value,
            volume_amount: '',
            strength_amount: '',
            puffs_amount_value: '',
            resistance_amount: '',
            pod_model_name: ''
        });
        filterProducers(value)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value // TODO: what is it?
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await axios.post("https://0.0.0.0:8000/api/create-product/", formData);
            console.log("Product created: ", response.data);
        } catch (error) {
            console.error("Error creating product: ", error)
        }
    }

    return (
        <div className="form-container">
            <h2>Створити продукт</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Тип продукту:</label>
                    <select name="product_type" value={formData.product_type_name} onChange={handleTypeChange} required>
                        <option value="" disabled>--------</option>
                        {productTypes.map(type => (
                            <option key={type.id} value={type.name}>{type.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Виробник:</label>
                    <select name="producer" value={formData.producer_name} onChange={handleChange} required>
                        <option value="" disabled>--------</option>
                        {filteredProducers.map(producer => (
                            <option key={producer.id} value={producer.name}>{producer.name}</option>
                        ))}
                    </select>
                </div>

                {/* Fields for "готова жижа" and "самозаміс" */}
                {(selectedType === 'готова жижа' || selectedType === 'самозаміс') && (
                    <>
                        <div className="form-group">
                            <label>Об'єм:</label>
                            <input type="text" name="volume" value={formData.volume_amount || ''} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Міцність:</label>
                            <input type="text" name="strength" value={formData.strength_amount || ''} onChange={handleChange} />
                        </div>
                    </>
                )}

                {/* Field for "одноразка" */}
                {selectedType === 'одноразка' && (
                    <div className="form-group">
                        <label>Кількість тяг:</label>
                        <input type="text" name="puffs_amount" value={formData.puffs_amount_value || ''} onChange={handleChange} />
                    </div>
                )}

                {/* Field for "картридж" */}
                {selectedType === 'картридж' && (
                    <div className="form-group">
                        <label>Опір:</label>
                        <input type="text" name="resistance" value={formData.resistance_amount || ''} onChange={handleChange} />
                    </div>
                )}

                {/* Field for "под" */}
                {selectedType === 'под' && (
                    <div className="form-group">
                        <label>Pod Model:</label>
                        <select name="pod_model" value={formData.pod_model_name || ''} onChange={handleChange}>
                            <option value="">Select a pod model</option>
                            {podModels.map(model => (
                                <option key={model.id} value={model.name}>{model.name}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Other fields */}
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
                    <label>Штрих-код:</label>
                    <input type="tel" name="barcode" value={formData.barcode} onChange={handleChange} required />
                </div>
                <button type="submit" className="submit-btn">Create Product</button>
            </form>
        </div>
    );

}

export default ProductForm;