import mongoose, { Schema } from "mongoose";


const tokenSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },

    expires: {
      type: Date,
      required: true,
    }

  },
  { timestamps: false }
);

// Уникальный составной индекс для email и token
tokenSchema.index({ email: 1, token: 1 }, { unique: true });



const VerificationToken = mongoose.models.VerificationToken || mongoose.model("VerificationToken", tokenSchema);

export default VerificationToken;
