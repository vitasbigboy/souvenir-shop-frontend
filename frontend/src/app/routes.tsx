import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { CompanyPage } from './pages/CompanyPage';
import { ProductionPage } from './pages/ProductionPage';
import { HelpPage } from './pages/HelpPage';
import { ContactsPage } from './pages/ContactsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'catalog', Component: CatalogPage },
      { path: 'product/:id', Component: ProductPage },
      { path: 'products/:id', Component: ProductPage },
      { path: 'cart', Component: CartPage },
      { path: 'company', Component: CompanyPage },
      { path: 'production', Component: ProductionPage },
      { path: 'help', Component: HelpPage },
      { path: 'contacts', Component: ContactsPage },
    ],
  },
]);
