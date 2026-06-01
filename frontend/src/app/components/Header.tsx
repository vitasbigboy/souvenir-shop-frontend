import { Link } from 'react-router';
import { Search, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-baseline gap-0">
            <span className="text-2xl font-normal text-gray-700">про</span>
            <span className="text-3xl font-bold text-yellow-400">С</span>
            <span className="text-2xl font-normal text-gray-700">то</span>
          </Link>

          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск товаров..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <Link to="/catalog" className="text-gray-700 hover:text-gray-900">
              Каталог
            </Link>
            <Link to="/company" className="text-gray-700 hover:text-gray-900 hidden md:block">
              Компания
            </Link>
            <Link to="/production" className="text-gray-700 hover:text-gray-900 hidden md:block">
              Производство
            </Link>
            <Link to="/help" className="text-gray-700 hover:text-gray-900 hidden md:block">
              Помощь
            </Link>
            <Link to="/contacts" className="text-gray-700 hover:text-gray-900 hidden md:block">
              Контакты
            </Link>
            <Link to="/cart" className="relative text-gray-700 hover:text-gray-900">
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
