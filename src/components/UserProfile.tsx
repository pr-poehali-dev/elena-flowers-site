import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

interface Order {
  id: number;
  date: string;
  total: number;
  status: 'pending' | 'delivered' | 'cancelled';
}

interface UserProfileProps {
  user: TelegramUser;
  onLogout: () => void;
}

const UserProfile = ({ user, onLogout }: UserProfileProps) => {
  const mockOrders: Order[] = [
    { id: 1, date: '2024-10-20', total: 3500, status: 'delivered' },
    { id: 2, date: '2024-10-15', total: 2200, status: 'delivered' },
    { id: 3, date: '2024-10-10', total: 4500, status: 'pending' },
  ];

  const getStatusLabel = (status: Order['status']) => {
    const labels = {
      pending: { text: 'В обработке', variant: 'default' as const },
      delivered: { text: 'Доставлен', variant: 'secondary' as const },
      cancelled: { text: 'Отменен', variant: 'destructive' as const }
    };
    return labels[status];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {user.photo_url ? (
                <img src={user.photo_url} alt={user.first_name} className="w-16 h-16 rounded-full" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                  {user.first_name[0]}
                </div>
              )}
              <div>
                <CardTitle className="text-2xl">
                  {user.first_name} {user.last_name || ''}
                </CardTitle>
                <CardDescription>
                  {user.username ? `@${user.username}` : `ID: ${user.id}`}
                </CardDescription>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout}>
              <Icon name="LogOut" size={20} className="mr-2" />
              Выйти
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Всего заказов</CardDescription>
            <CardTitle className="text-3xl">12</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Сумма покупок</CardDescription>
            <CardTitle className="text-3xl">45,600₽</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Бонусы</CardDescription>
            <CardTitle className="text-3xl text-pink-600">1,280₽</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>История заказов</CardTitle>
          <CardDescription>Ваши последние покупки</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockOrders.map((order) => {
              const status = getStatusLabel(order.status);
              return (
                <div key={order.id}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Заказ #{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right space-x-4">
                      <Badge variant={status.variant}>{status.text}</Badge>
                      <span className="font-bold">{order.total}₽</span>
                    </div>
                  </div>
                  {order.id !== mockOrders[mockOrders.length - 1].id && (
                    <Separator className="mt-4" />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Настройки</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Bell" size={20} className="mr-2" />
            Уведомления
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Icon name="MapPin" size={20} className="mr-2" />
            Адреса доставки
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Icon name="CreditCard" size={20} className="mr-2" />
            Способы оплаты
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
