import connectionToDatabase from "@/lib/mongoDbConnection";
import student from "@/models/user_student";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  await connectionToDatabase();

  const token = request.headers.get("authorization")?.split(" ")[1];
  const JWT_SECRET = process.env.JWT_SECRET as string;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Both current and new passwords are required." },
        { status: 400 }
      );
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const studentData = await student.findById(decoded.id);

    if (!studentData) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(currentPassword, studentData.password);

    if (!isMatch) {
      return NextResponse.json({ message: "Incorrect current password" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    studentData.password = hashedPassword;
    await studentData.save();

    return NextResponse.json({ message: "Password changed successfully" }, { status: 200 });

  } catch (err) {
    console.error("Password change error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
