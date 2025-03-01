import mongoose, { Schema } from "mongoose";

const totalSchema = new Schema(
  {
    assets: {
      bonds: { type: Number, required: true },
      stocks: { type: Number, required: true },
      cashBroker: { type: Number, required: true },
      deposit: { type: Number, required: true },
      cashFree: { type: Number, required: true },
    },

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

const Total = mongoose.models.Total || mongoose.model("Total", totalSchema);

export default Total;
