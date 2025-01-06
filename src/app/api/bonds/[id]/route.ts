import connectMongoDB from "@/libs/mongodb";
import Bond from "@/models/bond";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(request: NextRequest, { params }: {params: { id: string }}) {
  const { id } = await params;

  const { accountId, name, ticker, currency, amount, price, total } = await request.json();

  await connectMongoDB();

  await Bond.findByIdAndUpdate(id, {
    accountId,
    name,
    ticker,
    currency,
    amount,
    price,
    total,
  });

  return NextResponse.json(
    { message: "Bond updated successfully" },
    { status: 200 }
  );
}

export async function GET(request: NextRequest, { params } : { params : { id : string}}) {
  const { id } = await params;

  await connectMongoDB();

  const fund = await Bond.findById(id);

  return NextResponse.json(fund, { status: 200 });
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
