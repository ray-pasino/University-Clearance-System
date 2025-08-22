import { NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongoDbConnection";
import clearance_requests from "@/models/clearance_requests";

export async function GET() {
  try {
    await connectionToDatabase();

    const departmentCounts = await clearance_requests.aggregate([
      { $unwind: "$departments" }, // Deconstruct the departments array
      {
        $group: {
          _id: "$departments.name", // Group by department name
          count: { $sum: 1 } // Count the number of requests per department
        }
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          department: "$_id", // Rename _id to department
          count: 1 // Include the count
        }
      }
    ]);

    return NextResponse.json(
      { departmentCounts },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching department clearance counts:", error);
    return NextResponse.json(
      { error: "Failed to get department clearance counts" },
      { status: 500 }
    );
  }
}
