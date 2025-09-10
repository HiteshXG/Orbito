"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Calendar, Clock } from "lucide-react"
import { Badge } from "../ui/badge"

interface LeaveRequest {
  id: string
  leave_type: string
  start_date: string
  end_date: string
  days_requested: number
  reason: string
  status: string
  created_at: string
}

const LeaveRequestList = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchLeaveRequests()
  }, [])

  const fetchLeaveRequests = async () => {
    try {
      const response = await fetch("/api/leave-requests")
      if(!response.ok) throw new Error("Failed to fetch leave requests")

        const data = await response.json()
        setLeaveRequests(data.leaveRequests || [])
    } catch(error: any){
      toast(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const formatLeaveType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1).replace("_", " ")
  }

  if (isLoading) {
    return(
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600">
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600"/>
          My Leave Requests
        </CardTitle>
      </CardHeader>
      <CardContent>
        {leaveRequests.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50"/>
            <p>No leave requests found</p>
            <p className="text-sm">Submit your first leave request to get started.</p>
          </div>
        ): (
          <div className="space-y-4">
            {leaveRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-800">
                      {formatLeaveType(request.leave_type)}
                    </h3>
                    <Badge className={getStatusBadgeColor(request.status)}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-500">
                    {request.days_requested} days
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <p>
                    {new Date(request.start_date).toLocaleDateString()} - 
                    {" "}
                    {new Date(request.end_date).toLocaleDateString()}
                  </p>
                </div>
                {request.reason && (
                  <div className="text-sm text-gray-600 mb-2">
                    <p className="font-medium">Reason:</p>
                    <p>{request.reason}</p>
                  </div>
                )}
                <div className="text-xs text-gray-500">
                  Submitted: {new Date(request.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default LeaveRequestList