import mongoose, { Schema } from "mongoose";

const BankAccountSchema = new Schema({
  shortName: { type: String, required: true },
  fullName: { type: String, required: false },
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

const BankAccounts =
  mongoose.models.BankAccounts || mongoose.model("BankAccounts", BankAccountSchema);

export default BankAccounts;
