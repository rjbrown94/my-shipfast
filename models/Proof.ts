import mongoose, { Schema, models, model } from "mongoose";

const ProofSchema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Proof = models.Proof || model("Proof", ProofSchema);

export default Proof;
