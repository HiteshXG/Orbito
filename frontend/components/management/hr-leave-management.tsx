"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge, Calendar, CheckCircle, Clock, Filter, Mail, Search, User, XCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

interface LeaveRequest {
  id: string
  leave_type: string
  start_date: string
  end_date: string
  days_requested: number
  reason: string
  status: string
  created_at: string
  approved_at: string
  employee: {
    first_name: string
    last_name: string
    email: string
    department: string
    position: string
  }
  approver: {
    first_name: string
    last_name: string
  } | null
}

const HRLeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<LeaveRequest[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchLeaveRequests()
  }, [])

  useEffect(() => {
    filterRequests()
  }, [leaveRequests, searchTerm, statusFilter, typeFilter])

  const fetchLeaveRequests = async () => {
    try{
      const response = await fetch("/api/leave-requests/all")
      if(!response.ok) throw new Error("Failed to fetch leave requests")

        const data = await response.json()
        setLeaveRequests(data.leaveRequests || [])
    } catch (error: any) {
      toast(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const filterRequests = () => {
    let filtered = leaveRequests

    if (searchTerm) {
      filtered = filtered.filter(
        (request) => 
          request.employee.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.employee.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.employee.department.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((request) => request.status === statusFilter)
    }

    if(typeFilter !== "all") {
      filtered = filtered.filter((request) => request.leave_type === typeFilter)
    }

    setFilteredRequests(filtered)
  }

  const handleStatusUpdate = async (requestId: string, newStatus: "approved" | "rejected") => {
    setProcessingIds((prev) => new Set(prev).add(requestId))

    try {
      const response = await fetch(`/api/leave-requests/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) throw new Error("Failed to update leave request")

      const data = await response.json()

      setLeaveRequests((prev) =>
        prev.map((request) => (request.id === requestId ? { ...request, ...data.leaveRequest } : request)),
      )

      toast(`Leave request ${newStatus} successfully.`)
    } catch (error: any) {
      toast(error.message)
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(requestId)
        return newSet
      })
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

  const getLeaveTypeBadgeColor = (type: string) => {
    switch (type) {
      case "vacation":
        return "bg-blue-100 text-blue-800"
      case "sick":
        return "bg-orange-100 text-orange-800"
      case "personal":
        return "bg-purple-100 text-purple-800"
      case "maternity":
      case "paternity":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatLeaveType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1).replace("_", " ")
  }

  const pendingCount = leaveRequests.filter((req) => req.status === "pending").length
  const approvedCount = leaveRequests.filter((req) => req.status === "approved").length
  const rejectedCount = leaveRequests.filter((req) => req.status === "rejected").length

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return(
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-800">{leaveRequests.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-gray-400"/>
              </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Leave Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Employee</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Leave Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="vacation">Vacation</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="maternity">Maternity</SelectItem>
                  <SelectItem value="paternity">Paternity</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Results</label>
              <div className="text-sm text-gray-600 py-2">
                {filteredRequests.length} of {leaveRequests.length} requests
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <h3 className="text-lg font-semibold text-gray-800">
                        {request.employee.first_name} {request.employee.last_name}
                      </h3>
                    </div>
                    <Badge className={getStatusBadgeColor(request.status)}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>
                    <Badge className={getLeaveTypeBadgeColor(request.leave_type)}>
                      {formatLeaveType(request.leave_type)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <Mail className="h-4 w-4" />
                        {request.employee.email}
                      </div>
                      <div className="text-sm text-gray-600">
                        {request.employee.position} • {request.employee.department}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">
                        <strong>Duration:</strong> {new Date(request.start_date).toLocaleDateString()} -{" "}
                        {new Date(request.end_date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Days:</strong> {request.days_requested}
                      </div>
                    </div>
                  </div>

                  {request.reason && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-600">
                        <strong>Reason:</strong> {request.reason}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Submitted: {new Date(request.created_at).toLocaleDateString()}</span>
                    {request.approved_at && request.approver && (
                      <span>
                        {request.status === "approved" ? "Approved" : "Rejected"} by {request.approver.first_name}{" "}
                        {request.approver.last_name} on {new Date(request.approved_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {request.status === "pending" && (
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                      onClick={() => handleStatusUpdate(request.id, "rejected")}
                      disabled={processingIds.has(request.id)}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleStatusUpdate(request.id, "approved")}
                      disabled={processingIds.has(request.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No leave requests found</h3>
              <p className="text-sm">Try adjusting your filters or check back later for new requests.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default HRLeaveManagement;