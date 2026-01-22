import { Outlet } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";

const Profile = () => {
  return (
    <div className="p-8">
      <PageBreadcrumb pageTitle="Thông tin tài khoản"/>
      <Outlet />
    </div>
  );
};
export default Profile