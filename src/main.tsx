import App from './App.tsx';
import ReactDOM from 'react-dom/client';
import { store } from './store/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(
    document.getElementById('root')!
).render(
    <Provider store={store}>
        <App />
    </Provider>
);
