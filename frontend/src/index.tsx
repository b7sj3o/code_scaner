import ReactDOM from 'react-dom/client';
import "./styles/main.scss";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ModalProvider } from './context/ModalMessageContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ModalProvider>
      <App />
    </ModalProvider>
  </Provider>
);

reportWebVitals();

// Вхідна точка додатку, яка рендерить компонент App у DOM.
// Тут відбувається прив'язка React-додатку до HTML-документу (зазвичай до елемента <div id="root">
// у файлі public/index.html). Саме цей файл відповідає за запуск програми.
