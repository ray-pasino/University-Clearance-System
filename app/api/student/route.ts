import connectionToDatabase from "@/lib/mongoDbConnection";
import student from "@/models/user_student";
import { NextResponse } from "next/server";

export async function POST() {
    try{
        await connectionToDatabase()
        return NextResponse.json("connection succesful", {status:201})
    }catch(err){
        console.log(err, "error connecting to database")
    }
}