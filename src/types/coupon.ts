export interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
}
