import connectMongoDB from "@/libs/mongodb";
import { NextResponse, NextRequest } from "next/server";
import mongoose, { Schema } from "mongoose";

import { getIndexValues } from "@/services/IndexMOEXService";
import { getErrorMessage } from "@/utils/getErrorMessage";

const indexMOEXSchema = new Schema(
  {
    name: { type: String, required: true },
    ticker: { type: String, required: true },
    value: { type: Number, required: true },
    date: { type: Date, required: true },
  }
);

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();
    const SECID = request.nextUrl.searchParams.get("SECID");

    if (SECID) {

      const INDEX = mongoose.models[SECID] || mongoose.model(SECID, indexMOEXSchema);


      const every = INDEX.find({}).sort({ date: -1 }).cursor()


      const result = [];
      const N = 7;
      let i = 0;

      for await (const doc of every) {
        if (i === 0 || i % N === N - 1) {
          result.push(doc);
        }
        i++;
      }

      return NextResponse.json(result, { status: 200 });

    } else {
      return NextResponse.json({ message: "SECID not provided" }, { status: 400 });
    }
  } catch (error) {

    return NextResponse.json(
      { message: getErrorMessage(error) }
      , { status: 500 });

  }
}


export async function POST(request: NextRequest) {

  try {
    await connectMongoDB();
    const SECID = request.nextUrl.searchParams.get("SECID");

    if (SECID) {

      const INDEX = mongoose.models[SECID] || mongoose.model(SECID, indexMOEXSchema);

      const start = await INDEX.countDocuments({}) || 0;
      const result = await getIndexValues(SECID!, start);

      let index = result.cursor.INDEX
      const total = result.cursor.TOTAL
      const pageSize = result.cursor.PAGESIZE
      let countAdded = 0

      while (index < total) {

        const result = await getIndexValues(SECID!, index);
        result.data.map((item: any) => {
          INDEX.create({
            name: item.NAME,
            ticker: item.SECID,
            value: item.CLOSE,
            date: item.TRADEDATE,
          });

        });

        countAdded += result.data.length
        index += pageSize
      }

      return NextResponse.json(
        {
          "Items added": countAdded,
          "Index": SECID
        }
        , { status: 200 });

    }

  } catch (error) {

    return NextResponse.json(
      { message: getErrorMessage(error) }
      , { status: 500 });

  }

}

export async function DELETE(request: NextRequest) {


}

