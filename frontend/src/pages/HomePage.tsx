// src/pages/HomePage.tsx
import React, { useState } from 'react';
import Products from '../components/Products/Products';
import ProductSearch from '../components/ProductSearch/ProductSearch';
import { Product } from '../types/product';
import ModalFound from '../components/Modal/ModalFound/ModalFound';
import { useModalMessage } from '../context/ModalMessageContext';

const HomePage: React.FC = () => {
    return (
        <div className='container'>
            <ProductSearch />
            <Products />
        </div>
    );
};

export default HomePage;
