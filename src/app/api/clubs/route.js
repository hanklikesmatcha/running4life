import Club from "@/models/club";
import Photo from "@/models/photo";
import dbConnect from "@/utils/dbConnect";

export const revalidate = 0;

export async function GET(request) {
  try {
    await dbConnect();

    // Aggregate clubs and their associated photos
    const clubs = await Club.aggregate([
      {
        $lookup: {
          from: "photos", // Collection name in MongoDB
          localField: "_id",
          foreignField: "club",
          as: "photos"
        }
      },
      {
        $sort: { priority: -1 }
      }
    ]);

    if (clubs.length === 0) {
      console.log("No clubs found after update");
    }

    return new Response(JSON.stringify(clubs), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
