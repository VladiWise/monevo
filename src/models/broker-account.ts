import mongoose, { Schema } from "mongoose";

const BrokerAccountSchema = new Schema({
  shortName: { type: String, required: true },
  fullName: { type: String, required: true },
  isIIS: { type: Boolean, required: true },
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

const BrokerAccounts =
  mongoose.models.BrokerAccounts || mongoose.model("BrokerAccounts", BrokerAccountSchema);

export default BrokerAccounts;
