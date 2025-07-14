import { NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongoDbConnection";
import Alumni from "@/models/alumni";

interface Params {
  params: {
    id: string;
  };
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    await connectionToDatabase();

    const alumni = await Alumni.findByIdAndDelete(params.id);

    if (!alumni) {
      return NextResponse.json(
        { success: false, message: "Alumni not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Alumni with ID ${params.id} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting alumni:", error);
    return NextResponse.json(
      { success: false, message: "Server error while deleting alumni" },
      { status: 500 }
    );
  }
}
