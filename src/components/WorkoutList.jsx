import React from "react";
import ClubCard from "./ClubCard";

const WorkoutList = ({
  activeTab,
  setActiveTab,
  clubs,
  handleReactionClick
}) => {
  return (
    <div className="relative mt-[-80px] flex min-h-[600px] w-full flex-col items-center md:mt-[-20px]">
      <div className="absolute top-0 z-10 flex w-full justify-center">
        <div role="tablist" className="tabs-boxed tabs mb-6">
          <button
            className={`tab ${activeTab === "Runs" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("Runs")}>
            Runs
          </button>
          <button
            className={`tab ${activeTab === "Workouts" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("Workouts")}>
            Workouts
          </button>
        </div>
      </div>
      <div className="flex w-full flex-col items-center pt-20">
        {activeTab === "Runs" ? (
          <div className="flex min-h-[400px] w-full flex-col items-center gap-6 px-8 pb-10 md:px-0">
            {clubs?.map((club, index) => (
              <ClubCard
                key={index}
                club={club}
                handleReaction={handleReactionClick}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[400px] w-full flex-col items-center gap-6 px-8 pb-10 md:px-0">
            <h2 className="animate-rainbow text-2xl font-bold">
              Coming Soon...✊
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutList;
