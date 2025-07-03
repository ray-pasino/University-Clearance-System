import { NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongoDbConnection";
import clearance_requests from "@/models/clearance_requests";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  await connectionToDatabase();

  const token = request.headers.get("authorization")?.split(" ")[1];
  const JWT_SECRET = process.env.JWT_SECRET!;
  if (!token) return NextResponse.json({ error: "No token provided" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const studentId = decoded.id;

    // Find the clearance request for the student
    const studentClearance = await clearance_requests.findOne({ studentId });

    if (!studentClearance) {
      return NextResponse.json({ clearanceStatus: null }, { status: 200 });
    }

    // Return department-wise clearance status
    const departments = studentClearance.departments.map((d: any) => ({
      name: d.name,
      status: d.status,
    }));

    const overallStatus = studentClearance.overallStatus;

    return NextResponse.json(
      {
        clearanceStatus: {
          departments,
          overallStatus,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying token or fetching clearance:", error);
    return NextResponse.json(
      { error: "Invalid token or server error" },
      { status: 500 }
    );
  }
}
