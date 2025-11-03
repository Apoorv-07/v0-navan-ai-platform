import mongoose from "mongoose"

const MaterialNeedSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    title: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    quantityNeeded: { type: Number, required: true },
    quantityUnit: String,
    location: {
      city: String,
      state: String,
      country: String,
    },
    budgetRange: {
      min: Number,
      max: Number,
    },
    specifications: String,
    embedding: [Number],
    status: { type: String, enum: ["active", "inactive", "fulfilled"], default: "active" },
    savedSearch: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export default mongoose.models.MaterialNeed || mongoose.model("MaterialNeed", MaterialNeedSchema)
