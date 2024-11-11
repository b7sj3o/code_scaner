import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

// Файл для вимірювання продуктивності вашого додатку. Він дозволяє відстежувати показники,
// такі як час завантаження, відповідь на дії користувача тощо.
// Можна або використовувати його для підключення метрик, або видалити, якщо не потрібно відстежувати продуктивність.
