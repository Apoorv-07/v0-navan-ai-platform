import mongoose from "mongoose"

const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    industry: String,
    location: {
      city: String,
      state: String,
      country: String,
    },
    description: String,
    logoUrl: String,
    verificationStatus: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" },
    trustScore: { type: Number, default: 50, min: 0, max: 100 },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
)

export default mongoose.models.Company || mongoose.model("Company", CompanySchema)
