// src/pages/HomePage.tsx
import React from 'react';
import Products from '../components/Products/Products';
import ProductSearch from '../components/ProductSearch/ProductSearch';
import { Product } from '../types/product';

const HomePage: React.FC = () => {

    return (
        <div className='container'>
            <ProductSearch />
            <Products />
        </div>
    );
};

export default HomePage;
