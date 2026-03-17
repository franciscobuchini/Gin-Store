export default function handler(req, res) {
  // Estos datos NUNCA bajan al navegador del usuario
  const PRODUCT_DATA = {
    id: 999,
    name: "Gin sin Nombre",
    price: 18500,
    ml: 750
  };

  const COUPONS = [
    { code: 'GIN10', discount: 10, type: 'percentage', owner: 'Interno' },
    { code: 'GIFT5000', discount: 5000, type: 'fixed', owner: 'Matias' },
    { code: 'WELCOME', discount: 15, type: 'percentage', owner: 'Marketing' },
    { code: 'PROMO20', discount: 20, type: 'percentage', owner: 'Influencer1' }
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
      // Devolvemos solo lo necesario para el front, el 'owner' se queda en el server
      const { owner, ...publicCoupon } = found;
      return res.status(200).json({ valid: true, coupon: publicCoupon });
    } else {
      return res.status(200).json({ valid: false });
    }
  }

  res.status(405).end();
}
