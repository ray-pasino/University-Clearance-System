import { NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongoDbConnection";
import Admin from "@/models/user_admin";
import jwt from "jsonwebtoken";

interface Params {
  params: {
    id: string;
  };
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    await connectionToDatabase();

    const token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const JWT_SECRET = process.env.JWT_SECRET as string;
    const decoded: any = jwt.verify(token, JWT_SECRET);

    // Prevent deleting yourself
    if (decoded.id === params.id) {
      return NextResponse.json(
        { success: false, message: "You cannot delete your own super admin account" },
        { status: 403 }
      );
    }

    const adminToDelete = await Admin.findById(params.id);

    if (!adminToDelete) {
      return NextResponse.json(
        { success: false, message: "Super admin not found" },
        { status: 404 }
      );
    }

    if (!adminToDelete.superAdminPrivilege) {
      return NextResponse.json(
        { success: false, message: "Not a super admin" },
        { status: 403 }
      );
    }

    await adminToDelete.deleteOne();

    return NextResponse.json({
      success: true,
      message: `Super admin with ID ${params.id} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting super admin:", error);
    return NextResponse.json(
      { success: false, message: "Server error while deleting super admin" },
      { status: 500 }
    );
  }
}
