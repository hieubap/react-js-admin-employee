import React, { useMemo, useState } from "react";

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

import PanelHeader from "components/PanelHeader/PanelHeader.js";

import { thead, tbody } from "variables/general";
import TableView from "components/TableView";
import moment from "moment";
import { requestFetch } from "service/request";

function Payroll() {
  const [visible, setVisible] = useState(false);
  const [state, _setState] = useState({
    data: [],
    memberList: [],
    checkingList: [],
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const columns = useMemo(() => {
    const fromDate = moment().startOf("month");
    const toDate = moment().endOf("month");

    const array = Array.from(Array(toDate.diff(fromDate, "day")).keys());

    return [
      {
        title: "Họ tên",
        width: 100,
        dataIndex: "fullname",
        fixedLeft: true,
      },
      ...array.map((i) => {
        const d = moment().startOf("month").add(i, "days");
        return {
          title: d.format("DD/MM"),
          dataIndex: d.format("DDMMYYYY"),
          borderHor: true,
          textAlign: "center",
          // renderItem: (v) => <div style={{ textAlign: "center" }}>{v}</div>,
        };
      }),
      {
        title: "Số công",
        width: 60,
        textAlign: "center",
        dataIndex: "total",
      },
      {
        title: "Công chuẩn",
        textAlign: "center",
        width: 100,
        renderItem: () => 23,
      },
    ];
  }, []);

  const refreshMemberList = () => {
    requestFetch("get", "/employee/member").then((res) => {
      if (res.code == 0) {
        setState({ memberList: res.data });
      } else {
        notify(res.message, "danger");
      }
    });
  };

  const refreshCheckingList = () => {
    requestFetch("get", "/employee/checking/all").then((res) => {
      if (res.code == 0) {
        setState({ checkingList: res.data });
      } else {
        notify(res.message, "danger");
      }
    });
  };

  React.useEffect(() => {
    refreshMemberList();
    refreshCheckingList();
  }, []);

  const dataPayroll = useMemo(() => {
    return state.memberList.map((item) => {
      const checkInOutData = state.checkingList.filter(
        (i) => i.userId == item._id
      );

      return checkInOutData.reduce(
        (a, b) => ({
          ...a,
          [b.dateKey]: 1,
        }),
        {
          fullname: item.fullname,
          total: checkInOutData.reduce((a, b) => a + 1, 0),
        }
      );
    });
  }, [state.memberList, state.checkingList]);

  console.log(dataPayroll, "dataPayroll", state);
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <CardTitle tag="h4">Thống kê</CardTitle>
                {/* <Button
                  color="primary"
                  onClick={() => {
                    setVisible(!visible);
                  }}
                >
                  Thêm mới
                </Button> */}
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={4}>
                    <Input placeholder="Search..." />
                  </Col>
                  <Col md={4}>
                    <Input placeholder="Search..." />{" "}
                  </Col>
                </Row>
                <TableView columns={columns} data={dataPayroll} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Payroll;
