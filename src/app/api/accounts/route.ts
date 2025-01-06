import connectMongoDB from "@/libs/mongodb";
import Account from "@/models/account";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { shortName, fullName } = await request.json();

  await connectMongoDB();

  await Account.create({
    shortName,
    fullName,
  });

  return NextResponse.json(
    { message: "Account created successfully" },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();

  const accounts = await Account.find({});

  return NextResponse.json(accounts, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  await connectMongoDB();

  await Account.findByIdAndDelete(id);

  return NextResponse.json(
    { message: "Account deleted successfully" },
    { status: 200 }
  );
}
