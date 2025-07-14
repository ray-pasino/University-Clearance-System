import { NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongoDbConnection";
import Student from "@/models/user_student";

interface Params {
  params: {
    id: string;
  };
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    await connectionToDatabase();

    const student = await Student.findByIdAndDelete(params.id);

    if (!student) {
      return NextResponse.json(
        { success: false, message: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Student with ID ${params.id} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      { success: false, message: "Server error while deleting student" },
      { status: 500 }
    );
  }
}
