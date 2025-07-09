import connectionToDatabase from "@/lib/mongoDbConnection";
import ClearanceRequest from "@/models/clearance_requests";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  await connectionToDatabase();

  const token = request.headers.get("authorization")?.split(" ")[1];
  const JWT_SECRET = process.env.JWT_SECRET!;

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      role: string;
    };

    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { requestId, department } = await request.json();

    if (!requestId || !department) {
      return NextResponse.json(
        { error: "Request ID and department are required" },
        { status: 400 }
      );
    }

    const clearanceRequest = await ClearanceRequest.findById(requestId);

    if (!clearanceRequest) {
      return NextResponse.json(
        { error: "Clearance request not found" },
        { status: 404 }
      );
    }

    const deptIndex = clearanceRequest.departments.findIndex(
      (d: any) => d.name === department
    );

    if (deptIndex === -1) {
      return NextResponse.json(
        { error: `No clearance request for department ${department}` },
        { status: 404 }
      );
    }

    // 🔴 Update department status to Declined
    clearanceRequest.departments[deptIndex].status = "Declined";
    clearanceRequest.departments[deptIndex].updatedAt = new Date();

    // If any department is declined, overall status becomes Declined
    const anyDeclined = clearanceRequest.departments.some(
      (d: any) => d.status === "Declined"
    );

    clearanceRequest.overallStatus = anyDeclined ? "Declined" : "Pending";
    clearanceRequest.updatedAt = new Date();

    await clearanceRequest.save();

    return NextResponse.json(
      { message: `Clearance request for ${department} has been declined.` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin clearance rejection error:", error);
    return NextResponse.json(
      { error: "Invalid token or server error" },
      { status: 500 }
    );
  }
}
