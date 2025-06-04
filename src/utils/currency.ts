export const formatETB = (amount: number): string => {
  return new Intl.NumberFormat('am-ET', {
    style: 'currency',
    currency: 'ETB',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const parseETBInput = (value: string): number => {
  // Remove currency symbol, commas and other non-numeric characters except decimal point
  const cleanValue = value.replace(/[^0-9.]/g, '');
  return parseFloat(cleanValue) || 0;
}; 