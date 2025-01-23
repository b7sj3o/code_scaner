import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from './components/Layout/Layout';

import HomePage from './pages/HomePage/HomePage';
import CreateProductPage from './pages/CreateProductPage/CreateProductPage';
import ScannerPage from './pages/ScannerPage/ScannerPage';
import ProductArrivalPage from './pages/ProductArrivalPage/ProductArrivalPage';
import ProductOptPage from './pages/ProductOptPage/ProductOptPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import AnalyticsPage from './pages/AnalyticsPage/AnalyticsPage';

// App.tsx — Основний компонент програми. Це компонент верхнього рівня, з якого починається структура вашого додатку. 
// Зазвичай він містить інші компоненти і є "вхідною точкою" програми.

const App: React.FC = () => {
  const backgroundColor = useSelector((state: any) => state.settings.backgroundColor);

  return (
    <Router>
        <div style={{backgroundColor: backgroundColor, minHeight: "100vh"}}>
          <Layout>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/create-product" element={<CreateProductPage />} />
                  <Route path="/scan" element={<ScannerPage />} />
                  <Route path="/add-arrival" element={<ProductArrivalPage />} />
                  <Route path="/add-opt" element={<ProductOptPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
              </Routes>
          </Layout>
        </div>
    </Router>
  );
};

export default App;
