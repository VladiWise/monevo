import connectMongoDB from "@/libs/mongodb";
import Bond from "@/models/bond";
import { NextResponse, NextRequest } from "next/server";
import { roundToTwoDecimals } from "@/utils/mathUtils";
import { calculateYearsAndMonths } from "@/utils/dataFormat";

export async function POST(request: NextRequest) {
  const {
    accountId,
    name,
    ticker,
    currency,
    amount,
    price,
    bondYield,
    matDate,
  } = await request.json();

  await connectMongoDB();

  await Bond.create({
    name,
    ticker,
    currency,
    bankAccounts: [{ id: accountId, amount }],
    price: roundToTwoDecimals(price),
    bondYield: roundToTwoDecimals(bondYield) + "%",
    matDate: calculateYearsAndMonths(matDate),
    total: roundToTwoDecimals(price * amount),
    totalAmount: amount,
  });

  return NextResponse.json(
    { message: "Bond created successfully" },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();

  const funds = await Bond.find({});

  return NextResponse.json(funds, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  await connectMongoDB();

  await Bond.findByIdAndDelete(id);

  return NextResponse.json(
    { message: "Bond deleted successfully" },
    { status: 200 }
  );
}
