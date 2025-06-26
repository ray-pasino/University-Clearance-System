import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    department:{type:String},
    superAdminPrivilege:{type:Boolean},
    password:{type:String}
})

const admin =  mongoose.models.adminSchema || mongoose.model("admin", adminSchema)

export default admin