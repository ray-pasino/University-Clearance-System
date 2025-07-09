import connectionToDatabase from "@/lib/mongoDbConnection";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import admin from "@/models/user_admin";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: Request) {
  try {
    await connectionToDatabase();

    const { email, password } = await request.json();

    const existingAdmin = await admin.findOne({ email });

    if (!existingAdmin) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingAdmin.password
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

    // ✅ Add the role: 'admin' to the JWT payload
    const token = jwt.sign(
      {
        id: existingAdmin._id,
        email: existingAdmin.email,
        role: "admin", // ✅ This is the fix
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return user data without password
    const { password: _, ...adminData } = existingAdmin._doc;

    return NextResponse.json(
      {
        message: "Login successful",
        admin: adminData,
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
