// src/components/Layout.tsx
import React from 'react';
import Navbar from '../Navbar/Navbar';
import "./Layout.scss";
import { LayoutProps } from '../../types/layout';



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
