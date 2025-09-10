"use client";

import {
  Award,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";

interface EmployeeDashboardProps {
  user: any;
  profile: any;
}

const EmployeeDashboard = ({ user, profile }: EmployeeDashboardProps) => {
  const status = [
    {
      title: "Leave Balance",
      value: "18 days",
      change: "Remaining",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Achievements",
      value: "12",
      change: "This year",
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Pending Tasks",
      value: "3",
      change: "Due soon",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Completed",
      value: "24",
      change: "This month",
      icon: CheckCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  ];

  const quickActions = [
    {
      title: "Request Leave",
      description: "Submit a new leave request",
      href: "/dashboard/my-leave/new",
      icon: Calendar,
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "Ask HR Policy",
      description: "Get instant policy answers",
      href: "/dashboard/policy-chat",
      icon: MessageSquare,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "View Process Guide",
      description: "Check important timelines",
      href: "/dashboard/process-guide",
      icon: FileText,
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "My Achievements",
      description: "View your recognition",
      href: "/dashboard/my-achievements",
      icon: Award,
      color: "bg-orange-600 hover:bg-orange-700",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Hello, {profile?.first_name || "Employee"}!
        </h2>
        <p className="text-blue-100">
          Access your HR tools effortlessly. Experience data-driven decisions at
          your fingertips.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {status.map((stat) => (
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
            <CardTitle className="text-gray-800">
              Recent Leave Request
            </CardTitle>
            <CardDescription>Your latest leave applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "Vacation", dates: "Dec 20-24", status: "Approved" },
                { type: "Sick Leave", dates: "Nov 15", status: "Approved" },
                { type: "Personal", dates: "Oct 30", status: "Approved" },
              ].map((leave, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">{leave.type}</p>
                    <p className="text-sm text-gray-600">{leave.dates}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded=full">
                    {leave.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-800">Upcoming Deadlines</CardTitle>
            <CardDescription>Important tasks and timelines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { task: "Annual Performance Review", due: "Jan 15, 2025" },
                { task: "Training Completion", due: "Jan 30, 2025" },
                { task: "Benefits Enrollment", due: "Feb 28, 2025" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">{item.task}</p>
                    <p className="text-sm text-gray-600">Due: {item.due}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
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

export default EmployeeDashboard;
