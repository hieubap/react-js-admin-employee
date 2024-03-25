import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/TableList";
import Maps from "views/Maps.js";
import Upgrade from "views/Upgrade.js";
import UserPage from "views/UserPage.js";
import Manager from "views/Manager";
import TimeKeeping from "views/TimeKeeping";
import Payroll from "views/Payroll";
import Login from "views/Login";

export const publicRoutes = [
  {
    path: "/login",
    name: "",
    icon: "objects_spaceship",
    component: <Login />,
    layout: "/p",
  },
];

var dashRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Trang chủ",
  //   icon: "design_app",
  //   component: <Dashboard />,
  //   layout: "/admin",
  // },
  {
    path: "/manager",
    name: "Danh sách nhân viên",
    icon: "objects_spaceship",
    component: <Manager />,
    layout: "/admin",
  },
  {
    path: "/check-in",
    name: "Chấm công",
    icon: "objects_spaceship",
    component: <TimeKeeping />,
    layout: "/admin",
  },
  {
    path: "/salary",
    name: "Thống kê lương",
    icon: "objects_spaceship",
    component: <Payroll />,
    layout: "/admin",
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "location_map-big",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "ui-1_bell-53",
  //   component: <Notifications />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "users_single-02",
  //   component: <UserPage />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/extended-tables",
  //   name: "Table List",
  //   icon: "files_paper",
  //   component: <TableList />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "design-2_ruler-pencil",
  //   component: <Typography />,
  //   layout: "/admin",
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "objects_spaceship",
  //   component: <Upgrade />,
  //   layout: "/admin",
  // },
];
export default dashRoutes;
