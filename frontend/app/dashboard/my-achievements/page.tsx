import AchievementsList from "@/components/lists/achievements-list"

const MyAchievementsPage = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Achievements</h1>
        <p className="text-gray-600 mt-2">View your recognition, awards, and performance milestones</p>
      </div>

      <AchievementsList />
    </div>
  )
}

export default MyAchievementsPage