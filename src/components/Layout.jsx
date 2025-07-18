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
      {/* Topbar */}
      <Topbar />

      {/* Main body with Sidebar + Content */}
      <div
        className="flex"
        style={{
          paddingTop: 64, // height of Topbar
          height: "calc(100vh - 64px)",
        }}
      >
        {/* Sidebar with dynamic width */}
        <div
          style={{
            width: collapsed ? collapsedWidth : expandedWidth,
            transition: "width 0.3s ease",
          }}
        >
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>

        {/* Main content area */}
        <main
          className="p-4 overflow-y-auto flex-1"
          style={{
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
