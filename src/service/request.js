const API_URL = window.location.origin.includes("localhost:3000")
  ? "http://localhost:8800"
  : "http://localhost:8800";
export const FILE_URL = API_URL + "/file/";
export const requestHeaders = {
  authorization: "",
  "Content-Type": "application/json",
};

export const requestFetch = (methodType, url, body, headers) => {
  return new Promise((resolve, reject) => {
    let fetchParam = {
      method: methodType,
      headers: { ...requestHeaders, ...headers },
    };
    if (methodType.toLowerCase() !== "get") {
      fetchParam.body = JSON.stringify(body);
    }
    const clearUrl = url.startsWith("http") ? url : API_URL + url;
    return fetch(clearUrl, fetchParam)
      .then((json) => {
        if (!json.ok) {
          reject(json);
          return;
        }
        return json.json();
      })
      .then(resolve)
      .catch((e) => {
        // window.location.href = "/maintain";
        reject(e);
      });
  });
};

export const uploadFile = (file) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.set("file", file);

    const r = localStorage.getItem("authInfo");
    const token = r ? "Bearer " + JSON.parse(r).token : "";
    fetch(API_URL + "/vape-dong-anh/upload", {
      method: "post",
      headers: {
        // "Content-Type": "application/json",
        Authorization: token,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
};
