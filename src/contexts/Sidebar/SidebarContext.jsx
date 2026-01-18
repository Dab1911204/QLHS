import { createContext, useContext } from "react";

export const SidebarContext = createContext(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === null) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
