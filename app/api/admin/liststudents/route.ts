import { NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongoDbConnection";
import Student from "@/models/user_student";

export async function GET() {
  try {
    await connectionToDatabase();
    const students = await Student.find().sort({ name: 1 }); // Optional: sort alphabetically
    return NextResponse.json({ success: true, data: students });
  } catch (error) {
    console.error("Failed to fetch students:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch students" },
      { status: 500 }
    );
  }
}
