import { MongoDBClient } from "@/db/driver.js"
const sampel = [
    {
      title: "re:movement",
      description: "come move and groove with us!",
      time: "Sun, 6:45 AM",
      location: "Vellenoweth Green, St Heliers",
      distance: "Varies",
      speed: "Varies",
      instagram: "https://instagram.com/re.movementclub",
      size: "M"
    },
    {
      title: "RUN4 | Running Community",
      description: "Running for all fitness levels",
      time: "Sun, 8:50 AM",
      location: "Victorica Park, CBD",
      distance: "5 - 7 km",
      speed: "5 - 7 min/km",
      instagram: "https://instagram.com/run4auckland",
      size: "L"
    },
    {
      title: "445 RUN CLUB NZ",
      description: "445 AM WE MEET. 500 AM WE MOVE.",
      time: "Fri, 4:45 AM",
      location: "Akarana Eatery, Orakei",
      distance: "-",
      speed: "-",
      instagram: "https://instagram.com/445_run_club",
      size: "L"
    },
    {
      title: "Slow Sunday",
      description: "A relaxed, community-oriented running club.",
      date: "Sundays",
      time: "-",
      location: "Various locations in Auckland",
      distance: "Varies",
      speed: "Casual pace",
      instagram: "https://instagram.com/slowsundaysrunclub",
      size: "M"
    },
    {
      title: "Just Another Run Club",
      description: "Auckland based running group",
      time: "Sat, 8:00 AM",
      location: "Auckland Domain, Parnell",
      distance: " 7- 9 & 15 KM",
      speed: "-",
      instagram: "https://instagram.com/justanotherrun.club",
      size: "M"
    },
    {
      title: "NAARC (North Auckland Athletics & Running Club)",
      description: "A club focused on athletics and running in North Auckland.",
      date: "-",
      time: "-",
      location: "North Auckland",
      distance: "Varies",
      speed: "Varies",
      instagram: "-",
      size: "-"
    },
    {
      title: "NARC",
      description: "NOT A RUN CLUB",
      time: "-",
      location: "Varies",
      distance: "Varies",
      speed: "-",
      instagram: "https://instagram.com/runwithnarc",
      size: "L"
    },
    {
      title: "Beer Jerk Run Club",
      description: "🏃🏽A Running Club with a big social side",
      time: "Mon, 5:30 PM",
      location: "Small Gods Taproom, Eden Terrace",
      distance: "-",
      speed: "-",
      instagram: "https://instagram.com/beerjerkrunclub",
      size: "L"
    },
    {
      title: "Grave Runners",
      description: "Grave Runners™",
      time: "Wed, 6:00 PM",
      location: "Silo Park, Auckland CBD",
      distance: "6 KM",
      speed: "-",
      instagram: "https://instagram.com/graverunners",
      size: "L"
    },
    {
      title: "Monday Underground™️💙👟",
      description:
        "Every Monday from the @northcotetavern 7.00pm (NEW TIME: 6.40pm for walkers) 🏃🏽‍♀️🏃🏽‍♂️",
      time: "Monday, 7:00 PM",
      location: "Northcote Tavern, Northcote",
      distance: "-",
      speed: "Casual pace",
      instagram: "https://instagram.com/mondayunderground",
      size: "L"
    },
    {
      title: "Fearless (261 Fearless)",
      description: "Be fearless, be free. Womens only running groups",
      time: "Sat, 9:00 AM",
      location: "Auckland Domain, Parnell",
      distance: "-",
      speed: "Social Pace",
      instagram: "https://instagram.com/261fearlessclubnz",
      size: "S"
    },
    {
      title: "Metrorun",
      description: "A casual Auckland-based running group.",
      time: "Sun, 8:00 AM",
      location: "Various locations in Auckland",
      distance: "Varies",
      speed: "Casual pace",
      instagram: "https://metrorun.nz/app/routes/calendar",
      size: "-"
    }
  ];
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