// @ts-nocheck
import { PRODUCT_DATA, COUPONS } from './_constants';

export default function handler(req: any, res: any) {
  const { method } = req;

  if (method === 'GET') {
    return res.status(200).json({ price: PRODUCT_DATA.price });
  }

  if (method === 'POST') {
    const { code } = req.body || {};
    const found = COUPONS.find((c: any) => c.code.toUpperCase() === code?.toUpperCase());

    if (found) {
      const publicCoupon = { ...found };
      delete publicCoupon.owner;
      return res.status(200).json({ valid: true, coupon: publicCoupon });
    } else {
      return res.status(200).json({ valid: false });
    }
  }

  res.status(405).end();
}
