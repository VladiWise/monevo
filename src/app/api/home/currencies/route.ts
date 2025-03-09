import connectMongoDB from "@/libs/mongodb";

import Fund from "@/models/fundS";
import Bond from "@/models/bond";
import FundB from "@/models/fundB";
import Stock from "@/models/stock";
import Currency from "@/models/currency";
import Deposit from "@/models/deposit";
import CashFree from "@/models/cash-free";
import Loan from "@/models/loan";

import Total from "@/models/main-total";

import { CURRENCY } from "@/utils/constants";

import { NextResponse, NextRequest } from "next/server";
import { fetchCurrencyValue } from "@/services/ExternalCurrencyService";
import { roundToTwoDecimals } from "@/utils/mathUtils";
import { getDataByField } from "@/utils/moexInfo";
import { fetchStockETFInfo, fetchBondInfo } from "@/services/MoexService";


export async function GET(request: NextRequest) {
  try {

    await connectMongoDB();

    if (request.nextUrl.searchParams.get("userId")) {

      const userId = request.nextUrl.searchParams.get("userId");

      const result = [];
      for (const currencyTicker of Object.keys(CURRENCY)) {

        const fundsS = await Fund.find({ userId, currency: currencyTicker });
        const bonds = await Bond.find({ userId, currency: currencyTicker });
        const fundsB = await FundB.find({ userId, currency: currencyTicker });
        const stocks = await Stock.find({ userId, currency: currencyTicker });

        const currency = await Currency.find({ userId, ticker: currencyTicker });
        const deposit = await Deposit.find({ userId, ticker: currencyTicker });
        const cashFree = await CashFree.find({ userId, ticker: currencyTicker });
        // const loan = await Loan.find({ userId, ticker: currencyTicker });


        const sumFundS = fundsS.reduce((acc, item) => acc + roundToTwoDecimals(item.total), 0);
        const sumStock = stocks.reduce((acc, item) => acc + roundToTwoDecimals(item.total), 0);
        const sumcurrency = currency.reduce((acc, item) => acc + roundToTwoDecimals(item.total), 0);
        const sumBond = bonds.reduce((acc, item) => acc + roundToTwoDecimals(item.total), 0);
        const sumFundB = fundsB.reduce((acc, item) => acc + roundToTwoDecimals(item.total), 0);
        const sumDeposit = deposit.reduce((acc, item) => acc + roundToTwoDecimals(item.total), 0);
        const sumCashFree = cashFree.reduce((acc, item) => acc + roundToTwoDecimals(item.total), 0);
        // const sumLoan = loan.reduce((acc, item) => acc + roundToTwoDecimals(item.total), 0);


        result.push({ currency: currencyTicker, name: CURRENCY[currencyTicker as keyof typeof CURRENCY], value: sumBond + sumFundB + sumStock + sumFundS + sumcurrency + sumCashFree + sumDeposit })
      }


      // result.sort((a, b) => b.value - a.value);


      return NextResponse.json(result, { status: 200 });

    } else {
      return NextResponse.json({ message: "User ID not provided" }, { status: 400 });
    }

  } catch (error) {
    return NextResponse.json({ message: "Error fetching data", error }, { status: 500 });

  }
}
