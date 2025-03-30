import connectMongoDB from "@/libs/mongodb";
import BankAccounts from "@/models/bank-account";
import Deposit from "@/models/deposit";
import CashFree from "@/models/cash-free";
import Loan from "@/models/loan";

import { NextResponse, NextRequest } from "next/server";


export async function GET(request: NextRequest) {

  await connectMongoDB();

  if (request.nextUrl.searchParams.get("userId")) {
    const userId = request.nextUrl.searchParams.get("userId");

    const bankAccounts = await BankAccounts.find({ userId });

    return NextResponse.json(bankAccounts, { status: 200 });
  } else {
    return NextResponse.json({ message: "User ID not provided" }, { status: 400 });
  }

}

export async function POST(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");

    const { shortName, fullName, isIIS } = await request.json();

    await connectMongoDB();

    await BankAccounts.create({
      shortName,
      fullName,
      userId
    });

    return NextResponse.json(
      { message: "BankAccounts created successfully" },
      { status: 201 }
    );
  } catch (error) {

    return NextResponse.json({ message: "Error creating BankAccounts" }, { status: 500 });

  }

}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  await connectMongoDB();

  // REWORK TO DEPOSITS
  const deposits = await Deposit.find({ brokerId: id });
  const cashFree = await CashFree.find({ brokerId: id });
  const loans = await Loan.find({ brokerId: id });



  if (deposits.length > 0 || cashFree.length > 0 || loans.length > 0) {
    return NextResponse.json(
      { message: "Bank account cannot be deleted because it has assets" },
      { status: 400 }
    )
  }

  await BankAccounts.findByIdAndDelete(id);

  return NextResponse.json(
    { message: "BankAccounts deleted successfully" },
    { status: 200 }
  );
}
