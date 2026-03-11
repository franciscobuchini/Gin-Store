export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  ml: number;
  flavor: string;
}

export interface CartItem extends Product {
  quantity: number;
}
