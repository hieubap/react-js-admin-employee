import React, { useRef, useState } from "react";

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

function ModalLeaveForm({ visible, setVisible, onSuccess = () => {}, data }) {
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
    const data = { ...state.modalData };
    requestFetch(data?._id ? "put" : "post", "/employee/leave-form", data).then(
      (res) => {
        if (res.code == 0) {
          notify("Gửi đơn thành công");
          setVisible(false);
          onSuccess();
        } else {
          notify(res.message, "danger");
        }
      }
    );
  };

  const onChange = (key) => (e) => {
    // dataRef.current[key] = e.target?.value;
    const newData = {
      ...state.modalData,
      [key]: typeof e == "string" ? e : e.target?.value || "",
    };
    setState({ modalData: newData });
    // dataRef
    // console.log(dataRef.current, "dataRef.current", e.target.value);
  };

  const dataRef = useRef({});

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
      style={{ maxWidth: 1000 }}
    >
      <Card>
        <CardHeader>
          <h5 className="title">Edit Profile</h5>
        </CardHeader>
        <CardBody
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ width: 700 }}>
            <div
              style={{
                clear: "both",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div style={{ textAlign: "center", fontWeight: "700" }}>
                CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "700",
                  borderBottom: "1px dashed",
                  paddingBottom: 3,
                  marginBottom: 12,
                }}
              >
                Độc lập – Tự do – Hạnh phúc
              </div>
            </div>
            <p
              style={{
                marginTop: "6pt",
                marginBottom: "6pt",
                textAlign: "center",
                fontSize: "16pt",
              }}
            >
              <strong>
                <span style={{ fontFamily: '"Times New Roman"' }}>
                  ĐƠN XIN NGHỈ PHÉP
                </span>
              </strong>
            </p>
            <p style={{ marginTop: "6pt", marginBottom: "6pt" }}>
              <strong>
                <em>
                  <u>
                    <span style={{ fontFamily: '"Times New Roman"' }}>
                      Kính gửi
                    </span>
                  </u>
                </em>
              </strong>
              <strong>
                <u>
                  <span style={{ fontFamily: '"Times New Roman"' }}> </span>
                </u>
              </strong>
              <strong>
                <span style={{ fontFamily: '"Times New Roman"' }}>:</span>
              </strong>
              <span
                style={{
                  width: "5.49pt",
                  fontFamily: '"Times New Roman"',
                  display: "inline-block",
                }}
              >
                &nbsp;
              </span>
              <span
                style={{
                  fontFamily: '"Times New Roman"',
                  letterSpacing: "0.1pt",
                }}
              >
                Ban giám đốc, Bộ phận HC-NS và Trưởng Bộ phận{" "}
              </span>
            </p>
            <p style={{ marginTop: "12pt", marginBottom: "6pt" }}>
              <span style={{ fontFamily: '"Times New Roman"' }}>
                Tôi tên là:
              </span>
              <span style={{ fontFamily: '"Times New Roman"' }}>&nbsp; </span>
              <span style={{ fontFamily: '"Times New Roman"' }}>
                <input
                  style={{
                    border: "none",
                    borderBottom: "1px dashed",
                    marginLeft: 5,
                  }}
                  placeholder="Bùi Dũng"
                  value={state.modalData.fullname || ""}
                  onChange={onChange("fullname")}
                />
              </span>
            </p>
            <p style={{ marginBottom: "6pt" }}>
              <span style={{ fontFamily: '"Times New Roman"' }}>Chức vụ:</span>
              <input
                style={{
                  border: "none",
                  borderBottom: "1px dashed",
                  marginLeft: 5,
                }}
                placeholder="Lập trình viên"
                value={state.modalData.position || ""}
                onChange={onChange("position")}
              />

              <span style={{ fontFamily: '"Times New Roman"', marginLeft: 50 }}>
                Bộ phận :
                <input
                  style={{
                    border: "none",
                    borderBottom: "1px dashed",
                    marginLeft: 5,
                  }}
                  placeholder="Kỹ thuật phần mềm"
                  value={state.modalData.department || ""}
                  onChange={onChange("department")}
                />
              </span>
            </p>
            <p
              style={{
                marginRight: "9.5pt",
                marginBottom: "6pt",
                textAlign: "justify",
              }}
            >
              <span
                style={{
                  fontFamily: '"Times New Roman"',
                  letterSpacing: "0.1pt",
                }}
              >
                Nay tôi làm đơn này đề nghị Ban giám đốc, Bộ phận HC-NS và
                Trưởng Bộ phận cho tôi được nghỉ phép:
              </span>
            </p>
            <p style={{ marginBottom: "6pt" }}>
              <span style={{ fontFamily: '"Times New Roman"' }}>
                Từ ngày:{" "}
                <input
                  style={{
                    border: "none",
                    borderBottom: "1px dashed",
                    marginLeft: 5,
                    width: 50,
                  }}
                  placeholder="08:00"
                  value={state.modalData.fromTime || ""}
                  onChange={onChange("fromTime")}
                />{" "}
                ngày{" "}
                <input
                  style={{
                    border: "none",
                    borderBottom: "1px dashed",
                    marginLeft: 5,
                    width: 80,
                  }}
                  placeholder="15/08/2024"
                  value={state.modalData.fromDate || ""}
                  onChange={onChange("fromDate")}
                />
              </span>
              <span style={{ fontFamily: '"Times New Roman"', marginLeft: 80 }}>
                đến ngày:
                <input
                  style={{
                    border: "none",
                    borderBottom: "1px dashed",
                    marginLeft: 5,
                    width: 50,
                  }}
                  placeholder="17:00"
                  value={state.modalData.toTime || ""}
                  onChange={onChange("toTime")}
                />{" "}
                ngày{" "}
                <input
                  style={{
                    border: "none",
                    borderBottom: "1px dashed",
                    marginLeft: 5,
                    width: 80,
                  }}
                  placeholder="15/08/2024"
                  value={state.modalData.toDate || ""}
                  onChange={onChange("toDate")}
                />
              </span>
            </p>
            <p style={{ marginBottom: "6pt" }}>
              <span style={{ fontFamily: '"Times New Roman"' }}>Lý do:</span>
              <span style={{ fontFamily: '"Times New Roman"' }}>&nbsp; </span>
              <input
                style={{
                  border: "none",
                  borderBottom: "1px dashed",
                  marginLeft: 5,
                  width: "100%",
                }}
                placeholder=""
                value={state.modalData.reason || ""}
                onChange={onChange("reason")}
              />
            </p>
            <p className="BodyText" style={{ marginBottom: "6pt" }}>
              Điện thoại khi cần liên lạc (ĐT di động):{" "}
              <input
                style={{
                  border: "none",
                  borderBottom: "1px dashed",
                  marginLeft: 5,
                }}
                placeholder=""
                value={state.modalData.phone || ""}
                onChange={onChange("phone")}
              />
            </p>
            <p style={{ marginBottom: "12pt" }}>
              <span style={{ fontFamily: '"Times New Roman"' }}>
                Hình thức nghỉ:
              </span>
            </p>
            {[
              "Nghỉ phép năm",
              "Nghỉ việc riêng",
              "Nghỉ đau ốm",
              "Nghỉ thai sản",
              "Nghỉ kết hôn",
              "Nghỉ ma chay",
              "Nghỉ lý do khác",
            ].map((item, idx) => (
              <div>
                <div
                  style={{
                    width: "18.05pt",
                    height: "17.3pt",
                    float: "left",
                  }}
                >
                  <input
                    type="checkbox"
                    style={{
                      border: "0.75pt solid #000000",
                      padding: "1pt",
                      width: 16,
                      height: 16,
                      marginTop: 4,
                    }}
                    checked={state.modalData.checked?.includes(idx) || false}
                    onChange={() => {
                      const newData = { ...state.modalData };
                      newData.checked = newData.checked?.includes(idx)
                        ? newData.checked?.filter((i) => i != idx)
                        : [...(state.modalData?.checked || []), idx];
                      setState({ modalData: newData });
                    }}
                  />
                </div>
                <p style={{ marginLeft: "36pt", marginBottom: "6pt" }}>
                  <span style={{ fontFamily: '"Times New Roman"' }}>
                    {item}
                  </span>
                </p>
              </div>
            ))}
            <p
              style={{
                marginTop: "6pt",
                marginBottom: "6pt",
                textAlign: "justify",
              }}
            >
              <span style={{ fontFamily: '"Times New Roman"' }}>
                Tôi cam đoan đã bàn giao công việc còn lại cho bộ phận có liên
                quan trước khi nghỉ phép.
              </span>
            </p>
            <p
              style={{
                marginTop: "6pt",
                marginRight: "16.65pt",
                marginBottom: "6pt",
                textAlign: "justify",
              }}
            >
              <span style={{ fontFamily: '"Times New Roman"' }}>
                Rất mong Ban Giám đốc xem xét và chấp thuận.{" "}
              </span>
            </p>
            <p
              style={{
                marginTop: "6pt",
                marginRight: "16.65pt",
                marginBottom: "6pt",
                textAlign: "justify",
              }}
            >
              <span style={{ fontFamily: '"Times New Roman"' }}>
                Tôi xin chân thành cảm ơn.
              </span>
            </p>
            <p
              style={{
                marginTop: "6pt",
                marginRight: "16.75pt",
                marginBottom: "6pt",
                textAlign: "justify",
              }}
            >
              <span
                style={{
                  width: "276.45pt",
                  fontFamily: '"Times New Roman"',
                  display: "inline-block",
                }}
              >
                &nbsp;
              </span>
              <em>
                <span style={{ fontFamily: '"Times New Roman"' }}>
                  Hà Nội,{" "}
                  <input
                    style={{
                      border: "none",
                      borderBottom: "1px dashed",
                      marginLeft: 5,
                      width: 30,
                      textAlign: "center",
                    }}
                    placeholder={moment().format("DD")}
                    value={state.modalData.date_d || ""}
                    onChange={onChange("date_d")}
                  />
                </span>
              </em>
              <em>
                <span
                  style={{
                    width: "5.72pt",
                    fontFamily: '"Lucida Console"',
                    fontSize: "10pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
              </em>
              <em>
                <span style={{ fontFamily: '"Times New Roman"' }}>
                  tháng{" "}
                  <input
                    style={{
                      border: "none",
                      borderBottom: "1px dashed",
                      marginLeft: 5,
                      width: 30,
                      textAlign: "center",
                    }}
                    placeholder={moment().format("MM")}
                    value={state.modalData.date_m || ""}
                    onChange={onChange("date_m")}
                  />
                </span>
              </em>
              <em>
                <span style={{ fontFamily: '"Times New Roman"' }}>
                  năm{" "}
                  <input
                    style={{
                      border: "none",
                      borderBottom: "1px dashed",
                      marginLeft: 5,
                      width: 50,
                      textAlign: "center",
                    }}
                    placeholder={moment().format("YYYY")}
                    value={state.modalData.date_y || ""}
                    onChange={onChange("date_y")}
                  />
                </span>
              </em>
              <em>
                <span
                  style={{
                    width: "1.93pt",
                    fontFamily: '"Lucida Console"',
                    fontSize: "10pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
              </em>
            </p>
            <table style={{ borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td
                    style={{
                      width: "235.65pt",
                      paddingRight: "5.4pt",
                      paddingLeft: "5.4pt",
                      verticalAlign: "top",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "6pt",
                        marginBottom: "6pt",
                        textAlign: "center",
                      }}
                    >
                      <strong>
                        <span style={{ fontFamily: '"Times New Roman"' }}>
                          TRƯỞNG BỘ PHẬN
                        </span>
                      </strong>
                    </p>
                    <p
                      style={{
                        marginTop: "6pt",
                        marginBottom: "6pt",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ fontFamily: '"Times New Roman"' }}>
                        (Ký và ghi rõ họ tên)
                      </span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "237.95pt",
                      paddingRight: "5.4pt",
                      paddingLeft: "5.4pt",
                      verticalAlign: "top",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "6pt",
                        marginBottom: "6pt",
                        textAlign: "center",
                      }}
                    >
                      <strong>
                        <span style={{ fontFamily: '"Times New Roman"' }}>
                          NGƯỜI LÀM ĐƠN
                        </span>
                      </strong>
                    </p>
                    <p
                      style={{
                        marginTop: "6pt",
                        marginBottom: "6pt",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ fontFamily: '"Times New Roman"' }}>
                        (Ký và ghi rõ họ tên)
                      </span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "77.95pt" }}>
                  <td
                    style={{
                      width: "235.65pt",
                      paddingRight: "5.4pt",
                      paddingLeft: "5.4pt",
                      verticalAlign: "bottom",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "6pt",
                        marginBottom: "6pt",
                        textAlign: "center",
                      }}
                    >
                      <strong>
                        <span style={{ fontFamily: '"Times New Roman"' }}>
                          &nbsp;
                        </span>
                      </strong>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "237.95pt",
                      paddingRight: "5.4pt",
                      paddingLeft: "5.4pt",
                      verticalAlign: "bottom",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "6pt",
                        marginBottom: "6pt",
                        textAlign: "center",
                      }}
                    >
                      <strong>
                        <span style={{ fontFamily: '"Times New Roman"' }}>
                          <input
                            style={{
                              border: "none",
                              borderBottom: "1px dashed",
                              marginLeft: 5,
                              textAlign: "center",
                            }}
                            placeholder="Bùi Dũng"
                            value={state.modalData.signature || ""}
                            onChange={onChange("signature")}
                          />
                        </span>
                      </strong>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p style={{ lineHeight: "150%" }}>&nbsp;</p>
            <div style={{ clear: "both" }}></div>
          </div>

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
              Gửi
            </Button>
          </Row>
        </CardBody>
      </Card>
    </Modal>
  );
}

export default ModalLeaveForm;
