import { getToken } from "next-auth/jwt";

export async function GET(request) {
  try {
    // Check NextAuth session
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return Response.json(
        { success: false, message: "Not authenticated" },
        { status: 401 },
      );
    }

    return Response.json({
      success: true,
      message: "Authenticated",
      user: {
        email: token.email,
        name: token.name,
      },
    });
  } catch (error) {
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
