import { Users, Award, TrendingUp, Heart } from 'lucide-react';

export function CompanyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">О компании</h1>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Кто мы</h2>
          <div className="bg-gray-100 rounded-xl p-8">
            <p className="text-gray-400 text-center italic">
              Информация о компании будет добавлена позже
            </p>
          </div>
        </div>
        <div className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center">
          <span className="text-gray-400">Изображение компании</span>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-16">
        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-900" />
          </div>
          <h3 className="font-bold text-3xl mb-2">500+</h3>
          <p className="text-gray-600">Довольных клиентов</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-gray-900" />
          </div>
          <h3 className="font-bold text-3xl mb-2">12</h3>
          <p className="text-gray-600">Лет опыта</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-gray-900" />
          </div>
          <h3 className="font-bold text-3xl mb-2">10K+</h3>
          <p className="text-gray-600">Доступных товаров</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-gray-900" />
          </div>
          <h3 className="font-bold text-3xl mb-2">98%</h3>
          <p className="text-gray-600">Уровень удовлетворенности</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6">Наши ценности</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-2">Качество прежде всего</h3>
            <p className="text-gray-600">
              Мы закупаем только премиальные товары от проверенных производителей и проводим
              тщательный контроль качества.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Клиентоориентированность</h3>
            <p className="text-gray-600">
              Каждый клиент получает персонализированное внимание и индивидуальные решения,
              отвечающие его специфическим потребностям.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Надежность</h3>
            <p className="text-gray-600">
              Мы гарантируем своевременную доставку и прозрачную коммуникацию на протяжении всего
              процесса.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
