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

// core components

import RadioView from "components/RadioView";
import { DatePicker } from "reactstrap-date-picker";
import { requestFetch } from "service/request";
import { notify } from "utils/notification";
import TableMember from "components/TableMember";

function ModalBonus({ visible, setVisible, onSuccess = () => {}, data }) {
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
    requestFetch(data?._id ? "put" : "post", "/employee/bonus", data).then(
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
      style={{ maxWidth: 800 }}
    >
      <Card>
        <CardHeader>
          <h5 className="title">{state.modalData?._id ? "Sửa" : "Thêm mới"}</h5>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col md="4">
                <FormGroup>
                  <label>Tên chính sách</label>
                  <Input
                    placeholder="Nhập tên"
                    type="text"
                    value={state.modalData.nameBonus}
                    onChange={onChange("nameBonus") || ""}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Kinh phí</label>
                  <Input
                    type="number"
                    placeholder="100.000"
                    value={state.modalData.balance || ""}
                    onChange={onChange("balance")}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Ngày áp dụng</label>
                  <DatePicker
                    dateFormat="DD/MM/YYYY"
                    value={state.modalData.dateApply}
                    placeholder={"Chọn hoặc nhập ngày"}
                    onChange={onChange("dateApply")}
                  />
                </FormGroup>
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

              <Col md="8">
                <FormGroup>
                  <label>Nhân viên áp dụng</label>
                  <TableMember
                    memberIds={state.modalData?.memberIds}
                    onChange={(ids) => {
                      const newData = {
                        ...state.modalData,
                        memberIds: ids,
                      };
                      setState({ modalData: newData });
                    }}
                    onChangeAll={(checked) => {
                      const newData = {
                        ...state.modalData,
                        allMember: checked,
                      };
                      setState({ modalData: newData });
                    }}
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

export default ModalBonus;
