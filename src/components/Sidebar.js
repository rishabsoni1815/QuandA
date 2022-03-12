import React from "react";
import SidebarOptions from "./SidebarOptions";
function Sidebar() {
  const design = {
    marginRight: "10px",
    flex: "0.2",
  };
  return (
    <div style={design}>
      <SidebarOptions />
    </div>
  );
}

export default Sidebar;
