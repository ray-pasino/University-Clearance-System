import connectionToDatabase from "@/lib/mongoDbConnection";
import { NextResponse } from "next/server";
import clearance_requests from "@/models/clearance_requests";
import student from "@/models/user_student";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  await connectionToDatabase();

  const token = request.headers.get("authorization")?.split(" ")[1];
  const JWT_SECRET = process.env.JWT_SECRET!;

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const studentId = decoded.id;

    const { department } = await request.json(); // e.g. { department: "Finance" }

    if (!department) {
      return NextResponse.json(
        { error: "Department is required" },
        { status: 400 }
      );
    }

    const clearance = await clearance_requests.findOne({ studentId });

    if (!clearance) {
      return NextResponse.json(
        { error: "No clearance request found" },
        { status: 404 }
      );
    }

    const deptIndex = clearance.departments.findIndex(
      (d: any) => d.name === department
    );

    if (deptIndex === -1) {
      return NextResponse.json(
        { error: `No clearance request for department ${department}` },
        { status: 404 }
      );
    }

    // ✅ Change the department's status to "Not Requested"
    clearance.departments[deptIndex].status = "Not Requested";
    clearance.departments[deptIndex].updatedAt = new Date();

    // ✅ Check if all departments are now "Not Requested"
    const allNotRequested = clearance.departments.every(
      (d: any) => d.status === "Not Requested"
    );

    if (allNotRequested) {
      clearance.overallStatus = "Pending";

      // ✅ Update the student's clearance status
      await student.findByIdAndUpdate(studentId, {
        clearanceStatus: "Not Requested",
      });
    } else {
      // ✅ If at least one department still has a request in progress, you can set it differently if needed
      await student.findByIdAndUpdate(studentId, {
        clearanceStatus: "In Progress...",
      });
    }

    clearance.updatedAt = new Date();
    await clearance.save();

    return NextResponse.json(
      { message: `Clearance request for ${department} cancelled.` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying token or cancelling clearance:", error);
    return NextResponse.json(
      { error: "Invalid token or server error" },
      { status: 500 }
    );
  }
}
