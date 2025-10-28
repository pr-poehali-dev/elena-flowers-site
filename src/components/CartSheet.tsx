import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { CartItem, DeliveryForm } from './types';

interface CartSheetProps {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  deliveryForm: DeliveryForm;
  setDeliveryForm: (form: DeliveryForm) => void;
  handleOrder: () => void;
  handleTelegramOrder: () => void;
  calculateTotal: () => number;
}

const CartSheet = ({
  cartItems,
  setCartItems,
  deliveryForm,
  setDeliveryForm,
  handleOrder,
  handleTelegramOrder,
  calculateTotal,
}: CartSheetProps) => {
  const updateQuantity = (id: number, delta: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="flex items-center gap-2 text-2xl">
          <Icon name="ShoppingCart" size={24} />
          Корзина
        </SheetTitle>
        <SheetDescription>
          {cartItems.length === 0 ? 'Корзина пуста' : `Товаров: ${cartItems.length}`}
        </SheetDescription>
      </SheetHeader>

      {cartItems.length > 0 ? (
        <div className="mt-6 space-y-6">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-pink-600 font-bold">{item.price}₽</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Icon name="Minus" size={14} />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Icon name="Plus" size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-red-500"
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between text-xl font-bold mb-4">
              <span>Итого:</span>
              <span className="text-pink-600">{Math.round(calculateTotal())}₽</span>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-green-700 font-semibold flex items-center gap-2">
                <Icon name="Gift" size={20} />
                Скидка 25% при заказе через Telegram!
              </p>
              <p className="text-green-600 text-sm mt-1">
                Сумма со скидкой: {Math.round(calculateTotal() * 0.75)}₽
              </p>
            </div>

            <Button 
              className="w-full mb-3 bg-[#0088cc] hover:bg-[#006699] text-white"
              size="lg"
              onClick={handleTelegramOrder}
            >
              <Icon name="Send" className="mr-2" size={20} />
              Заказать через Telegram (-25%)
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">или оформить на сайте</span>
              </div>
            </div>

            <div className="space-y-3">
              <Input
                placeholder="Имя"
                value={deliveryForm.name}
                onChange={(e) => setDeliveryForm({ ...deliveryForm, name: e.target.value })}
              />
              <Input
                placeholder="Телефон"
                value={deliveryForm.phone}
                onChange={(e) => setDeliveryForm({ ...deliveryForm, phone: e.target.value })}
              />
              <Textarea
                placeholder="Адрес доставки"
                value={deliveryForm.address}
                onChange={(e) => setDeliveryForm({ ...deliveryForm, address: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="date"
                  value={deliveryForm.date}
                  onChange={(e) => setDeliveryForm({ ...deliveryForm, date: e.target.value })}
                />
                <Input
                  type="time"
                  value={deliveryForm.time}
                  onChange={(e) => setDeliveryForm({ ...deliveryForm, time: e.target.value })}
                />
              </div>
              <Button 
                className="w-full bg-pink-500 hover:bg-pink-600"
                size="lg"
                onClick={handleOrder}
              >
                Оформить заказ
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <Icon name="ShoppingCart" size={64} className="mb-4" />
          <p>Добавьте товары в корзину</p>
        </div>
      )}
    </SheetContent>
  );
};

export default CartSheet;
