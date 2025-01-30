import { v4 as uuidv4 } from "uuid";
import connectMongoDB from "@/libs/mongodb";
import { getVerificationTokenByEmail } from "@/auth-actions/token";
import VerificationToken from "@/models/verification-token";

export async function generateVerificationToken(email: string) {

  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 60 * 60 * 1000);


  const existingToken = await getVerificationTokenByEmail(email);

  await connectMongoDB();

  if (existingToken) {
    await VerificationToken.findByIdAndDelete(existingToken._id);
  }


  const verificationToken = await VerificationToken.create({ email, token, expires });

  return verificationToken;

}