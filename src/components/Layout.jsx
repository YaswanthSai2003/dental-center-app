import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(() =>
    localStorage.getItem("sidebarCollapsed") === "true"
  );

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);

  const collapsedWidth = 64;  
  const expandedWidth = 256;  

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      <Topbar />

      <div
        className="flex"
        style={{
          paddingTop: 64,                
          height: "calc(100vh - 64px)",  
        }}
      >
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <main
  className="p-4 overflow-y-auto"
  style={{
    marginLeft: collapsed ? collapsedWidth : expandedWidth,
    height: "calc(100vh - 64px)", 
  }}
>
  {children}
</main>

      </div>
    </div>
  );
};

export default Layout;
