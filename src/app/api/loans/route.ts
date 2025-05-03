import Loan from "@/models/loan";
import { NextRequest } from "next/server";

import AssetClass from "../(classes)/AssetClass";

const Asset = new AssetClass(Loan);

export async function GET(request: NextRequest) {
  return await Asset.GET(request);
}

export async function POST(request: NextRequest) {
  return await Asset.POST(request, () => ({}))
}

export async function DELETE(request: NextRequest) {
  return await Asset.DELETE(request);
}

