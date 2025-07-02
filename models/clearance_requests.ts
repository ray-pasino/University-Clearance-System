// models/clearanceRequest.ts
import mongoose from "mongoose";

const departmentClearanceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Declined"],
    default: "Pending",
  },
  updatedAt: { type: Date },
});

const clearanceRequestSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "students", // Must match your actual student model name
    required: true,
  },
  departments: {
    type: [departmentClearanceSchema],
    default: [],
  },
  overallStatus: {
    type: String,
    enum: ["Pending", "Approved", "Declined"],
    default: "Pending",
  },
  requestedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

export default mongoose.models.ClearanceRequest ||
  mongoose.model("ClearanceRequest", clearanceRequestSchema);
