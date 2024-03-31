import React, { useState } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  Button,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import { thead, tbody } from "variables/general";
import { requestFetch } from "service/request";
import { notify } from "utils/notification";
import { DatePicker } from "reactstrap-date-picker";
import moment from "moment";
import DropdownView from "components/DropdownView";
import RadioView from "components/RadioView";

function ModalManager({ visible, setVisible, onSuccess = () => {}, data }) {
  //   const dataRef = React.useRef({});
  const [state, _setState] = useState({ modalData: {} });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  //   dataRef.current = data ? { ...data } : {};
  //   if (!data) {
  //     dataRef.current = {
  //       fullname: "",
  //     };
  //   }

  React.useEffect(() => {
    // dataRef.current = { ...(data || { fullname: "" }) };
    setState({ modalData: data || {} });
  }, [data]);

  const handleSubmit = () => {
    const data = state.modalData;
    requestFetch(data?._id ? "put" : "post", "/employee/member", data).then(
      (res) => {
        if (res.code == 0) {
          notify("Thêm nhân sự thành công");
          setVisible(false);
          onSuccess();
        } else {
          notify(res.message, "danger");
        }
      }
    );
  };

  const onChange = (key) => (e) => {
    const newData = {
      ...state.modalData,
      [key]: typeof e == "string" ? e : e.target?.value || "",
    };
    // dataRef.current[key] = e.target?.value || e;
    setState({ modalData: newData });
    // console.log(dataRef.current, "dataRef.current", e.target.value);
  };

  return (
    <Modal
      onExit={() => {
        setVisible(false);
      }}
      onClose={() => {
        // dataRef.current = {};
        setVisible(false);
      }}
      isOpen={visible}
    >
      <Card>
        <CardHeader>
          <h5 className="title">Edit Profile</h5>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col md="7">
                <FormGroup>
                  <label>Họ và tên</label>
                  <Input
                    placeholder="Họ và tên"
                    type="text"
                    value={state.modalData.fullname}
                    onChange={onChange("fullname") || ""}
                  />
                </FormGroup>
              </Col>
              <Col md="5">
                <FormGroup>
                  <label>Mã nhân viên</label>
                  <Input
                    placeholder="Last Name"
                    type="text"
                    value={state.modalData.codeMember || ""}
                    onChange={onChange("codeMember")}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="exampleInputEmail1">Email</label>
                  <Input
                    placeholder="Email"
                    type="email"
                    value={state.modalData.email || ""}
                    onChange={onChange("email")}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="exampleInputEmail1">Giới tính</label>
                  <div>
                    <RadioView
                      data={[
                        {
                          title: "Nam",
                          value: 1,
                        },
                        {
                          title: "Nữ",
                          value: 2,
                        },
                      ]}
                      value={state.modalData.gender || 1}
                      onChange={onChange("gender")}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <label>Địa chỉ</label>
                  <Input
                    placeholder="Address"
                    type="text"
                    value={state.modalData.address || ""}
                    onChange={onChange("address")}
                  />
                </FormGroup>
              </Col>
              <Col className="pr-1" md="6">
                <FormGroup>
                  <label>Số điện thoại</label>
                  <Input
                    placeholder="09xxxx"
                    type="text"
                    value={state.modalData.phone || ""}
                    onChange={onChange("phone")}
                  />
                </FormGroup>
              </Col>
              <Col className="pr-1" md="6">
                <FormGroup>
                  <label>Lương thỏa thuận</label>
                  <Input
                    type="number"
                    value={state.modalData.salary || ""}
                    onChange={onChange("salary")}
                  />
                </FormGroup>
              </Col>
              <Col className="pr-1" md="6">
                <FormGroup>
                  <label>Ngày sinh</label>
                  <DatePicker
                    dateFormat="DD/MM/YYYY"
                    value={state.modalData.birth}
                    onChange={onChange("birth")}
                    placeholder={"Chọn hoặc nhập ngày sinh"}
                    // onChange={(payload) => {
                    //   console.log(moment(payload).format("YYYY-MM-DD"), "payload", typeof payload);
                    // }}
                    // defaultValue="Mike"
                    // placeholder="City"
                    // type="text"
                  />
                </FormGroup>
              </Col>
              <Col className="pr-1" md="6">
                <FormGroup>
                  <label>Ngày vào công ty</label>
                  <DatePicker
                    dateFormat="DD/MM/YYYY"
                    value={state.modalData.joinTime}
                    placeholder={"Chọn hoặc nhập ngày"}
                    onChange={onChange("joinTime")}
                  />
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <label>Ghi chú</label>
                  <Input
                    cols="80"
                    placeholder="Ghi chú ..."
                    rows="4"
                    type="textarea"
                    value={state.modalData.note || ""}
                    onChange={onChange("note")}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Button
                color="white"
                style={{ marginLeft: "auto" }}
                onClick={() => {
                  setVisible(!visible);
                }}
              >
                Hủy
              </Button>
              <Button color="primary" onClick={handleSubmit}>
                Lưu
              </Button>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Modal>
  );
}

export default ModalManager;
