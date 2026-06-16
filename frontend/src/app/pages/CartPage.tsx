import { useState } from 'react';
import { Minus, Plus, Trash2, AlertCircle, CheckCircle, Upload } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
const MINIMUM_ORDER = 15000;

export function CartPage() {
  const { items, updateQuantity, updateLogoOption, removeFromCart, getTotalPrice, clearCart } =
    useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    city: '',
    phone: '',
    email: '',
    comment: '',
    companyName: '',
    inn: '',
    consent: false,
  });

  const [companyCard, setCompanyCard] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const totalPrice = getTotalPrice();
  const meetsMinimum = totalPrice >= MINIMUM_ORDER;

  const hasOutOfStockItems = items.some((item) => {
    const product = products.find((p) => p.id === item.productId);
    return !product?.inStock;
  });

  const canSubmit = meetsMinimum && !hasOutOfStockItems && formData.consent && !isSending;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCompanyCard(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) return;

    try {
      setIsSending(true);

      const payload = {
        full_name: formData.fullName,
        city: formData.city,
        phone: formData.phone,
        email: formData.email,
        comment: formData.comment,
        company_name: formData.companyName,
        inn: formData.inn,
        items: items.map((item) => ({
          product_id: Number(item.productId),
          quantity: item.quantity,
          color: '',
          branding_selected: item.addLogo,
        })),
      };

      const response = await fetch(`${API_URL}/orders/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Ошибка заявки:', data);
        alert('Ошибка отправки заявки. Проверьте сумму заказа и наличие товаров.');
        return;
      }

      console.log('Заявка создана в Django:', data);
      setSubmitted(true);
      clearCart();
    } catch (error) {
      console.error('Ошибка соединения с backend:', error);
      alert('Не удалось отправить заявку. Проверьте, запущен ли backend.');
    } finally {
      setIsSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-green-50 border border-green-200 rounded-xl p-8">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Заявка успешно отправлена!</h2>
          <p className="text-gray-600 mb-4">
            Спасибо за вашу заявку. Наш менеджер свяжется с вами в ближайшее время для обсуждения
            деталей и оформления заказа.
          </p>
          <p className="text-sm text-gray-500">
            Обычно мы отвечаем в течение 1-2 рабочих часов.
          </p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Ваша корзина пуста</h2>
        <p className="text-gray-600 mb-8">Добавьте товары, чтобы начать</p>
        <a
          href="/catalog"
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Перейти в каталог
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, index) => {
            const product = products.find((p) => p.id === item.productId);
            const isOutOfStock = !product?.inStock;

            return (
              <div
                key={`${item.productId}-${index}`}
                className={`bg-white rounded-xl p-4 shadow-sm ${
                  isOutOfStock ? 'border-2 border-red-200' : ''
                }`}
              >
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {isOutOfStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">Нет</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        {isOutOfStock && (
                          <span className="text-xs text-red-600 font-medium">
                            Нет в наличии - пожалуйста, удалите
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-3">{item.price.toLocaleString('ru-RU')} ₽</p>

                    <div className="flex items-center gap-4 mb-3">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="bg-gray-100 hover:bg-gray-200 rounded-lg p-1 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="bg-gray-100 hover:bg-gray-200 rounded-lg p-1 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.addLogo}
                        onChange={(e) => updateLogoOption(item.productId, e.target.checked)}
                        className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                      />
                      <span className="text-sm text-gray-700">Нанесение логотипа</span>
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm sticky top-20">
            <h2 className="font-bold text-xl mb-4">Итого</h2>
            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Сумма</span>
                <span className="font-semibold">{totalPrice.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            {!meetsMinimum && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Минимальная сумма заказа не достигнута
                  </p>
                  <p className="text-sm text-gray-600">
                    Добавьте товаров еще на {(MINIMUM_ORDER - totalPrice).toLocaleString('ru-RU')} ₽
                  </p>
                </div>
              </div>
            )}

            {hasOutOfStockItems && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Товары отсутствуют</p>
                  <p className="text-sm text-gray-600">
                    Пожалуйста, удалите товары, которых нет в наличии
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-semibold text-lg pt-4 border-t border-gray-200">
                Контактная информация
              </h3>

              <div>
                <label className="block text-sm font-medium mb-1">
                  ФИО <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Город <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Телефон <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Комментарий</label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <h3 className="font-semibold text-lg pt-4 border-t border-gray-200">
                Информация о компании
              </h3>

              <div>
                <label className="block text-sm font-medium mb-1">Название компании</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">ИНН</label>
                <input
                  type="text"
                  value={formData.inn}
                  onChange={(e) => setFormData({ ...formData, inn: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Карточка компании (необязательно)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="company-card"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="company-card"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <Upload className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {companyCard ? companyCard.name : 'Выберите файл'}
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400 mt-0.5"
                  />
                  <span className="text-sm text-gray-600">
                    Я согласен на обработку персональных данных{' '}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 font-semibold py-3 rounded-lg transition-colors"
              >
                {isSending ? 'Отправка...' : 'Отправить заявку'}
              </button>

              {!canSubmit && (
                <p className="text-xs text-gray-500 text-center">
                  {!meetsMinimum && 'Минимальная сумма заказа не достигнута. '}
                  {hasOutOfStockItems && 'Удалите товары, которых нет в наличии. '}
                  {!formData.consent && 'Пожалуйста, примите согласие на обработку данных.'}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
