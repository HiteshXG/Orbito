import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import LeaveRequestForm from "@/components/forms/leave-request-form"

const NewLeaveRequestPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/my-leave">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Leave Requests
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">New Leave Request</h1>
          <p className="text-gray-600 mt-2">Submit a new time off request for approval</p>
        </div>
      </div>

      <LeaveRequestForm />
    </div>
  )
}

export default NewLeaveRequestPage;