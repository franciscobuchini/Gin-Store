/**
 * Formats a number as Argentine peso price: $N.NNN,00
 * Uses period as thousands separator and comma as decimal separator.
 */
export function formatPrice(amount: number): string {
  return amount.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
