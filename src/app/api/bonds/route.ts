import connectMongoDB from "@/libs/mongodb";
import Bond from "@/models/bond";
import { NextResponse, NextRequest } from "next/server";
import { roundToTwoDecimals } from "@/utils/mathUtils";
import { calculateYearsAndMonths } from "@/utils/dataFormat";


export async function GET(request: NextRequest) {
  await connectMongoDB();


  if (request.nextUrl.searchParams.get("userId")) {
    const userId = request.nextUrl.searchParams.get("userId");

    const items = await Bond.find({ userId });

    return NextResponse.json(items, { status: 200 });
  } else if (request.nextUrl.searchParams.get("id")) {
    const id = request.nextUrl.searchParams.get("id");

    const item = await Bond.findById(id);

    return NextResponse.json(item, { status: 200 });
  } else {
    const items = await Bond.find();
    return NextResponse.json(items, { status: 200 });
  }

}


export async function POST(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

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

  if (amount < 0) {
    return NextResponse.json(
      { message: "Amount must be positive" },
      { status: 400 }
    );
  }

  await Bond.create({
    userId,
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

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

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


export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  await connectMongoDB();

  await Bond.findByIdAndDelete(id);

  return NextResponse.json(
    { message: "Bond deleted successfully" },
    { status: 200 }
  );
}

export async function PATCH(
  request: NextRequest
) {
  await connectMongoDB();
  const { accountId, amount, price, bondYield, matDate } = await request.json();
  try {

    const id = request.nextUrl.searchParams.get("id");
    const item = await Bond.findById(id);

    if (!item) {
      return NextResponse.json({ message: "Bond not found" }, { status: 404 });
    }

    const accountIndex = item.bankAccounts.findIndex(
      (bankAccount: { id: string }) => bankAccount.id === accountId
    );

    if (accountIndex !== -1) {
      item.bankAccounts[accountIndex].amount =
        item.bankAccounts[accountIndex].amount + amount;
    } else {
      item.bankAccounts.push({ id: accountId, amount });
    }

    item.bondYield = roundToTwoDecimals(bondYield) + "%";
    item.matDate = calculateYearsAndMonths(matDate);
    item.price = roundToTwoDecimals(price);
    item.totalAmount += amount;
    item.total = roundToTwoDecimals(item.totalAmount * price);

    await item.save();

    return NextResponse.json({ message: "BankAccounts updated successfully" });
  } catch (error) {
    console.error("Error updating bankAccount:", error);
    return NextResponse.json(
      { message: "Error updating bankAccount", error },
      { status: 500 }
    );
  }
}
