import Layout from "../layout/Layout";
import ClientLogin from "../page/Auth";
import EmployeesPage from "../page/Employee";
import AttendanceList from "../page/Employee/AttendanceList";
import EmployeesList from "../page/Employee/EmployeesList";
import HomePage from "../page/Home";
import PayrollList from "../page/Employee/PayrollList";
import Profile from "../page/UserProfile";
import UserProfile from "../page/UserProfile/UserProfile";
import ProtectedRoute from "./ProtectedRoute";

export const router = [
  //Login - Ko cần bảo mật
  {
    path: "/login",
    element: <ClientLogin />,
  },

  // Protected Routes - Cần đăng nhập mới vào được
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "employees",
            element: <EmployeesPage />,
            children: [
              {
                index: true,
                element: <EmployeesList />,
              },
              {
                path: "attendance",
                element: <AttendanceList />,
              },
              {
                path: "payroll",
                element: <PayrollList />,
              },
            ],
          },
          {
            path: "user-profile",
            element: <Profile />,
            children: [
              {
                index: true,
                element: <UserProfile />,
              },
            ],
          },
        ],
      },
    ],
  },
];
