import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import LoadingScreen from '@/components/LoadingScreen';
import ParallaxBackground from '@/components/ParallaxBackground';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  discount?: number;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [aiBudget, setAiBudget] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [deliveryForm, setDeliveryForm] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    time: ''
  });

  const products: Product[] = [
    { id: 1, name: 'Букет роз "Нежность"', price: 3500, category: 'flowers', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/8357e640-7f9d-4068-b85c-914b431246ed.jpg' },
    { id: 2, name: 'Хризантемы микс', price: 2200, category: 'flowers', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/2c5fdcc6-809c-42a4-b7a7-70c1de41e10a.jpg' },
    { id: 3, name: 'Грунт универсальный 10л', price: 450, category: 'soil', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/88f0082d-c9ab-4167-986b-a34110c93177.jpg' },
    { id: 4, name: 'Керамический горшок', price: 890, category: 'pots', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/88f0082d-c9ab-4167-986b-a34110c93177.jpg' },
    { id: 5, name: 'Тюльпаны "Весна"', price: 1800, category: 'flowers', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/2c5fdcc6-809c-42a4-b7a7-70c1de41e10a.jpg', discount: 30 },
    { id: 6, name: 'Пионы премиум', price: 4500, category: 'flowers', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/8357e640-7f9d-4068-b85c-914b431246ed.jpg', discount: 20 },
    { id: 7, name: 'Свадебный букет', price: 8500, category: 'flowers', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/2d20822b-04d5-42b1-aee7-9d9d6578df9c.jpg' },
    { id: 8, name: 'Весенний микс', price: 2500, category: 'flowers', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/a80fc7ba-5f6c-407c-8e0f-ae409b720eba.jpg' },
    { id: 9, name: 'Романтика', price: 4500, category: 'flowers', image: 'https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/78b4bb1e-ee2b-4951-9d97-dfb88c75c1d2.jpg' },
  ];

  const reviews = [
    { id: 1, name: 'Анна К.', rating: 5, text: 'Прекрасные цветы! Доставили вовремя, букет свежий и красивый. Спасибо!' },
    { id: 2, name: 'Михаил П.', rating: 5, text: 'ИИ-генератор букетов - просто находка! Помог подобрать идеальный подарок.' },
    { id: 3, name: 'Елена С.', rating: 5, text: 'Отличный сервис, удобная доставка. Буду заказывать еще!' },
  ];

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success('Товар добавлен в корзину 🎉', {
      duration: 2000,
      icon: '🛍️'
    });
  };

  const generateBouquet = () => {
    if (!aiBudget || parseFloat(aiBudget) < 1000) {
      toast.error('Минимальная сумма для генерации букета - 1000₽');
      return;
    }
    
    const budget = parseFloat(aiBudget);
    const composition = [];
    
    if (budget >= 3000) {
      composition.push('15 роз разных оттенков');
    }
    if (budget >= 2000) {
      composition.push('7 хризантем');
    }
    if (budget >= 1500) {
      composition.push('Зелень и декор');
    }
    
    toast.success(
      `Букет сгенерирован! Состав: ${composition.join(', ')}. Стоимость: ${budget}₽`,
      { duration: 5000 }
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = item.discount ? item.price * (1 - item.discount / 100) : item.price;
      return sum + price * item.quantity;
    }, 0);
  };

  const handleSubmitDelivery = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast.error('Корзина пуста! Добавьте товары перед оформлением.');
      return;
    }

    const orderData = {
      name: deliveryForm.name,
      phone: deliveryForm.phone,
      address: deliveryForm.address,
      date: deliveryForm.date,
      time: deliveryForm.time,
      items: cartItems,
      total: calculateTotal()
    };

    try {
      const response = await fetch('https://functions.poehali.dev/a0cd401c-7c45-4fc7-9713-034f895ea620', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success('Заказ отправлен в Telegram! Скидка 25% применена.');
        setDeliveryForm({ name: '', phone: '', address: '', date: '', time: '' });
        setCartItems([]);
      } else {
        toast.error(result.message || 'Ошибка при отправке заказа');
      }
    } catch (error) {
      toast.error('Не удалось отправить заказ. Попробуйте позже.');
    }
  };

  const handleTelegramOrder = () => {
    if (cartItems.length === 0) {
      toast.error('Корзина пуста! Добавьте товары перед заказом.');
      return;
    }

    const itemsList = cartItems
      .map(item => `${item.name} x${item.quantity}`)
      .join(', ');
    
    const total = Math.round(calculateTotal() * 0.75);
    const message = `Здравствуйте! Хочу заказать: ${itemsList}. Сумма со скидкой 25%: ${total}₽`;
    
    const telegramUrl = `https://t.me/pnkma?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParallaxBackground />
      <LoadingScreen />
      <div className="relative z-10">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl animate-float">🌸</div>
              <div>
                <h1 className="text-3xl font-bold text-pink-600">Elena's Flowers</h1>
                <p className="text-sm text-muted-foreground">Доставка цветов и товаров для флористики</p>
              </div>
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="lg" className="relative hover:scale-110 transition-transform">
                  <Icon name="ShoppingCart" size={20} />
                  {cartItems.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center animate-scale-in">
                      {cartItems.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {cartItems.length === 0 ? 'Корзина пуста' : `Товаров: ${cartItems.length}`}
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6 space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-3 border-b pb-3 animate-slide-in-right" style={{animationDelay: `${index * 0.05}s`}}>
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded hover:scale-110 transition-transform" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} × {item.discount ? 
                            <><span className="line-through">{item.price}₽</span> {Math.round(item.price * (1 - item.discount / 100))}₽</> 
                            : `${item.price}₽`}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {cartItems.length > 0 && (
                    <div className="pt-4 border-t">
                      <div className="flex justify-between text-lg font-bold mb-2">
                        <span>Итого:</span>
                        <span>{Math.round(calculateTotal())}₽</span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-4">
                        Со скидкой 25%: {Math.round(calculateTotal() * 0.75)}₽
                      </div>
                      <Button 
                        className="w-full mb-2 hover:scale-105 transition-all duration-300 animate-glow" 
                        size="lg"
                        onClick={handleTelegramOrder}
                      >
                        <Icon name="MessageCircle" size={20} className="mr-2" />
                        Заказать через Telegram
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section 
        ref={heroRef}
        className="relative py-20 overflow-hidden min-h-[80vh] flex items-center"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-pink-300 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}} />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-green-200 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 text-lg px-6 py-2 bg-accent animate-fade-in">
              🎉 Скидка 25% на первую доставку!
            </Badge>
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent animate-fade-in" style={{animationDelay: '0.1s'}}>
              Свежие цветы с доставкой
            </h2>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
              Создайте уникальный букет с помощью ИИ или выберите из готовых композиций
            </p>
            <div className="flex gap-4 justify-center animate-fade-in" style={{animationDelay: '0.3s'}}>
              <Button size="lg" className="text-lg px-8 hover:scale-105 transition-all duration-300 hover:shadow-lg">
                <Icon name="Sparkles" size={20} className="mr-2" />
                ИИ-генератор букетов
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 hover:scale-105 transition-all duration-300 hover:shadow-lg">
                Каталог
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h3 className="text-4xl font-bold mb-4">🌟 Популярные букеты</h3>
            <p className="text-lg text-muted-foreground">Композиции, которые выбирают чаще всего</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="overflow-hidden hover-scale group">
              <div className="relative overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/2d20822b-04d5-42b1-aee7-9d9d6578df9c.jpg"
                  alt="Свадебный букет"
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Свадебный букет</CardTitle>
                <CardDescription className="text-lg">
                  Белые розы и пионы для торжества
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between items-center">
                <span className="text-2xl font-bold text-pink-600">8500₽</span>
                <Button onClick={() => addToCart(products[6])}>
                  <Icon name="ShoppingCart" size={18} className="mr-2" />
                  Заказать
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden hover-scale group animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="relative overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/a80fc7ba-5f6c-407c-8e0f-ae409b720eba.jpg"
                  alt="Весенний микс"
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Весенний микс</CardTitle>
                <CardDescription className="text-lg">
                  Яркие тюльпаны и сезонные цветы
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between items-center">
                <span className="text-2xl font-bold text-pink-600">2500₽</span>
                <Button onClick={() => addToCart(products[7])}>
                  <Icon name="ShoppingCart" size={18} className="mr-2" />
                  Заказать
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden hover-scale group animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="relative overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/57525442-6faa-4c81-bc25-dfbf0d7c0151/files/78b4bb1e-ee2b-4951-9d97-dfb88c75c1d2.jpg"
                  alt="Романтика"
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Романтика</CardTitle>
                <CardDescription className="text-lg">
                  Красные розы премиум класса
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between items-center">
                <span className="text-2xl font-bold text-pink-600">4500₽</span>
                <Button onClick={() => addToCart(products[8])}>
                  <Icon name="ShoppingCart" size={18} className="mr-2" />
                  Заказать
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-12 scroll-reveal">Каталог</h3>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 mb-8">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="flowers">Цветы</TabsTrigger>
              <TabsTrigger value="soil">Грунты</TabsTrigger>
              <TabsTrigger value="pots">Горшки</TabsTrigger>
              <TabsTrigger value="plants">Растения</TabsTrigger>
            </TabsList>
            
            {['all', 'flowers', 'soil', 'pots', 'plants'].map(category => (
              <TabsContent key={category} value={category} className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products
                    .filter(p => category === 'all' || p.category === category)
                    .map(product => (
                      <Card key={product.id} className="overflow-hidden hover-lift scroll-reveal">
                        <div className="relative">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-64 object-cover"
                          />
                          {product.discount && (
                            <Badge className="absolute top-3 right-3 bg-red-500 animate-bounce-subtle">
                              -{product.discount}%
                            </Badge>
                          )}
                        </div>
                        <CardHeader>
                          <CardTitle className="text-xl">{product.name}</CardTitle>
                          <CardDescription>
                            {product.discount ? (
                              <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-pink-600">
                                  {Math.round(product.price * (1 - product.discount / 100))}₽
                                </span>
                                <span className="text-lg line-through text-muted-foreground">
                                  {product.price}₽
                                </span>
                              </div>
                            ) : (
                              <span className="text-2xl font-bold text-pink-600">{product.price}₽</span>
                            )}
                          </CardDescription>
                        </CardHeader>
                        <CardFooter>
                          <Button 
                            className="w-full" 
                            onClick={() => addToCart(product)}
                          >
                            <Icon name="ShoppingCart" size={18} className="mr-2" />
                            В корзину
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-purple-100 to-pink-100 gradient-animate">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 scroll-reveal">
              <Icon name="Sparkles" size={48} className="mx-auto mb-4 text-accent animate-bounce-subtle" />
              <h3 className="text-4xl font-bold mb-4">ИИ-генератор букетов</h3>
              <p className="text-lg text-muted-foreground">
                Укажите бюджет, и мы подберем идеальный букет из роз и хризантем
              </p>
            </div>
            
            <Card className="scroll-reveal hover-lift">
              <CardHeader>
                <CardTitle>Создайте свой букет</CardTitle>
                <CardDescription>Минимальная сумма: 1000₽</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ваш бюджет (₽)</label>
                    <Input 
                      type="number" 
                      placeholder="Например, 3000"
                      value={aiBudget}
                      onChange={(e) => setAiBudget(e.target.value)}
                      min="1000"
                    />
                  </div>
                  <Button className="w-full hover:scale-105 transition-all duration-300 animate-glow" size="lg" onClick={generateBouquet}>
                    <Icon name="Wand2" size={20} className="mr-2" />
                    Сгенерировать букет
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-4 scroll-reveal">🔥 Горящие скидки</h3>
          <p className="text-center text-muted-foreground mb-12 scroll-reveal">Успейте купить со скидкой!</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {products
              .filter(p => p.discount)
              .map(product => (
                <Card key={product.id} className="overflow-hidden hover-lift scroll-reveal border-2 border-red-200 animate-slide-in-left">
                  <div className="flex gap-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-32 h-32 object-cover"
                    />
                    <div className="flex-1 p-4">
                      <Badge className="mb-2 bg-red-500 animate-pulse-slow">-{product.discount}%</Badge>
                      <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl font-bold text-pink-600">
                          {Math.round(product.price * (1 - product.discount! / 100))}₽
                        </span>
                        <span className="line-through text-muted-foreground">
                          {product.price}₽
                        </span>
                      </div>
                      <Button size="sm" onClick={() => addToCart(product)}>
                        Купить
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-green-100 to-blue-100 gradient-animate">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 scroll-reveal">
              <Icon name="Truck" size={48} className="mx-auto mb-4 text-green-600 animate-bounce-subtle" />
              <h3 className="text-4xl font-bold mb-4">Доставка</h3>
              <Badge className="text-lg px-6 py-2 bg-green-500">
                25% скидка на первый заказ!
              </Badge>
            </div>
            
            <Card className="scroll-reveal hover-lift">
              <CardHeader>
                <CardTitle>Оформить доставку</CardTitle>
                <CardDescription>Заполните форму или свяжитесь через Telegram</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitDelivery} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">ФИО</label>
                    <Input 
                      required
                      placeholder="Иванов Иван Иванович"
                      value={deliveryForm.name}
                      onChange={(e) => setDeliveryForm({...deliveryForm, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Телефон</label>
                    <Input 
                      required
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={deliveryForm.phone}
                      onChange={(e) => setDeliveryForm({...deliveryForm, phone: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Адрес доставки</label>
                    <Textarea 
                      required
                      placeholder="Город, улица, дом, квартира"
                      value={deliveryForm.address}
                      onChange={(e) => setDeliveryForm({...deliveryForm, address: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Дата</label>
                      <Input 
                        required
                        type="date"
                        value={deliveryForm.date}
                        onChange={(e) => setDeliveryForm({...deliveryForm, date: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Время</label>
                      <Input 
                        required
                        type="time"
                        value={deliveryForm.time}
                        onChange={(e) => setDeliveryForm({...deliveryForm, time: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1" size="lg">
                      <Icon name="Send" size={20} className="mr-2" />
                      Оформить
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="lg" 
                      className="flex-1"
                      onClick={handleTelegramOrder}
                    >
                      <Icon name="MessageCircle" size={20} className="mr-2" />
                      Telegram
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-12 scroll-reveal">Отзывы клиентов</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.map((review, index) => (
              <Card key={review.id} className="scroll-reveal hover-lift" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center">
                      <Icon name="User" size={20} />
                    </div>
                    <CardTitle className="text-lg">{review.name}</CardTitle>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-2xl font-bold mb-4">Elena's Flowers</h4>
              <p className="text-pink-100">Свежие цветы с любовью</p>
            </div>
            
            <div>
              <h5 className="font-bold mb-3">Контакты</h5>
              <div className="space-y-2 text-pink-100">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (999) 123-45-67
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@elenasflowers.ru
                </p>
              </div>
            </div>
            
            <div>
              <h5 className="font-bold mb-3">О нас</h5>
              <p className="text-pink-100">
                Мы создаем красоту уже более 10 лет. Доставка по всему городу.
              </p>
            </div>
          </div>
          
          <div className="border-t border-pink-400 mt-8 pt-8 text-center text-pink-100">
            <p>© 2024 Elena's Flowers. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <a
        href="https://t.me/pnkma"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-2xl animate-pulse-slow"
        aria-label="Связаться через Telegram"
      >
        <Icon name="MessageCircle" size={28} />
      </a>
      </div>
    </div>
  );
};

export default Index;