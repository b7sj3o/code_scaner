import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


// App.test.tsx — Тестовий файл для компонента App. Він використовується для написання
// юніт-тестів на компонент App за допомогою бібліотеки тестування (наприклад, Jest).
// Це допомагає автоматично перевіряти, чи працює компонент правильно.
