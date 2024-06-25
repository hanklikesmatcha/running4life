import dbConnect from "@/utils/dbConnect";
import Reaction from "@/models/reaction";
import Club from "@/models/club";

export async function POST(request) {
  try {
    const { clubId, emoji, userId } = await request.json();
    await dbConnect();

    // Check if the user has already reacted to the club
    const existingReaction = await Reaction.findOne({ clubId, userId });

    if (existingReaction) {
      // If the reaction is the same, do nothing
      if (existingReaction.emoji === emoji) {
        return new Response(
          JSON.stringify({
            message: "You've already reacted to this club with the same emoji"
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" }
          }
        );
      }

      // Update the club's reactions count for the old emoji
      await Club.findByIdAndUpdate(clubId, {
        $inc: { [`reactions.${existingReaction.emoji}`]: -1 }
      });

      // Update the existing reaction
      existingReaction.emoji = emoji;
      await existingReaction.save();

      // Update the club's reactions count for the new emoji
      await Club.findByIdAndUpdate(clubId, {
        $inc: { [`reactions.${emoji}`]: 1 }
      });

      return new Response(
        JSON.stringify({ message: "Reaction updated successfully" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" }
        }
      );
    } else {
      // Create a new reaction
      const reaction = new Reaction({ clubId, userId, emoji });
      await reaction.save();

      // Update the club's reactions count
      await Club.findByIdAndUpdate(clubId, {
        $inc: { [`reactions.${emoji}`]: 1 }
      });

      return new Response(
        JSON.stringify({ message: "Reaction added successfully" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
