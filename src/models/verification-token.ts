import mongoose, { Schema } from "mongoose";


const tokenSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
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
  { timestamps: true }
);

// Уникальный составной индекс для email и token
tokenSchema.index({ email: 1, token: 1 }, { unique: true });



const Token = mongoose.models.Token || mongoose.model("Token", tokenSchema);

export default Token;
