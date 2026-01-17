import { dbConnect } from "@/lib/dbConnect";
import QuestCard from "@/components/quests/QuestCard";

export const metadata = {
  title: "Available Quests - SideQuest",
  description:
    "Browse and discover exciting quests on SideQuest. Choose your next adventure and start earning rewards today.",
  keywords: [
    "quests",
    "adventures",
    "challenges",
    "rewards",
    "gamification",
    "sidequest quests",
  ],
  openGraph: {
    title: "Available Quests - SideQuest",
    description:
      "Discover exciting quests and start your next adventure on SideQuest.",
    type: "website",
  },
};

async function getQuests() {
  try {
    console.log("Fetching quests from database...");
    const db = await dbConnect();
    const quests = await db
      .collection("quests")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    console.log("Found quests:", quests.length);
    if (quests.length > 0) {
      console.log("Sample quest:", quests[0]);
    }
    return quests;
  } catch (error) {
    console.error("Error fetching quests:", error);
    return [];
  }
}

export default async function QuestsPage() {
  const quests = await getQuests();

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-base-200 border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-base-content">
              Available Quests
            </h1>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Choose your next adventure and start earning rewards
            </p>
          </div>
        </div>
      </div>

      {/* Quests Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {quests.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 space-y-4">
            <div className="w-24 h-24 bg-base-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-base-content/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-base-content">
              No Quests Available
            </h2>
            <p className="text-base-content/70 max-w-md mx-auto">
              Check back later for new quests to embark on your adventures!
            </p>
          </div>
        ) : (
          /* Quests Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {quests.map((quest) => (
              <QuestCard key={quest._id || quest.id} quest={quest} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
