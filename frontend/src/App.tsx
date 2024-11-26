import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import CreateProductPage from './pages/CreateProductPage';
import ScannerPage from './pages/ScannerPage';
import ProductArrivalPage from './pages/ProductArrival';
import { ModalProvider } from './context/ModalMessageContext';


// App.tsx — Основний компонент програми. Це компонент верхнього рівня, з якого починається структура вашого додатку. 
// Зазвичай він містить інші компоненти і є "вхідною точкою" програми.

const App: React.FC = () => {
  return (
    <ModalProvider>
      <Router>
          <Layout>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/create-models" element={<CreateProductPage />} />
                  <Route path="/scan" element={<ScannerPage />}></Route>
                  <Route path="/add-arrival" element={<ProductArrivalPage />}></Route>
              </Routes>
          </Layout>
      </Router>
    </ModalProvider>
  );
};

export default App;
