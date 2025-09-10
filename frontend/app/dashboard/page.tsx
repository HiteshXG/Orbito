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