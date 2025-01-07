"use server";

interface Currency {
  ID?: string;
  NumCode?: string;
  CharCode?: string;
  Nominal?: number;
  Name?: string;
  Value: number;
  Previous?: number;
}

export async function fetchCurrencyValue(currencyCode: string) {
  try {
    const url = "https://www.cbr-xml-daily.ru/daily_json.js";
    let foundCurrency: Currency | null = { Value: 1 };

    const response = await fetch(url, {
      next: { revalidate: 6 * 60 * 60 },
    });
    const currencies = await response.json();

    Object.keys(currencies.Valute).forEach((key) => {
      if (key === currencyCode) {
        foundCurrency = currencies.Valute[key];
      }
    });

    return foundCurrency.Value;
  } catch (error) {
    console.error("Error fetching currency value:", error);
    throw error;
  }

};

