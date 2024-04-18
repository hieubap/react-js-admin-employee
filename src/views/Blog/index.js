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
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import TableView from "components/TableView";
import moment from "moment";
import { requestFetch } from "service/request";
import { notify } from "utils/notification";
import ConfirmDelete from "./ConfirmDelete";
import ModalManager from "./Modal";
import { ContainerStyle } from "./styled";
import useSearch from "hooks/useSearch";

function Blog() {
  const columns = [
    {
      title: "STT",
      width: 30,
      renderItem: (_, __, idx) => idx + 1,
    },
    {
      title: "Tiêu đề",
      width: 100,
      dataIndex: "banner",
      renderItem: (_, item) =>
        item.banner ? <img src={item.banner} /> : "Không có",
    },
    {
      title: "Tiêu đề",
      width: 200,
      dataIndex: "title",
    },
    {
      title: "Ưu tiên",
      width: 60,
      dataIndex: "priority",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      width: 100,
      renderItem: (v) => moment(v).format("HH:mm DD/MM/YYYY"),
    },
    {
      title: "Ngày sửa",
      dataIndex: "updatedAt",
      width: 100,
      renderItem: (v) => moment(v).format("HH:mm DD/MM/YYYY"),
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

            <Button color="danger" onClick={onDelete(data)}>
              <i className={"now-ui-icons ui-1_simple-remove"} />
            </Button>
          </div>
        );
      },
    },
  ];

  const onEdit = (data = {}) => () => {
    setState({ editData: { ...data }, visible: true });
  };

  const onDelete = (data) => () => {
    setState({ deleteData: data, visibleDelete: true });
  };

  const [state, _setState] = useState({
    data: [],
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  const refreshData = (text = "") => {
    requestFetch("get", "/vape-dong-anh/blog?title=" + text).then((res) => {
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

  const { onSearch } = useSearch({
    refreshData: refreshData,
  });

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
                <CardTitle tag="h4">Danh sách blog</CardTitle>
                <Button
                  color="primary"
                  onClick={() => {
                    setState({ visible: true, editData: {} });
                  }}
                >
                  Thêm mới
                </Button>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={4}>
                    <Input placeholder="tìm theo tiêu đề" onChange={onSearch} />
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

          <ConfirmDelete
            deleteId={state.deleteData?._id}
            visible={state.visibleDelete}
            setVisible={() => {
              setState({ visibleDelete: false });
            }}
            onSuccess={refreshData}
          />
        </Row>
      </ContainerStyle>
    </>
  );
}

export default Blog;
