import connectMongoDB from "@/libs/mongodb";
import Bond from "@/models/bond";
import { NextResponse, NextRequest } from "next/server";
import { roundToTwoDecimals } from "@/utils/mathUtils";
import { calculateYearsAndMonths } from "@/utils/dataFormat";


const MODEL = Bond

export async function GET(request: NextRequest) {
  await connectMongoDB();
  const brokerId = request.nextUrl.searchParams.get("brokerId");

  if (brokerId) {

    const items = await MODEL.find({ brokerId });

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
  const userId = request.nextUrl.searchParams.get("userId");
  const brokerId = request.nextUrl.searchParams.get("brokerId");

  if (userId && brokerId) {


    const {
      name,
      ticker,
      currency,
      amount,
      price,
      bondYield,
      matDate,
    } = await request.json();

    await connectMongoDB();


    const existingItem = await MODEL.findOne({ userId, brokerId, ticker });


    if (existingItem) {
      existingItem.amount = amount;
      existingItem.total = roundToTwoDecimals(price * amount);
      await existingItem.save();
      return NextResponse.json(
        { message: "Updated successfully" },
        { status: 200 }
      );
    }


    await Bond.create({
      userId,
      brokerId,
      name,
      ticker,
      currency,
      price: roundToTwoDecimals(price),
      bondYield: roundToTwoDecimals(bondYield) + "%",
      matDate: calculateYearsAndMonths(matDate),
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
