import Club from "@/models/club";
import dbConnect from "@/utils/dbConnect";

export const revalidate = 0;

const getWeekdayOrder = (today) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const index = days.indexOf(today);
  return [...days.slice(index), ...days.slice(0, index)];
};

const convertToShortDay = (fullDay) => {
  const daysMap = {
    Sunday: "Sun",
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat"
  };
  return daysMap[fullDay] || fullDay;
};

const sortByWeekdays = (clubs) => {
  const today = new Date().toLocaleString("en-US", { weekday: "long" });
  const shortToday = convertToShortDay(today);
  const weekdayOrder = getWeekdayOrder(shortToday);

  return clubs.sort((a, b) => {
    const aWeekday = a.time.split(",")[0].trim();
    const bWeekday = b.time.split(",")[0].trim();

    // Move '-' entries to the bottom
    if (aWeekday === "-") return 1;
    if (bWeekday === "-") return -1;
    return weekdayOrder.indexOf(aWeekday) - weekdayOrder.indexOf(bWeekday);
  });
};

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
    // Sort clubs by weekdays
    const sortedClubs = sortByWeekdays(clubs);

    return new Response(JSON.stringify(sortedClubs), {
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
