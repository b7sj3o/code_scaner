import React, { useState } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { findProductByBarcode } from '../../services/api';
import { BarcodeProduct } from '../../types/product';
import ModalFound from '../Modal/ModalFound/ModalFound';
import ModalNotFound from '../Modal/ModalNotFound/ModalNotFound';
import { useModalMessage } from '../../context/ModalMessageContext';
import { useNavigate } from 'react-router-dom';

const Scanner: React.FC = () => {
    const [barcode, setBarcode] = useState<string>("");
    const [product, setProduct] = useState<BarcodeProduct | null>(null);  // Стейт для продукту
    const [isModalFoundOpen, setIsModalFoundOpen] = useState<boolean>(false);  // Для ModalFound
    const [isModalNotFoundOpen, setIsModalNotFoundOpen] = useState<boolean>(false);  // Для ModalNotFound
    const { showModal } = useModalMessage();
    const navigate = useNavigate();

    const handleUpdate = async (err: any, result: any) => {
        if (result && typeof result.getText === "function") {
            const scannedBarcode = result.getText();
            setBarcode(scannedBarcode); // Оновлюємо штрих-код

            const fetchedProduct = await findProductByBarcode(scannedBarcode);

            if (fetchedProduct.success) {
                setProduct(fetchedProduct.data as BarcodeProduct);  // Якщо продукт знайдений, зберігаємо його в стейт
                setIsModalFoundOpen(true);  // Відкриваємо ModalFound
                setIsModalNotFoundOpen(false);  // Закриваємо ModalNotFound
            } else {
                setIsModalNotFoundOpen(true);  // Якщо продукт не знайдений, відкриваємо ModalNotFound
                setIsModalFoundOpen(false);  // Закриваємо ModalFound
            }
        }
    };

    const handleCloseModalFound = () => {
        setIsModalFoundOpen(false);  // Закриваємо ModalFound
    };

    const handleCloseModalNotFound = () => {
        setIsModalNotFoundOpen(false);  // Закриваємо ModalNotFound
    };

    const handleSimulateFound = () => {
        const simulatedProduct: BarcodeProduct = {
            id: 1,
            name: "Simulated Product",
            amount: 20,
            producer: "Simulated Producer",
            barcode: "123456789",
        };

        setBarcode(simulatedProduct.barcode);
        setProduct(simulatedProduct);
        setIsModalFoundOpen(true);  // Відкриваємо ModalFound
        setIsModalNotFoundOpen(false);  // Закриваємо ModalNotFound
    };

    const handleSimulateNotFound = () => {
        setBarcode("987654321");
        setProduct(null);
        setIsModalFoundOpen(false);  // Закриваємо ModalFound
        setIsModalNotFoundOpen(true);  // Відкриваємо ModalNotFound
    };

    return (
        <>
        <button onClick={handleSimulateFound}>Simulate Product Found</button>
        <button onClick={handleSimulateNotFound}>Simulate Product Not Found</button>
            <BarcodeScannerComponent
                width={"100%"}
                height={"100%"}
                onUpdate={handleUpdate}
            />
            <ModalFound 
                product={product!}  // Продукт передається в ModalFound, де він використовується
                isOpen={isModalFoundOpen} 
                onClose={handleCloseModalFound} 
                showModal={showModal}
            />
            <ModalNotFound 
                barcode={barcode}  // Штрих-код передається в ModalNotFound
                isOpen={isModalNotFoundOpen} 
                onClose={handleCloseModalNotFound}
                navigate={navigate}
            />
        </>
    );
};

export default Scanner;
