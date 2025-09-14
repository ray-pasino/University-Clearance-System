import { NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongoDbConnection";
import Alumni from "@/models/alumni";
import ClearanceRequest from "@/models/clearance_requests";
import Student from "@/models/user_student";

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

        // Create new alumni record
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

        // Find the student by email (assuming email is unique in Student model)
        const student = await Student.findOne({ email });
        if (!student) {
            // If no student found, you can decide to return error or continue
            console.warn(`No student found with email ${email} to update clearance.`);
        } else {
            // Find clearance request for this student
            const clearanceRequest = await ClearanceRequest.findOne({ studentId: student._id });

            if (clearanceRequest) {
                // Find the "Head of Alumni Relations" department
                const deptIndex = clearanceRequest.departments.findIndex(
                    (d: any) => d.name === "Head of Alumni Relations"
                );

                if (deptIndex !== -1) {
                    clearanceRequest.departments[deptIndex].status = "Approved";
                    clearanceRequest.departments[deptIndex].updatedAt = new Date();
                } else {
                    // If department not found, add it as approved
                    clearanceRequest.departments.push({
                        name: "Head of Alumni Relations",
                        status: "Approved",
                        updatedAt: new Date(),
                    });
                }

                // Recalculate overallStatus based on all departments except "Head of Alumni Relations"
                const allExceptAlumniApproved = clearanceRequest.departments
                    .filter((d: any) => d.name !== "Head of Alumni Relations")
                    .every((d: any) => d.status === "Approved");

                clearanceRequest.overallStatus = allExceptAlumniApproved ? "Approved" : "Pending";

                clearanceRequest.updatedAt = new Date();
                await clearanceRequest.save();
            } else {
                // Optionally create a clearance request with Head of Alumni Relations approved
                // and other departments as Not Requested or Pending

                const departmentOrder = [
                    "Finance",
                    "Library",
                    "Faculty",
                    "Head of Departments",
                    "Dean of Student Affairs",
                    "Head of Alumni Relations",
                ];

                const departments = departmentOrder.map((dept) => ({
                    name: dept,
                    status: dept === "Head of Alumni Relations" ? "Approved" : "Not Requested",
                    updatedAt: dept === "Head of Alumni Relations" ? new Date() : undefined,
                }));

                const newClearanceRequest = new ClearanceRequest({
                    studentId: student._id,
                    departments,
                    overallStatus: "Pending",
                    requestedAt: new Date(),
                    updatedAt: new Date(),
                });

                await newClearanceRequest.save();
            }
        }

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
