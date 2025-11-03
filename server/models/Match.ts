import mongoose from "mongoose"

const MatchSchema = new mongoose.Schema(
  {
    wasteListingId: { type: mongoose.Schema.Types.ObjectId, ref: "WasteListing", required: true },
    materialNeedId: { type: mongoose.Schema.Types.ObjectId, ref: "MaterialNeed", required: true },
    matchScore: { type: Number, required: true, min: 0, max: 100 },
    status: { type: String, enum: ["new", "contacted", "negotiating", "completed", "declined"], default: "new" },
    explanation: String,
  },
  { timestamps: true },
)

export default mongoose.models.Match || mongoose.model("Match", MatchSchema)
