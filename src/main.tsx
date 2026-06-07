import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import ReactDOM from 'react-dom/client';
import { store } from './store/store';
import { Provider } from 'react-redux';
import './index.css';
import { hydrateToken } from './store/slices/AuthSlice';

store.dispatch(hydrateToken());

ReactDOM.createRoot(
    document.getElementById('root')!
).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
