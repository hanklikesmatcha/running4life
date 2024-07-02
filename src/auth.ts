/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
// @ts-nocheck

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import clientPromise from "./utils/mongodb";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  session: { strategy: "jwt" },
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async jwt({ token, user }) {
      const client = await clientPromise;
      const db = client.db("your-database-name");
      const dbUser = await db.collection("users").findOne({ _id: token.id });
      if (!dbUser) {
        token.id = user.id;
        return token;
      }

      return {
        id: dbUser._id,
        name: dbUser.name as string,
        email: dbUser.email,
        image: dbUser.image
      };
    },
    async session({ session, token, user }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
      }
      return session;
    }
  }
});
