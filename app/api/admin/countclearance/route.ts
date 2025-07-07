import { NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongoDbConnection";
import clearance_requests from "@/models/clearance_requests";

export async function GET() {
  try {
    await connectionToDatabase();

    const totalClearanceRequests = await clearance_requests.countDocuments();

    return NextResponse.json(
      { totalClearanceRequests },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching total clearance count:", error);
    return NextResponse.json(
      { error: "Failed to get clearance count" },
      { status: 500 }
    );
  }
}
