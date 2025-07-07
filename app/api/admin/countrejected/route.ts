import connectionToDatabase from "@/lib/mongoDbConnection"; // Adjust the import path as necessary
import ClearanceRequest from "@/models/clearance_requests"; // Adjust the import path as necessary
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectionToDatabase();

    // Count the number of clearance requests with overallStatus "Declined"
    const rejectedCount = await ClearanceRequest.countDocuments({
      overallStatus: "Declined",
    });

    return NextResponse.json({ count: rejectedCount }, { status: 200 });
  } catch (err) {
    console.error("An error occurred while counting rejected requests:", err);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
