
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import LeaveRequestList from "@/components/lists/leave-request-list"

const MyLeavePage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Leave Requests</h1>
          <p className="text-gray-600 mt-2">Manage your time off and track leave balance</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/my-leave/new">
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Link>
        </Button>
      </div>

      <LeaveRequestList />
    </div>
  )
}

export default MyLeavePage