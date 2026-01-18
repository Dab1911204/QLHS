import Layout from "../layout/Layout";
import DocumentsPage from "../page/Documents";
import DocumentsList from "../page/Documents/DocumentsList";
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
      }
    ]
  },

];
