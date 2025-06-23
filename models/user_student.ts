import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name : {type:String},
    email : {type: String},
    faculty : {type: String},
    department: {type: String},
    programme: {type: String},
    level: {type: Number},
    session: {type: String},
    indexNumber: {type: Number},
    campus: {type:String},
    mobileNumber: {type:String},
    cohort : {type:String},
    clearaneStatus: {type:String}


})

const student = mongoose.models.studentSchema || mongoose.model("User",studentSchema )

export default student