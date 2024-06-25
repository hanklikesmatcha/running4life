import mongoose from "mongoose";

const ClubSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    distance: {
      type: String,
      required: true
    },
    speed: {
      type: String,
      required: true
    },
    instagram: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    reactions: {
      type: Map,
      of: Number,
      default: {
        "💛": 0,
        "🏎️": 0,
        "🥵": 0,
        "👫": 0,
        "🏞": 0
      }
    }
  },
  { timestamps: true }
);

export default mongoose.models.Club || mongoose.model("Club", ClubSchema);
