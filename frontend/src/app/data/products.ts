export interface Product {
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
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Премиум набор блокнотов',
    article: 'GS-NB-001',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1510922903530-28ecf3f00362?w=800',
    description: 'Элегантный набор блокнотов в кожаном переплете, идеально подходит для корпоративных подарков. Высококачественная бумага, возможность нанесения логотипа компании.',
    characteristics: [
      { name: 'Размер', value: 'A5 (148 x 210 мм)' },
      { name: 'Страницы', value: '200 листов в линейку' },
      { name: 'Материал', value: 'Премиум кожа' },
      { name: 'Вес', value: '350 г' },
    ],
    tags: ['С логотипом', 'Для коллег', 'Наборы'],
    gallery: [
      'https://images.unsplash.com/photo-1510922903530-28ecf3f00362?w=800',
      'https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?w=800',
      'https://images.unsplash.com/photo-1516390118834-21602d501886?w=800',
    ],
    colors: [
      { name: 'Черный', hex: '#000000' },
      { name: 'Коричневый', hex: '#8B4513' },
      { name: 'Синий', hex: '#000080' },
    ],
    inStock: true,
    stockQuantity: 150,
    deliveryTime: '3-5 рабочих дней',
    brandingAvailable: true,
    brandingTypes: ['Печать', 'Тиснение'],
    category: 'Канцелярия',
  },
  {
    id: '2',
    name: 'Подарочный набор руководителя',
    article: 'GS-GB-002',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1544377208-215a63786183?w=800',
    description: 'Роскошный подарочный набор с премиальными офисными аксессуарами. Включает ручку, блокнот и визитницу.',
    characteristics: [
      { name: 'Содержимое', value: 'Ручка, блокнот, визитница' },
      { name: 'Материал', value: 'Премиальные материалы' },
      { name: 'Упаковка', value: 'Подарочная коробка люкс' },
      { name: 'Размеры', value: '30 x 25 x 8 см' },
    ],
    tags: ['С логотипом', 'Для коллег', 'Наборы', 'Для мужчин'],
    gallery: [
      'https://images.unsplash.com/photo-1544377208-215a63786183?w=800',
      'https://images.unsplash.com/photo-1697719274531-5b647347a1ed?w=800',
      'https://images.unsplash.com/photo-1694481903606-822baa14f7ab?w=800',
    ],
    colors: [
      { name: 'Черный', hex: '#000000' },
      { name: 'Серебристый', hex: '#C0C0C0' },
    ],
    inStock: true,
    stockQuantity: 45,
    deliveryTime: '5-7 рабочих дней',
    brandingAvailable: true,
    brandingTypes: ['Печать', 'Шелкография'],
    category: 'Подарочные наборы',
  },
  {
    id: '3',
    name: 'Премиум кружка',
    article: 'GS-MG-003',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1618381801643-3d253a63a386?w=800',
    description: 'Высококачественная керамическая кружка с премиальной отделкой. Идеально подходит для брендирования и ежедневного использования в офисе.',
    characteristics: [
      { name: 'Объем', value: '350 мл' },
      { name: 'Материал', value: 'Премиум керамика' },
      { name: 'Уход', value: 'Можно мыть в посудомойке' },
      { name: 'Размеры', value: '9 x 8 см' },
    ],
    tags: ['С логотипом', 'Для коллег'],
    gallery: [
      'https://images.unsplash.com/photo-1618381801643-3d253a63a386?w=800',
      'https://images.unsplash.com/photo-1516390118834-21602d501886?w=800',
      'https://images.unsplash.com/photo-1562878274-ad7a29ea8cdd?w=800',
    ],
    colors: [
      { name: 'Белый', hex: '#FFFFFF' },
      { name: 'Черный', hex: '#000000' },
      { name: 'Серый', hex: '#808080' },
    ],
    inStock: true,
    stockQuantity: 320,
    deliveryTime: '2-4 рабочих дня',
    brandingAvailable: true,
    brandingTypes: ['Печать', 'Шелкография'],
    category: 'Посуда',
  },
  {
    id: '4',
    name: 'Набор ручек люкс',
    article: 'GS-PN-004',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1650735311937-1876825e971b?w=800',
    description: 'Премиальный набор письменных принадлежностей в элегантной подарочной коробке. Идеальный подарок для руководителя.',
    characteristics: [
      { name: 'Содержимое', value: 'Шариковая и перьевая ручка' },
      { name: 'Материал', value: 'Металл с премиальной отделкой' },
      { name: 'Презентация', value: 'Подарочная коробка в комплекте' },
      { name: 'Вес', value: '120 г (набор)' },
    ],
    tags: ['Для коллег', 'Для мужчин', 'Наборы'],
    gallery: [
      'https://images.unsplash.com/photo-1650735311937-1876825e971b?w=800',
      'https://images.unsplash.com/photo-1650735310411-19b29700012d?w=800',
      'https://images.unsplash.com/photo-1650735311842-699bd178babd?w=800',
    ],
    colors: [
      { name: 'Серебристый', hex: '#C0C0C0' },
      { name: 'Золотой', hex: '#FFD700' },
      { name: 'Черный', hex: '#000000' },
    ],
    inStock: false,
    stockQuantity: 0,
    deliveryTime: '10-14 рабочих дней',
    brandingAvailable: true,
    brandingTypes: ['Гравировка'],
    category: 'Письменные принадлежности',
  },
  {
    id: '5',
    name: 'Корпоративный подарочный пакет',
    article: 'GS-PK-005',
    price: 7500,
    image: 'https://images.unsplash.com/photo-1694481901573-a970f982ac5e?w=800',
    description: 'Полный корпоративный подарочный пакет с премиальным набором офисных аксессуаров и брендированных товаров.',
    characteristics: [
      { name: 'Содержимое', value: 'Множество премиальных товаров' },
      { name: 'Материал', value: 'Высококачественные материалы' },
      { name: 'Упаковка', value: 'Подарочная коробка люкс' },
      { name: 'Брендирование', value: 'Полный пакет брендирования' },
    ],
    tags: ['С логотипом', 'Наборы', 'Для коллег', 'Для мужчин'],
    gallery: [
      'https://images.unsplash.com/photo-1694481901573-a970f982ac5e?w=800',
      'https://images.unsplash.com/photo-1720785004894-95a93636b58f?w=800',
      'https://images.unsplash.com/photo-1720785004324-e4ecc9a00c62?w=800',
    ],
    inStock: true,
    stockQuantity: 28,
    deliveryTime: '7-10 рабочих дней',
    brandingAvailable: true,
    brandingTypes: ['Печать', 'Шелкография', 'Тиснение'],
    category: 'Подарочные наборы',
  },
  {
    id: '6',
    name: 'Новогодний подарочный набор',
    article: 'GS-NY-006',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1697717657359-46433ee8497c?w=800',
    description: 'Специальный новогодний корпоративный подарочный набор с праздничной упаковкой и премиальным содержимым.',
    characteristics: [
      { name: 'Содержимое', value: 'Сезонные подарочные товары' },
      { name: 'Материал', value: 'Премиальная подборка' },
      { name: 'Упаковка', value: 'Праздничный дизайн' },
      { name: 'Сезон', value: 'Новый год 2026' },
    ],
    tags: ['С логотипом', 'Наборы', 'Новый год'],
    gallery: [
      'https://images.unsplash.com/photo-1697717657359-46433ee8497c?w=800',
      'https://images.unsplash.com/photo-1697719274531-5b647347a1ed?w=800',
      'https://images.unsplash.com/photo-1694481903606-822baa14f7ab?w=800',
    ],
    inStock: true,
    stockQuantity: 85,
    deliveryTime: '3-5 рабочих дней',
    brandingAvailable: true,
    brandingTypes: ['Печать', 'Шелкография'],
    category: 'Сезонные товары',
  },
  {
    id: '7',
    name: 'Бизнес-набор аксессуаров',
    article: 'GS-AK-007',
    price: 3800,
    image: 'https://images.unsplash.com/photo-1546313960-15422d64201a?w=800',
    description: 'Полный набор бизнес-аксессуаров с элегантным дизайном и премиальным качеством.',
    characteristics: [
      { name: 'Содержимое', value: 'Офисные принадлежности' },
      { name: 'Материал', value: 'Премиальные материалы' },
      { name: 'Дизайн', value: 'Профессиональный и элегантный' },
      { name: 'Упаковка', value: 'Премиальная коробка' },
    ],
    tags: ['С логотипом', 'Для коллег', 'Для мужчин', 'Наборы'],
    gallery: [
      'https://images.unsplash.com/photo-1546313960-15422d64201a?w=800',
      'https://images.unsplash.com/photo-1605174697130-0bb0b83c92fc?w=800',
      'https://images.unsplash.com/photo-1544377208-215a63786183?w=800',
    ],
    inStock: true,
    stockQuantity: 62,
    deliveryTime: '4-6 рабочих дней',
    brandingAvailable: true,
    brandingTypes: ['Печать', 'Тиснение'],
    category: 'Подарочные наборы',
  },
  {
    id: '8',
    name: 'Стартовый офисный набор',
    article: 'GS-SP-008',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1582993467771-54d2ae110087?w=800',
    description: 'Базовый набор офисных принадлежностей с современным дизайном. Идеален для новых сотрудников или командных подарков.',
    characteristics: [
      { name: 'Содержимое', value: 'Блокнот, ручки, стикеры' },
      { name: 'Материал', value: 'Качественные офисные принадлежности' },
      { name: 'Дизайн', value: 'Современный и яркий' },
      { name: 'Количество', value: 'Несколько предметов' },
    ],
    tags: ['С логотипом', 'Для коллег', 'Наборы'],
    gallery: [
      'https://images.unsplash.com/photo-1582993467771-54d2ae110087?w=800',
      'https://images.unsplash.com/photo-1531346479518-1ddeedc3ff77?w=800',
      'https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?w=800',
    ],
    colors: [
      { name: 'Разноцветный', hex: '#FF6B6B' },
      { name: 'Синяя гамма', hex: '#4A90E2' },
      { name: 'Зеленая гамма', hex: '#7ED321' },
    ],
    inStock: true,
    stockQuantity: 200,
    deliveryTime: '2-3 рабочих дня',
    brandingAvailable: true,
    brandingTypes: ['Печать'],
    category: 'Канцелярия',
  },
];

export const categories = [
  'Все категории',
  'Канцелярия',
  'Подарочные наборы',
  'Посуда',
  'Письменные принадлежности',
  'Сезонные товары',
];
