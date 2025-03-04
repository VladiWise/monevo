export function getLocalDateByISO(isoDateString: Date): string {
  const date = new Date(isoDateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const shortYear = date.getFullYear().toString().slice(-2);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}.${month}.${shortYear} ${hours}:${minutes}`;
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
