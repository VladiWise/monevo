import connectMongoDB from "@/libs/mongodb";
import Fund from "@/models/fund";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(request: NextRequest, { params } : { params: {id: string}}) {
  const { id } = await params;

  const { accountId, name, ticker, currency, amount, price, total } = await request.json();

  await connectMongoDB();

  await Fund.findByIdAndUpdate(id, {
    accountId,
    name,
    ticker,
    currency,
    amount,
    price,
    total,
  });

  return NextResponse.json(
    { message: "Fund updated successfully" },
    { status: 200 }
  );
}

export async function GET(request: NextRequest, { params } : { params : { id: string}}) {
  const { id } = await params;

  await connectMongoDB();

  const fund = await Fund.findById(id);

  return NextResponse.json(fund, { status: 200 });
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
