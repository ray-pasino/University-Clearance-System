import connectionToDatabase from "@/lib/mongoDbConnection"; 
import ClearanceRequest from "@/models/clearance_requests"; 
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectionToDatabase();

    // Count the number of clearance requests with overallStatus "Approved"
    const clearedCount = await ClearanceRequest.countDocuments({
      overallStatus: "Approved",
    });

    return NextResponse.json({ count: clearedCount }, { status: 200 });
  } catch (err) {
    console.error("An error occurred while counting cleared students:", err);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
