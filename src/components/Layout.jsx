// src/components/Layout.jsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <Topbar />

      <div className="flex pt-16">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        <main
          className={`transition-all duration-300 overflow-y-auto px-6 pb-6`}
          style={{
            width: collapsed ? "calc(100% - 4rem)" : "calc(100% - 16rem)",
            marginLeft: collapsed ? "4rem" : "16rem",
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
