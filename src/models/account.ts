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

const Account =
  mongoose.models.Account || mongoose.model("Account", accountSchema);

export default Account;
