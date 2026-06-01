import { Link } from 'react-router';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-baseline gap-0 mb-4">
              <span className="text-xl font-normal text-gray-700">про</span>
              <span className="text-2xl font-bold text-yellow-400">С</span>
              <span className="text-xl font-normal text-gray-700">то</span>
            </div>
            <p className="text-gray-600 text-sm">
              Корпоративные подарки и брендированная продукция для вашего бизнеса
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Каталог</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/catalog" className="hover:text-gray-900">
                  Все товары
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-gray-900">
                  С логотипом
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-gray-900">
                  Подарочные наборы
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-gray-900">
                  Новый год
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Компания</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/company" className="hover:text-gray-900">
                  О нас
                </Link>
              </li>
              <li>
                <Link to="/production" className="hover:text-gray-900">
                  Производство
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-gray-900">
                  Как заказать
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-gray-900">
                  Помощь
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+74951234567" className="hover:text-gray-900">
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />

                <a href="mailto:info@prosto-gifts.ru" className="hover:text-gray-900">
                  info@prosto-gifts.ru
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <Link to="/contacts" className="hover:text-gray-900">
                  Москва, Россия
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          © 2026 проСто. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
