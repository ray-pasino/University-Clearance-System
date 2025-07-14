import { NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongoDbConnection";
import Admin from "@/models/user_admin";

interface Params {
  params: {
    id: string;
  };
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    await connectionToDatabase();

    const deletedAdmin = await Admin.findByIdAndDelete(params.id);

    if (!deletedAdmin) {
      return NextResponse.json(
        { success: false, message: "Admin not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Admin with ID ${params.id} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting admin:", error);
    return NextResponse.json(
      { success: false, message: "Server error while deleting admin" },
      { status: 500 }
    );
  }
}
