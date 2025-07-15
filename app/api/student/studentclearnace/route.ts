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

    const { department } = await request.json();

    if (!department) {
      return NextResponse.json(
        { error: "Department is required" },
        { status: 400 }
      );
    }

    // Define the strict order of departments
    const departmentOrder = [
      "Finance",
      "Library",
      "Faculty",
      "Head of Alumni Relations",
      "Head of Departments",
      "Dean of Student Affairs",
    ];

    const requestedIndex = departmentOrder.indexOf(department);

    if (requestedIndex === -1) {
      return NextResponse.json(
        { error: "Invalid department name." },
        { status: 400 }
      );
    }

    let existingRequest = await clearance_requests.findOne({ studentId });

    if (existingRequest) {
      // Ensure departments are in correct order
      for (let i = 0; i < requestedIndex; i++) {
        const prevDept = departmentOrder[i];
        const prevDeptData = existingRequest.departments.find(
          (d: any) => d.name === prevDept
        );

        if (!prevDeptData || prevDeptData.status !== "Approved") {
          return NextResponse.json(
            {
              error: `You must complete clearance for ${prevDept} before proceeding to ${department}.`,
            },
            { status: 400 }
          );
        }
      }

      const deptIndex = existingRequest.departments.findIndex(
        (d: any) => d.name === department
      );

      if (deptIndex !== -1) {
        const currentStatus = existingRequest.departments[deptIndex].status;

        if (currentStatus === "Not Requested") {
          existingRequest.departments[deptIndex].status = "Pending";
          existingRequest.departments[deptIndex].updatedAt = new Date();
        } else {
          return NextResponse.json(
            {
              message: `You have already requested clearance from ${department}.`,
            },
            { status: 400 }
          );
        }
      } else {
        existingRequest.departments.push({
          name: department,
          status: "Pending",
          updatedAt: new Date(),
        });
      }

      existingRequest.updatedAt = new Date();
      await existingRequest.save();
    } else {
      // Enforce that only the first department can be requested initially
      if (requestedIndex !== 0) {
        return NextResponse.json(
          {
            error: `You must start clearance from ${departmentOrder[0]}.`,
          },
          { status: 400 }
        );
      }

      const newRequest = new clearance_requests({
        studentId,
        departments: [{ name: department, status: "Pending" }],
        overallStatus: "Pending",
      });

      await newRequest.save();
    }

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

