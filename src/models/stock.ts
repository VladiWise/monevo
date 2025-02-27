import mongoose, { Schema } from "mongoose";

const stockSchema = new Schema(
  {
    name: { type: String, required: true },
    ticker: { type: String, required: true },
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

const Stock = mongoose.models.Stock || mongoose.model("Stock", stockSchema);

export default Stock;
