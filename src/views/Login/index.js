import React from "react";
import { ContainerStyle } from "./styled";
import { requestHeaders, requestFetch } from "service/request";
import { notificationAlert } from "index";
import { notify } from "utils/notification";
import { Navigate } from "react-router-dom";

function Login() {
  const dataRef = React.useRef({});
  const [isSignin, setSignin] = React.useState(false);
  const onLogin = () => {
    requestFetch("post", "/user/sign-in", {
      username: dataRef.current.username,
      password: dataRef.current.password,
    }).then((res) => {
      console.log(res, "res");
      if (res.code != 200) {
        notify(res.message, "danger");
      } else {
        requestHeaders.authorization = "Bearer " + res.data.token;
        notify("Đăng nhập thành công");
        setSignin(true);
      }
    });
  };

  return (
    <ContainerStyle className="wrapper wrapper-full-page">
      {isSignin && <Navigate to="/admin/dashboard" replace={true} />}
      <div className="full-page section-image" filter-color="yellow">
        <div className="content">
          <div className="login-page">
            <div className="container">
              <div className="ml-auto mr-auto col-12 col-md-8 col-lg-4">
                <form className="">
                  <div className="card-login card-plain card">
                    <div className="card-header">
                      <div className="logo-container">
                        <img src="" alt="now-logo" />
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="no-border form-control-lg  input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="now-ui-icons users_circle-08" />
                          </span>
                        </div>
                        <input
                          placeholder="Username..."
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            dataRef.current.username = e.target.value;
                          }}
                        />
                      </div>
                      <div className="no-border form-control-lg  input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="now-ui-icons text_caps-small" />
                          </span>
                        </div>
                        <input
                          placeholder="Password..."
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            dataRef.current.password = e.target.value;
                          }}
                        />
                      </div>
                    </div>
                    <div className="card-footer" onClick={onLogin}>
                      <a
                        href="#pablo"
                        className="mb-3 btn-round btn btn-primary btn-lg btn-block"
                      >
                        Login
                      </a>
                      {/* <div className="pull-left">
                        <h6>
                          <a href="#pablo" className="link footer-link">
                            Create Account
                          </a>
                        </h6>
                      </div>
                      <div className="pull-right">
                        <h6>
                          <a href="#pablo" className="link footer-link">
                            Need Help?
                          </a>
                        </h6>
                      </div> */}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="full-page-background" />
        <footer className="footer"></footer>
      </div>
    </ContainerStyle>
  );
}

export default Login;
