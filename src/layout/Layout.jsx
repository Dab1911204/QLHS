import Sidebar from "./Sidebar";
import Header from "./Header";
import { SidebarProvider } from "../contexts/Sidebar/SidebarProvider";
import { Outlet } from "react-router-dom";

function Layout() {

  return (
    <div className="min-h-screen min-w-screen flex">
      <SidebarProvider>
        {/* Sidebar */}
        <Sidebar />

        {/* Main */}
        <main className="flex-1">
          {/* HEADER TRÊN CÙNG */}
          <Header />
          <Outlet/>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default Layout;
