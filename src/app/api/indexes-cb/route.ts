import connectMongoDB from "@/libs/mongodb";
import { NextResponse, NextRequest } from "next/server";
import mongoose, { Schema } from "mongoose";

import { getIndexCBDeposit } from "@/services/IndexCBService";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { IndexCBType } from "@/types";
import { DB_IndexCBDeposit_Model } from "@/models/IndexCB";



export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();
    const type = request.nextUrl.searchParams.get("type") as IndexCBType;

    if (!type) {
      return NextResponse.json(
        { message: "Type not provided" }
        , { status: 400 });
    }

    switch (type) {
      case "deposit":
        const result = await DB_IndexCBDeposit_Model.find({}).sort({ date: -1 });
        if (result.length === 0) return NextResponse.json({ message: "No data found" }, { status: 404 });
        return NextResponse.json(result, { status: 200 });
      default:
        break;
    }


    return NextResponse.json("gfdfgdfgdfdfg", { status: 200 });


  } catch (error) {

    return NextResponse.json(
      { message: getErrorMessage(error) }
      , { status: 500 });

  }
}

export async function POST(request: NextRequest) {

  try {
    await connectMongoDB();


    const type = request.nextUrl.searchParams.get("type");


    if (!type) {
      return NextResponse.json(
        { message: "Type not provided" }
        , { status: 400 });

    }

    switch (type) {
      case "deposit":
        const result = await getIndexCBDeposit();

        if ("error" in result) {
          return NextResponse.json(
            { message: result.error }
            , { status: 500 });
        }

        // await DB_IndexCBDeposit_Model.insertMany(result);


        const ops = result.map(record => ({
          updateOne: {
            filter: { date: record.date },
            update: { $setOnInsert: record },
            upsert: true,
          }
        }));

        const res = await DB_IndexCBDeposit_Model.bulkWrite(ops);

        return NextResponse.json(
          `Inserted: ${res.upsertedCount}, Modified: ${res.modifiedCount}`
          , { status: 200 });

      default:
        break;
    }





  } catch (error) {

    return NextResponse.json(
      { message: getErrorMessage(error) }
      , { status: 500 });

  }

}

