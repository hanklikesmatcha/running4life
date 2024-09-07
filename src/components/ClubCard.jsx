import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaInstagram, FaLink } from "react-icons/fa";
import EmojiCounter from "./EmojiCounter";
import Notification from "./Notification";
import { useSession } from "next-auth/react";

const placeholderImage = "/examples/pink-frame.png";

const isInstagramUrl = (url) => {
  return url.includes("instagram.com");
};

const ClubCard = ({ club, handleReaction }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState("error");

  const handleButtonClick = () => {
    if (!session) {
      setNotification("Please sign in to join the team huddle.");
      setNotificationType("error");
      return;
    }
    router.push(`/clubs/${club._id}/huddle`);
  };

  const handleAddCalendar = (club) => {
    const { title, description, time, location } = club;
    if (!title || !description || time === '-' || location === 'Varies') {
      setNotification("Sorry! The run club is missing some information.");
      setNotificationType("error");
      return;
    }
    setNotification("Adding to calendar...");
    // Parse the time string
    const [day, timeStr] = time.split(', ');
    const [hours, minutes] = timeStr.split(':');
    const ampm = minutes.slice(-2);
    const hour = parseInt(hours) + (ampm.toLowerCase() === 'pm' && hours !== '12' ? 12 : 0);
    
    // Create a Date object for the next occurrence of the specified day
    const eventDate = new Date();
    const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const targetDay = daysOfWeek.indexOf(day.toLowerCase().slice(0, 3));
    eventDate.setDate(eventDate.getDate() + (targetDay + 7 - eventDate.getDay()) % 7);
    eventDate.setHours(hour, parseInt(minutes.slice(0, -2)), 0, 0);

    const formatDate = (date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//hacksw/handcal//NONSGML v1.0//EN",
      "BEGIN:VEVENT",
      `DTSTART:${formatDate(eventDate)}`,
      `DTEND:${formatDate(new Date(eventDate.getTime() + 1 * 60 * 60 * 1000))}`,
      `SUMMARY:${title.replace(/,/g, "\\,")}`,
      `DESCRIPTION:${description.replace(/,/g, "\\,")}`,
      `LOCATION:${location.replace(/,/g, "\\,")}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${title.replace(/[^a-z0-9]/gi, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="hover:bg-primary-focus card w-full max-w-4xl bg-base-100 shadow-xl transition-colors duration-300">
      <Notification
        message={notification}
        type={notificationType}
        onClose={() => setNotification("")}
      />
      <div className="card-body p-6">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex items-center justify-between">
            <h2 className="card-title relative inline-block text-secondary-content">
              <span className="shine-text animate-shine">{club.title}</span>
            </h2>
            <a
              href={club.instagram}
              className="text-2xl text-gray-800 hover:text-gray-900 lg:text-4xl"
              target="_blank"
              rel="noopener noreferrer">
              {isInstagramUrl(club.instagram) ? (
                <FaInstagram className="mx-2 text-pink-500" />
              ) : (
                <FaLink className="mx-2 text-purple-400" />
              )}
            </a>
          </div>
          <button
            onClick={() => handleAddCalendar(club)}
            className="btn btn-primary btn-xs mt-2 sm:btn-sm md:mt-0">
            Add to Calendar
          </button>
          {/* <button
            onClick={handleButtonClick}
            className="btn btn-neutral btn-xs mt-2 border-4 border-fuchsia-800 text-rose-300 sm:btn-sm md:mt-0">
            Team Huddle
          </button> */}
        </div>
        <p className="text-accent-content">{club.description}</p>
        <div className="mt-2 border-t pt-2">
          <div className="flex w-full justify-center">
            <table className="table w-full text-sm text-black md:text-base">
              <thead className="bg-red-200">
                <tr>
                  <th className="w-1/6 p-1 md:p-2">Date</th>
                  <th className="w-1/3 p-1 md:p-2">Location</th>
                  <th className="w-1/6 p-1 md:p-2">Distance</th>
                  <th className="w-1/6 p-1 md:p-2">Speed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="w-1/6 p-1 md:p-2">{club.time}</td>
                  <td className="w-1/3 p-1 md:p-2">{club.location}</td>
                  <td className="w-1/6 p-1 md:p-2">{club.distance}</td>
                  <td className="w-1/6 p-1 md:p-2">{club.speed}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="relative mt-2 pt-10">
          <div className="absolute left-0 right-0 top-0 flex animate-rainbow justify-center text-base font-semibold text-zinc-950">
            Vibe
          </div>
          <div className="sm:col-gap-2 grid grid-cols-3 gap-2 md:col-span-4 md:gap-4">
            {Object.entries(club.reactions).map(([emoji, count]) => (
              <EmojiCounter
                key={emoji}
                emoji={emoji}
                count={count}
                onClick={() => handleReaction(club._id, emoji)}
              />
            ))}
          </div>
        </div>
        {club.photos && club.photos.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {club.photos.map((photo, index) => (
              <div
                key={index}
                className="relative w-full overflow-hidden rounded-lg pb-9by16">
                <img
                  src={photo.url || placeholderImage}
                  alt={`Club photo ${index + 1}`}
                  className="absolute h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubCard;
