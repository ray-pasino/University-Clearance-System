import mongoose, { Schema, Document } from "mongoose";

interface IAlumni extends Document {
  name: string;
  dob?: Date;
  gender?: string;
  email: string;
  country?: string;
  programme: string;
  category?: string;
  intakeYear: string;
  gradYear: string;
}

const alumniSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    dob: { type: Date },
    gender: { type: String },
    email: { type: String, required: true },
    country: { type: String },
    programme: { type: String, required: true },
    category: { type: String },
    intakeYear: { type: String, required: true },
    gradYear: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Alumni || mongoose.model<IAlumni>("Alumni", alumniSchema);
