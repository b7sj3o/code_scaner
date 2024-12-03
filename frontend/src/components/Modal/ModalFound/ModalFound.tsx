import React, { useEffect, useState } from "react";
import "./ModalFound.scss";
import { BarcodeProduct } from "../../../types/product";
import { addSale } from "../../../services/api";
import { useModalMessage } from "../../../context/ModalMessageContext";

interface ModalProps {
    product: BarcodeProduct;
    isOpen: boolean;
    onClose: () => void;
    showModal: (message: string) => void;
}

const ModalFound: React.FC<ModalProps> = ({ product, isOpen, onClose, showModal }) => {
    if (!isOpen) return null;

    const handleAddAmount = async () => {
        try {
            if (product.id) {
                const response = await addSale(product.id, 1);
                showModal(response.message);
            }
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

    return (
        <div className={"modal-found-overlay"}>
            <div className="modal-found-container">
                <h2>{product.name}</h2>
                <p>Amount: {product.amount}</p>
                <p>Barcode: {product.barcode}</p>

                <button onClick={handleAddAmount}>Add Amount</button>
                <button onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default ModalFound;
