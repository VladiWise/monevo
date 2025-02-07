import mongoose, { Schema } from "mongoose";

const bondSchema = new Schema(
  {
    name: { type: String, required: true },
    ticker: { type: String, required: true },
    currency: { type: String, required: true },
    bankAccounts: [
      {
        id: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
    price: { type: String, required: true },
    bondYield: { type: String, required: false },
    matDate: { type: String, required: false },
    totalAmount: {
      type: Number,
      required: true,
      validate: {
        validator: (value: number) => {
          return value >= 0; // Проверяем, что значение >= 0
        },
        message: "Total amount must not be negative", // Сообщение об ошибке
      },
    },
    total: { type: Number, required: true },
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

const Bond = mongoose.models.Bond || mongoose.model("Bond", bondSchema);

export default Bond;
