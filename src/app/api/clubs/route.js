import Club from "@/models/club";
import dbConnect from "@/utils/dbConnect";

export const revalidate = 0;
export async function GET(request) {
  try {
    await dbConnect();
    // Fetch the updated clubs
    const clubs = await Club.find().sort({ priority: -1 }).lean();

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
