import authApi from "@/apiRequest/auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";

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
        fullName: {
          label: "Full Name",
          type: "text",
        },
        typeAuth: {
          label: "Type Auth",
          type: "text",
        },
      },
      authorize: async (credentials) => {
        let user = null;
        try {
          if (credentials?.typeAuth === "register") {
            user = await authApi.register({
              fullName: credentials.fullName as string,
              email: credentials.email as string,
              password: credentials.password as string,
              type: credentials.type as string,
              device_token: credentials.device_token as string,
              info: JSON.parse(credentials.info as string),
            });
          } else {
            user = await authApi.login({
              email: credentials.email as string,
              password: credentials.password as string,
              type: credentials.type as string,
              device_token: credentials.device_token as string,
              info: JSON.parse(credentials.info as string),
            });
          }
          if (!user) {
            throw new Error("Invalid credentials.");
          }

          return user;
        } catch (error) {
          console.error("err",error)
          throw error;
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
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
  session: { strategy: "jwt", maxAge: 10 * 365 * 24 * 60 * 60 }, //10 years
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
    signIn: async ({ user, account }) => {
      try {
        

        if (account?.provider === "google" && account.id_token) {
          const cookieStore = cookies();
          const device = JSON.parse(cookieStore.get("device")?.value || "");
          const res = await authApi.loginWithGoogle({
            ...device,
            token: account.id_token,
          });
          if (res) {
            Object.assign(user, res);
            return true;
          }
          return false;
        }
        return true;
      } catch (error) {
        console.log("error", error);
        return false;
      }
    },
  },
});
