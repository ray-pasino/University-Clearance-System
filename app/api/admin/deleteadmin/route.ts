// pages/api/admin/deleteadmin.ts
import { NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongoDbConnection";
import Admin from "@/models/user_admin";

export async function DELETE(request: Request) {
  const { email } = await request.json(); // Get email from request body

  try {
    await connectionToDatabase();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const deletedAdmin = await Admin.findOneAndDelete({ email });

    if (!deletedAdmin) {
      return NextResponse.json(
        { success: false, message: "Admin not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Admin with email ${email} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting admin:", error);
    return NextResponse.json(
      { success: false, message: "Server error while deleting admin" },
      { status: 500 }
    );
  }
}
