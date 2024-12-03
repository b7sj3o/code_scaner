import React from "react";
import "./ModalNotFound.scss";
import { BarcodeProduct } from "../../../types/product";
import { useNavigate } from "react-router-dom";

interface ModalProps {
    barcode: string;
    isOpen: boolean;
    navigate: any;
    onClose: () => void;
}

const ModalNotFound: React.FC<ModalProps> = ({ barcode, isOpen, navigate, onClose }) => {
    if (!isOpen) return null;

    const handleCreateProduct = () => {
        navigate(`/create-product?barcode=${barcode}`);
    };

    return (
        <div className="modal-not-found-overlay">
            <div className="modal-not-found-container">
                <h2>Product not found</h2>
                <p>Barcode: {barcode}</p>

                <button onClick={handleCreateProduct}>Create Product</button>
                <button onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default ModalNotFound;
