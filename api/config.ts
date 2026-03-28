import { PRODUCT_DATA, COUPONS, type Coupon } from './_constants.js';

interface VercelRequest {
  method?: string;
  body?: {
    code?: string;
  };
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: unknown) => VercelResponse;
  end: () => void;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req;

  if (method === 'GET') {
    return res.status(200).json({ price: PRODUCT_DATA.price });
  }

  if (method === 'POST') {
    const { code } = req.body || {};
    const found = COUPONS.find((c: Coupon) => c.code.toUpperCase() === code?.toUpperCase());

    if (found) {
      const publicCoupon = { ...found } as Record<string, unknown>;
      delete publicCoupon.owner;
      return res.status(200).json({ valid: true, coupon: publicCoupon });
    } else {
      return res.status(200).json({ valid: false });
    }
  }

  res.status(405).end();
}
