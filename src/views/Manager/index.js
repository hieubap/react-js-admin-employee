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
import ModalManager from "./Modal";
import { ContainerStyle } from "./styled";
import { formatPrice } from "utils";
import useSearch from "hooks/useSearch";

function Manager() {
  const columns = [
    {
      title: "STT",
      width: 30,
      renderItem: (_, __, idx) => idx + 1,
    },
    {
      title: "Họ tên",
      width: 150,
      dataIndex: "fullname",
    },
    {
      title: "Mã NV",
      width: 60,
      dataIndex: "codeMember",
    },
    {
      title: "Giới tính",
      width: 60,
      dataIndex: "gender",
      renderItem: (v, _, idx) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Badge color={v == 1 ? "info" : "danger"}>
            <div className="oneline">{v == 1 ? "Nam" : "Nữ"}</div>
          </Badge>
        </div>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: 100,
      renderItem: (v, _, idx) => (
        <TooltipView id={"btn-edit-" + idx} title={v}>
          <div className="oneline">{v}</div>
        </TooltipView>
      ),
    },
    {
      title: "Số điện thoại",
      width: 90,
      dataIndex: "phone",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birth",
      width: 100,
      renderItem: (v) => moment(v).format("DD/MM/YYYY"),
    },
    {
      title: "Ngày vào công ty",
      dataIndex: "joinTime",
      width: 100,
      renderItem: (v) => moment(v).format("DD/MM/YYYY"),
    },
    {
      title: "Số ngày làm việc",
      dataIndex: "joinTime",
      width: 100,
      renderItem: (v) => moment().diff(moment(v), "days") + " Ngày",
    },
    {
      title: "Lương",
      width: 100,
      dataIndex: "salary",
      renderItem: (v) => formatPrice(v),
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
    requestFetch("get", "/employee/member?text=" + text).then((res) => {
      if (res.code == 0) {
        setState({ data: res.data });
      } else {
        notify(res.message, "danger");
      }
    });
  };

  React.useEffect(() => {
    refreshData();
  }, []);

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
                <CardTitle tag="h4">Danh sách nhân viên</CardTitle>
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
                  <Col md={4}>
                    <Input
                      placeholder="Search..."
                      onChange={onSearch}
                    />
                  </Col>
                  {/* <Col md={4}>
                    <Input placeholder="Search..." />{" "}
                  </Col> */}
                </Row>

                <TableView columns={columns} data={state.data} />
              </CardBody>
            </Card>
          </Col>

          <ModalManager
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

export default Manager;
