"use server";

export async function fetchBoardid(ticker: string) {
  try {
    const response = await fetch(
      `https://iss.moex.com/iss/securities/${ticker}.json?iss.meta=off&iss.only=boards&boards.columns=secid,is_primary,boardid`, {
      next: { revalidate: 1 },
    }
    );

    const data = await response.json();

    if (!data) {
      throw new Error("Invalid data returned from Moex");
    }

    return data.boards.data[0][2];
  } catch (error) {
    console.error("Error fetching board ID:", error);
    throw new Error("Error fetching board ID");
  }
}

export async function fetchStockETFInfo(ticker: string) {
  try {
    const boardid = await fetchBoardid(ticker);
    const response = await fetch(
      `https://iss.moex.com/iss/engines/stock/markets/shares/boards/${boardid}/securities/${ticker}.json?iss.meta=off`, { next: { revalidate: 1 }, }
    );

    const data = await response.json();

    if (!data) {
      throw new Error("No data returned for stock ETF info");
    }

    return data;
  } catch (error) {
    console.error("Error fetching board ID:", error);
    throw error;
  }
}

export async function fetchBondInfo(ticker: string) {
  try {
    const boardid = await fetchBoardid(ticker);
    const response = await fetch(
      `https://iss.moex.com/iss/engines/stock/markets/bonds/boards/${boardid}/securities/${ticker}.json?iss.meta=off`, { next: { revalidate: 1 }, }
    );

    const data = await response.json();


    if (!data) {
      throw new Error("No data returned for bond info");
    }

    return data;
  } catch (error) {
    console.error("Error fetching board ID:", error);
    throw error;
  }
}
