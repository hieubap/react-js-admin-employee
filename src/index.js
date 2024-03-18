/*!

=========================================================
* Now UI Dashboard React - v1.5.2
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/now-ui-dashboard.scss";
import "./assets/css/demo.css";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import "antd/dist/antd.css";

import AdminLayout from "./layouts/Admin";
import PublicLayout from "./layouts/Public";

import NotificationAlert from "react-notification-alert";

const root = ReactDOM.createRoot(document.getElementById("root"));
export const notificationAlert = React.createRef();
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/p/*" element={<PublicLayout />} />
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="*" element={<Navigate to="/p/login" replace />} />
    </Routes>
    <NotificationAlert ref={notificationAlert} />
  </BrowserRouter>
);
