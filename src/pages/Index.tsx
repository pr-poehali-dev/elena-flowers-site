import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import ParallaxBackground from '@/components/ParallaxBackground';
import PetalsAnimation from '@/components/PetalsAnimation';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductsSection from '@/components/ProductsSection';
import ReviewsSection from '@/components/ReviewsSection';
import CartSheet from '@/components/CartSheet';
import { TelegramUser, CartItem, DeliveryForm } from '@/components/types';
import { products, reviews } from '@/components/data';

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [aiBudget, setAiBudget] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [show3DViewer, setShow3DViewer] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [deliveryForm, setDeliveryForm] = useState<DeliveryForm>({
    name: '',
    phone: '',
    address: '',
    date: '',
    time: ''
  });

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

  const addToCart = (product: typeof products[0]) => {
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
      composition.push('зелень и упаковка');
    }
    if (budget >= 1000) {
      composition.push('5 тюльпанов');
    }
    
    const message = `На бюджет ${budget}₽ мы рекомендуем: ${composition.join(', ')}`;
    
    toast.success(message, {
      duration: 5000,
      icon: '💐'
    });
  };

  const handle3DGeneration = () => {
    if (!aiPrompt.trim()) {
      toast.error('Опишите букет для 3D визуализации');
      return;
    }
    setShow3DViewer(true);
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleOrder = async () => {
    if (cartItems.length === 0) {
      toast.error('Корзина пуста!');
      return;
    }

    if (!deliveryForm.name || !deliveryForm.phone || !deliveryForm.address) {
      toast.error('Заполните все обязательные поля!');
      return;
    }

    const orderData = {
      items: cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      delivery: deliveryForm,
      total: calculateTotal()
    };

    try {
      const response = await fetch('https://functions.yandexcloud.net/d4e8k0s0n5gdlhqj4psp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      <PetalsAnimation />
      <div className="relative z-10">
        <Header
          user={user}
          setUser={setUser}
          showAuth={showAuth}
          setShowAuth={setShowAuth}
          showProfile={showProfile}
          setShowProfile={setShowProfile}
          cartItems={cartItems}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <HeroSection
          scrollY={scrollY}
          heroRef={heroRef}
          aiBudget={aiBudget}
          setAiBudget={setAiBudget}
          generateBouquet={generateBouquet}
          show3DViewer={show3DViewer}
          setShow3DViewer={setShow3DViewer}
          aiPrompt={aiPrompt}
          setAiPrompt={setAiPrompt}
          handle3DGeneration={handle3DGeneration}
        />

        <ProductsSection
          products={products}
          searchQuery={searchQuery}
          addToCart={addToCart}
        />

        <ReviewsSection reviews={reviews} />

        <footer className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-4">Elena's Flowers</h3>
            <p className="mb-4">Доставка цветов по Москве • Работаем 24/7</p>
            <p className="text-pink-100">© 2024 Elena's Flowers. Все права защищены.</p>
          </div>
        </footer>

        <Sheet>
          <SheetTrigger />
          <CartSheet
            cartItems={cartItems}
            setCartItems={setCartItems}
            deliveryForm={deliveryForm}
            setDeliveryForm={setDeliveryForm}
            handleOrder={handleOrder}
            handleTelegramOrder={handleTelegramOrder}
            calculateTotal={calculateTotal}
          />
        </Sheet>
      </div>
    </div>
  );
};

export default Index;
