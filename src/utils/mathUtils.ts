export function roundToTwoDecimals(value: number): number {
  return Math.round(value * 100) / 100;
}


export function formatNumberWithSpaces(number: number, precision: number = 0) {
  const roundedNumber = Math.round(number * 10 ** precision) / 10 ** precision;
  return roundedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


/**
 * Вычисляет среднегодовую доходность индекса.
 *
 * @param {Array} data - Массив объектов вида { date: string, value: number, ... }.
 *                        Должен содержать данные за весь период.
 * @param {number} [years] - За сколько последних лет считать доходность.
 *                           Если не указан, берётся весь период.
 * @returns {number} Среднегодовая доходность в процентах (например, 12.34).
 */
export function calculateAnnualizedReturn(data: any, years?: number) {
  if (!Array.isArray(data) || data.length < 2) {
    throw new Error('Нужен массив минимум из двух точек данных.');
  }

  // Клонируем и сортируем по дате по возрастанию
  const sorted = data
    .map(item => ({ ...item, _date: new Date(item.date) }))
    .sort((a, b) => a._date - b._date);

  const latest = sorted[sorted.length - 1];
  let start;

  if (typeof years === 'number' && years > 0) {
    // Ищем точку, максимально близкую к дате latest - years лет
    const targetDate = new Date(latest._date);
    targetDate.setFullYear(targetDate.getFullYear() - years);

    // Берём самый поздний элемент, чей date <= targetDate
    start = sorted
      .filter(item => item._date <= targetDate)
      .slice(-1)[0];

    // Если не нашли — берём самую первую доступную точку
    if (!start) {
      start = sorted[0];
    }
  } else {
    // Без аргумента — весь доступный период
    start = sorted[0];
  }

  const t0 = start._date;
  const t1 = latest._date;
  const v0 = start.value;
  const v1 = latest.value;

  // Реальное число лет между датами
  const yearsElapsed = (t1 - t0) / (1000 * 60 * 60 * 24 * 365.2425);

  // Формула среднегодовой доходности: (V1/V0)^(1/T) - 1
  const annualized = Math.pow(v1 / v0, 1 / yearsElapsed) - 1;

  return annualized * 100; // в процентах
}





