import connectMongoDB from "@/libs/mongodb";

import Fund from "@/models/fundS";
import Bond from "@/models/bond";
import FundB from "@/models/fundB";
import Stock from "@/models/stock";
import Total from "@/models/main-total";

import { NextResponse, NextRequest } from "next/server";
import { fetchCurrencyValue } from "@/services/ExternalCurrencyService";
import { roundToTwoDecimals } from "@/utils/mathUtils";
import { getDataByField } from "@/utils/moexInfo";
import { fetchStockETFInfo, fetchBondInfo } from "@/services/MoexService";

export async function GET(request: NextRequest) {
  await connectMongoDB();

  if (request.nextUrl.searchParams.get("userId")) {

    const userId = request.nextUrl.searchParams.get("userId");

    const total = await Total.findOne({ userId }).sort({ createdAt: -1 });


    return NextResponse.json({ total }, { status: 200 });

  } else {
    return NextResponse.json({ message: "User ID not provided" }, { status: 400 });
  }
}


export async function POST(request: NextRequest) {
  await connectMongoDB();

  if (request.nextUrl.searchParams.get("userId")) {

    const data = await request.json();

    const userId = request.nextUrl.searchParams.get("userId");

    Total.create({ userId, assets: data });

    return NextResponse.json({ message: "Data created successfully" }, { status: 200 });

  } else {
    return NextResponse.json({ message: "User ID not provided" }, { status: 400 });
  }
}