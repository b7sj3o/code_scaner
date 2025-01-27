import React, { useState, useEffect } from 'react';
import { getFilteredSales, getSalesSummary } from '../../services/api';
import { ProductSale, SalesSummary } from '../../types/product';
import "./AnalyticsPage.scss";

const AnalyticsPage: React.FC = () => {
    const [sales, setSales] = useState<ProductSale[]>([]);
    const [salesSummary, setSalesSummary] = useState<SalesSummary>({ total_revenue: 0, total_amount: 0, total_earning: 0 });
    const [filters, setFilters] = useState<any>({
        start_date: '',
        end_date: '',
        product: '',
        product_type: '',
        producer: '',
    });
    const [showAllSales, setShowAllSales] = useState(false);

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

    const handleToggleShowAll = () => {
        setShowAllSales(!showAllSales);
    };

    return (
        <div className="sales-analytics-container">
            <h2>Аналітика Продажів</h2>
            
            <div className="filters">
                <input
                    type="date"
                    name="start_date"
                    value={filters.start_date}
                    onChange={handleFilterChange}
                    placeholder="Дата початку"
                />
                <input
                    type="date"
                    name="end_date"
                    value={filters.end_date}
                    onChange={handleFilterChange}
                    placeholder="Дата закінчення"
                />
                <input
                    type="text"
                    name="product"
                    value={filters.product}
                    onChange={handleFilterChange}
                    placeholder="Продукт"
                />
                <input
                    type="text"
                    name="product_type"
                    value={filters.product_type}
                    onChange={handleFilterChange}
                    placeholder="Тип продукту"
                />
                <input
                    type="text"
                    name="producer"
                    value={filters.producer}
                    onChange={handleFilterChange}
                    placeholder="Виробник"
                />
            </div>

            <div className="summary">
                <div>
                    <h3>Загальний дохід: {salesSummary.total_revenue} грн</h3>
                    <h3>Загальний заробіток: {salesSummary.total_earning} грн</h3>
                </div>
                <h3>Загальна кількість продажів: {salesSummary.total_amount} шт</h3>
            </div>

            <div className="sales-list">
                {(showAllSales ? sales : sales.slice(0, 10)).map((sale) => (
                    <div key={sale.id} className="sale-item">
                        <h4>{sale.product_name}</h4>
                        <p>Тип продукту: {sale.product_type}</p>
                        <p>Виробник: {sale.producer_name}</p>
                        <p>Кількість проданого: {sale.amount}</p>
                        <p>Ціна продажу: {sale.sell_price} грн</p>
                        <p>Дата: {new Date(sale.date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
            {sales.length > 10 && (
                <button onClick={handleToggleShowAll} className='show-all-button'>
                    {showAllSales ? 'Показати менше' : 'Показати всі'}
                </button>
            )}
        </div>
    );
};

export default AnalyticsPage;
