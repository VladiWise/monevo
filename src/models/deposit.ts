import mongoose, { Schema } from "mongoose";

const depositSchema = new Schema(
  {
    name: { type: String, required: true },
    ticker: { type: String, required: true },
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

const Deposit = mongoose.models.Deposit || mongoose.model("Deposit", depositSchema);

export default Deposit;
