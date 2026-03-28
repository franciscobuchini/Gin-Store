export interface ProductData {
  id: number;
  name: string;
  price: number;
  ml: number;
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  owner: string;
}

export const PRODUCT_DATA: ProductData = {
  id: 999,
  name: "Gin sin Nombre",
  price: 17900,
  ml: 750
};

export const COUPONS: Coupon[] = [
  { code: 'GIFT5000', discount: 5000, type: 'fixed', owner: 'Prueba' },
  { code: 'LEAJARA', discount: 15, type: 'percentage', owner: 'Lea Jara' },
];
