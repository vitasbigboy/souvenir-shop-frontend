import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterPanelProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  showInStockOnly: boolean;
  onInStockChange: (value: boolean) => void;
  showBrandingOnly: boolean;
  onBrandingChange: (value: boolean) => void;
}

export function FilterPanel({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  showInStockOnly,
  onInStockChange,
  showBrandingOnly,
  onBrandingChange,
}: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    availability: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="font-bold text-lg mb-6">Фильтры</h2>

      <div className="space-y-6">
        <div>
          <button
            onClick={() => toggleSection('category')}
            className="flex items-center justify-between w-full font-semibold mb-3"
          >
            Категория
            {expandedSections.category ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {expandedSections.category && (
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => onCategoryChange(category)}
                    className="w-4 h-4 text-yellow-400 border-gray-300 focus:ring-yellow-400"
                  />
                  <span className="text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full font-semibold mb-3"
          >
            Диапазон цен
            {expandedSections.price ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {expandedSections.price && (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="Мин"
                  value={priceRange[0]}
                  onChange={(e) =>
                    onPriceRangeChange([Number(e.target.value), priceRange[1]])
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <span className="text-gray-500">—</span>
                <input
                  type="number"
                  placeholder="Макс"
                  value={priceRange[1]}
                  onChange={(e) =>
                    onPriceRangeChange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={() => toggleSection('availability')}
            className="flex items-center justify-between w-full font-semibold mb-3"
          >
            Наличие
            {expandedSections.availability ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {expandedSections.availability && (
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showInStockOnly}
                  onChange={(e) => onInStockChange(e.target.checked)}
                  className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                />
                <span className="text-sm text-gray-700">Только в наличии</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showBrandingOnly}
                  onChange={(e) => onBrandingChange(e.target.checked)}
                  className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                />
                <span className="text-sm text-gray-700">Доступно брендирование</span>
              </label>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => {
          onCategoryChange('Все категории');
          onPriceRangeChange([0, 100000]);
          onInStockChange(false);
          onBrandingChange(false);
        }}
        className="w-full mt-6 text-sm text-gray-600 hover:text-gray-900 underline"
      >
        Сбросить все фильтры
      </button>
    </div>
  );
}
