import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongodb-client";
import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  events: {
    async linkAccount({ user }) {
      await connectMongoDB();

      const ProviderUser = await User.findById(user.id);
      ProviderUser.emailVerified = new Date();
      await ProviderUser.save();

    }
  },
  callbacks: {

    async session({ session }) {
      await connectMongoDB();
      const user = await User.findOne({ email: session.user.email });
      session.user.id = user._id;
      return session;
    },
  },




  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  ...authConfig
})

