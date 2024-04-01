const API_URL =
  window.location.origin == "localhost:3000"
    ? "http://14.225.205.222:8800"
    : "http://14.225.205.222:8800";

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
