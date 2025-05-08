

export function getLocalDateByISO(isoDateString: Date): string {
  const date = new Date(isoDateString);


  // return date.toLocaleTimeString();
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) + ' ' + date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });

}

export function calculateYearsMonthsDays(
  targetDate: Date,
  today: Date = new Date()
): string {
  const target = new Date(targetDate);
  const now = new Date(today);

  // Определяем направление: в будущем или в прошлом
  let start: Date;
  let end: Date;
  if (target >= now) {
    start = now;
    end = target;
  } else {
    start = new Date(target);
    end = now;
  }

  // Вычисляем разницу в годах и месяцах
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Создаем промежуточную дату: start + вычисленные годы и месяцы
  const intermediate = new Date(start.getTime());
  const originalDay = start.getDate();

  intermediate.setDate(1);
  intermediate.setFullYear(intermediate.getFullYear() + years);
  intermediate.setMonth(intermediate.getMonth() + months);

  // Корректируем день месяца
  const daysInTargetMonth = new Date(
    intermediate.getFullYear(),
    intermediate.getMonth() + 1,
    0
  ).getDate();
  intermediate.setDate(Math.min(originalDay, daysInTargetMonth));

  // Вычисляем оставшиеся дни по UTC
  const msPerDay = 1000 * 60 * 60 * 24;
  const utcIntermediate = Date.UTC(
    intermediate.getFullYear(),
    intermediate.getMonth(),
    intermediate.getDate()
  );
  const utcEnd = Date.UTC(
    end.getFullYear(),
    end.getMonth(),
    end.getDate()
  );
  let days = Math.floor((utcEnd - utcIntermediate) / msPerDay);

  // Заём месяца, если days < 0
  if (days < 0) {
    months -= 1;
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    const prevMonthDate = new Date(intermediate.getTime());
    prevMonthDate.setMonth(intermediate.getMonth());
    const daysInPrevMonth = new Date(
      prevMonthDate.getFullYear(),
      prevMonthDate.getMonth() + 1,
      0
    ).getDate();
    days += daysInPrevMonth;
  }

  // Формируем строку, опуская нулевые компоненты
  const parts: string[] = [];
  if (years) parts.push(`${years}y`);
  if (months) parts.push(`${months}m`);
  if (days) parts.push(`${days}d`);

  return parts.length > 0 ? parts.join(' ') : '0d';
}



export function getIconsSrc(
  ticker: string,
  typeOfAssets:
    | "funds-b"
    | "funds-s"
    | "bonds"
    | "stocks"
    | "currency"
    | "deposits"
    | "cash-free"
    | "loans"
) {
  let iconSrc = "";
  let altIconSrc = "";

  switch (typeOfAssets) {
    case "currency":
    case "loans":
    case "cash-free":
    case "deposits":

      iconSrc = ticker;
      break;

    case "funds-s":
      iconSrc = "shares/" + ticker;
      altIconSrc = "etfStocks";
      break;

    case "funds-b":
      iconSrc = "shares/" + ticker;
      altIconSrc = "etfBonds";
      break;

    case "bonds":
      iconSrc = ticker.startsWith("SU") ? "bonds/SU_RMFS" : "bonds";
      altIconSrc = "bonds";
      break;

    case "stocks":
      iconSrc = "shares/" + ticker;
      altIconSrc = "stocks";
      break;

    default:
      break;
  }

  return {
    iconSrc,
    altIconSrc,
  };
}
