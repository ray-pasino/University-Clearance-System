import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectionToDatabase from "@/lib/mongoDbConnection";
import Admin from "@/models/user_admin";

// Replace this with your real JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "yoursecretkey";

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
    const existingAdmin = await Admin.findById(decoded.id).select("-password");

    if (!existingAdmin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json(existingAdmin, { status: 200 });

  } catch (err: any) {
    console.error("An Error Occurred", err);
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
