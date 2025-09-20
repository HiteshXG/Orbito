import  HRAchievementManagement from "@/components/management/hr-achievement-management"

const AchievementsPage = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Achievement Management</h1>
        <p className="text-gray-600 mt-2">Manage employee achievements, awards, and recognition</p>
      </div>

      <HRAchievementManagement />
    </div>
  )
}

export default AchievementsPage