import React, { createRef, useEffect, useState } from "react";
import { requestHeaders } from "service/request";

export const dataRef = createRef();
function useAuth() {
  const [authData, setAuthData] = useState(dataRef.current);
  if (!dataRef.current) {
    dataRef.current = {};
  }

  useEffect(() => {
    console.log(dataRef.current, "dataRef.current");
    if (dataRef.current?.inited) return;
    const str = localStorage.getItem("employee-auth");

    if (str) {
      dataRef.current = JSON.parse(str) || {};
      dataRef.current.inited = true;
      requestHeaders.authorization = "Bearer " + dataRef.current?.token;
      setAuthData(dataRef.current);
    }
  }, []);

  const saveAuthData = (data) => {
    dataRef.current = data;
    localStorage.setItem("employee-auth", JSON.stringify(data));
  };

  return {
    authData,
    saveAuthData,
  };
}

export default useAuth;
