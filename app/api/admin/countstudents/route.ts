import connectionToDatabase from "@/lib/mongoDbConnection"; 
import student from "@/models/user_student";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectionToDatabase();

    // Count the total number of students
    const count = await student.countDocuments();

    return NextResponse.json({ count }, { status: 200 });
  } catch (err) {
    console.error("An error occurred while counting students:", err);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
