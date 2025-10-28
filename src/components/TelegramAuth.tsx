import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

interface TelegramAuthProps {
  onAuth: (user: TelegramUser) => void;
}

const TelegramAuth = ({ onAuth }: TelegramAuthProps) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleTelegramAuth = (event: MessageEvent) => {
      if (event.data?.type === 'telegram_auth') {
        const user = event.data.user as TelegramUser;
        onAuth(user);
        toast.success(`Добро пожаловать, ${user.first_name}!`);
      }
    };

    window.addEventListener('message', handleTelegramAuth);
    return () => window.removeEventListener('message', handleTelegramAuth);
  }, [onAuth]);

  const handleTelegramLogin = () => {
    setIsLoading(true);
    
    const botUsername = 'pnkma_bot';
    const authUrl = `https://t.me/${botUsername}?start=auth`;
    
    const authWindow = window.open(authUrl, '_blank', 'width=600,height=700');
    
    const checkWindowClosed = setInterval(() => {
      if (authWindow?.closed) {
        clearInterval(checkWindowClosed);
        setIsLoading(false);
      }
    }, 1000);

    setTimeout(() => {
      setIsLoading(false);
      toast.info('Для входа перейдите в Telegram и нажмите "Start"');
    }, 2000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-4">
          <Icon name="MessageCircle" size={40} className="text-white" />
        </div>
        <CardTitle className="text-2xl">Вход через Telegram</CardTitle>
        <CardDescription>
          Быстрый и безопасный способ входа в личный кабинет
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          className="w-full h-12 text-lg bg-blue-500 hover:bg-blue-600" 
          onClick={handleTelegramLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
              Ожидание авторизации...
            </>
          ) : (
            <>
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Войти через Telegram
            </>
          )}
        </Button>
        
        <div className="text-sm text-muted-foreground text-center space-y-2">
          <p>✓ Не требуется пароль</p>
          <p>✓ Мгновенная авторизация</p>
          <p>✓ Полная безопасность</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TelegramAuth;
