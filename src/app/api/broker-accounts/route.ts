import connectMongoDB from "@/libs/mongodb";
import BrokerAccount from "@/models/broker-account";
import Bond from "@/models/bond";
import FundB from "@/models/fundB";
import FundS from "@/models/fundS";
import Stock from "@/models/stock";
import Currency from "@/models/currency";

import { NextResponse, NextRequest } from "next/server";


export async function GET(request: NextRequest) {

  await connectMongoDB();

  if (request.nextUrl.searchParams.get("userId")) {
    const userId = request.nextUrl.searchParams.get("userId");

    const bankAccounts = await BrokerAccount.find({ userId });

    return NextResponse.json(bankAccounts, { status: 200 });
  } else {
    return NextResponse.json({ message: "User ID not provided" }, { status: 400 });
  }

}

export async function POST(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");

    const { shortName, fullName, isIIS } = await request.json();

    await connectMongoDB();

    await BrokerAccount.create({
      shortName,
      fullName,
      isIIS,
      userId
    });

    return NextResponse.json(
      { message: "BrokerAccount created successfully" },
      { status: 201 }
    );
  } catch (error) {

    return NextResponse.json({ message: "Error creating BrokerAccount" }, { status: 500 });

  }

}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  await connectMongoDB();

  const bonds = await Bond.find({ brokerId: id });
  const stocks = await Stock.find({ brokerId: id });
  const funds = await FundS.find({ brokerId: id });
  const fundsB = await FundB.find({ brokerId: id });
  const currency = await Currency.find({ brokerId: id });


  if (bonds.length > 0 || stocks.length > 0 || funds.length > 0 || fundsB.length > 0 || currency.length > 0) {
    return NextResponse.json(
      { message: "Broker account cannot be deleted because it has assets" },
      { status: 400 }
    )
  }

  await BrokerAccount.findByIdAndDelete(id);

  return NextResponse.json(
    { message: "BrokerAccount deleted successfully" },
    { status: 200 }
  );
}
