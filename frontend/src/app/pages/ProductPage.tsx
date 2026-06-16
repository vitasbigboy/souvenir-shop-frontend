import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Minus, Plus, AlertCircle, Package, Truck, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

type Product = {
  id: string;
  name: string;
  article: string;
  price: number;
  image: string;
  description: string;
  characteristics: { name: string; value: string }[];
  tags: string[];
  gallery: string[];
  colors?: { name: string; hex: string }[];
  inStock: boolean;
  stockQuantity: number;
  deliveryTime: string;
  brandingAvailable: boolean;
  brandingTypes: string[];
  category: string;
};

type BackendProduct = {
  productId?: string | number;
  id?: string | number;
  name?: string;
  article?: string;
  description?: string;
  price?: string | number;
  images?: (string | { imageId?: string | number; imageURL?: string; isPrimary?: boolean })[];
  imageURL?: string;
  image?: string;
  gallery?: string[];
  category?: string | { name?: string };
  stock?: number;
  in_stock?: boolean;
  stock_quantity?: number;
  delivery_time?: string;
  characteristics?: { name: string; value: string }[];
  tags?: string[];
  colors?: { name: string; hex: string }[];
  branding_available?: boolean;
  branding_types?: string[];
};

type ApiResponse<T> = {
  success?: boolean;
  data?: T;
};

function getApiData<T>(json: ApiResponse<T> | T): T {
  return 'data' in Object(json) ? (json as ApiResponse<T>).data ?? (json as T) : (json as T);
}

function normalizeImages(images?: BackendProduct['images']): string[] {
  if (!images) return [];

  return images
    .map((image) => (typeof image === 'string' ? image : image.imageURL))
    .filter((image): image is string => Boolean(image));
}

function mapProduct(data: BackendProduct): Product {
  const productId = data.productId ?? data.id;
  const images = normalizeImages(data.images);
  const image = data.imageURL || data.image || images[0] || '';
  const gallery = images.length > 0
    ? images
    : data.gallery && data.gallery.length > 0
    ? data.gallery
    : image
    ? [image]
    : [];
  const stockQuantity = Number(data.stock ?? data.stock_quantity ?? 0);

  return {
    id: String(productId),
    name: data.name || '',
    article: data.article || String(productId),
    price: Number(data.price ?? 0),
    image,
    description: data.description || '',
    characteristics: data.characteristics || [],
    tags: data.tags || [],
    gallery,
    colors: data.colors || [],
    inStock: data.in_stock ?? stockQuantity > 0,
    stockQuantity,
    deliveryTime: data.delivery_time || 'Не указано',
    brandingAvailable: data.branding_available ?? false,
    brandingTypes: data.branding_types || [],
    category: typeof data.category === 'string' ? data.category : data.category?.name || 'Без категории',
  };
}

export function ProductPage() {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [addBranding, setAddBranding] = useState(false);
  const [selectedBrandingType, setSelectedBrandingType] = useState<string>('');

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);

        if (!productId) {
          throw new Error('Не указан productId');
        }

        const response = await fetch(`${API_URL}/products/${productId}/`);
        let data: BackendProduct | BackendProduct[] | null = null;

        if (response.ok) {
          const json = await response.json();
          data = getApiData<BackendProduct | BackendProduct[]>(json);
        } else {
          const listResponse = await fetch(`${API_URL}/products/`);
          if (!listResponse.ok) {
            throw new Error('Товар не найден');
          }
          const json = await listResponse.json();
          data = getApiData<BackendProduct | BackendProduct[]>(json);
        }

        const productData = Array.isArray(data)
          ? data.find((product) => String(product.productId ?? product.id) === String(productId))
          : data;

        if (!productData) {
          throw new Error('Товар не найден');
        }

        const mappedProduct = mapProduct(productData);

        setProduct(mappedProduct);
        setSelectedImage(0);
        setSelectedColor(null);
        setAddBranding(false);
        setSelectedBrandingType('');
      } catch (error) {
        console.error('Ошибка загрузки товара:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-gray-600">Загрузка товара...</p>
      </div>
    );
  }

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
              src={product.gallery[selectedImage] || product.image}
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

          {product.gallery.length > 1 && (
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
          )}
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

          {product.characteristics.length > 0 && (
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
          )}

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
