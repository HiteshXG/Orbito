"use client"

import { AlertCircle, Badge, Calendar, CheckCircle, Clock, FileText, Mail, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"

const ProcessGuide = () => {
  const processes = [
    {
      id: 1,
      title: "Annual Performance Review",
      description: "Complete your self-assessment and prepare for manager review",
      deadline: "2025-01-15",
      status: "pending",
      priority: "high",
      steps: [
        "Complete self-assessment form",
        "Gather supporting documentation",
        "Schedule review meeting with manager",
        "Attend performance review meeting",
      ],
      hrContact: "Sarah Johnson",
      hrEmail: "sarah.johnson@company.com",
    },
    {
      id: 2,
      title: "Benefits Enrollment",
      description: "Review and update your benefits selections for the new year",
      deadline: "2025-02-28",
      status: "not_started",
      priority: "medium",
      steps: [
        "Review current benefits package",
        "Compare available options",
        "Make selections in HR portal",
        "Submit enrollment form",
      ],
      hrContact: "Sarah Johnson",
      hrEmail: "sarah.johnson@company.com",
    },
    {
      id: 3,
      title: "Security Training Completion",
      description: "Complete mandatory cybersecurity awareness training",
      deadline: "2025-01-30",
      status: "in_progress",
      priority: "high",
      steps: [
        "Access training portal",
        "Complete all modules",
        "Pass final assessment",
        "Submit completion certificate",
      ],
      hrContact: "IT Security Team",
      hrEmail: "security@company.com",
    },
    {
      id: 4,
      title: "Team Building Event",
      description: "Participate in quarterly team building activities",
      deadline: "2025-03-15",
      status: "upcoming",
      priority: "low",
      steps: [
        "RSVP for event",
        "Complete activity preferences survey",
        "Attend team building session",
        "Provide feedback",
      ],
      hrContact: "Events Team",
      hrEmail: "events@company.com",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "in_progress":
        return <Clock className="h-5 w-5 text-blue-600" />
      case "pending":
        return <AlertCircle className="h-5 w-5 text-orange-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-green-100 text-green-800"
    }
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return(
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            Process Guide & Important Timelines
          </CardTitle>
          <CardDescription>
            Stay on top of important HR processes, deadlines, and company events. Your assigned HR contacts are listed
            for each process.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        {processes.map((process) => {
          const daysUntil = getDaysUntilDeadline(process.deadline)
          const isOverdue = daysUntil < 0
          const isUrgent = daysUntil <= 7 && daysUntil >= 0

          return (
            <Card key={process.id} className={`${isOverdue ? "border-red-200" : isUrgent ? "border-orange-200" : ""}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(process.status)}
                    <div>
                      <CardTitle className="text-lg">{process.title}</CardTitle>
                      <CardDescription>{process.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityBadgeColor(process.priority)}>
                      {process.priority.charAt(0).toUpperCase() + process.priority.slice(1)}
                    </Badge>
                    <Badge className={getStatusBadgeColor(process.status)}>
                      {process.status.replace("_", " ").charAt(0).toUpperCase() +
                        process.status.replace("_", " ").slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium">Deadline</span>
                    </div>
                    <p
                      className={`text-sm ${isOverdue ? "text-red-600" : isUrgent ? "text-orange-600" : "text-gray-600"}`}
                    >
                      {new Date(process.deadline).toLocaleDateString()}
                      {isOverdue && " (Overdue)"}
                      {isUrgent && !isOverdue && ` (${daysUntil} days left)`}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium">HR Contact</span>
                    </div>
                    <p className="text-sm text-gray-600">{process.hrContact}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Mail className="h-3 w-3 text-gray-400" />
                      <a href={`mailto:${process.hrEmail}`} className="text-xs text-blue-600 hover:underline">
                        {process.hrEmail}
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-800 mb-2">Process Steps:</h4>
                  <div className="space-y-2">
                    {process.steps.map((step, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    Contact HR
                  </Button>
                  {process.status === "not_started" && <Button size="sm">Start Process</Button>}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default ProcessGuide