import connectMongoDB from "@/libs/mongodb";

import FundS from "@/models/fundS";
import Bond from "@/models/bond";
import FundB from "@/models/fundB";
import Stock from "@/models/stock";
import Currency from "@/models/currency";
import BrokerAccount from "@/models/broker-account";


import { NextResponse, NextRequest } from "next/server";
import { roundToTwoDecimals } from "@/utils/mathUtils";



export async function GET(request: NextRequest) {
  await connectMongoDB();

  if (request.nextUrl.searchParams.get("userId")) {

    const userId = request.nextUrl.searchParams.get("userId");

    const brokerAccounts = await BrokerAccount.find({ userId, isIIS: true })

    const total = await Promise.all(brokerAccounts?.map(async (account) => {


      const fundsS = await FundS.find({ userId, brokerId: account._id });
      const bonds = await Bond.find({ userId, brokerId: account._id });
      const fundsB = await FundB.find({ userId, brokerId: account._id });
      const stocks = await Stock.find({ userId, brokerId: account._id });
      const currency = await Currency.find({ userId, brokerId: account._id });


      const sumFundS = fundsS?.reduce((acc, asset) => acc + asset.total, 0);
      const sumStock = stocks?.reduce((acc, asset) => acc + asset.total, 0);
      const sumcurrency = currency?.reduce((acc, asset) => acc + asset.total, 0);
      const sumBond = bonds?.reduce((acc, asset) => acc + asset.total, 0);
      const sumFundB = fundsB?.reduce((acc, asset) => acc + asset.total, 0);


      return sumFundS + sumStock + sumcurrency + sumBond + sumFundB

    }))

    const IISTotal = total?.reduce((acc, item) => acc + item);

    console.log("IISTotal", IISTotal);




    return NextResponse.json(roundToTwoDecimals(IISTotal), { status: 200 });

  } else {
    return NextResponse.json({ message: "User ID not provided" }, { status: 400 });
  }
}

