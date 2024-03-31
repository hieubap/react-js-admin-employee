import React, { useState } from "react";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Row,
  Badge,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import TableView from "components/TableView";
import TooltipView from "components/Tooltip";
import moment from "moment";
import { requestFetch } from "service/request";
import { notify } from "utils/notification";
import ModalLeaveForm from "./Modal";
import { ContainerStyle } from "./styled";
import { formatPrice } from "utils";
import useSearch from "hooks/useSearch";

function TakeLeave() {
  const columns = [
    {
      title: "STT",
      width: 30,
      renderItem: (_, __, idx) => idx + 1,
    },
    {
      title: "Họ tên",
      width: 120,
      dataIndex: "fullname",
    },
    {
      title: "Người tạo",
      width: 120,
      // dataIndex: "member",
      renderItem: (_, item) => item.member?.fullname,
    },
    {
      title: "Mã NV",
      width: 60,
      renderItem: (_, item) => item.member?.codeMember,
      // dataIndex: "codeMember",
    },
    {
      title: "Số điện thoại",
      width: 90,
      dataIndex: "phone",
    },
    {
      title: "Thời gian nghỉ",
      dataIndex: "date",
      width: 130,
      renderItem: (_, v) =>
        moment(`${v.fromTime} ${v.fromDate}`, "HH:mm DD/MM/YYYY").format(
          "HH:mm DD/MM/YYYY"
        ) +
        " " +
        moment(`${v.toTime} ${v.toDate}`, "HH:mm DD/MM/YYYY").format(
          "HH:mm DD/MM/YYYY"
        ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      width: 100,
      renderItem: (v) => moment(v).format("HH:mm DD/MM/YYYY"),
    },
    {
      title: "Lý do",
      width: 200,
      dataIndex: "reason",
    },
    {
      title: "Tiện ích",
      width: 80,
      dataIndex: "salary",
      padding: 0,
      renderItem: (_, data, idx) => {
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Button color="info" onClick={onEdit(data)}>
              <i className={"now-ui-icons ui-1_settings-gear-63"} />
            </Button>

            <Button color="danger">
              <i className={"now-ui-icons ui-1_simple-remove"} />
            </Button>
          </div>
        );
      },
    },
  ];

  const onEdit = (data) => () => {
    setState({ editData: data, visible: true });
  };
  const [state, _setState] = useState({
    data: [],
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  const refreshData = (text = "") => {
    requestFetch("get", "/employee/leave-form?fullname=" + text).then((res) => {
      if (res.code == 0) {
        setState({ data: res.data });
      } else {
        notify(res.message, "danger");
      }
    });
  };

  // React.useEffect(() => {
  //   refreshData();
  // }, []);

  const { onSearch } = useSearch({ refreshData });
  return (
    <>
      <PanelHeader size="sm" />
      <ContainerStyle className="content">
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <CardTitle tag="h4">Danh sách đơn xin nghỉ</CardTitle>
                <Button
                  color="primary"
                  onClick={() => {
                    setState({ visible: true, editData: null });
                  }}
                >
                  Thêm mới
                </Button>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={12}>
                    <Input placeholder="Tìm tên ..." onChange={onSearch} />
                  </Col>
                </Row>

                <TableView columns={columns} data={state.data} />
              </CardBody>
            </Card>
          </Col>

          <ModalLeaveForm
            visible={state.visible}
            setVisible={(visible) => setState({ visible })}
            data={state.editData}
            onSuccess={refreshData}
          />
          {/* <Col md={4}>
            
          </Col> */}
        </Row>
      </ContainerStyle>
    </>
  );
}

export default TakeLeave;
