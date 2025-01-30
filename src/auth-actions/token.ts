import connectMongoDB from "@/libs/mongodb";
import VerificationToken from "@/models/verification-token";

export async function getVerificationTokenByToken(token: string) {

  await connectMongoDB();


  try {

    const tokenData = await VerificationToken.findOne({ token });
    return tokenData
    
  } catch {
    return null
  }
}

export async function getVerificationTokenByEmail(email: string) {

  await connectMongoDB();


  try {

    const tokenData = await VerificationToken.findOne({ email });
    return tokenData
    
  } catch {
    return null
  }
}