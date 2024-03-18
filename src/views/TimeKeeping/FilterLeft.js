import React, { useState } from "react";

// reactstrap components
import TableView from "components/TableView";
import moment from "moment";
import { Badge, Card, CardBody, Col, Input, Row } from "reactstrap";
import { requestFetch } from "service/request";
import { formatPrice } from "utils";
import { FilterLeftStyle } from "./styled";

function FilterLeft({ focusData = {}, setFocusData = () => {} }) {
  const [state, _setState] = useState({
    focusing: true,
    data: [],
    focusData: {},
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const refreshData = () => {
    requestFetch("get", "/employee/member").then((res) => {
      if (res.code == 0) {
        setState({ data: res.data });
      }
    });
  };

  React.useEffect(() => {
    refreshData();
  }, []);

  const columnSelected = [
    {
      title: "Họ tên",
      dataIndex: "fullname",
      //   width: 70,
      padding: 5,
    },
    {
      title: "Mã NV",
      dataIndex: "codeMember",
      padding: 5,
      //   renderItem: (key, data) => focusData[key],
    },
  ];

  const columnDetail = [
    {
      title: "Họ tên",
      dataIndex: "label",
      width: 90,
      padding: 5,
    },
    {
      title: focusData?.fullname,
      dataIndex: "value",
      padding: 5,
      renderItem: (key, data) => {
        if (["birth", "joinTime"].includes(key))
          return moment(focusData[key]).format("DD/MM/YYYY");

        if (["salary"].includes(key)) return formatPrice(focusData[key]);

        if (["gender"].includes(key)) {
          const v = focusData.gender;
          return (
            <Badge color={v == 1 ? "info" : "danger"}>
              <div className="oneline">{v == 1 ? "Nam" : "Nữ"}</div>
            </Badge>
          );
        }

        return focusData[key];
      },
    },
  ];
  console.log(state, "state");
  const dataDetail = [
    {
      label: "Mã NV",
      value: "codeMember",
    },
    {
      label: "Giới tính",
      value: "gender",
    },
    {
      label: "Địa chỉ",
      value: "address",
    },
    {
      label: "Ngày sinh",
      value: "birth",
    },
    {
      label: "Ngày vào công ty",
      value: "joinTime",
    },
    {
      label: "Số điện thoại",
      value: "phone",
    },
    {
      label: "Lương",
      value: "salary",
    },
    {
      label: "Số ngày đi làm",
      value: "",
    },
  ];

  const onFocus = () => {
    setState({ focusing: true });
  };
  const onBlur = () => {
    // setState({ focusing: false });
  };

  return (
    <FilterLeftStyle>
      <CardBody>
        <Row>
          <Col md={6}>
            <Input placeholder="Tìm họ tên" onFocus={onFocus} onBlur={onBlur} />
          </Col>
          <Col md={6}>
            <Input placeholder="Tìm mã nhân viên" onFocus={onFocus} />
          </Col>
        </Row>
        <TableView
          columns={state.focusing ? columnSelected : columnDetail}
          data={state.focusing ? state.data : dataDetail}
          rowClick={(index, item) => () => {
            if (!state.focusing) return;
            console.log(item, index, "item,index");
            setState({ focusing: false });
            setFocusData(item);
          }}
          rowClassName={state.focusing ? "hover-click" : ""}
        />
      </CardBody>
    </FilterLeftStyle>
  );
}

export default FilterLeft;
