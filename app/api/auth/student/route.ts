import connectionToDatabase from "@/lib/mongoDbConnection";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import student from "@/models/user_student";

const JWT_SECRET = process.env.JWT_SECRET;


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

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: existingStudent._id,
        email: existingStudent.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" } // Token expires in 7 days
    );

        // Return user data without password
    const { password: _, ...studentData } = existingStudent._doc;

     return NextResponse.json(
      {
        message: "Login successful",
        student: studentData,
        token,
      },
      { status: 200 }
    );

  } catch (err) {
    console.error("An Error Occured", err);
      return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
