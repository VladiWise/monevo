import connectMongoDB from "@/libs/mongodb";
import Currency from "@/models/currency";
import { NextResponse, NextRequest } from "next/server";

import { roundToTwoDecimals } from "@/utils/mathUtils";

export default class AssetClass {
  MODEL: any;

  constructor(MODEL: any) {
    this.MODEL = MODEL;
  }


  async GET(request: NextRequest) {
    await connectMongoDB();
    const brokerId = request.nextUrl.searchParams.get("brokerId");

    if (brokerId) {

      const items = await this.MODEL.find({ brokerId });

      return NextResponse.json(items, { status: 200 });
    } else if (request.nextUrl.searchParams.get("id")) {
      const id = request.nextUrl.searchParams.get("id");

      const item = await this.MODEL.findById(id);

      return NextResponse.json(item, { status: 200 });
    } else if (request.nextUrl.searchParams.get("assetId")) {
      const assetId = request.nextUrl.searchParams.get("assetId");

      const item = await this.MODEL.findById(assetId);

      return NextResponse.json(item, { status: 200 });
    }
    else {
      return NextResponse.json({ message: "Account ID not provided" }, { status: 400 });
    }

  };


  async POST(request: NextRequest, savingObject: any) {
    const userId = request.nextUrl.searchParams.get("userId");
    const brokerId = request.nextUrl.searchParams.get("brokerId");

    if (userId && brokerId) {

      const requestObject = await request.json();

      await connectMongoDB();


      const existingItem = await this.MODEL.findOne({ userId, brokerId, ticker: requestObject.ticker });


      if (existingItem) {
        existingItem.amount = requestObject.amount;
        existingItem.total = roundToTwoDecimals(requestObject.price * requestObject.amount);
        await existingItem.save();
        return NextResponse.json(
          { message: "Updated successfully" },
          { status: 200 }
        );
      }

      await this.MODEL.create({
        userId,
        brokerId,
        name: requestObject.name,
        ticker: requestObject.ticker,
        price: roundToTwoDecimals(requestObject.price),
        amount: requestObject.amount,
        total: roundToTwoDecimals(requestObject.price * requestObject.amount),
        ...savingObject(requestObject),
      });

      return NextResponse.json(
        { message: "Created successfully" },
        { status: 201 }
      );

    } else {
      return NextResponse.json({ message: "User ID not provided or ID not provided" }, { status: 400 });
    }

  }

  async DELETE(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id");

    await connectMongoDB();

    await this.MODEL.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  }

}