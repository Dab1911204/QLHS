import Layout from "../layout/Layout";
import ClientLogin from "../page/Auth";
import DocumentsPage from "../page/Documents";
import DocumentsList from "../page/Documents/DocumentsList";
import EmployeesPage from "../page/Employee";
import AttendanceList from "../page/Employee/AttendanceList";
import EmployeesList from "../page/Employee/EmployeesList";
import HomePage from "../page/Home";
import PayrollList from "../page/Employee/PayrollList";

export const router = [

  {
    path: "/",
    element: <Layout />,
    children:[
      {
        index:true,
        element:<HomePage/>
      },
      {
        path: "documents",
        element: <DocumentsPage />,
        children: [
          {
            index: true,
            element: <DocumentsList />,
          },
        ]
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
          }
        ]
      }
    ]
  },

  //Login
  {
    path: "/login",
    element:<ClientLogin/>,
  }

];
