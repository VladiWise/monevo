import mongoose, { Schema } from "mongoose";

const DB_IndexCB = new Schema(
  {
    value_91d_180d: { type: Number, required: true },
    value_181d_1y: { type: Number, required: true },
    value_1y_3y: { type: Number, required: true },
    value_over_3y: { type: Number, required: true },

    date: { type: Date, required: true },
  }
);

export const DB_IndexCBDeposit_Model = mongoose.models.DB_IndexCBDeposit_Model || mongoose.model("DB_IndexCBDeposit_Model", DB_IndexCB);
export const DB_IndexCBCredit_Model = mongoose.models.DB_IndexCBCredit_Model || mongoose.model("DB_IndexCBCredit_Model", DB_IndexCB);


