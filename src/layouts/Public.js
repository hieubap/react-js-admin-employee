
import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes, { publicRoutes } from "routes.js";

var ps;

function Public(props) {
  const location = useLocation();
  const [backgroundColor, setBackgroundColor] = React.useState("orange");
  // const mainPanel = React.useRef();
  React.useEffect(() => {
    // if (navigator.platform.indexOf("Win") > -1) {
    //   ps = new PerfectScrollbar(mainPanel.current);
    //   document.body.classList.toggle("perfect-scrollbar-on");
    // }
    return function cleanup() {
      // if (navigator.platform.indexOf("Win") > -1) {
      //   ps.destroy();
      //   document.body.classList.toggle("perfect-scrollbar-on");
      // }
    };
  });
  React.useEffect(() => {
    // document.documentElement.scrollTop = 0;
    // document.scrollingElement.scrollTop = 0;
    // mainPanel.current.scrollTop = 0;
  }, [location]);
  const handleColorClick = (color) => {
    setBackgroundColor(color);
  };
  return (
    <div className="wrapper">
      <div>
        <Routes>
          {publicRoutes.map((prop, key) => {
            return (
              <Route
                path={prop.path}
                element={prop.component}
                key={key}
                exact
              />
            );
          })}
          {/* <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          /> */}
        </Routes>
      </div>
    </div>
  );
}

export default Public;
