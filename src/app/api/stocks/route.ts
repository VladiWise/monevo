import Stock from "@/models/stock";
import { NextRequest } from "next/server";
import AssetClass from "../(classes)/AssetClass";

const Asset = new AssetClass(Stock);

export async function GET(request: NextRequest) {
  return await Asset.GET(request);
}

export async function POST(request: NextRequest) {
  return await Asset.POST(request, (requestObject: any) => ({
    currency: requestObject.currency,
  }));
}

export async function DELETE(request: NextRequest) {
  return await Asset.DELETE(request);
}


