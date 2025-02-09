import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema({
  shortName: { type: String, required: true },
  fullName: { type: String, required: true },
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
});

const BankAccounts =
  mongoose.models.BankAccounts || mongoose.model("BankAccounts", accountSchema);

export default BankAccounts;
