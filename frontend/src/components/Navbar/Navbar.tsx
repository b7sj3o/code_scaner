import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item"><Link to="/" className="navbar-link">Головна</Link></li>
                <li className="navbar-item"><Link to="/create-models" className="navbar-link">Створити моделі</Link></li>
                <li className="navbar-item"><Link to="/add-arrival" className="navbar-link">Добавити прихід</Link></li>
                <li className="navbar-item"><Link to="/add-sale-opt" className="navbar-link">Добавити продаж (опт)</Link></li>
                <li className="navbar-item"><Link to="/scan" className="navbar-link navbar-button">Сканувати</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
