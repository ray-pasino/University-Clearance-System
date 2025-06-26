import connectionToDatabase from "@/lib/mongoDbConnection";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import admin from "@/models/user_admin";

export async function POST(request: Request) {
  try {
    await connectionToDatabase();

    const { name, email, department, superAdminPrivilege, password } = await request.json();
    // hashing password before storing in database

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new admin({
      name,
      email,
      department,
      superAdminPrivilege,
      password: hashedPassword,
    });

    await newAdmin.save();
    return NextResponse.json(newAdmin, { status: 201 });
  } catch (err) {
    console.error("An error occured in POST /api/admin", err);
    return NextResponse.json({ error: "An Error Occured" }, { status: 500 });
  }
}
