import mongoose, { Schema } from "mongoose";

const DB_IndexCBDeposit = new Schema(
  {
    value_91d_180d: { type: Number, required: true },
    value_181d_1y: { type: Number, required: true },
    value_1y_3y: { type: Number, required: true },
    date: { type: Date, required: true },
  }
);

export const DB_IndexCBDeposit_Model = mongoose.models.DB_IndexCBDeposit_Model || mongoose.model("DB_IndexCBDeposit_Model", DB_IndexCBDeposit);


