import mongoose, { Schema, models, model } from "mongoose";

const ProofSchema = new Schema(
  {
    userId: { type: String, required: false },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default (models.Proof as mongoose.Model<any>) ||
  model("Proof", ProofSchema);
