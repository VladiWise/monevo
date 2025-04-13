import connectMongoDB from "@/libs/mongodb";
import Bond from "@/models/bond";
import FundB from "@/models/fundB";
import FundS from "@/models/fundS";
import Stock from "@/models/stock";
import Currency from "@/models/currency";

import { NextResponse, NextRequest } from "next/server";


export async function GET(request: NextRequest) {

  await connectMongoDB();

  if (request.nextUrl.searchParams.get("brokerId")) {

    const brokerId = request.nextUrl.searchParams.get("brokerId");


    const bonds = await Bond.find({ brokerId: brokerId });
    const stocks = await Stock.find({ brokerId: brokerId });
    const funds = await FundS.find({ brokerId: brokerId });
    const fundsB = await FundB.find({ brokerId: brokerId });
    const currency = await Currency.find({ brokerId: brokerId });

    const sumBond = bonds?.reduce((acc, asset) => acc + asset.total, 0);
    const sumStock = stocks?.reduce((acc, asset) => acc + asset.total, 0);
    const sumFundS = funds?.reduce((acc, asset) => acc + asset.total, 0);
    const sumFundB = fundsB?.reduce((acc, asset) => acc + asset.total, 0);
    const sumCurrency = currency?.reduce((acc, asset) => acc + asset.total, 0);

    const total = sumBond + sumStock + sumFundS + sumFundB + sumCurrency



    return NextResponse.json(total, { status: 200 });
  } else {
    return NextResponse.json({ message: "User ID or Account ID not provided" }, { status: 400 });
  }

}