import mongoose from "mongoose"

const WasteListingSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    title: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    quantityUnit: String,
    frequency: { type: String, enum: ["once", "weekly", "monthly", "annual"], default: "once" },
    location: {
      city: String,
      state: String,
      country: String,
    },
    priceType: { type: String, enum: ["free", "negotiable", "fixed"], default: "negotiable" },
    priceValue: Number,
    photos: [String],
    embedding: [Number],
    status: { type: String, enum: ["active", "inactive", "sold"], default: "active" },
    expiresAt: Date,
  },
  { timestamps: true },
)

export default mongoose.models.WasteListing || mongoose.model("WasteListing", WasteListingSchema)
