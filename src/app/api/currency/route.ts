import Currency from "@/models/currency";
import { NextRequest } from "next/server";

import AssetClass from "../(classes)/AssetClass";


const Asset = new AssetClass(Currency);


export async function GET(request: NextRequest) {
  return await Asset.GET(request);
}

export async function POST(request: NextRequest) {
  return await Asset.POST(request, () => { });
}

export async function DELETE(request: NextRequest) {
  return await Asset.DELETE(request);
}

