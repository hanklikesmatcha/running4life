import dbConnect from "@/utils/mongoose";
import Club from "@/models/club";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const club = await Club.findById(params.id);

    return new Response(JSON.stringify(club), {
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
