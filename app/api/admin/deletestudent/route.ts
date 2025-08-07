// pages/api/admin/deletestudent.ts
import { NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongoDbConnection";
import Student from "@/models/user_student";

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

    const student = await Student.findOneAndDelete({ email });

    if (!student) {
      return NextResponse.json(
        { success: false, message: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Student with email ${email} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      { success: false, message: "Server error while deleting student" },
      { status: 500 }
    );
  }
}
