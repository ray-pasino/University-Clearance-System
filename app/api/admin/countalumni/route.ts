import { NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongoDbConnection"; // Ensure this connects to your DB
import Alumni from "@/models/alumni"; // Adjust the path if needed

export async function GET() {
  try {
    // Connect to MongoDB
    await connectionToDatabase();

    // Count all alumni documents
    const alumniCount = await Alumni.countDocuments();

    // Return count
    return NextResponse.json({ success: true, count: alumniCount });
  } catch (error) {
    console.error("Error counting alumni:", error);
    return NextResponse.json(
      { success: false, message: "Failed to count alumni." },
      { status: 500 }
    );
  }
}
