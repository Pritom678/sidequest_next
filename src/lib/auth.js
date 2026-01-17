import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials;

          if (!email || !password) {
            console.log("Missing email or password");
            return null;
          }

          // For testing without MongoDB, use hardcoded credentials
          if (process.env.NODE_ENV !== "production") {
            // Test credentials for development
            if (
              email === "admin@sidequest.com" &&
              password === "sidequest123"
            ) {
              console.log("Authentication successful for test user:", email);
              return {
                id: "test-user-id",
                email: email,
                name: "Admin User",
                role: "admin",
              };
            }

            // Test regular user
            if (email === "user@sidequest.com" && password === "user123") {
              console.log("Authentication successful for test user:", email);
              return {
                id: "test-user-id-2",
                email: email,
                name: "Test User",
                role: "user",
              };
            }

            console.log("Invalid test credentials");
            return null;
          }

          // Production: Use MongoDB
          await client.connect();
          const db = client.db(process.env.DB_NAME);

          // Check if user exists in database
          const user = await db.collection("users").findOne({ email });

          if (!user) {
            console.log("User not found:", email);
            return null;
          }

          // Verify password (in production, use bcrypt)
          if (user.password !== password) {
            console.log("Password mismatch for user:", email);
            return null;
          }

          console.log("Authentication successful for user:", email);
          // Return user object for NextAuth session
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role || "user",
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        } finally {
          if (process.env.NODE_ENV === "production") {
            try {
              await client.close();
            } catch (closeError) {
              console.error("Error closing MongoDB connection:", closeError);
            }
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signUp: "/signup",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // Add this to fix custom property error
  trustHost: true,
  // Explicitly set NEXTAUTH_URL for production
  ...(process.env.NODE_ENV === "production" && {
    url: process.env.NEXTAUTH_URL || "https://sidequest-next.vercel.app",
  }),
  // Add cookies configuration for better session persistence
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
