import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema(
  {
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true
    },
    url: {
      type: String,
      required: true
    },
    description: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.models.Photo || mongoose.model("Photo", PhotoSchema);
