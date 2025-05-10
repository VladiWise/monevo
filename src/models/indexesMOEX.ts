import mongoose, { Schema } from "mongoose";

const indexMOEXSchema = new Schema(
  {
    name: { type: String, required: true },
    ticker: { type: String, required: true },
    value: { type: Number, required: true },
    date: { type: Date, required: true },
  }
);


export const IMOEX = mongoose.models.IMOEX || mongoose.model("IMOEX", indexMOEXSchema);
export const RUSFAR = mongoose.models.RUSFAR || mongoose.model("RUSFAR", indexMOEXSchema);



