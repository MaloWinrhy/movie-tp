
import ReactDOM from 'react-dom/client';

import App from './App';
import { BrowserRouter } from 'react-router';
import { WishlistProvider } from './context/WishlistProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <WishlistProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </WishlistProvider>
);