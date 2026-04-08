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
  { code: 'GIN1', discount: 2000, type: 'fixed', owner: 'GIN1' },
  { code: 'GIN2', discount: 2000, type: 'fixed', owner: 'GIN2' },
  { code: 'GIN3', discount: 2000, type: 'fixed', owner: 'GIN3' },
  { code: 'GIN4', discount: 2000, type: 'fixed', owner: 'GIN4' },
  { code: 'GIN5', discount: 2000, type: 'fixed', owner: 'GIN5' },

  { code: 'bajoneandoporsf', discount: 2000, type: 'fixed', owner: 'bajoneandoporsf' },
  { code: 'ash', discount: 2000, type: 'fixed', owner: 'ash' },
  { code: 'matiynico', discount: 2000, type: 'fixed', owner: 'matiynico' },
  { code: 'aguscu', discount: 2000, type: 'fixed', owner: 'aguscu' },
  { code: 'cataponcd', discount: 2000, type: 'fixed', owner: 'cataponcd' },
  { code: 'agus', discount: 2000, type: 'fixed', owner: 'agus' },
  { code: 'agusporta', discount: 2000, type: 'fixed', owner: 'agusporta' },
  { code: 'milyyagos', discount: 2000, type: 'fixed', owner: 'milyyagos' },
  { code: 'josias.acevedo', discount: 2000, type: 'fixed', owner: 'josias.acevedo' },
  { code: 'andreitacar', discount: 2000, type: 'fixed', owner: 'andreitacar' },
  { code: 'leaJara', discount: 2000, type: 'fixed', owner: 'leaJara' },
  { code: 'julizeballos', discount: 2000, type: 'fixed', owner: 'julizeballos' },
  { code: 'romadandrea', discount: 2000, type: 'fixed', owner: 'romadandrea' },
  { code: 'julesm', discount: 2000, type: 'fixed', owner: 'julesm' },
  { code: 'vickyymolina', discount: 2000, type: 'fixed', owner: 'vickyymolina' },
  { code: 'biankibug', discount: 2000, type: 'fixed', owner: 'biankibug' },
  { code: 'ailufortuna', discount: 2000, type: 'fixed', owner: 'ailufortuna' },
  { code: 'hogarenorden', discount: 2000, type: 'fixed', owner: 'hogarenorden' },
  { code: 'negrovelasquez', discount: 2000, type: 'fixed', owner: 'negrovelasquez' },
  { code: 'candesolberger', discount: 2000, type: 'fixed', owner: 'candesolberger' },
  { code: 'gongorosito', discount: 2000, type: 'fixed', owner: 'gongorosito' },
  { code: 'curvavlogs', discount: 2000, type: 'fixed', owner: 'curvavlogs' },
  { code: '_giuliana.gonzalez', discount: 2000, type: 'fixed', owner: '_giuliana.gonzalez' },
  { code: 'lumila.grenon', discount: 2000, type: 'fixed', owner: 'lumila.grenon' },
  { code: 'agucaraffa', discount: 2000, type: 'fixed', owner: 'agucaraffa' },
  { code: 'juliarias1', discount: 2000, type: 'fixed', owner: 'juliarias1' },
  { code: 'delfimhoff', discount: 2000, type: 'fixed', owner: 'delfimhoff' },
  { code: 'juanchimolinas', discount: 2000, type: 'fixed', owner: 'juanchimolinas' },
  { code: 'azulcastello', discount: 2000, type: 'fixed', owner: 'azulcastello' },
  { code: 'nachoherraez', discount: 2000, type: 'fixed', owner: 'nachoherraez' },
  { code: 'florenciaruiz.1', discount: 2000, type: 'fixed', owner: 'florenciaruiz.1' },
  { code: 'agostinamai', discount: 2000, type: 'fixed', owner: 'agostinamai' },
  { code: 'pagobellavigna', discount: 2000, type: 'fixed', owner: 'pagobellavigna' },
  { code: 'cataponce', discount: 2000, type: 'fixed', owner: 'cataponce' },
  { code: 'alejandro.oliveras', discount: 2000, type: 'fixed', owner: 'alejandro.oliveras' },
  { code: 'tinocarballoo', discount: 2000, type: 'fixed', owner: 'tinocarballoo' },
  { code: 'fabilassaga', discount: 2000, type: 'fixed', owner: 'fabilassaga' },
  { code: 'danibattlecasas', discount: 2000, type: 'fixed', owner: 'danibattlecasas' },
  { code: 'maximazzi', discount: 2000, type: 'fixed', owner: 'maximazzi' },
  { code: 'joacomantica', discount: 2000, type: 'fixed', owner: 'joacomantica' },
  { code: 'maxidozo', discount: 2000, type: 'fixed', owner: 'maxidozo' },
  { code: 'manuolcese4', discount: 2000, type: 'fixed', owner: 'manuolcese4' },
  { code: 'chimisantafesino', discount: 2000, type: 'fixed', owner: 'chimisantafesino' },
  { code: 'LeiEnOrden', discount: 2000, type: 'fixed', owner: 'LeiEnOrden' }
];