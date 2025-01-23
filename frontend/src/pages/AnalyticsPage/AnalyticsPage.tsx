// src/components/Layout.tsx
import React, { useState, useEffect } from 'react';
import { getFilteredSales, getSalesSummary } from '../../services/api';
import { ProductSale, SalesSummary } from '../../types/product';
import "./AnalyticsPage.scss";

const AnalyticsPage: React.FC = () => {
    const [sales, setSales] = useState<ProductSale[]>([]);
    const [salesSummary, setSalesSummary] = useState<SalesSummary>({ total_revenue: 0, total_amount: 0 });
    const [filters, setFilters] = useState<any>({
        start_date: '',
        end_date: '',
        product: '',
        product_type: '',
        producer: '',
    });

    useEffect(() => {
        // Завантажуємо фільтровані продажі
        const fetchSalesData = async () => {
            const filteredSales = await getFilteredSales(filters);
            setSales(filteredSales);
        };

        // Завантажуємо загальний оборот
        const fetchSalesSummary = async () => {
            const summary = await getSalesSummary();
            setSalesSummary(summary);
        };

        fetchSalesData();
        fetchSalesSummary();
    }, [filters]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="sales-analytics-container">
            <h2>Sales Analytics</h2>
            
            <div className="filters">
                <input
                    type="date"
                    name="start_date"
                    value={filters.start_date}
                    onChange={handleFilterChange}
                    placeholder="Start Date"
                />
                <input
                    type="date"
                    name="end_date"
                    value={filters.end_date}
                    onChange={handleFilterChange}
                    placeholder="End Date"
                />
                <input
                    type="text"
                    name="product"
                    value={filters.product}
                    onChange={handleFilterChange}
                    placeholder="Product"
                />
                <input
                    type="text"
                    name="product_type"
                    value={filters.product_type}
                    onChange={handleFilterChange}
                    placeholder="Product Type"
                />
                <input
                    type="text"
                    name="producer"
                    value={filters.producer}
                    onChange={handleFilterChange}
                    placeholder="Producer"
                />
            </div>

            <div className="summary">
                <h3>Total Revenue: {salesSummary.total_revenue} грн</h3>
                <h3>Total Sales Amount: {salesSummary.total_amount} шт</h3>
            </div>

            <div className="sales-list">
                {sales.map((sale) => (
                    <div key={sale.id} className="sale-item">
                        <h4>{sale.product_name}</h4>
                        <p>Product Type: {sale.product_type}</p>
                        <p>Producer: {sale.producer_name}</p>
                        <p>Amount Sold: {sale.amount}</p>
                        <p>Sell Price: {sale.sell_price} грн</p>
                        <p>Date: {new Date(sale.date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnalyticsPage;
