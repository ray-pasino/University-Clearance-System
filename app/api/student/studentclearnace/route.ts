import { NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongoDbConnection";
import clearance_requests from "@/models/clearance_requests";
import student from "@/models/user_student";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  await connectionToDatabase();

  const token = request.headers.get("authorization")?.split(" ")[1];
  const JWT_SECRET = process.env.JWT_SECRET!;
  if (!token) return NextResponse.json({ error: "No token" }, { status: 401 });

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

    // Check if the student already made a clearance request
    let existingRequest = await clearance_requests.findOne({ studentId });

    if (existingRequest) {
      const deptIndex = existingRequest.departments.findIndex(
        (d: any) => d.name === department
      );

      if (deptIndex !== -1) {
        const currentStatus = existingRequest.departments[deptIndex].status;

        if (currentStatus === "Not Requested") {
          // ✅ Update status from "Not Requested" to "Pending"
          existingRequest.departments[deptIndex].status = "Pending";
          existingRequest.departments[deptIndex].updatedAt = new Date();
        } else {
          // If already requested and not "Not Requested", do not allow duplicate
          return NextResponse.json(
            {
              message: `You have already requested clearance from ${department}.`,
            },
            { status: 400 }
          );
        }
      } else {
        // ✅ New department being added
        existingRequest.departments.push({
          name: department,
          status: "Pending",
        });
      }

      existingRequest.overallStatus = "Pending";
      existingRequest.updatedAt = new Date();
      await existingRequest.save();
    } else {
      // ✅ Create new clearance request
      const newRequest = new clearance_requests({
        studentId,
        departments: [{ name: department, status: "Pending" }],
        overallStatus: "Pending",
      });
      await newRequest.save();
    }

    // Update student clearance status
    await student.findByIdAndUpdate(studentId, {
      clearaneStatus: "In Progress...",
    });

    return NextResponse.json(
      { message: `Clearance request sent to ${department}` },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Invalid token or server error" },
      { status: 500 }
    );
  }
}
