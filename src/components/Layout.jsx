import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("sidebarCollapsed") === "true";
  });

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);

  const collapsedWidth = 64;   
  const expandedWidth = window.innerWidth <= 640
    ? window.innerWidth * 0.6  
    : 256;                     

  return (
    <div className="min-h-screen bg-gray-50">
      

      <div className="flex pt-16">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        <main
          className="transition-all duration-300 flex-1 p-4"
          style={{
            marginLeft: collapsed ? collapsedWidth : expandedWidth,
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
