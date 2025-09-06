import authApi from "@/apiRequest/auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
        },
        password: {
          type: "password",
          label: "Password",
        },
        type: {
          type: "text",
          label: "Type",
        },
        device_token: {
          type: "text",
          label: "Device Token",
        },
        info: {
          label: "Info",
        },
      },
      authorize: async (credentials) => {
        try {
          const user = await authApi.login({
            email: credentials.email as string,
            password: credentials.password as string,
            type: credentials.type as string,
            device_token: credentials.device_token as string,
            info: JSON.parse(credentials.info as string),
          });
          if (!user) {
            throw new Error("Invalid credentials.");
          }

          return user;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  cookies: {
    sessionToken: {
      // name: `__Host-next-auth.session-token`,
      // options: {
      //   // httpOnly: true,
      //   sameSite: "lax",
      //   path: "/",
      //   secure: process.env.NODE_ENV === "production",
      // },
    },
  },
  session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60 },
  callbacks: {
    jwt: async ({ token, user }: { token: any; user: any }) => {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token as any;
      return session;
    },
  },
});
