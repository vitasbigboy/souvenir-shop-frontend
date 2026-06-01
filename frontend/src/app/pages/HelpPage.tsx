import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Какая минимальная сумма заказа?',
    answer:
      'Минимальная сумма заказа составляет 15 000 рублей. Это позволяет нам предоставлять вам лучшие цены и сервис для B2B корпоративных подарков.',
  },
  {
    question: 'Сколько времени занимает доставка?',
    answer:
      'Стандартная доставка занимает 3-7 рабочих дней в зависимости от вашего местоположения и товара. Мы предлагаем срочную доставку (2-3 дня) за дополнительную плату. На странице каждого товара указано ориентировочное время доставки.',
  },
  {
    question: 'Могу ли я добавить логотип компании на товары?',
    answer:
      'Да! Большинство наших товаров поддерживают индивидуальное брендирование. Мы предлагаем различные методы печати, включая печать, шелкографию и тиснение. Выберите опцию "Добавить брендирование" при добавлении товаров в корзину.',
  },
  {
    question: 'Как разместить заказ?',
    answer:
      'Просто просмотрите наш каталог, добавьте товары в корзину и заполните форму заявки. Наш менеджер свяжется с вами в течение 1-2 рабочих часов для подтверждения деталей и обработки вашего заказа.',
  },
  {
    question: 'Вы работаете только с юридическими лицами?',
    answer:
      'Да, мы специализируемся на B2B продажах и работаем исключительно с юридическими лицами (компаниями, организациями и предприятиями).',
  },
  {
    question: 'Могу ли я получить образец перед заказом оптом?',
    answer:
      'Да, мы можем предоставить образцы для большинства товаров. Свяжитесь с нами через форму заявки или позвоните нашему отделу продаж, чтобы договориться о доставке образцов.',
  },
  {
    question: 'Какие способы оплаты вы принимаете?',
    answer:
      'Мы работаем по системе заявок. После того, как вы отправите заявку, наш менеджер свяжется с вами для обсуждения вариантов оплаты, которые обычно включают банковский перевод и оплату по счету.',
  },
  {
    question: 'Могу ли я отменить или изменить заказ?',
    answer:
      'Вы можете изменить или отменить заказ до начала производства. Свяжитесь с назначенным менеджером как можно скорее, если вам нужно внести изменения.',
  },
  {
    question: 'Что делать, если товара нет в наличии?',
    answer:
      'Товары, отсутствующие на складе, четко помечены на сайте. Вы не можете отправить заявку с товарами, которых нет в наличии. Свяжитесь с нами, чтобы узнать, когда товар снова будет доступен.',
  },
  {
    question: 'Предоставляете ли вы скидки на большие заказы?',
    answer:
      'Да, мы предлагаем скидки на объем для больших заказов. Точная скидка зависит от количества и выбранных товаров. Наш менеджер предоставит детали по ценам, когда свяжется с вами.',
  },
];

export function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-4">Помощь и FAQ</h1>
      <p className="text-gray-600 mb-12">
        Найдите ответы на часто задаваемые вопросы о заказе, доставке и наших услугах.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-left">{faq.question}</h3>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h2 className="font-bold text-lg mb-2">Остались вопросы?</h2>
        <p className="text-gray-600 mb-4">
          Наша служба поддержки всегда готова помочь. Свяжитесь с нами, и мы ответим в течение 1-2
          рабочих часов.
        </p>
        <a
          href="/contacts"
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-lg transition-colors"
        >
          Связаться с нами
        </a>
      </div>
    </div>
  );
}
