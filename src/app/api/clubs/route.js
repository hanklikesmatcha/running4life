// @ts-nocheck
import Club from "@/models/club";
import dbConnect from "@/utils/mongoose";
import AWS from "aws-sdk";

export const revalidate = 0;

const parseTime = (timeStr) => {
  const [day, time] = timeStr.split(",").map((str) => str.trim());
  if (day === "-") return { day: "-", hour: 0, minute: 0 }; // Handle missing time

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
  const now = new Date();
  const today = new Intl.DateTimeFormat("en-NZ", {
    weekday: "short",
    timeZone: "Pacific/Auckland"
  }).format(now);

  const weekdayOrder = getWeekdayOrder(today);

  return clubs.sort((a, b) => {
    const aTimeParsed = parseTime(a.time);
    const bTimeParsed = parseTime(b.time);

    // Move '-' entries to the bottom
    if (aTimeParsed.day === "-") return 1;
    if (bTimeParsed.day === "-") return -1;

    const aDate = getNextEventDate(aTimeParsed, weekdayOrder, now);
    const bDate = getNextEventDate(bTimeParsed, weekdayOrder, now);

    return aDate - bDate;
  });
};

const getNextEventDate = (timeParsed, weekdayOrder, now) => {
  const eventDate = new Date(now);
  eventDate.setHours(timeParsed.hour, timeParsed.minute, 0, 0);

  const todayIndex = weekdayOrder.indexOf(
    now.toLocaleDateString("en-NZ", { weekday: "short" })
  );
  const eventDayIndex = weekdayOrder.indexOf(timeParsed.day);

  if (
    eventDayIndex < todayIndex ||
    (eventDayIndex === todayIndex && eventDate <= now)
  ) {
    // Event is in the next week
    eventDate.setDate(eventDate.getDate() + 7 - todayIndex + eventDayIndex);
  } else {
    // Event is later this week
    eventDate.setDate(eventDate.getDate() + eventDayIndex - todayIndex);
  }

  return eventDate;
};

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const getSignedUrl = (key) => {
  const params = {
    Bucket: "running4life-public",
    Key: key,
    Expires: 60 * 60
  };

  return s3.getSignedUrl("getObject", params);
};

export async function GET() {
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

    // const clubsWithSignedUrls = sortedClubs.map((club) => {
    //   club.photos = club.photos.map((photo) => {
    //     photo.url = getSignedUrl(photo.url); // Assuming 'key' is the field that stores the S3 key
    //     return photo;
    //   });
    //   return club;
    // });

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
