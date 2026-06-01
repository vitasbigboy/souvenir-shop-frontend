import { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export function ContactsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Форма отправлена:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-green-50 border border-green-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-2">Сообщение отправлено!</h2>
          <p className="text-gray-600">
            Спасибо за обращение. Мы свяжемся с вами в течение 1-2 рабочих часов.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-12">Контакты</h1>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Свяжитесь с нами</h2>

          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Телефон</h3>
                <p className="text-gray-600">+7 (495) 123-45-67</p>
                <p className="text-gray-600">+7 (800) 555-35-35 (бесплатно)</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-gray-600">info@prosto-gifts.ru</p>
                <p className="text-gray-600">sales@prosto-gifts.ru</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Адрес</h3>
                <p className="text-gray-600">
                  Москва, Россия
                  <br />
                  ул. Тверская, д. 15
                  <br />
                  Строение 1, Офис 301
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Часы работы</h3>
                <p className="text-gray-600">
                  Понедельник - Пятница: 9:00 - 18:00
                  <br />
                  Суббота - Воскресенье: Выходной
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-6">
            <h3 className="font-semibold mb-2">Быстрый ответ</h3>
            <p className="text-sm text-gray-600">
              Наш отдел продаж обычно отвечает на запросы в течение 1-2 рабочих часов в рабочее
              время.
            </p>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Отправьте нам сообщение</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Имя <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                <label className="block text-sm font-medium mb-1">Тема</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Сообщение <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg transition-colors"
              >
                Отправить сообщение
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
