export function roundToTwoDecimals(value: number): number {
  return Math.round(value * 100) / 100;
}


export function formatNumberWithSpaces(number: number) {
  const roundedNumber = Math.round(number);
  return roundedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
