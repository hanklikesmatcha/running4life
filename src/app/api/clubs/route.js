import { MongoDBClient } from "@/db/driver";
export async function GET(request) {

    const client = new MongoDBClient();

  try {
    await client.connect()
    const data = await client.getDb("running4life").collection("club").find().toArray();

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  } finally {
    await client.disconnect();
  }
}