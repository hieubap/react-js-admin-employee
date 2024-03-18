import React, { useState } from "react";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  Row,
} from "reactstrap";

import RadioView from "components/RadioView";
import { DatePicker } from "reactstrap-date-picker";
import { requestFetch } from "service/request";
import { notify } from "utils/notification";
import { TimePicker } from "antd";
import moment from "moment";

function ModalChecking({
  visible,
  setVisible,
  onSuccess = () => {},
  focusData,
  data,
}) {
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

  console.log(data, "focusData");
  const handleSubmit = () => {
    const body = { ...(state.modalData || {}) };
    body.userId = focusData._id;
    body.dateKey = data.dateKey;
    requestFetch(body._id ? "put" : "post", "/employee/checking", body).then(
      (res) => {
        if (res.code == 0) {
          notify("Chấm công thành công");
          setVisible(false);
          onSuccess();
        } else {
          notify(res.message, "danger");
        }
      }
    );
  };

  const onChange = (key) => (e) => {
    console.log(e, "e");
    const newData = {
      ...state.modalData,
      [key]: ["checkIn", "checkOut"].includes(key) ? e : e.target?.value,
    };
    // dataRef.current[key] = e.target?.value || e;
    setState({ modalData: newData });
    // console.log(dataRef.current, "dataRef.current", e.target.value);
  };

  console.log(state.modalData, "state.modalData?.checkIn?");

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
          <h5 className="title">Chấm công</h5>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              {/* <Col md="7">
                <FormGroup>
                  <label>Họ và tên</label>
                  <Input
                    placeholder="Họ và tên"
                    type="text"
                    value={state.modalData.fullname}
                    onChange={onChange("fullname") || ""}
                  />
                </FormGroup>
              </Col> */}
              <Col md="12">
                <FormGroup>
                  <label>Check in</label>
                  <TimePicker
                    style={{ width: "100%" }}
                    value={
                      state.modalData?.checkIn
                        ? moment(state.modalData?.checkIn)
                        : null
                    }
                    onChange={onChange("checkIn")}
                    placeholder={"Chọn thời gian check in"}
                  />

                  {/* <DatePicker
                    dateFormat="DD/MM/YYYY"
                    value={state.modalData.checkIn}
                    onChange={onChange("checkIn")}
                    placeholder={"Chọn thời gian check in"}
                  /> */}
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <label>Check out</label>
                  <TimePicker
                    style={{ width: "100%" }}
                    value={
                      state.modalData?.checkOut
                        ? moment(state.modalData?.checkOut)
                        : null
                    }
                    onChange={onChange("checkOut")}
                    placeholder={"Chọn thời gian check out"}
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
                    value={state.modalData?.note || ""}
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

export default ModalChecking;
