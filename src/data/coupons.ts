export interface Coupon {
  code: string;
  discount: number; // Value of discount (percentage or fixed)
  type: 'percentage' | 'fixed';
}

export const COUPONS: Coupon[] = [
  { code: 'GIN10', discount: 10, type: 'percentage' },
  { code: 'GIFT5000', discount: 5000, type: 'fixed' },
  { code: 'WELCOME', discount: 15, type: 'percentage' },
  { code: 'PROMO20', discount: 20, type: 'percentage' },
];
