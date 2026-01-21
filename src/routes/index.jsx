import Layout from "../layout/Layout";
import ClientLogin from "../page/Auth";
import DocumentsPage from "../page/Documents";
import DocumentsList from "../page/Documents/DocumentsList";
import EmployeesPage from "../page/Employee";
import EmployeesList from "../page/Employee/EmployeesList";
import HomePage from "../page/Home";

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
