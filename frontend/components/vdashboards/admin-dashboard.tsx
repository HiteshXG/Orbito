"use client";

import {
  Activity,
  AlertTriangle,
  Badge,
  MonitorCog,
  Settings,
  Shield,
  ShieldUser,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const AdminDashboard = () => {
  const systemStats = {
    totalUsers: 156,
    activeUsers: 142,
    pendingApprovals: 8,
    systemHealth: "Excellent",
  };

  const recentActivities = [
    {
      id: 1,
      action: "New user registered",
      user: "jane.smith@gmail.com",
      time: "2 hours ago",
      type: "user",
    },
    {
      id: 2,
      action: "Role updated",
      user: "heisen.berg@gmail.com",
      time: "4 hours ago",
      type: "role",
    },
    {
      id: 3,
      action: "Permission granted",
      user: "jeck.lockley@gmail.com",
      time: "6 hours ago",
      type: "permission",
    },
    {
      id: 4,
      action: "System backup completed",
      user: "System",
      time: "12 hours ago",
      type: "system",
    },
  ];

  const pendingActions = [
    {
      id: 1,
      action: "Review new user registration",
      user: "johnson.johnson@gmail.com",
      priority: "high",
    },
    {
      id: 2,
      action: "Approve role change request",
      user: "lisa.brown@gmail.com",
      priority: "medium",
    },
    {
      id: 3,
      action: "System maintenance scheduled",
      user: "System",
      priority: "low",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Manage users, roles, and system settings
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/dashboard/users/new">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/settings">
              <Settings className="h-4 w-4 mr-2" />
              System Settings
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-zinc-900" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">91% activity rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Actions
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {systemStats.pendingApprovals}
            </div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {systemStats.systemHealth}
            </div>
            <p className="text-xs text-muted-foreground">
              All systems operational
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-zinc-900" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest system and user activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.user}</p>
                  </div>
                  <div className="text-right">
                    {/* Todo create a badge component in folder component */}
                    {/* <Badge variant={activity.type === "system" ? "default" : "secondary"}>{activity.type}</Badge> */}
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4 bg-transparent"
              asChild
            >
              <Link href="/dashboard/activity-log">View All Activities</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Pending Actions
            </CardTitle>
            <CardDescription>Items requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingActions.map((action) => (
                <div
                  key={action.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{action.action}</p>
                    <p className="text-xs text-gray-600">{action.user}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Todo create a badge component in folder component */}
                    {/* <Badge
                      variant={
                        action.priority === "high"
                          ? "destructive"
                          : action.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {action.priority}
                    </Badge> */}
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4 bg-transparent"
              asChild
            >
              <Link href="/dashboard/pending-actions">View All Pending</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-zinc-900" />
            Quick Actions
          </CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
              <Link href="/dashboard/users">
              <Users className="h-6 w-6"/>
              Manage Users
              </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
              <Link href="/dashboard/roles">
              <ShieldUser className="h-6 w-6"/>
              Role Management
              </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
              <Link href="/dashboard/settings">
              <MonitorCog className="h-6 w-6"/>
              System Settings
              </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
              <Link href="/dashboard/reports">
              <TrendingUp className="h-6 w-6"/>
              View Reports
              </Link>
              </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
