

import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";

export async function getUserByEmail(email: string) {
  await connectMongoDB();

  try {
    console.log("USER:", User);

    const user = await User.findOne({ email });
    return user;
  } catch (error: any) {

    return new Response(JSON.stringify({ message: "User not found", error: error.message }), { status: 500 });
  }
};