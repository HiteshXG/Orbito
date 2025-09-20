import HRLeaveManagement from "@/components/management/hr-leave-management"

const LeaveRequestsPage = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Leave Request Management</h1>
        <p className="text-gray-600 mt-2">Review and manage employee leave requests</p>
      </div>

      <HRLeaveManagement />
    </div>
  )
}

export default LeaveRequestsPage;