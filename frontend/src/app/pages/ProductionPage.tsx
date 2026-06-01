import { Paintbrush, Stamp, Sparkles, Clock } from 'lucide-react';

export function ProductionPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Производство и брендирование</h1>

      <div className="mb-16">
        <p className="text-xl text-gray-600 max-w-3xl">
          Мы предлагаем профессиональные услуги по нанесению логотипов и брендированию всех наших
          товаров. Наши передовые технологии печати обеспечивают яркие, долговечные результаты,
          которые идеально представляют ваш бренд.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-6">Методы брендирования</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="bg-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Paintbrush className="w-6 h-6 text-gray-900" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Печать</h3>
          <p className="text-gray-600 text-sm mb-4">
            Высококачественная цифровая и трафаретная печать для ярких, детализированных логотипов
            на различных материалах.
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Полноцветная печать</li>
            <li>• Подходит для сложных дизайнов</li>
            <li>• Долговечная и износостойкая</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="bg-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Stamp className="w-6 h-6 text-gray-900" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Шелкография</h3>
          <p className="text-gray-600 text-sm mb-4">
            Классическая шелкография для четких, профессиональных результатов на текстиле и плоских
            поверхностях.
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Четкие, чистые линии</li>
            <li>• Экономично для больших заказов</li>
            <li>• Долговечные результаты</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="bg-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-gray-900" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Тиснение</h3>
          <p className="text-gray-600 text-sm mb-4">
            Элегантное тиснение и гравировка для премиального, тактильного брендирования на коже и
            металле.
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Изысканная отделка</li>
            <li>• Идеально для люксовых товаров</li>
            <li>• Постоянная маркировка</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6">Процесс производства</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <div className="bg-yellow-400 text-gray-900 font-bold w-10 h-10 rounded-full flex items-center justify-center mb-3">
              1
            </div>
            <h3 className="font-semibold mb-2">Оставьте заявку</h3>
            <p className="text-sm text-gray-600">
              Заполните форму заявки с вашими требованиями и файлами логотипа.
            </p>
          </div>

          <div>
            <div className="bg-yellow-400 text-gray-900 font-bold w-10 h-10 rounded-full flex items-center justify-center mb-3">
              2
            </div>
            <h3 className="font-semibold mb-2">Согласование дизайна</h3>
            <p className="text-sm text-gray-600">
              Наша команда создает макет для вашего утверждения перед производством.
            </p>
          </div>

          <div>
            <div className="bg-yellow-400 text-gray-900 font-bold w-10 h-10 rounded-full flex items-center justify-center mb-3">
              3
            </div>
            <h3 className="font-semibold mb-2">Производство</h3>
            <p className="text-sm text-gray-600">
              Мы производим ваши брендированные товары выбранным методом.
            </p>
          </div>

          <div>
            <div className="bg-yellow-400 text-gray-900 font-bold w-10 h-10 rounded-full flex items-center justify-center mb-3">
              4
            </div>
            <h3 className="font-semibold mb-2">Доставка</h3>
            <p className="text-sm text-gray-600">
              Быстрая доставка по указанному адресу по всей России.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <Clock className="w-8 h-8 text-yellow-500" />
          <h2 className="text-2xl font-bold">Сроки производства</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Стандартные заказы</h3>
            <p className="text-gray-600">5-7 рабочих дней</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Большие заказы (500+ шт)</h3>
            <p className="text-gray-600">10-14 рабочих дней</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Срочный сервис</h3>
            <p className="text-gray-600">2-3 рабочих дня (доп. плата)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
