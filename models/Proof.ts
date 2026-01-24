import mongoose, { Schema, model, models } from "mongoose";

const ProofSchema = new Schema(
  {
    userEmail: { type: String, required: true, index: true },
    proofType: { type: String, required: true },
    note: { type: String, default: "" },
    url: { type: String, required: true },
    name: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
  },
  { timestamps: true },
);

export default models.Proof || model("Proof", ProofSchema);
