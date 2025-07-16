import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    return saved === "true";
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);

  useEffect(() => {
    const closeOnRouteChange = () => {
      if (window.innerWidth < 640) setMobileOpen(false);
    };
    window.addEventListener("popstate", closeOnRouteChange);
    return () => window.removeEventListener("popstate", closeOnRouteChange);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar onMobileMenuToggle={() => setMobileOpen(!mobileOpen)} />
      <div className="flex pt-16">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <main
          className="transition-all duration-300 px-4 sm:px-6 pb-6 w-full"
          style={{
            marginLeft: mobileOpen ? 0 : collapsed ? "4rem" : "16rem",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
