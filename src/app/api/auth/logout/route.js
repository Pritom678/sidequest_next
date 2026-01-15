import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("auth");

    return Response.json({ success: true, message: "Logout successful" });
  } catch (error) {
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
