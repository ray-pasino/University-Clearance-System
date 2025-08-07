// pages/api/admin/deletealumni.ts
import { NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongoDbConnection";
import Alumni from "@/models/alumni";

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

    const alumni = await Alumni.findOneAndDelete({ email });

    if (!alumni) {
      return NextResponse.json(
        { success: false, message: "Alumni not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Alumni with email ${email} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting alumni:", error);
    return NextResponse.json(
      { success: false, message: "Server error while deleting alumni" },
      { status: 500 }
    );
  }
}
