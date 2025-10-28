import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import TelegramAuth from '@/components/TelegramAuth';
import UserProfile from '@/components/UserProfile';
import { TelegramUser, CartItem } from './types';

interface HeaderProps {
  user: TelegramUser | null;
  setUser: (user: TelegramUser | null) => void;
  showAuth: boolean;
  setShowAuth: (show: boolean) => void;
  showProfile: boolean;
  setShowProfile: (show: boolean) => void;
  cartItems: CartItem[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header = ({
  user,
  setUser,
  showAuth,
  setShowAuth,
  showProfile,
  setShowProfile,
  cartItems,
  searchQuery,
  setSearchQuery,
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl animate-float">🌸</div>
            <div>
              <h1 className="text-3xl font-bold text-pink-600">Elena's Flowers</h1>
              <p className="text-sm text-pink-400">Доставка цветов • Москва</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" size={18} />
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <Dialog open={showProfile} onOpenChange={setShowProfile}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    {user.photo_url ? (
                      <img src={user.photo_url} alt={user.first_name} className="w-8 h-8 rounded-full" />
                    ) : (
                      <Icon name="User" size={20} />
                    )}
                    <span className="hidden md:inline">{user.first_name}</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <UserProfile user={user} onLogout={() => setUser(null)} />
                </DialogContent>
              </Dialog>
            ) : (
              <Dialog open={showAuth} onOpenChange={setShowAuth}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Icon name="User" size={20} />
                    <span className="hidden md:inline">Войти</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <TelegramAuth onAuth={(userData) => {
                    setUser(userData);
                    setShowAuth(false);
                  }} />
                </DialogContent>
              </Dialog>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative gap-2">
                  <Icon name="ShoppingCart" size={20} />
                  {cartItems.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartItems.length}
                    </Badge>
                  )}
                  <span className="hidden md:inline">Корзина</span>
                </Button>
              </SheetTrigger>
            </Sheet>
          </div>
        </div>

        <div className="md:hidden mt-3">
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" size={18} />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
