import mongoose, { Schema } from "mongoose";
import { fetchStockETFInfo } from "@/services/MoexService";

const bondSchema = new Schema(
  {
    name: { type: String, required: true },
    ticker: { type: String, required: true },
    currency: { type: String, required: true },
    brokerId: { type: String, required: true },
    price: { type: Number, required: true },
    bondYield: { type: String, required: false },
    matDate: { type: String, required: false },
    amount: { type: Number, required: true },
    total: { type: Number, required: true },

    fullname: { type: String, required: false },
    nominal: { type: Number, required: false },
    coupon: { type: Number, required: false },
    nextCoupon: { type: String, required: false },
    couponPerion: { type: Number, required: false },
    couponValue: { type: Number, required: false },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bond = mongoose.models.Bond || mongoose.model("Bond", bondSchema);

export default Bond;
