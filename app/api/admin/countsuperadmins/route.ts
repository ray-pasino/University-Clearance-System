import connectionToDatabase from "@/lib/mongoDbConnection";
import admin from "@/models/user_admin";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectionToDatabase();

    // Count admin documents where superAdminPrivilege is true
    const superAdminCount = await admin.countDocuments({
      superAdminPrivilege: true
    });

    return NextResponse.json({ count: superAdminCount }, { status: 200 });
    
  } catch (err) {
    console.error("An error occurred while counting superadmins:", err);
    return NextResponse.json(
      { error: "Failed to count superadmins" },
      { status: 500 }
    );
  }
}
