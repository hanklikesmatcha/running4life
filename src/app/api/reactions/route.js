import { LRUCache } from "lru-cache";
import dbConnect from "../../../utils/mongoose";
import Reaction from "@/models/reaction";
import Club from "@/models/club";

export const revalidate = 0;

const cache = new LRUCache({
  max: 500, // Maximum number of items in cache
  ttl: 1000 * 60 * 5 // Cache expiry time in milliseconds
});

export async function POST(request) {
  try {
    const { clubId, emoji, userId } = await request.json();
    await dbConnect();

    const cacheKey = `reaction-${clubId}-${userId}`;
    let existingReaction = cache.get(cacheKey);

    if (!existingReaction) {
      // Check if the user has already reacted to the club
      existingReaction = await Reaction.findOne({ clubId, userId });
      cache.set(cacheKey, existingReaction);
    }

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

      // Update the existing reaction with the new emoji
      existingReaction.emoji = emoji;
      await existingReaction.save();

      // Update the club's reactions count for the new emoji
      await Club.findByIdAndUpdate(clubId, {
        $inc: { [`reactions.${emoji}`]: 1 }
      });

      // Update the cache with the new reaction
      cache.set(cacheKey, existingReaction);

      return new Response(
        JSON.stringify({ message: "Reaction updated successfully" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" }
        }
      );
    } else {
      // Create a new reaction
      const newReaction = new Reaction({ clubId, userId, emoji });
      await newReaction.save();

      // Update the club's reactions count
      await Club.findByIdAndUpdate(clubId, {
        $inc: { [`reactions.${emoji}`]: 1 }
      });

      // Cache the new reaction
      cache.set(cacheKey, newReaction);

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
