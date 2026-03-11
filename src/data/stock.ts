import type { Product } from '../types/product';

// Importación de imágenes de las botellas
import gin1 from '../assets/1.webp';
import gin2 from '../assets/2.webp';
import gin3 from '../assets/3.webp';
import gin4 from '../assets/4.webp';
import gin5 from '../assets/5.webp';

export const GIN_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Gin Heredero",
    image: gin1,
    price: 4500,
    ml: 750,
    flavor: "Enebro intenso con notas cítricas de bergamota y un final especiado."
  },
  {
    id: 2,
    name: "London Dry Gin",
    image: gin2,
    price: 5200,
    ml: 700,
    flavor: "Infusión de pétalos de rosa y frutos rojos, dulce y suave al paladar."
  },
  {
    id: 3,
    name: "Gordon's Gin",
    image: gin3,
    price: 4800,
    ml: 750,
    flavor: "Explosión de lima, limón siciliano y un toque de jengibre fresco."
  },
  {
    id: 4,
    name: "Royale Gin",
    image: gin4,
    price: 5500,
    ml: 750,
    flavor: "Mezcla secreta de hierbas serranas, romero y un toque de cardamomo."
  },
  {
    id: 5,
    name: "Malaria Gin",
    image: gin5,
    price: 6000,
    ml: 700,
    flavor: "Destilado con botánicos marinos y pimienta rosa, con un toque salino único."
  }
];
