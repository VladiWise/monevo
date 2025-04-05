export function getLocalDateByISO(isoDateString: Date): string {
  const date = new Date(isoDateString);


  // return date.toLocaleTimeString();
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) + ' ' + date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });

}

export function calculateYearsAndMonths(targetDate: Date): string {
  const today = new Date();
  const futureDate = new Date(targetDate);

  if (futureDate < today) {
    throw new Error("Target date must be in the future.");
  }

  let years = futureDate.getFullYear() - today.getFullYear();
  let months = futureDate.getMonth() - today.getMonth();

  // Если месяцев меньше 0, уменьшить количество лет и скорректировать месяцы
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return `${years}y ${months}m`;
}
