import ReactDOM from 'react-dom/client';
import "./styles/main.scss";
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);

reportWebVitals();

// Вхідна точка додатку, яка рендерить компонент App у DOM.
// Тут відбувається прив'язка React-додатку до HTML-документу (зазвичай до елемента <div id="root">
// у файлі public/index.html). Саме цей файл відповідає за запуск програми.
