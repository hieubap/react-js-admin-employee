import React from "react";
import { ContainerStyle } from "./styled";
import { requestHeaders, requestFetch } from "service/request";
import { notificationAlert } from "index";
import { notify } from "utils/notification";
import { Navigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import ModalLeaveForm from "views/LeaveForm/Modal";

function Login() {
  const dataRef = React.useRef({});
  const [isSignin, setSignin] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const { saveAuthData } = useAuth();
  const onLogin = () => {
    requestFetch("post", "/account/sign-in", {
      username: dataRef.current.username,
      password: dataRef.current.password,
      router: "employee",
    }).then((res) => {
      console.log(res, "res");
      if (res.code != 200) {
        notify(res.message, "danger");
      } else {
        requestHeaders.authorization = "Bearer " + res.data.token;
        saveAuthData(res.data);
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
                      {/* <div className="logo-container">
                        <img src="" alt="now-logo" />
                      </div> */}
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
                          type="password"
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
                    </div>
                  </div>
                </form>
                <div className="pull-left">
                  <h6>
                    <span
                      href="#pablo"
                      className="link footer-link"
                      style={{ color: "white" }}
                    >
                      Bạn có thể viết đơn xin nghỉ phép
                    </span>
                  </h6>
                </div>
                <div className="pull-right">
                  <h6>
                    <div
                      className="link footer-link"
                      style={{ color: "#fa7a50", cursor: "pointer" }}
                      onClick={() => {
                        setVisible(true);
                      }}
                    >
                      Tại đây
                    </div>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="full-page-background" />
        <footer className="footer"></footer>
      </div>
      <ModalLeaveForm
        visible={visible}
        setVisible={(visible) => setVisible(false)}
      />
    </ContainerStyle>
  );
}

export default Login;
