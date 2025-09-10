"use client";

import { Description } from "@radix-ui/react-dialog";
import { Calendar, Clock, FileText, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

interface HRDashboardProps {
  user: any;
  profile: any;
}

const HRDashboard = ({ user, profile }: HRDashboardProps) => {
  const stats = [
    {
      title: "Active Candidates",
      value: "24",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Open Positions",
      value: "8",
      change: "+2",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Pending Interviews",
      value: "12",
      change: "Today",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Leave Requests",
      value: "6",
      change: "Pending",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const quickActions = [
    {
      title: "Generate Job Desciption",
      description: "Create AI-Powered job descriptions",
      href: "/dashboard/job-descriptions",
      icon: FileText,
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "Screen Resumes",
      description: "AI-Powered candidate screening",
      href: "/dashboard/candidates",
      icon: Users,
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "Schedule Interviews",
      description: "Manage interview scheduling",
      href: "/dashboard/interview",
      icon: Calendar,
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "Review Leave Request",
      description: "Approve or reject employee leave",
      href: "/dashboard/leave-requests",
      icon: Clock,
      color: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Welcome back, {profile?.first_name || "HR Manager"}!
        </h2>
        <p className="text-purple-100">
          Streamlined Processes, Enhanced Insights - Your AI partner in
          optimizing workforce management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Card
              key={action.title}
              className="border-gray-200 hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`p-3 rounded-lg ${action.color}`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {action.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {action.description}
                    </p>
                  </div>
                  <Button asChild className="w-full">
                    <Link href={action.href}>Get Started</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-800">Recent Candidates</CardTitle>
            <CardDescription>
              Latest applications and screenings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">John Doe {i}</p>
                    <p className="text-sm text-gray-600">
                      Software Engineer, ATS Score: 85
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Review
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-800">Upcoming Interviews</CardTitle>
            <CardDescription>
              Scheduled interviews for this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">Jane Smith {i}</p>
                    <p className="text-sm text-gray-800">
                      Tomorrow, 2:00 PM. Conference Room A
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HRDashboard;
