import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/demo.css";
import "./assets/scss/now-ui-dashboard.scss";

import AdminLayout from "./layouts/Admin";
import PublicLayout from "./layouts/Public";

import NotificationAlert from "react-notification-alert";

const root = ReactDOM.createRoot(document.getElementById("root"));
export const notificationAlert = React.createRef();
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/p/*" element={<PublicLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="*" element={<Navigate to="/p/login" replace />} />
      </Routes>
      <NotificationAlert ref={notificationAlert} />
    </BrowserRouter>
  );
};
root.render(<App />);
