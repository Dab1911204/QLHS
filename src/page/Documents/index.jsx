import { Outlet } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";

const DocumentsPage = () => {
  return (
    <div className="p-8">
      <PageBreadcrumb pageTitle="Quản lý hồ sơ"/>
      <Outlet />
    </div>
  );
};
export default DocumentsPage