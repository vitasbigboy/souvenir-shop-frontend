import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ProductCard } from '../components/ProductCard';
import { ProductSlider } from '../components/ProductSlider';
import { products as localProducts } from '../data/products';
import { Package, ShoppingCart, FileText } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
const allTags = ['С логотипом', 'Для коллег', 'Наборы', 'Для мужчин', 'Новый год'];

export function HomePage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [products, setProducts] = useState(localProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(`${API_URL}/products/`);
        const data = await response.json();

        const mappedProducts = data.map((product: any) => ({
          id: String(product.productId ?? product.id),
          name: product.name,
          article: product.article || String(product.productId ?? product.id),
          price: Number(product.price),
          image: product.imageURL || product.image || product.images?.[0] || '',
          description: product.description,
          characteristics: product.characteristics || [],
          tags: product.tags || [],
          gallery: product.images && product.images.length > 0
            ? product.images
            : product.gallery || [product.imageURL || product.image || ''],
          colors: product.colors || [],
          inStock: product.in_stock ?? Number(product.stock ?? product.stock_quantity ?? 0) > 0,
          stockQuantity: Number(product.stock ?? product.stock_quantity ?? 0),
          deliveryTime: product.delivery_time || 'Не указано',
          brandingAvailable: product.branding_available,
          brandingTypes: product.branding_types || [],
          category: typeof product.category === 'string' ? product.category : product.category?.name || 'Без категории',
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error('Ошибка загрузки товаров на главной:', error);
        setProducts(localProducts);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredProducts =
    selectedTags.length === 0
      ? products.slice(0, 8)
      : products.filter((product) =>
          selectedTags.some((tag) => product.tags.includes(tag))
        );

  const popularProducts = [...products]
  .sort((a, b) => Number(a.id) - Number(b.id))
  .filter((p) => p.inStock)
  .slice(0, 4);

  return (
    <div>
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Корпоративные подарки и брендированная продукция
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Премиальные подарки для ваших деловых партнеров, команды и клиентов
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/catalog"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Перейти в каталог
              </Link>
              <Link
                to="/cart"
                className="bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-3 rounded-lg border-2 border-gray-900 transition-colors"
              >
                Оставить заявку
              </Link>
            </div>
          </div>

          <ProductSlider />

          <div className="mt-12 grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-yellow-400">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Работаем с юр. лицами</p>
                  <p className="text-sm text-gray-600">Только для компаний и организаций</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-yellow-400">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Минимальный заказ</p>
                  <p className="text-sm text-gray-600">От 15 000 ₽</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <section className="py-16">
          <p className="text-center text-gray-600">Загрузка товаров...</p>
        </section>
      ) : (
        <>
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-12">Популярные товары</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {popularProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">О компании</h2>
              <div className="bg-gray-100 rounded-xl p-8 mb-6">
                <p className="text-gray-400 text-center italic">
                  Информация о компании будет добавлена позже
                </p>
              </div>
              <Link
                to="/company"
                className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-lg transition-colors"
              >
                Узнать больше
              </Link>
            </div>
            <div className="bg-gray-100 rounded-xl aspect-video"></div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Производство</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Мы предлагаем профессиональные услуги брендирования и нанесения логотипов на все наши
            товары. Наши передовые технологии печати обеспечивают яркие, долговечные результаты,
            которые идеально представляют ваш бренд.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="bg-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Печать логотипов</h3>
              <p className="text-gray-600 text-sm">
                Высококачественная печать логотипов на любых товарах с использованием современных
                технологий
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="bg-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ShoppingCart className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Индивидуальное брендирование</h3>
              <p className="text-gray-600 text-sm">
                Полные пакеты брендирования с цветами и дизайном вашей компании
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="bg-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Быстрое производство</h3>
              <p className="text-gray-600 text-sm">
                Короткие сроки производства без ущерба для качества
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Наши товары</h2>

          <div className="flex flex-wrap gap-2 mb-8">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-yellow-400 text-gray-900'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">Товары не найдены по выбранным фильтрам.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
