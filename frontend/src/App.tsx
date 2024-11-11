import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import CreateProductPage from './pages/CreateProductPage';

// App.tsx — Основний компонент програми. Це компонент верхнього рівня, з якого починається структура вашого додатку. 
// Зазвичай він містить інші компоненти і є "вхідною точкою" програми.

const App: React.FC = () => {
  return (
      <Router>
          <Layout>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/create-models" element={<CreateProductPage />} />
              </Routes>
          </Layout>
      </Router>
  );
};

export default App;
