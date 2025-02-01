import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongodb-client";
import connectMongoDB from "@/libs/mongodb";
// import User from "@/models/user";
import { getUserById, getUserByEmail } from "./services/UserService";

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
      connectMongoDB();
      const ProviderUser = await getUserById(user.id);
      ProviderUser.emailVerified = new Date();
      await ProviderUser.save();

    }
  },
  callbacks: {

    // async signIn({ user, account }) {
    // await connectMongoDB();

    //Allow OAuth without email verification
    // if (account?.provider !== "credentials") return true;

    // const existingUser = await getUserByEmail(user.email);


    //Prevent sign in if email is not verified
    // if(!existingUser?.emailVerified) return false

    //TODO: check if email is verified


    //   return true;
    // },


    async session({ session }) {
      const user = await getUserByEmail(session.user.email);
      session.user.id = user._id;
      return session;
    },
  },




  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  ...authConfig
})

