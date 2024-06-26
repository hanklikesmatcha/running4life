import mongoose from "mongoose";

const ReactionSchema = new mongoose.Schema(
  {
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
      index: true  // Add index here
    },
    userId: {
      type: String,
      required: true,
      index: true  // Add index here
    },
    emoji: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.models.Reaction ||
  mongoose.model("Reaction", ReactionSchema);
