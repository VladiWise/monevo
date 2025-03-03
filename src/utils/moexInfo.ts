interface MoexField {
  title: string;
  id?: string;
  name?: string;
}

interface MoexFieldRequired {
  title: string;
  id: string;
  name: string;
}

export const MOEX_INFO_NAME: Record<string, MoexField> = {
  total: { title: "Total" },
  amount: { title: "Amount" },
  createdAd: { title: "Created" },
  updatedAd: { title: "Updated" },

  shortName: { title: "Short name", id: "securities", name: "SHORTNAME" },
  name: { title: "Name", id: "securities", name: "SECNAME" },
  ticker: { title: "Ticker", id: "securities", name: "TICKER" },
  currency: { title: "Currency", id: "securities", name: "FACEUNIT" },
  price: { title: "Price", id: "marketdata", name: "LAST" },
  prevPrice: { title: "Prev Price", id: "securities", name: "PREVPRICE" },
  nominal: { title: "Nominal", id: "securities", name: "LOTVALUE" },
  coupon: { title: "Coupon", id: "securities", name: "ACCRUEDINT" },
  bondYield: { title: "Yield", id: "marketdata_yields", name: "EFFECTIVEYIELD" },
  matDate: { title: "Mat date", id: "securities", name: "MATDATE" },
};

export interface MoexJson {
  [key: string]: {
    columns: string[];
    data: any[];
  };
}



export async function getDataByField(moexJson: MoexJson, fieldKey: keyof typeof MOEX_INFO_NAME) {
  "use server";
  try {
    const field = MOEX_INFO_NAME[fieldKey];
    if (!field.id || !field.name) {
      throw new Error(`Field ${fieldKey} is missing id or name`);
    }


    const index = moexJson[field.id]?.columns?.indexOf(field.name);


    if (index === -1 || !index) {
      throw new Error(`Field ${field.name} not found in columns`);
    }

    if (fieldKey === "price") {
      if (moexJson[field.id]?.data[0][index]) {
        return moexJson[field.id].data[0][index]
      } else {
        const field = MOEX_INFO_NAME.prevPrice as MoexFieldRequired;
        const index = moexJson[field.id]?.columns?.indexOf(field.name);
        return moexJson[field.id].data[0][index]
      }
    }
    return moexJson[field.id].data[0][index];
  } catch (error) {
    console.error(error);
    throw error
  }
}

export const CURRENCY = {
  "SUR": "Рубль",
  "USD": "Доллар США",
  "EUR": "Евро",
  "GBP": "Фунт стерлингов Соединенного королевства",
  "CNY": "Китайский юань",
  "KZT": "Казахтанский тенге"
}
