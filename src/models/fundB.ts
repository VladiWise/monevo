import mongoose, { Schema } from "mongoose";

const fundBSchema = new Schema(
  {
    name: { type: String, required: true },
    fullname: { type: String, required: false },
    securityType: { type: String, required: false },
    ticker: { type: String, required: true },
    ISINCode: { type: String, required: false },
    currency: { type: String, required: true },
    brokerId: { type: String, required: true },
    price: { type: String, required: true },
    amount: { type: Number, required: true },
    total: { type: Number, required: true },
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

const FundB = mongoose.models.FundB || mongoose.model("FundB", fundBSchema);

export default FundB;
