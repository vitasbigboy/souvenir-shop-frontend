import { useState } from 'react';
import { Link } from 'react-router';
import { Search, ArrowUpDown } from 'lucide-react';
import { FilterPanel } from '../components/FilterPanel';
import { products, categories } from '../data/products';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useCart } from '../context/CartContext';

export function CatalogPage() {
  const { addToCart } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все категории');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [showBrandingOnly, setShowBrandingOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'popular'>('popular');

  const filteredProducts = products
    .filter((product) => {
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (selectedCategory !== 'Все категории' && product.category !== selectedCategory) {
        return false;
      }
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      if (showInStockOnly && !product.inStock) {
        return false;
      }
      if (showBrandingOnly && !product.brandingAvailable) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  const handleQuickAdd = (product: typeof products[0]) => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      1,
      false
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Каталог</h1>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-5 h-5 text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="popular">Популярные</option>
            <option value="price-asc">Цена: по возрастанию</option>
            <option value="price-desc">Цена: по убыванию</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FilterPanel
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            showInStockOnly={showInStockOnly}
            onInStockChange={setShowInStockOnly}
            showBrandingOnly={showBrandingOnly}
            onBrandingChange={setShowBrandingOnly}
          />
        </div>

        <div className="lg:col-span-3">
          <div className="mb-4 text-sm text-gray-600">
            Найдено {filteredProducts.length}{' '}
            {filteredProducts.length === 1
              ? 'товар'
              : filteredProducts.length < 5
              ? 'товара'
              : 'товаров'}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600">Товары не найдены по заданным критериям.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="aspect-square overflow-hidden bg-gray-100 relative">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm">
                            Нет в наличии
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 mb-1 hover:text-gray-700">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-500 mb-2">Артикул: {product.article}</p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-bold text-lg">{product.price.toLocaleString('ru-RU')} ₽</p>
                      {product.brandingAvailable && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          Брендирование
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/product/${product.id}`}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-4 rounded-lg text-center text-sm transition-colors"
                      >
                        Подробнее
                      </Link>
                      <button
                        onClick={() => handleQuickAdd(product)}
                        disabled={!product.inStock}
                        className="flex-1 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 font-medium py-2 px-4 rounded-lg text-sm transition-colors"
                      >
                        Быстро добавить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
