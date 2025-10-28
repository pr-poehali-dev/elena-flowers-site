import { Product } from './types';

export const products: Product[] = [
  { id: 1, name: 'Букет роз "Нежность"', price: 3500, category: 'flowers', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/8357e640-7f9d-4068-b85c-914b431246ed.jpg' },
  { id: 2, name: 'Хризантемы микс', price: 2200, category: 'flowers', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/2c5fdcc6-809c-42a4-b7a7-70c1de41e10a.jpg' },
  { id: 5, name: 'Тюльпаны "Весна"', price: 1800, category: 'flowers', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/2c5fdcc6-809c-42a4-b7a7-70c1de41e10a.jpg', discount: 30 },
  { id: 6, name: 'Пионы премиум', price: 4500, category: 'flowers', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/8357e640-7f9d-4068-b85c-914b431246ed.jpg', discount: 20 },
  { id: 7, name: 'Свадебный букет', price: 8500, category: 'flowers', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/2d20822b-04d5-42b1-aee7-9d9d6578df9c.jpg' },
  { id: 8, name: 'Весенний микс', price: 2500, category: 'flowers', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/a80fc7ba-5f6c-407c-8e0f-ae409b720eba.jpg' },
  { id: 9, name: 'Романтика', price: 4500, category: 'flowers', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/78b4bb1e-ee2b-4951-9d97-dfb88c75c1d2.jpg' },
  { id: 10, name: 'Лилии белые', price: 2800, category: 'flowers', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/8357e640-7f9d-4068-b85c-914b431246ed.jpg' },
  { id: 11, name: 'Орхидея в горшке', price: 3200, category: 'flowers', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/a80fc7ba-5f6c-407c-8e0f-ae409b720eba.jpg' },
  { id: 12, name: 'Грунт универсальный 10л', price: 450, category: 'soil', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/88f0082d-c9ab-4167-986b-a34110c93177.jpg' },
  { id: 13, name: 'Грунт для орхидей 5л', price: 380, category: 'soil', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/88f0082d-c9ab-4167-986b-a34110c93177.jpg' },
  { id: 14, name: 'Грунт для роз 8л', price: 420, category: 'soil', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/88f0082d-c9ab-4167-986b-a34110c93177.jpg' },
  { id: 15, name: 'Грунт торфяной 15л', price: 520, category: 'soil', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/88f0082d-c9ab-4167-986b-a34110c93177.jpg' },
  { id: 16, name: 'Дренаж керамзит 3л', price: 280, category: 'soil', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/88f0082d-c9ab-4167-986b-a34110c93177.jpg' },
  { id: 17, name: 'Керамический горшок белый', price: 890, category: 'pots', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/88f0082d-c9ab-4167-986b-a34110c93177.jpg' },
  { id: 18, name: 'Керамический горшок розовый', price: 950, category: 'pots', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/88f0082d-c9ab-4167-986b-a34110c93177.jpg' },
  { id: 19, name: 'Горшок глиняный большой', price: 1250, category: 'pots', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/88f0082d-c9ab-4167-986b-a34110c93177.jpg' },
  { id: 20, name: 'Горшок подвесной', price: 680, category: 'pots', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/88f0082d-c9ab-4167-986b-a34110c93177.jpg' },
  { id: 21, name: 'Кашпо декоративное', price: 1450, category: 'pots', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/88f0082d-c9ab-4167-986b-a34110c93177.jpg' },
  { id: 22, name: 'Удобрение универсальное', price: 320, category: 'accessories', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/88f0082d-c9ab-4167-986b-a34110c93177.jpg' },
  { id: 23, name: 'Секатор садовый', price: 850, category: 'accessories', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/88f0082d-c9ab-4167-986b-a34110c93177.jpg' },
  { id: 24, name: 'Лейка декоративная 2л', price: 580, category: 'accessories', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/88f0082d-c9ab-4167-986b-a34110c93177.jpg' },
  { id: 25, name: 'Опрыскиватель для цветов', price: 420, category: 'accessories', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/88f0082d-c9ab-4167-986b-a34110c93177.jpg' },
  { id: 26, name: 'Подставка для горшков', price: 720, category: 'accessories', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/88f0082d-c9ab-4167-986b-a34110c93177.jpg' },
];

export const reviews = [
  { id: 1, name: 'Анна К.', rating: 5, text: 'Прекрасные цветы! Доставили вовремя, букет свежий и красивый. Спасибо!' },
  { id: 2, name: 'Михаил П.', rating: 5, text: 'ИИ-генератор букетов - просто находка! Помог подобрать идеальный подарок.' },
  { id: 3, name: 'Елена С.', rating: 5, text: 'Отличный сервис, удобная доставка. Буду заказывать еще!' },
];
