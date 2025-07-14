import { NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongoDbConnection";
import Admin from "@/models/user_admin";

export async function GET() {
  try {
    await connectionToDatabase();

    // Only admins with superAdminPrivilege === true
    const superAdmins = await Admin.find({ superAdminPrivilege: true }).sort({ name: 1 });

    return NextResponse.json({ success: true, data: superAdmins });
  } catch (error) {
    console.error("Error fetching super admins:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch super admins" },
      { status: 500 }
    );
  }
}
