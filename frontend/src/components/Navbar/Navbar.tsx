import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/" className="navbar-link">Головна</Link></li>
                <li><Link to="/create-models" className="navbar-link">Створити моделі</Link></li>
                <li><Link to="/add-arrival" className="navbar-link">Добавити прихід</Link></li>
                <li><Link to="/add-sale-opt" className="navbar-link">Добавити продаж (опт)</Link></li>
                <li><button className="navbar-button">Сканувати</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;
