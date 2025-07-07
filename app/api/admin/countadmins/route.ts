import connectionToDatabase from "@/lib/mongoDbConnection";
import admin from "@/models/user_admin"; // make sure this is the correct path
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectionToDatabase();

    const count = await admin.countDocuments();

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error("Error counting admins:", error);
    return NextResponse.json({ error: "Failed to count admins" }, { status: 500 });
  }
}
