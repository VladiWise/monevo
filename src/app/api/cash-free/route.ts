import connectMongoDB from "@/libs/mongodb";
import CashFree from "@/models/cash-free";
import { NextResponse, NextRequest } from "next/server";

import { roundToTwoDecimals } from "@/utils/mathUtils";

const MODEL = CashFree

export async function GET(request: NextRequest) {
  await connectMongoDB();

  const brokerId = request.nextUrl.searchParams.get("brokerId");

  if ( brokerId) {

    const items = await MODEL.find({  brokerId });

    return NextResponse.json(items, { status: 200 });
  } else if (request.nextUrl.searchParams.get("id")) {
    const id = request.nextUrl.searchParams.get("id");

    const item = await MODEL.findById(id);

    return NextResponse.json(item, { status: 200 });
  } else {
    return NextResponse.json({ message: "User ID not provided or ID not provided" }, { status: 400 });
  }

}
export async function POST(request: NextRequest) {
  try {


    const userId = request.nextUrl.searchParams.get("userId");
    const brokerId = request.nextUrl.searchParams.get("brokerId");

    if (userId && brokerId) {

      const { name, ticker, amount, price } =
        await request.json();

      await connectMongoDB();


      const existingItem = await MODEL.findOne({ userId, brokerId, ticker });

      if (existingItem) {
        if (existingItem.amount + amount < 0) {
          return NextResponse.json(
            { message: "Amount must be positive" },
            { status: 400 }
          );
        } else if (existingItem.amount + amount === 0) {
          await existingItem.deleteOne();
          return NextResponse.json(
            { message: "Deleted successfully" },
            { status: 200 }
          );
        }
      }

      if (existingItem) {
        existingItem.amount += amount;
        existingItem.total += roundToTwoDecimals(price * amount);
        await existingItem.save();
        return NextResponse.json(
          { message: "Updated successfully" },
          { status: 200 }
        );
      }

      await MODEL.create({
        userId,
        brokerId,
        name,
        ticker,
        price,
        total: roundToTwoDecimals(price * amount),
        amount,
      });

      return NextResponse.json(
        { message: "Created successfully" },
        { status: 201 }
      );

    } else {
      return NextResponse.json({ message: "User ID not provided or ID not provided" }, { status: 400 });
    }

  } catch (error) {
    return NextResponse.json({ message: "Error creating item" }, { status: 400 });

  }

}


export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  await connectMongoDB();

  await MODEL.findByIdAndDelete(id);

  return NextResponse.json(
    { message: "Deleted successfully" },
    { status: 200 }
  );
}

