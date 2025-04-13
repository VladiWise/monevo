import connectMongoDB from "@/libs/mongodb";
import Deposit from "@/models/deposit";
import CashFree from "@/models/cash-free";
import Loan from "@/models/loan";

import { NextResponse, NextRequest } from "next/server";


export async function GET(request: NextRequest) {

  await connectMongoDB();

  if (request.nextUrl.searchParams.get("bankId")) {

    const bankId = request.nextUrl.searchParams.get("bankId");


    const deposits = await Deposit.find({ brokerId: bankId });
    const cashFree = await CashFree.find({ brokerId: bankId });
    const loans = await Loan.find({ brokerId: bankId });

    const sumDeposit = deposits?.reduce((acc, asset) => acc + asset.total, 0);
    const sumCashFree = cashFree?.reduce((acc, asset) => acc + asset.total, 0);
    const sumLoan = loans?.reduce((acc, asset) => acc + asset.total, 0);

    const total = sumDeposit + sumCashFree - sumLoan


    return NextResponse.json(total, { status: 200 });
  } else {
    return NextResponse.json({ message: "User ID or Account ID not provided" }, { status: 400 });
  }

}