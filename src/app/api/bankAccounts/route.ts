import connectMongoDB from "@/libs/mongodb";
import BankAccounts from "@/models/bank-account";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { shortName, fullName } = await request.json();

  await connectMongoDB();

  await BankAccounts.create({
    shortName,
    fullName,
  });

  return NextResponse.json(
    { message: "BankAccounts created successfully" },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();

  const bankAccounts = await BankAccounts.find({});

  return NextResponse.json(bankAccounts, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  await connectMongoDB();

  await BankAccounts.findByIdAndDelete(id);

  return NextResponse.json(
    { message: "BankAccounts deleted successfully" },
    { status: 200 }
  );
}
