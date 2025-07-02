import { NextResponse } from "next/server";
import student from "@/models/user_student";
import connectionToDatabase from "@/lib/mongoDbConnection";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(request: Request) {
  try {
    await connectionToDatabase();

    // Get token from headers
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    // Verify token
    const decoded: any = jwt.verify(token, JWT_SECRET);

    // Find student by ID and exclude password
    const existingStudent = await student.findById(decoded.id).select("-password");

    if (!existingStudent) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json(existingStudent, { status: 200 });

  } catch (err: any) {
    console.error("An Error Occurred", err);
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
