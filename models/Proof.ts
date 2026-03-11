import mongoose, { Schema, model, models } from "mongoose";

const ProofSchema = new Schema(
  {
    userEmail: { type: String, required: true, index: true },
    disputeId: { type: String, required: true, index: true }, // ✅ ADD THIS
    proofType: { type: String, required: true },
    note: { type: String, default: "" },
    url: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, default: "" },
    size: { type: Number, required: true },
  },
  { timestamps: true },
);

export default models.Proof || model("Proof", ProofSchema);
