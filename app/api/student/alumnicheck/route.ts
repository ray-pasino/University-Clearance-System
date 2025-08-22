import { NextResponse } from "next/server";
import Alumni from "@/models/alumni";
import connectionToDatabase from "@/lib/mongoDbConnection";

export async function GET(request: Request) {
  await connectionToDatabase();

  try {
    // Get the email from the query parameters
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    // Check if the alumni exists with the provided email
    const alumni = await Alumni.findOne({ email });

    if (alumni) {
      return NextResponse.json(
        { message: "Alumni found.", alumni: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Alumni not found.", alumni: false },
        { status: 404 }
      );
    }
  } catch (err) {
    console.error("Error checking alumni status:", err);
    return NextResponse.json(
      { error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }
}
