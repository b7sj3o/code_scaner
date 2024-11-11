// src/components/Layout.tsx
import React from 'react';
import Navbar from '../Navbar/Navbar';
import "./Layout.scss";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main>
                {children}
            </main>
        </div>
    );
};

export default Layout;
