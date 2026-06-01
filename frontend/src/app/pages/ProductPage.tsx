import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Minus, Plus, AlertCircle, Package, Truck, CheckCircle } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [addBranding, setAddBranding] = useState(false);
  const [selectedBrandingType, setSelectedBrandingType] = useState<string>('');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-gray-600">Товар не найден</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!product.inStock) {
      alert('Этот товар в данный момент отсутствует на складе');
      return;
    }

    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      quantity,
      addBranding
    );
    navigate('/cart');
  };

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="bg-gray-100 rounded-xl overflow-hidden mb-4 aspect-square relative">
            <ImageWithFallback
              src={product.gallery[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="bg-white text-gray-900 px-6 py-3 rounded-lg font-bold text-lg">
                  Нет в наличии
                </span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`bg-gray-100 rounded-lg overflow-hidden aspect-square ${
                  selectedImage === idx ? 'ring-2 ring-yellow-400' : ''
                }`}
              >
                <ImageWithFallback
                  src={img}
                  alt={`${product.name} ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-sm text-gray-500">Артикул: {product.article}</p>
          </div>

          <p className="text-3xl font-bold text-gray-900 mb-6">
            {product.price.toLocaleString('ru-RU')} ₽
          </p>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-gray-400" />
              <span className="text-sm">
                {product.inStock ? (
                  <span className="text-green-600 font-medium">
                    В наличии ({product.stockQuantity} шт)
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">Нет в наличии</span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-700">Доставка: {product.deliveryTime}</span>
            </div>
            {product.brandingAvailable && (
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-700">Доступно брендирование</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-2">Описание</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-2">Характеристики</h2>
            <div className="grid grid-cols-2 gap-3">
              {product.characteristics.map((char, idx) => (
                <div key={idx} className="text-sm">
                  <span className="text-gray-500">{char.name}:</span>
                  <span className="text-gray-900 ml-2 font-medium">{char.value}</span>
                </div>
              ))}
            </div>
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h2 className="font-semibold text-lg mb-3">Цвет</h2>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`relative group ${
                      selectedColor === color.name ? 'ring-2 ring-yellow-400 ring-offset-2' : ''
                    }`}
                    title={color.name}
                  >
                    <div
                      className="w-10 h-10 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm text-gray-900">Минимальная сумма заказа</p>
              <p className="text-sm text-gray-600">15 000 ₽</p>
            </div>
          </div>

          {product.brandingAvailable && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <label className="flex items-center gap-2 cursor-pointer mb-3">
                <input
                  type="checkbox"
                  checked={addBranding}
                  onChange={(e) => {
                    setAddBranding(e.target.checked);
                    if (!e.target.checked) setSelectedBrandingType('');
                  }}
                  className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                />
                <span className="text-sm font-semibold">Добавить нанесение логотипа</span>
              </label>

              {addBranding && (
                <div className="ml-6">
                  <p className="text-sm text-gray-600 mb-2">Тип брендирования:</p>
                  <div className="space-y-2">
                    {product.brandingTypes.map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="brandingType"
                          value={type}
                          checked={selectedBrandingType === type}
                          onChange={(e) => setSelectedBrandingType(e.target.value)}
                          className="w-4 h-4 text-yellow-400 border-gray-300 focus:ring-yellow-400"
                        />
                        <span className="text-sm text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3">Количество</label>
            <div className="flex items-center gap-4">
              <button
                onClick={decrementQuantity}
                className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-xl font-semibold w-16 text-center">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 font-semibold py-3 rounded-lg transition-colors"
          >
            {product.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
          </button>
        </div>
      </div>
    </div>
  );
}
