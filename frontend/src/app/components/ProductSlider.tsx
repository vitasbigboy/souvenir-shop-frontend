import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

const slides: Slide[] = [
  {
    id: '1',
    title: 'Новогодние корпоративные подарки 2026',
    subtitle: 'Специальные сезонные предложения с премиальной упаковкой',
    image: 'https://images.unsplash.com/photo-1697717657359-46433ee8497c?w=1200',
    buttonText: 'Смотреть коллекцию',
    buttonLink: '/catalog',
  },
  {
    id: '2',
    title: 'Премиальные подарочные наборы для руководителей',
    subtitle: 'Роскошные подарки для ваших деловых партнеров',
    image: 'https://images.unsplash.com/photo-1544377208-215a63786183?w=1200',
    buttonText: 'Смотреть наборы',
    buttonLink: '/catalog',
  },
  {
    id: '3',
    title: 'Нанесение логотипа на заказ',
    subtitle: 'Профессиональное брендирование на всех товарах',
    image: 'https://images.unsplash.com/photo-1694481901573-a970f982ac5e?w=1200',
    buttonText: 'Узнать больше',
    buttonLink: '/production',
  },
];

export function ProductSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative bg-gray-900 rounded-2xl overflow-hidden h-[400px]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ImageWithFallback
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-xl text-white">
                <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl mb-6 text-gray-200">{slide.subtitle}</p>
                <Link
                  to={slide.buttonLink}
                  className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-yellow-400' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
