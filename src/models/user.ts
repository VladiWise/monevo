import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    // assets: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: ["Fund", "Bond", "Account"],
    //   },
    // ],
  },
  { timestamps: true }
);

// Хэширование пароля перед сохранением
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Метод для проверки пароля
// userSchema.methods.comparePassword = async function (candidatePassword: string) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
