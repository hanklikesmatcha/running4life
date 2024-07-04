/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
// @ts-nocheck

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import clientPromise from "./utils/mongodb";

const { NODE_ENV } = process.env;

const DB_URL =
  NODE_ENV === "development" ? "running4life" : "running4life-test";

const providers = [Google];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  session: { strategy: "jwt" },
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/signin"
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user, account }) {
      const client = await clientPromise;
      const db = client.db(DB_URL);

      // Link accounts if the email matches
      if (account && user) {
        const dbUser = await db
          .collection("users")
          .findOne({ email: user.email });
        if (dbUser) {
          token.id = dbUser._id;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.image = dbUser.image;
        } else {
          token.id = user.id;
          token.name = user.name;
          token.email = user.email;
          token.image = user.image;
        }
      } else if (token.id) {
        // Fetch user data if token exists
        const dbUser = await db.collection("users").findOne({ _id: token.id });
        if (dbUser) {
          token.id = dbUser._id;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.image = dbUser.image;
        }
      }
      return token;
    },
    async session({ session, token }) {
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

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});
