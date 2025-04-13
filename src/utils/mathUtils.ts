export function roundToTwoDecimals(value: number): number {
  return Math.round(value * 100) / 100;
}


export function formatNumberWithSpaces(number: number, precision: number = 0) {
  const roundedNumber = Math.round(number * 10 ** precision) / 10 ** precision;
  return roundedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
