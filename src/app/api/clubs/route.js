import Club from "@/models/club";
import dbConnect from "@/utils/dbConnect";

export const revalidate = 0;

const parseTime = (timeStr) => {
  const [day, time] = timeStr.split(",").map((str) => str.trim());
  const [hourMinute, period] = time.split(" ");
  let [hour, minute] = hourMinute.split(":").map(Number);

  if (period === "PM" && hour !== 12) {
    hour += 12;
  } else if (period === "AM" && hour === 12) {
    hour = 0;
  }

  return { day, hour, minute };
};

const getWeekdayOrder = (today) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const index = days.indexOf(today);
  return [...days.slice(index), ...days.slice(0, index)];
};

const sortByWeekdays = (clubs) => {
  const today = new Intl.DateTimeFormat("en-NZ", {
    weekday: "short",
    timeZone: "Pacific/Auckland"
  }).format(new Date());
  const weekdayOrder = getWeekdayOrder(today);

  return clubs.sort((a, b) => {
    const aWeekday = a.time.split(",")[0].trim();
    const bWeekday = b.time.split(",")[0].trim();

    // Move '-' entries to the bottom
    if (aWeekday === "-") return 1;
    if (bWeekday === "-") return -1;

    const weekdayComparison =
      weekdayOrder.indexOf(aWeekday) - weekdayOrder.indexOf(bWeekday);
    if (weekdayComparison !== 0) {
      return weekdayComparison;
    }

    // If weekdays are the same, sort by time
    const aTime = parseTime(a.time);
    const bTime = parseTime(b.time);

    return aTime.hour - bTime.hour || aTime.minute - bTime.minute;
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
