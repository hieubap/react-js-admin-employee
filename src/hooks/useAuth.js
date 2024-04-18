import moment from "moment";
import { createRef, useEffect, useState } from "react";
import { requestHeaders } from "service/request";

export const dataRef = createRef();
function useAuth() {
  const [authData, setAuthData] = useState(dataRef.current || {});

  useEffect(() => {
    if (dataRef.current?.inited) return;
    const str = localStorage.getItem("employee-auth");

    if (str) {
      dataRef.current = JSON.parse(str) || {};
      dataRef.current.inited = true;
      requestHeaders.authorization = "Bearer " + dataRef.current?.token;
      console.log(dataRef.current, "dataRef.current_str");
      setAuthData({ ...(dataRef.current || {}) });
    }
  }, []);

  const saveAuthData = (data = {}) => {
    dataRef.current = { ...data };
    localStorage.setItem("employee-auth", JSON.stringify(data));
  };

  console.log(authData, "authData_useAuth");
  return {
    authData: authData,
    saveAuthData,
  };
}

export default useAuth;
