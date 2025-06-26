import connectionToDatabase from "@/lib/mongoDbConnection";
import student from "@/models/user_student";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await connectionToDatabase();
    const {
      name,
      email,
      faculty,
      department,
      programme,
      level,
      session,
      indexNumber,
      campus,
      mobileNumber,
      cohort,
      clearanceStatus,
      password,
    } = await request.json();

    // hashing password before storing in database

    const hashedPassword = await bcrypt.hash(password, 10)

    const newStudent = new student({
      name,
      email,
      faculty,
      department,
      programme,
      level,
      session,
      indexNumber,
      campus,
      mobileNumber,
      cohort,
      clearanceStatus,
      password:hashedPassword
    });
    await newStudent.save();
    return NextResponse.json(newStudent, { status: 201 });
  } catch (err) {
    console.error("Error in POST /api/student:", err);
    return NextResponse.json({ error: "An  Error Occured" }, { status: 500 });
  }
}
