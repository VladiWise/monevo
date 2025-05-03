
import Bond from "@/models/bond";
import { NextRequest } from "next/server";
import { roundToTwoDecimals } from "@/utils/mathUtils";

import AssetClass from "../(classes)/AssetClass";

const Asset = new AssetClass(Bond);

export async function GET(request: NextRequest) {
  return await Asset.GET(request);
}
export async function POST(request: NextRequest) {

  return await Asset.POST(request, (requestObject: any) => ({

    currency: requestObject.currency,
    bondYield: requestObject.bondYield,
    matDate: requestObject.matDate,
    fullname: requestObject.fullname,
    nominal: requestObject.nominal,
    coupon: requestObject.coupon,
    nextCoupon: requestObject.nextCoupon,
    couponPerion: requestObject.couponPerion,
    couponValue: requestObject.couponValue,

    percentPrice: requestObject.percentPrice,
    securityType: requestObject.securityType,

  })

  );

}


export async function DELETE(request: NextRequest) {
  return await Asset.DELETE(request);
}
