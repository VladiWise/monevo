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
import { getErrorMessage } from "@/utils/getErrorMessage";


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
        bonds: (sumBond || 0) + (sumFundB || 0),
        stocks: (sumStock || 0) + (sumFundS || 0),
        cashBroker: (sumcurrency || 0),
        cashFree: (sumCashFree || 0),
        deposit: (sumDeposit || 0),
        loan: (sumLoan || 0)
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

      console.log("TOTAL: ", fundsS.length + fundsB.length + stocks.length + bonds.length + currency.length + deposit.length + cashFree.length + loans.length);



     await Promise.all([
        updateMoexInfo(fundsS, fetchStockETFInfo, Fund),
        updateMoexInfo(fundsB, fetchStockETFInfo, FundB),
        updateMoexInfo(stocks, fetchStockETFInfo, Stock),
        updateMoexInfo(bonds, fetchBondInfo, Bond),
        updateMoexInfo(currency, fetchCurrencyValue, Currency),
        updateMoexInfo(deposit, fetchCurrencyValue, Deposit),
        updateMoexInfo(cashFree, fetchCurrencyValue, CashFree),
        updateMoexInfo(loans, fetchCurrencyValue, Loan),
      ])


      // await updateMoexInfo(fundsS, fetchStockETFInfo, Fund);
      // await updateMoexInfo(fundsB, fetchStockETFInfo, FundB);
      // await updateMoexInfo(stocks, fetchStockETFInfo, Stock);
      // await updateMoexInfo(bonds, fetchBondInfo, Bond);
      // await updateMoexInfo(currency, fetchCurrencyValue, Currency);
      // await updateMoexInfo(deposit, fetchCurrencyValue, Deposit);
      // await updateMoexInfo(cashFree, fetchCurrencyValue, CashFree);
      // await updateMoexInfo(loans, fetchCurrencyValue, Loan);

      return NextResponse.json({ message: "Data updated successfully" }, { status: 200 });

    } else {
      return NextResponse.json({ message: "User ID not provided" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ message: getErrorMessage(error, "Error updating data") }, { status: 500 });
  }
}


export async function POST(request: NextRequest) {

  try {

    await connectMongoDB();

    if (request.nextUrl.searchParams.get("userId")) {

      const data = await request.json();

      const userId = request.nextUrl.searchParams.get("userId");

      Total.create({ userId, assets: data });

      return NextResponse.json({ message: "Data created successfully" }, { status: 200 });

    } else {
      return NextResponse.json({ message: "User ID not provided" }, { status: 400 });
    }

  } catch (error) {

    return NextResponse.json({ message: getErrorMessage(error, "Error creating data") }, { status: 500 });

  }

}




async function updateMoexInfo(assets: any[], fetchMoexInfo: any, Model: any) {
  try {
    for (const asset of assets) {
      if (Model === Currency || Model === Deposit || Model === CashFree || Model === Loan) {
        const price = await fetchMoexInfo(asset.ticker);

        console.log("price Currency", price);

        await Model.findByIdAndUpdate(asset._id, {
          price: roundToTwoDecimals(price),
          total: roundToTwoDecimals(price * asset.amount)
        });

      } else if (Model === Bond) {

        const moexJson = await fetchMoexInfo(asset.ticker);

        const price = ((await getDataByField(moexJson, "price")) *
          (await getDataByField(moexJson, "nominal")) *
          (await fetchCurrencyValue(await getDataByField(moexJson, "currency")))) /
          100 +
          (await getDataByField(moexJson, "coupon"));

        console.log("price Bond", price);


        await Model.findByIdAndUpdate(asset._id, {
          price: roundToTwoDecimals(price),
          total: roundToTwoDecimals(price * asset.amount),
          fullname: await getDataByField(moexJson, "fullname"),
          nominal: await getDataByField(moexJson, "nominal"),
          coupon: await getDataByField(moexJson, "coupon"),
          couponValue: await getDataByField(moexJson, "couponValue"),
          nextCoupon: await getDataByField(moexJson, "nextCoupon"),
          couponPerion: await getDataByField(moexJson, "couponPerion"),
          bondYield: roundToTwoDecimals(await getDataByField(moexJson, "bondYield")),
          matDate: await getDataByField(moexJson, "matDate"),
          securityType: await getDataByField(moexJson, "securityType"),
          ISINCode: await getDataByField(moexJson, "ISINCode"),
          percentPrice: await getDataByField(moexJson, "price")
        });

      } else {

        const moexJson = await fetchMoexInfo(asset.ticker);
        const price = await getDataByField(moexJson, "price")

        console.log("price Stock", price);


        await Model.findByIdAndUpdate(asset._id, {
          price: roundToTwoDecimals(price),
          total: roundToTwoDecimals(price * asset.amount),
          fullname: await getDataByField(moexJson, "fullname"),
          securityType: await getDataByField(moexJson, "securityType"),
          ISINCode: await getDataByField(moexJson, "ISINCode")

        });

      }

    }
  } catch (error) {
    throw new Error("Error updating Moex info");
  }
}
