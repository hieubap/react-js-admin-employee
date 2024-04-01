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
import { notify } from "utils/notification";
import { formatPrice } from "utils";
import { DatePicker } from "antd";
import useSearch from "hooks/useSearch";

function Payroll() {
  const [visible, setVisible] = useState(false);
  const [state, _setState] = useState({
    data: [],
    memberList: [],
    checkingList: [],
    month: moment(),
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  function getWeekdaysInMonth(year, month) {
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var weekdays = 0;
    for (var day = 1; day <= daysInMonth; day++) {
      var currentDate = new Date(year, month, day);
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        weekdays++;
      }
    }
    return weekdays;
  }

  const numDay = useMemo(() => {
    return getWeekdaysInMonth(moment().format("YYYY"), moment().format("MM"));
  }, []);

  const columns = useMemo(() => {
    const fromDate = moment().startOf("month");
    const toDate = moment().endOf("month");

    const array = Array.from(Array(toDate.diff(fromDate, "day")).keys());

    return [
      {
        title: "STT",
        width: 20,
        dataIndex: "fullname",
        renderItem: (_, __, idx) => idx + 1,
        // fixedLeft: true,
      },
      {
        title: "Họ tên",
        width: 80,
        dataIndex: "fullname",
        // fixedLeft: true,
      },
      // ...array.map((i) => {
      //   const d = moment().startOf("month").add(i, "days");
      //   return {
      //     title: d.format("DD"),
      //     dataIndex: d.format("DDMMYYYY"),
      //     borderHor: true,
      //     textAlign: "center",
      //     // renderItem: (v) => <div style={{ textAlign: "center" }}>{v}</div>,
      //   };
      // }),
      {
        title: "Số ngày nghỉ phép",
        width: 50,
        textAlign: "center",
        dataIndex: "dayOff",
      },
      {
        title: "Số công trong tháng",
        width: 60,
        textAlign: "center",
        dataIndex: "dayWork",
      },
      {
        title: "Công chuẩn",
        width: 60,
        renderItem: () => numDay + " Ngày",
      },
      {
        title: "Lương thỏa thuận",
        textAlign: "center",
        width: 100,
        dataIndex: "salary",
        renderItem: (item) => formatPrice(item),
      },
      {
        title: "Lương theo ngày công (A)",
        width: 100,
        dataIndex: "salaryWorkDay",
        renderItem: (item) => formatPrice(item),
      },
      {
        title: "Các khoản bổ sung (B)",
        textAlign: "center",
        width: 70,
        dataIndex: "sumBonus",
        renderItem: (item) => formatPrice(item),
      },
      {
        title: "Các khoản khấu trừ (C)",
        textAlign: "center",
        width: 70,
        dataIndex: "sumReduce",
        renderItem: (item) => formatPrice(item),
      },
      {
        title: "Thực nhận \n(D = A+B-C)",
        textAlign: "center",
        width: 100,
        renderItem: (_, item) =>
          formatPrice(item.salaryWorkDay + item.sumBonus + item.sumReduce),
      },
    ];
  }, []);

  const refreshMemberList = (text = "") => {
    requestFetch("get", "/employee/member/statistics-salary?text=" + text).then(
      (res) => {
        if (res.code == 0) {
          setState({ memberList: res.data });
        } else {
          notify(res.message, "danger");
        }
      }
    );
  };

  React.useEffect(() => {
    refreshMemberList();
  }, []);

  const dataPayroll = useMemo(() => {
    return state.memberList.map((item) => {
      const checkInOutData = state.checkingList.filter(
        (i) => i.userId == item._id
      );
      const dayOff = item.leaveForms.filter(
        (i) =>
          moment(i.fromDate).format("MMYYYY") == state.month.format("MMYYYY")
      ).length;
      const dayWork = item.checkings.filter(
        (i) =>
          moment(i.checkIn).format("MMYYYY") == state.month.format("MMYYYY")
      ).length;

      return {
        ...item,
        dayOff,
        dayWork,
        sumBonus: item.bonus.reduce((a, b) => {
          if (
            moment(b.dateApply).format("MMYYYY") != state.month.format("MMYYYY")
          )
            return a;
          const v = b.balance - 0;
          return a + (v > 0 ? v : 0);
        }, 0),
        sumReduce: item.bonus.reduce((a, b) => {
          const v = b.balance - 0;
          return a + (v < 0 ? v : 0);
        }, 0),
        salaryWorkDay: (dayWork / numDay) * item.salary,
      };
    });
  }, [state.memberList, state.checkingList, state.month]);

  console.log(dataPayroll, "dataPayroll", state);
  const { onSearch } = useSearch({ refreshData: refreshMemberList });
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
                <CardTitle tag="h4">Tổng kết lương</CardTitle>
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
                  <Col md={8}>
                    <Input placeholder="Tìm theo tên ..." onChange={onSearch} />
                  </Col>
                  <DatePicker
                    format={"MM/YYYY"}
                    picker="month"
                    value={state.month}
                    onChange={(month) => {
                      setState({ month });
                    }}
                    placeholder="Chọn tháng"
                  />
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
