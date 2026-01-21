import { Outlet } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";

const EmployeesPage = () => {
  return (
    <div className="p-8">
      <PageBreadcrumb pageTitle="Quản lý nhân sự"/>
      <Outlet />
    </div>
  );
};
export default EmployeesPage