import React from "react";
import { Outlet } from "react-router-dom";

const MainBody = () => {
  return (
    <div className="flex-1 h-[100vh] text-gray-700 overflow-y-auto">
      <Outlet />
    </div>
  );
};

export default MainBody;
