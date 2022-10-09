import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async session({ session, token }) {
      // Send properties to the client, like an user id from a provider.
      session.userId = token.sub;
      return session;
    },
  },
});
