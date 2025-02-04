import connectMongoDB from "@/libs/mongodb";
import Fund from "@/models/fund";
import { NextResponse, NextRequest } from "next/server";

import { roundToTwoDecimals } from "@/utils/mathUtils";

export async function GET(request: NextRequest) {
  await connectMongoDB();


  if (request.nextUrl.searchParams.get("userId")) {
    const userId = request.nextUrl.searchParams.get("userId");

    const funds = await Fund.find({ userId });

    return NextResponse.json(funds, { status: 200 });
  } else if (request.nextUrl.searchParams.get("id")) {
    const id = request.nextUrl.searchParams.get("id");

    const fund = await Fund.findById(id);

    return NextResponse.json(fund, { status: 200 });
  } else {
    const funds = await Fund.find();
    return NextResponse.json(funds, { status: 200 });
  }


}
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
    bankAccounts: [{ id: accountId, amount }],
    price,
    total: roundToTwoDecimals(price * amount),
    totalAmount: amount,
  });

  return NextResponse.json(
    { message: "Fund created successfully" },
    { status: 201 }
  );
}

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

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


export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  await connectMongoDB();

  await Fund.findByIdAndDelete(id);

  return NextResponse.json(
    { message: "Fund deleted successfully" },
    { status: 200 }
  );
}

export async function PATCH(
  request: NextRequest
) {
  await connectMongoDB();
  const { accountId, amount, price } = await request.json(); // Получаем accountId и amount из тела запроса

  try {

    const id = request.nextUrl.searchParams.get("id");
    const fund = await Fund.findById(id);

    if (!fund) {
      return NextResponse.json({ message: "Fund not found" }, { status: 404 });
    }

    const accountIndex = fund.bankAccounts.findIndex(
      (bankAccount: { id: string }) => bankAccount.id === accountId
    );

    if (accountIndex !== -1) {
      fund.bankAccounts[accountIndex].amount =
        fund.bankAccounts[accountIndex].amount + amount;
    } else {
      fund.bankAccounts.push({ id: accountId, amount });
    }

    fund.price = roundToTwoDecimals(price);

    fund.totalAmount += amount;
    fund.total = roundToTwoDecimals(fund.totalAmount * price);

    await fund.save();

    return NextResponse.json({ message: "BankAccounts updated successfully" });
  } catch (error) {
    console.error("Error updating bankAccount:", error);
    return NextResponse.json(
      { message: "Error updating bankAccount", error },
      { status: 500 }
    );
  }
}
