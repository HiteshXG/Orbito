"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./ui/sidebar";
import {
  Award,
  Building2,
  Calendar,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  MonitorCog,
  PartyPopper,
  Settings,
  ShieldUser,
  Ticket,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: any;
  userRole: string;
}

const DashboardLayout = ({
  children,
  user,
  userRole,
}: DashboardLayoutProps) => {
  const adminMenuItems = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { title: "User Management", icon: UserPlus, href: "/dashboard/users" },
    { title: "Role Management", icon: ShieldUser, href: "/dashboard/roles" },
    { title: "System Settings", icon: MonitorCog, href: "/dashboard/settings" },
    { title: "All Candidates", icon: Users, href: "/dashboard/candidates" },
    { title: "Interviews", icon: Calendar, href: "/dashboard/interviews" },
    {title: "Leave Request",icon: Ticket,href: "/dashboard/leave-requests"},
    { title: "Achievements", icon: Award, href: "/dashboard/achievements" },
    { title: "Upcoming Events", icon: PartyPopper, href: "/dashboard/calendar" },
  ];

  const hrMenuItems = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    {title: "Job Description", icon: FileText, href: "/dashboard/job-descriptions"},
    { title: "Candidates", icon: Users, href: "/dashboard/candidates" },
    { title: "Interviews", icon: Calendar, href: "/dashboard/interviews" },
    {title: "Leave Request", icon: Ticket, href: "/dashboard/leave-requests"},
    { title: "Achievements", icon: Award, href: "/dashboard/achievements" },
    { title: "Upcoming Events", icon: PartyPopper, href: "/dashboard/calendar" },
  ];

  const employeeMenuItems = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { title: "Leave Requests", icon: Ticket, href: "/dashboard/my-leave" },
    {title: "My Achievements", icon: Award, href: "/dashboard/my-achievements"},
    { title: "Policy Chat", icon: MessageSquare, href: "/dashboard/policy-chat"},
    { title: "Process Guide", icon: FileText, href: "/dashboard/process-guide",},
    { title: "Upcoming Events", icon: PartyPopper, href: "/dashboard/calendar" },
  ];
  userRole = "admin";
  const menuItems =
    userRole === "admin"
      ? adminMenuItems
      : userRole === "hr"
      ? hrMenuItems
      : employeeMenuItems;

  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="bg-zinc-900 p-2 rounded-lg">
              {/* ToDo Replace this icon with orbito logo */}
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Orbito</h2>
              <p className="text-sm text-gray-600 capitalize">
                {userRole} Portal
              </p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* todo add menu items here */}
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className="flex items-center gap-2"
                      >
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              {/* <form action={() => {}}>
                <SidebarMenuButton asChild>
                  <button
                    type="submit"
                    className="w-full flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </SidebarMenuButton>
              </form> */}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2 flex-1">
            <h1 className="text-xl font-semibold text-gray-800">
              Empower Your {userRole} Operation with Orbito
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Welcome, {userRole}</span>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
