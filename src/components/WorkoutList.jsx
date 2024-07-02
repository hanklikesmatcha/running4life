import ClubCard from "./ClubCard";

const WorkoutList = ({
  activeTab,
  setActiveTab,
  clubs,
  handleReactionClick
}) => {
  return (
    <div className="relative min-h-screen w-full">
      <div className="sticky top-0 z-10 bg-gradient-to-r from-pink-200 to-purple-400 pb-2 pt-4">
        <div className="flex justify-center">
          <div role="tablist" className="tabs-boxed tabs">
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
      </div>
      <div className="flex w-full flex-col items-center">
        {activeTab === "Runs" ? (
          <div className="flex min-h-[calc(100vh-120px)] w-full flex-col items-center gap-6 px-8 pb-10 pt-6 md:px-0">
            {clubs && clubs.length > 0 ? (
              clubs.map((club, index) => (
                <ClubCard
                  key={index}
                  club={club}
                  handleReaction={handleReactionClick}
                />
              ))
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-xl text-gray-600">
                  No runs available at the moment.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-[calc(100vh-120px)] w-full flex-col items-center justify-center px-8 md:px-0">
            <div className="mt-[-50vh]">
              <h2 className="animate-rainbow text-2xl font-bold">
                Coming Soon...✊
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutList;
