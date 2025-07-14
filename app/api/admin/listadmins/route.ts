import { NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongoDbConnection";
import Admin from "@/models/user_admin";
export async function GET() {
  try {
    await connectionToDatabase();
    const admins = await Admin.find().sort({ name: 1 }); // Optional sorting
    return NextResponse.json({ success: true, data: admins });
  } catch (error) {
    console.error("Error fetching admins:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch admins" },
      { status: 500 }
    );
  }
}
