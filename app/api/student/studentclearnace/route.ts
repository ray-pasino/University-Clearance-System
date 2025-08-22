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

    // Define the strict order of departments
    const departmentOrder = [
      "Finance",
      "Library",
      "Faculty",
      "Head of Departments",
      "Dean of Student Affairs",
      "Head of Alumni Relations"
    ];

    let existingRequest = await clearance_requests.findOne({ studentId });

    if (existingRequest) {
      // Check if all departments are already requested
      const allDepartmentsRequested = departmentOrder.every(dept => {
        const deptData = existingRequest.departments.find((d: any) => d.name === dept);
        return deptData && deptData.status !== "Not Requested";
      });

      if (allDepartmentsRequested) {
        return NextResponse.json(
          {
            message: "Clearance requests have already been sent to all departments.",
          },
          { status: 400 }
        );
      }

      // Update all departments that haven't been requested yet
      let hasNewRequests = false;
      
      for (const department of departmentOrder) {
        const deptIndex = existingRequest.departments.findIndex(
          (d: any) => d.name === department
        );

        if (deptIndex === -1) {
          // Department doesn't exist in the request, add it as Pending
          existingRequest.departments.push({
            name: department,
            status: "Pending",
            updatedAt: new Date(),
          });
          hasNewRequests = true;
        } else if (existingRequest.departments[deptIndex].status === "Not Requested") {
          // Department exists but not requested yet, update to Pending
          existingRequest.departments[deptIndex].status = "Pending";
          existingRequest.departments[deptIndex].updatedAt = new Date();
          hasNewRequests = true;
        }
        // If department is already requested (Pending/Approved/Declined), leave it as is
      }

      if (!hasNewRequests) {
        return NextResponse.json(
          {
            message: "No new departments to request clearance from.",
          },
          { status: 400 }
        );
      }

      existingRequest.updatedAt = new Date();
      await existingRequest.save();
    } else {
      // Create new request with all departments set to Pending
      const departments = departmentOrder.map(dept => ({
        name: dept,
        status: "Pending",
        updatedAt: new Date(),
      }));

      const newRequest = new clearance_requests({
        studentId,
        departments,
        overallStatus: "Pending",
      });

      await newRequest.save();
    }

    await student.findByIdAndUpdate(studentId, {
      clearaneStatus: "In Progress...",
    });

    return NextResponse.json(
      { message: "Clearance requests sent to all departments successfully" },
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

