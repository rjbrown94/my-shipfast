import mongoose, { Schema } from "mongoose";

const DisputeSchema = new Schema(
  {
    userEmail: { type: String, required: true, index: true },

    title: { type: String, required: true },
    clientName: { type: String, default: "" },

    // Store as string (YYYY-MM-DD) so no cast errors
    incidentDate: { type: String, default: "" },

    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.models.Dispute ||
  mongoose.model("Dispute", DisputeSchema);
