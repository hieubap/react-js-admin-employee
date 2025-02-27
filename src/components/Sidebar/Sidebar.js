/*eslint-disable*/
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "logo-white.svg";
import useAuth from "hooks/useAuth";
import dashRoutes from "routes";

var ps;

function Sidebar(props) {
  const sidebar = React.useRef();
  const location = useLocation();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  const { authData } = useAuth();
  console.log(authData, "authData===");
  return (
    <div className="sidebar" data-color={props.backgroundColor}>
      <div className="logo">
        {/* <span className="simple-text logo-mini" target="_blank">
          <div className="logo-img">
            <img src={logo} alt="react-logo" />
          </div>
        </span> */}
        <div
          className="simple-text logo-normal"
          target="_blank"
          style={{ textAlign: "center" }}
        >
          Quản lý hệ thống
        </div>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {dashRoutes
            .filter((item) => {
              // console.log(item.roles, "item", authData);
              return (
                !item.roles?.length ||
                item.roles?.some((r) => authData?.roles?.includes(r))
              );
            })
            .map((prop, key) => {
              if (prop.redirect) return null;
              return (
                <li
                  className={
                    activeRoute(prop.layout + prop.path) +
                    (prop.pro ? " active active-pro" : "")
                  }
                  key={key}
                >
                  <NavLink to={prop.layout + prop.path} className="nav-link">
                    <i className={"now-ui-icons " + prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
