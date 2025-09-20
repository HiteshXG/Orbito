import AchievementsList from "@/components/lists/achievements-list";
import AdminDashboard from "@/components/vdashboards/admin-dashboard";
import DashboardLayout from "@/components/dashboard-layout";
import EmployeeDashboard from "@/components/vdashboards/employee-dashboard";
import HRDashboard from "@/components/vdashboards/hr-dashboard";

const DashboardPage = () => {

  return (
    <DashboardLayout user={undefined} userRole="">
      <AchievementsList/>
      {/* <HRDashboard/> */}
      {/* <EmployeeDashboard/> */}
      {/* <AdminDashboard/> */}
    </DashboardLayout>
  )
};

export default DashboardPage;

// import { redirect } from "next/navigation"
// import DashboardLayout from "@/components/dashboard-layout"
// import HRDashboard from "@/components/hr-dashboard"
// import EmployeeDashboard from "@/components/employee-dashboard"
// import AdminDashboard from "@/components/admin-dashboard"
// import { getUser } from "@/lib/get-user"

// export default async function DashboardPage() {
//   const { user } = await getUser()

//   // If no user, redirect to login
//   if (!user) {
//     redirect("/auth/login")
//   }

//   const userRole = user.user_metadata?.role || "employee"

//   return (
//     <DashboardLayout user={user} userRole={userRole}>
//       {userRole === "admin" ? (
//         <AdminDashboard />
//       ) : userRole === "hr" ? (
//         <HRDashboard user={user} profile={{ role: userRole }} />
//       ) : (
//         <EmployeeDashboard user={user} profile={{ role: userRole }} />
//       )}
//     </DashboardLayout>
//   )
// }
