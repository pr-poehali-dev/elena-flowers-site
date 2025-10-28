export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  discount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface DeliveryForm {
  name: string;
  phone: string;
  address: string;
  date: string;
  time: string;
}
