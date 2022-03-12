import React from "react";
import WidgetsOptions from "./WidgetsOptions";
import "../css/Widget.css";
function Widget() {
  return (
    <div className="widget">
      <div className="widget__header">
        <h4>Spaces To Follow</h4>
      </div>
      <WidgetsOptions />
    </div>
  );
}

export default Widget;
