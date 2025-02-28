import connectMongoDB from "@/libs/mongodb";

import Fund from "@/models/fundS";
import Bond from "@/models/bond";
import FundB from "@/models/fundB";
import Stock from "@/models/stock";
import Total from "@/models/main-total";

import { NextResponse, NextRequest } from "next/server";
import { fetchCurrencyValue } from "@/services/CurrencyService";
import { roundToTwoDecimals } from "@/utils/mathUtils";
import { getDataByField } from "@/utils/moexInfo";
import { fetchStockETFInfo, fetchBondInfo } from "@/services/MoexService";

export async function GET(request: NextRequest) {
  await connectMongoDB();


  if (request.nextUrl.searchParams.get("userId")) {

    const userId = request.nextUrl.searchParams.get("userId");

    const fundsS = await Fund.find({ userId });
    const bonds = await Bond.find({ userId });
    const fundsB = await FundB.find({ userId });
    const stocks = await Stock.find({ userId });


    const sumFundS = fundsS.reduce((acc, fund) => acc + roundToTwoDecimals(fund.total), 0);
    const sumStock = stocks.reduce((acc, stock) => acc + roundToTwoDecimals(stock.total), 0);

    const sumBond = bonds.reduce((acc, bond) => acc + roundToTwoDecimals(bond.total), 0);
    const sumFundB = fundsB.reduce((acc, fund) => acc + roundToTwoDecimals(fund.total), 0);


    return NextResponse.json({ bonds: sumBond + sumFundB, stocks: sumStock + sumFundS }, { status: 200 });

  } else {
    return NextResponse.json({ message: "User ID not provided" }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  await connectMongoDB();


  async function updateMoexInfo(assets: any[], fetchMoexInfo: any, Model: any) {
    try {
      assets.forEach(async (asset) => {

        const moexJson = await fetchMoexInfo(asset.ticker)


        const price = Model !== Bond ? await getDataByField(moexJson, "price") : ((await getDataByField(moexJson, "price")) *
          (await getDataByField(moexJson, "nominal")) *
          (await fetchCurrencyValue(
            await getDataByField(moexJson, "currency")
          ))) /
          100 +
          (await getDataByField(moexJson, "coupon"))

        // console.log("asset::::::::::::::::::::", asset.ticker, price);

        await Model.findByIdAndUpdate(asset._id, { price: roundToTwoDecimals(price) });
        await Model.findByIdAndUpdate(asset._id, { total: roundToTwoDecimals(price * asset.amount) });
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { error: error.message };
      }
      throw error;
    }

  }


  if (request.nextUrl.searchParams.get("userId")) {

    const userId = request.nextUrl.searchParams.get("userId");

    const fundsS = await Fund.find({ userId });
    const fundsB = await FundB.find({ userId });
    const stocks = await Stock.find({ userId });

    const bonds = await Bond.find({ userId });

    await updateMoexInfo(fundsS, fetchStockETFInfo, Fund);
    await updateMoexInfo(fundsB, fetchStockETFInfo, FundB);
    await updateMoexInfo(stocks, fetchStockETFInfo, Stock);
    await updateMoexInfo(bonds, fetchBondInfo, Bond);


    return NextResponse.json({ message: "Data updated successfully" }, { status: 200 });

  } else {
    return NextResponse.json({ message: "User ID not provided" }, { status: 400 });
  }
}


export async function POST(request: NextRequest) {
  await connectMongoDB();

  if (request.nextUrl.searchParams.get("userId")) {

    const { bonds, stocks } = await request.json();

    const userId = request.nextUrl.searchParams.get("userId");

    Total.create({ userId, assets: { bonds, stocks } });

    return NextResponse.json({ message: "Data created successfully" }, { status: 200 });

  } else {
    return NextResponse.json({ message: "User ID not provided" }, { status: 400 });
  }
}