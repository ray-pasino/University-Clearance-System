import { NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongoDbConnection";
import Alumni from "@/models/alumni";

export async function GET() {
  try {
    await connectionToDatabase();
    const alumniList = await Alumni.find().sort({ createdAt: -1 }); // Newest first
    return NextResponse.json({ success: true, data: alumniList });
  } catch (error) {
    console.error("Error fetching alumni:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch alumni" },
      { status: 500 }
    );
  }
}
