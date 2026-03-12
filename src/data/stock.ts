import type { Product } from '../types/product';

// Importación unificada de la botella principal
import ginBottle from '../assets/GinBottle.png';

export const GIN_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Gin sin nombre",
    image: ginBottle,
    price: 10500,
    ml: 1000,
    flavor: "1 litro. Sabor original.",
    category: "botellas"
  },
  {
    id: 2,
    name: "Gin sin nombre",
    image: ginBottle,
    price: 7200,
    ml: 750,
    flavor: "750ml. Sabor original.",
    category: "botellas"
  },
  {
    id: 3,
    name: "Gin sin nombre",
    image: ginBottle,
    price: 5800,
    ml: 500,
    flavor: "500ml. Sabor original.",
    category: "kits"
  },
  {
    id: 4,
    name: "Gin sin nombre",
    image: ginBottle,
    price: 4500,
    ml: 350,
    flavor: "350ml. Sabor original.",
    category: "merchandise"
  },
    {
    id: 4,
    name: "Gin sin nombre",
    image: ginBottle,
    price: 4500,
    ml: 350,
    flavor: "350ml. Sabor original.",
    category: "indumentaria"
  },
];
