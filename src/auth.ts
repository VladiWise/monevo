import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongodb-client";
import connectMongoDB from "@/libs/mongodb";
// import User from "@/models/user";
import { getUserByEmail } from "./services/UserService";
import { getUserById } from "./services/UserService";
import api from "@/libs/fetch";

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

  // events: {
  //   async linkAccount({ user }) {
  //     connectMongoDB();
  //     const   = await getUserById(user.id);
  //     ProviderUser.emailVerified = new Date();
  //     await ProviderUser.save();

  //   }
  // },
  callbacks: {



    async session({ session, token }) {

      const user = await getUserByEmail(session.user.email);

      if (!user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        return session;
      }

      session.user.id = user._id;

      return session;
    },
  },




  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  ...authConfig
})

