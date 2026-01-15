import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Hard-coded credentials
    const VALID_EMAIL = "admin@sidequest.com";
    const VALID_PASSWORD = "sidequest123";

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      const response = Response.json({
        success: true,
        message: "Login successful",
      });

      // Set auth cookie using Set-Cookie header
      response.headers.set(
        "Set-Cookie",
        `auth=true; HttpOnly; Secure=${
          process.env.NODE_ENV === "production"
        }; SameSite=lax; Max-Age=${60 * 60 * 24 * 7}; Path=/`
      );

      return response;
    } else {
      return Response.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
