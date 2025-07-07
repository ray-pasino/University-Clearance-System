import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  faculty: { type: String },
  department: { type: String },
  programme: { type: String },
  level: { type: Number },
  session: { type: String },
  indexNumber: { type: Number },
  campus: { type: String },
  mobileNumber: { type: String },
  cohort: { type: String },
  clearaneStatus: { type: String },
  password: { type: String },
});

const student =
  mongoose.models.students || mongoose.model("students", studentSchema);

export default student;
