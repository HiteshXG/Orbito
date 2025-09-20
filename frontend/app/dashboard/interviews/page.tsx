import InterviewManagement from "@/components/management/interview-management"

const InterviewsPage = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Interview Management</h1>
        <p className="text-gray-600 mt-2">Schedule, manage, and track candidate interviews</p>
      </div>

      <InterviewManagement />
    </div>
  )
}
