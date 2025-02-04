import connectMongoDB from "@/libs/mongodb";
import Fund from "@/models/fund";
import { NextResponse, NextRequest } from "next/server";

import { roundToTwoDecimals } from "@/utils/mathUtils";
export async function POST(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");


  const { accountId, name, ticker, currency, amount, price } =
    await request.json();

  await connectMongoDB();

  if (amount < 0) {
    return NextResponse.json(
      { message: "Amount must be positive" },
      { status: 400 }
    );
  }

  await Fund.create({
    userId,
    name,
    ticker,
    currency,
    accounts: [{ id: accountId, amount }],
    price,
    total: roundToTwoDecimals(price * amount),
    totalAmount: amount,
  });

  return NextResponse.json(
    { message: "Fund created successfully" },
    { status: 201 }
  );
}

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  await connectMongoDB();



  const funds = await Fund.find({ userId });



  return NextResponse.json(funds, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  await connectMongoDB();

  await Fund.findByIdAndDelete(id);

  return NextResponse.json(
    { message: "Fund deleted successfully" },
    { status: 200 }
  );
}
