import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    refreshTokens: [String],
  },
  { timestamps: true },
)

UserSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next()
  try {
    const salt = await bcrypt.genSalt(10)
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt)
    next()
  } catch (err) {
    next(err as Error)
  }
})

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.passwordHash)
}

export default mongoose.models.User || mongoose.model("User", UserSchema)
