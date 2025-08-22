import { NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongoDbConnection";
import Alumni from "@/models/alumni";

export async function GET(request: Request) {
  await connectionToDatabase();

  try {
    const alumni = await Alumni.find(); // Fetch all alumni records

    return NextResponse.json(alumni, { status: 200 });
  } catch (err) {
    console.error("Error fetching alumni:", err);
    return NextResponse.json(
      { error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }
}
