import React, { useState } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { findProductByBarcode } from '../../services/api';
import { Product } from '../../types/product';
import ModalFound from '../../components/Modal/ModalFound/ModalFound';
import ModalNotFound from '../../components/Modal/ModalNotFound/ModalNotFound';
import { useModalMessage } from '../../context/ModalMessageContext';
import { useNavigate } from 'react-router-dom';
import "./ScannerPage.scss";

const ScannerPage: React.FC = () => {
    const [barcode, setBarcode] = useState<string>("");
    const [product, setProduct] = useState<Product | null>(null); 
    const [isModalFoundOpen, setIsModalFoundOpen] = useState<boolean>(false);
    const [isModalNotFoundOpen, setIsModalNotFoundOpen] = useState<boolean>(false);
    const { showModal } = useModalMessage();
    const navigate = useNavigate();

    const handleUpdate = async (err: any, result: any) => {
        if (result && typeof result.getText === "function") {
            const scannedBarcode = result.getText();
            setBarcode(scannedBarcode); 

            const fetchedProduct = await findProductByBarcode(scannedBarcode);

            if (fetchedProduct.success) {
                setProduct(fetchedProduct.data); 
                setIsModalFoundOpen(true); 
                setIsModalNotFoundOpen(false); 
            } else {
                setIsModalNotFoundOpen(true);
                setIsModalFoundOpen(false);
            }
        }
    };

    const handleCloseModalFound = () => {
        setIsModalFoundOpen(false);
    };

    const handleCloseModalNotFound = () => {
        setIsModalNotFoundOpen(false);
    };

    // const handleSimulateFound = () => {
    //     const simulatedProduct: Product = {
    //         id: 1,
    //         name: "Simulated Product",
    //         amount: 20,
    //         producer: "Simulated Producer",
    //         barcode: "123456789",
    //     };

    //     setBarcode(simulatedProduct.barcode);
    //     setProduct(simulatedProduct);
    //     setIsModalFoundOpen(true);  // Відкриваємо ModalFound
    //     setIsModalNotFoundOpen(false);  // Закриваємо ModalNotFound
    // };

    // const handleSimulateNotFound = () => {
    //     setBarcode("987654321");
    //     setProduct(null);
    //     setIsModalFoundOpen(false);  // Закриваємо ModalFound
    //     setIsModalNotFoundOpen(true);  // Відкриваємо ModalNotFound
    // };

    return (
        <>
        {/* <button onClick={handleSimulateFound}>Simulate Product Found</button> */}
        {/* <button onClick={handleSimulateNotFound}>Simulate Product Not Found</button> */}
            <BarcodeScannerComponent
                width={"100%"}
                height={"100%"}
                onUpdate={handleUpdate}
            />
            <ModalFound 
                product={product!}
                isOpen={isModalFoundOpen} 
                onClose={handleCloseModalFound} 
                showModal={showModal}
            />
            <ModalNotFound 
                barcode={barcode}
                isOpen={isModalNotFoundOpen} 
                onClose={handleCloseModalNotFound}
                navigate={navigate}
            />
        </>
    );
};

export default ScannerPage;
