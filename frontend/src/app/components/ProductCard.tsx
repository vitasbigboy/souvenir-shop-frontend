import { Link } from 'react-router';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export function ProductCard({ id, name, price, image }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id, name, price, image }, 1, false);
  };

  return (
    <Link
      to={`/product/${id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2">{name}</h3>
        <div className="flex items-center justify-between">
          <p className="font-bold text-lg">{price.toLocaleString('ru-RU')} ₽</p>
          <button
            onClick={handleAddToCart}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg p-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
}
