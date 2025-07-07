import connectionToDatabase from "@/lib/mongoDbConnection"; 
import ClearanceRequest from "@/models/clearance_requests";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectionToDatabase();

    // Count the number of clearance requests with overallStatus "Pending"
    const pendingCount = await ClearanceRequest.countDocuments({
      overallStatus: "Pending",
    });

    return NextResponse.json({ count: pendingCount }, { status: 200 });
  } catch (err) {
    console.error("An error occurred while counting pending requests:", err);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
