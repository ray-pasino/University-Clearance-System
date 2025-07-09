import connectionToDatabase from "@/lib/mongoDbConnection";
import ClearanceRequest from "@/models/clearance_requests";
import Student from "@/models/user_student"; 
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectionToDatabase();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Build query object based on parameters
    const query: any = {};

    // Optional filters
    const studentId = searchParams.get("studentId");
    const overallStatus = searchParams.get("overallStatus");
    const departmentName = searchParams.get("departmentName");
    const departmentStatus = searchParams.get("departmentStatus");

    if (studentId) {
      query.studentId = studentId;
    }
    if (overallStatus) {
      query.overallStatus = overallStatus;
    }
    if (departmentName) {
      query["departments.name"] = departmentName;
    }
    if (departmentStatus) {
      query["departments.status"] = departmentStatus;
    }

    // Get clearance requests with pagination
    const clearanceRequests = await ClearanceRequest.find(query)
      .skip(skip)
      .limit(limit)
      .populate({
        path: "studentId",
        model: "students", // Change this to match the registered model name
        select: "name regNo department", // Adjust fields as needed
      })
      .sort({ updatedAt: -1 });

    // Get total count for pagination info
    const total = await ClearanceRequest.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: clearanceRequests,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("Error in GET /api/clearanceRequest:", err);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
