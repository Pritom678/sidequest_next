export async function GET(request) {
  try {
    // Get cookies from request headers
    const cookieHeader = request.headers.get("cookie") || "";
    const authCookie = cookieHeader
      .split(";")
      .find((cookie) => cookie.trim().startsWith("auth="))
      ?.split("=")[1];

    if (!authCookie || authCookie !== "true") {
      return Response.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    return Response.json({ success: true, message: "Authenticated" });
  } catch (error) {
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
