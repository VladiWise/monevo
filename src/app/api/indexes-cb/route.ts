import connectMongoDB from "@/libs/mongodb";
import { NextResponse, NextRequest } from "next/server";
import mongoose, { Schema } from "mongoose";

import { getIndexCBDeposit, getIndexCBCreadit, getIndexCBLoanVolume } from "@/services/IndexCBService";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { IndexCBType } from "@/types";
import { DB_IndexCBDeposit_Model, DB_IndexCBCredit_Model, DB_IndexCBLoanVolume_Model } from "@/models/IndexCB";



export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();
    const type = request.nextUrl.searchParams.get("type") as IndexCBType;

    if (!type) {
      return NextResponse.json(
        { error: "Type not provided" }
        , { status: 400 });
    }

    switch (type) {
      case "deposit":
        const deposits = await DB_IndexCBDeposit_Model.find({}).sort({ date: -1 });
        if (deposits.length === 0) return NextResponse.json({ error: "No data found" }, { status: 404 });
        return NextResponse.json(deposits, { status: 200 });
      case "credit":
        const credits = await DB_IndexCBCredit_Model.find({}).sort({ date: -1 });
        if (credits.length === 0) return NextResponse.json({ error: "No data found" }, { status: 404 });
        return NextResponse.json(credits, { status: 200 });

      case "loan":
        const loans = await DB_IndexCBLoanVolume_Model.find({}).sort({ date: -1 });
        if (loans.length === 0) return NextResponse.json({ error: "No data found" }, { status: 404 });
        return NextResponse.json(loans, { status: 200 });
      default:
        break
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });


  } catch (error) {

    return NextResponse.json(
      { error: getErrorMessage(error) }
      , { status: 500 });

  }
}

export async function POST(request: NextRequest) {

  try {
    await connectMongoDB();

    const type = request.nextUrl.searchParams.get("type") as IndexCBType;


    if (!type) {
      return NextResponse.json(
        { error: "Type not provided" }
        , { status: 400 });

    }

    switch (type) {
      case "deposit":
        const deposits = await getIndexCBDeposit();

        const depOps = deposits.map(record => ({
          updateOne: {
            filter: { date: record.date },
            update: { $setOnInsert: record },
            upsert: true,
          }
        }));

        const depRes = await DB_IndexCBDeposit_Model.bulkWrite(depOps);

        return NextResponse.json(
          { message: `Inserted: ${depRes.upsertedCount}, Modified: ${depRes.modifiedCount}` }
          , { status: 200 });

      case "credit":
        const credits = await getIndexCBCreadit();


        const credOps = credits.map(record => ({
          updateOne: {
            filter: { date: record.date },
            update: { $setOnInsert: record },
            upsert: true,
          }
        }));

        const credRes = await DB_IndexCBCredit_Model.bulkWrite(credOps);

        return NextResponse.json(
          { message: `Inserted: ${credRes.upsertedCount}, Modified: ${credRes.modifiedCount}` }
          , { status: 200 });



      case "loan":
        const loans = await getIndexCBLoanVolume();


        const loanOps = loans.map(record => ({
          updateOne: {
            filter: { date: record.date },
            update: { $setOnInsert: record },
            upsert: true,
          }
        }));

        const loanRes = await DB_IndexCBLoanVolume_Model.bulkWrite(loanOps);

        return NextResponse.json(
          { message: `Inserted: ${loanRes.upsertedCount}, Modified: ${loanRes.modifiedCount}` }
          , { status: 200 });

      default:
        break
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });

  } catch (error) {

    return NextResponse.json(
      { error: getErrorMessage(error) }
      , { status: 500 });

  }

}

