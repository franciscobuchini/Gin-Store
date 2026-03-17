export default function handler(req, res) {
  // Estos datos NUNCA bajan al navegador del usuario
  const PRODUCT_DATA = {
    id: 999,
    name: "Gin sin Nombre",
    price: 18500,
    ml: 750
  };

  const COUPONS = [
    { code: 'GIN10', discount: 10, type: 'percentage' },
    { code: 'GIFT5000', discount: 5000, type: 'fixed' },
    { code: 'WELCOME', discount: 15, type: 'percentage' },
    { code: 'PROMO20', discount: 20, type: 'percentage' }
  ];

  const { method } = req;

  if (method === 'GET') {
    // Solo devolvemos el precio, no los cupones
    return res.status(200).json({ price: PRODUCT_DATA.price });
  }

  if (method === 'POST') {
    const { code } = req.body;
    const found = COUPONS.find(c => c.code === code?.toUpperCase());

    if (found) {
      return res.status(200).json({ valid: true, coupon: found });
    } else {
      return res.status(200).json({ valid: false });
    }
  }

  res.status(405).end();
}
