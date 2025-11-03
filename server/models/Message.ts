import mongoose from "mongoose"

const MessageSchema = new mongoose.Schema(
  {
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: "Match", required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    attachments: [String],
    readAt: Date,
  },
  { timestamps: true },
)

export default mongoose.models.Message || mongoose.model("Message", MessageSchema)
