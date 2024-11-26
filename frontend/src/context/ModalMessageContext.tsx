import React, { createContext, useContext, useState } from "react";
import ModalMessage from "../components/Modal/ModalMessage";
import { ModalMessageContextType, ModalProviderProps } from "../types/modal";

interface ModalData {
    id: string;
    message: string;
}

const ModalMessageContext = createContext<ModalMessageContextType | undefined>(undefined);

export const useModalMessage = (): ModalMessageContextType => {
    const context = useContext(ModalMessageContext);
    if (!context) {
        throw new Error("useModalMessage must be used within a ModalProvider");
    }
    return context;
};

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [modals, setModals] = useState<ModalData[]>([]);

    const showModal = (message: string) => {
        const id = crypto.randomUUID();
        setModals((prevModals) => {
            const newModals = [...prevModals, { id, message }];
            if (newModals.length > 3) {
                newModals.shift(); // Видаляємо найстарішу модалку, якщо їх більше трьох
            }
            return newModals;
        });
    };

    const removeModal = (id: string) => {
        setModals((prevModals) => prevModals.filter((modal) => modal.id !== id));
    };

    return (
        <ModalMessageContext.Provider value={{ showModal }}>
            {children}
            <div className="modal-container">
                {modals.map((modal, index) => (
                    <ModalMessage
                        key={modal.id}
                        message={modal.message}
                        onClose={() => removeModal(modal.id)}
                    />
                ))}
            </div>
        </ModalMessageContext.Provider>
    );
};
