import { ReactNode } from "react";

export interface ModalMessageContextType {
    showModal: (message: string) => void;
}

export interface ModalProps {
    message: string;
    onClose: () => void;
    index: number;
}

export interface ModalProviderProps {
    children: ReactNode;
}