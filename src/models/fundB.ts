import mongoose, { Schema } from "mongoose";

const fundBSchema = new Schema(
  {
    name: { type: String, required: true },
    ticker: { type: String, required: true },
    currency: { type: String, required: true },
    bankAccounts: [
      {
        id: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
    price: { type: String, required: true },
    totalAmount: { type: Number, required: true },
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
