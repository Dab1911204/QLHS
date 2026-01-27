import { createContext, useContext } from "react";

export const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
    if (context === null) {
      throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};

