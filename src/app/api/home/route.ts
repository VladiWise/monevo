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

      const fundsS = await Fund.find({ userId });
      const bonds = await Bond.find({ userId });
      const fundsB = await FundB.find({ userId });
      const stocks = await Stock.find({ userId });
      const currency = await Currency.find({ userId });
      const deposit = await Deposit.find({ userId });
      const cashFree = await CashFree.find({ userId });
      const loan = await Loan.find({ userId });


      const sumFundS = fundsS.reduce((acc, item) => acc + roundToTwoDecimals(item.total), 0);
      const sumStock = stocks.reduce((acc, item) => acc + roundToTwoDecimals(item.total), 0);
      const sumcurrency = currency.reduce((acc, item) => acc + roundToTwoDecimals(item.total), 0);
      const sumBond = bonds.reduce((acc, item) => acc + roundToTwoDecimals(item.total), 0);
      const sumFundB = fundsB.reduce((acc, item) => acc + roundToTwoDecimals(item.total), 0);
      const sumDeposit = deposit.reduce((acc, item) => acc + roundToTwoDecimals(item.total), 0);
      const sumCashFree = cashFree.reduce((acc, item) => acc + roundToTwoDecimals(item.total), 0);
      const sumLoan = loan.reduce((acc, item) => acc + roundToTwoDecimals(item.total), 0);


      return NextResponse.json({
        bonds: sumBond + sumFundB,
        stocks: sumStock + sumFundS,
        cashBroker: sumcurrency,
        cashFree: sumCashFree,
        deposit: sumDeposit,
        loan: sumLoan
      }, { status: 200 });

    } else {
      return NextResponse.json({ message: "User ID not provided" }, { status: 400 });
    }

  } catch (error) {
    return NextResponse.json({ message: "Error fetching data", error }, { status: 500 });

  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectMongoDB();


    async function updateMoexInfo(assets: any[], fetchMoexInfo: any, Model: any) {

      assets.forEach(async (asset) => {

        if (Model === Currency || Model === Deposit || Model === CashFree || Model === Loan) {
          const price = await fetchMoexInfo(asset.ticker);
          await Model.findByIdAndUpdate(asset._id, { price: roundToTwoDecimals(price) });
          await Model.findByIdAndUpdate(asset._id, { total: roundToTwoDecimals(price * asset.amount) });

        } else {
          const moexJson = await fetchMoexInfo(asset.ticker)


          const price = Model !== Bond ? await getDataByField(moexJson, "price") : ((await getDataByField(moexJson, "price")) *
            (await getDataByField(moexJson, "nominal")) *
            (await fetchCurrencyValue(
              await getDataByField(moexJson, "currency")
            ))) /
            100 +
            (await getDataByField(moexJson, "coupon"))


          await Model.findByIdAndUpdate(asset._id, { price: roundToTwoDecimals(price) });
          await Model.findByIdAndUpdate(asset._id, { total: roundToTwoDecimals(price * asset.amount) });

        }

      });

    }


    if (request.nextUrl.searchParams.get("userId")) {

      const userId = request.nextUrl.searchParams.get("userId");

      const fundsS = await Fund.find({ userId });
      const fundsB = await FundB.find({ userId });
      const stocks = await Stock.find({ userId });
      const bonds = await Bond.find({ userId });
      const currency = await Currency.find({ userId });
      const deposit = await Deposit.find({ userId });
      const cashFree = await CashFree.find({ userId });
      const loans = await Loan.find({ userId });

      await updateMoexInfo(fundsS, fetchStockETFInfo, Fund);
      await updateMoexInfo(fundsB, fetchStockETFInfo, FundB);
      await updateMoexInfo(stocks, fetchStockETFInfo, Stock);
      await updateMoexInfo(bonds, fetchBondInfo, Bond);
      await updateMoexInfo(currency, fetchCurrencyValue, Currency);
      await updateMoexInfo(deposit, fetchCurrencyValue, Deposit);
      await updateMoexInfo(cashFree, fetchCurrencyValue, CashFree);
      await updateMoexInfo(loans, fetchCurrencyValue, Loan);



      return NextResponse.json({ message: "Data updated successfully" }, { status: 200 });

    } else {
      return NextResponse.json({ message: "User ID not provided" }, { status: 400 });
    }
  } catch (error) {

    NextResponse.json({ message: "Error updating moex info", error }, { status: 500 });

    throw error
  }
}


export async function POST(request: NextRequest) {
  await connectMongoDB();

  if (request.nextUrl.searchParams.get("userId")) {

    const data = await request.json();

    const userId = request.nextUrl.searchParams.get("userId");

    Total.create({ userId, assets: data });

    return NextResponse.json({ message: "Data created successfully" }, { status: 200 });

  } else {
    return NextResponse.json({ message: "User ID not provided" }, { status: 400 });
  }
}