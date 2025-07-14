import { NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongoDbConnection";
import Alumni from "@/models/alumni";

export async function POST(request: Request) {
  await connectionToDatabase();

  try {
    const {
      name,
      dob,
      gender,
      email,
      country,
      programme,
      category,
      intakeYear,
      gradYear,
    } = await request.json();

    if (!name || !email || !programme || !intakeYear || !gradYear) {
      return NextResponse.json(
        { error: "Please fill all required fields." },
        { status: 400 }
      );
    }

    const existing = await Alumni.findOne({ email, programme, gradYear });
    if (existing) {
      return NextResponse.json(
        { error: "Alumni already registered with this email/programme." },
        { status: 409 }
      );
    }

    const alumni = new Alumni({
      name,
      dob,
      gender,
      email,
      country,
      programme,
      category,
      intakeYear,
      gradYear,
    });

    await alumni.save();

    return NextResponse.json(
      { message: "Alumni registered successfully." },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error registering alumni:", err);
    return NextResponse.json(
      { error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }
}
