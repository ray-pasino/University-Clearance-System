import { NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongoDbConnection";
import clearance_requests from "@/models/clearance_requests";

export async function GET() {
  try {
    await connectionToDatabase();

    const approvedDepartmentCounts = await clearance_requests.aggregate([
      { $unwind: "$departments" }, // Deconstruct the departments array
      {
        $match: {
          "departments.status": "Approved" // Filter for approved departments only
        }
      },
      {
        $group: {
          _id: "$departments.name", // Group by department name
          approvedCount: { $sum: 1 } // Count approved requests per department
        }
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          department: "$_id", // Rename _id to department
          approvedCount: 1 // Include the approved count
        }
      },
      {
        $sort: { department: 1 } // Optional: sort alphabetically by department name
      }
    ]);

    return NextResponse.json(
      { approvedDepartmentCounts },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching approved department counts:", error);
    return NextResponse.json(
      { error: "Failed to get approved department counts" },
      { status: 500 }
    );
  }
}

