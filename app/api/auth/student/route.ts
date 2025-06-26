import connectionToDatabase from "@/lib/mongoDbConnection";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import student from "@/models/user_student";


export async function POST(request: Request) {
  try {
    await connectionToDatabase();

    const { email, password } = await request.json();

    const existingStudent = await student.findOne({ email });

    if (!existingStudent) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingStudent.password
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (err) {
    console.error("An Error Occured", err);
  }
}
