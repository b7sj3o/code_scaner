import React, { useEffect, useState } from "react";
import "./ModalMessage.scss";

interface ModalProps {
    message: string;
    onClose: () => void;
}

const ModalMessage: React.FC<ModalProps> = ({ message, onClose }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsExiting(true), 3000); // Запускаємо анімацію виходу
        return () => clearTimeout(timer);
    }, []);

    const handleAnimationEnd = () => {
        if (isExiting) {
            onClose(); // Видаляємо модалку після завершення анімації
        }
    };

    return (
        <div
            className={`modal ${isExiting ? "exit" : ""}`}
            onAnimationEnd={handleAnimationEnd}
        >
            <div className="modal-content">
                <button className="modal-close" onClick={() => setIsExiting(true)}>
                    ×
                </button>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default ModalMessage;
