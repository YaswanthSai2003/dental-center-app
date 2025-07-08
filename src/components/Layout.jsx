import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-50 min-h-screen relative">
      <Topbar />
      <Sidebar />

      <main
        className="ml-64 pt-16 px-6 pb-6 overflow-y-auto"
        style={{ height: "calc(100vh - 64px)" }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
