export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  ml: number;
  category?: string;
  flavor: string;
}

export interface CartItem extends Product {
  quantity: number;
}
