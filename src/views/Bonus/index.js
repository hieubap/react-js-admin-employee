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
import ModalBonus from "./Modal";
import { ContainerStyle } from "./styled";
import { formatPrice } from "utils";
import useSearch from "hooks/useSearch";
import { notify } from "utils/notification";

function Bonus() {
  const [visible, setVisible] = useState(false);
  const [state, _setState] = useState({
    data: [],
    memberList: [],
    checkingList: [],
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const onEdit = (data) => () => {
    setState({ editData: data, visible: true });
  };

  const columns = useMemo(() => {
    const fromDate = moment().startOf("month");
    const toDate = moment().endOf("month");

    const array = Array.from(Array(toDate.diff(fromDate, "day")).keys());

    return [
      {
        title: "STT",
        width: 40,
        renderItem: (_, __, idx) => idx + 1,
      },
      {
        title: "Tên chính sách",
        minWidth: 200,
        dataIndex: "nameBonus",
      },
      {
        title: "Kinh phí",
        width: 80,
        dataIndex: "balance",
        renderItem: (v) => formatPrice(v),
      },
      {
        title: "Ngày áp dụng",
        width: 100,
        textAlign: "center",
        dataIndex: "dateApply",
        renderItem: (v) => moment(v).format("DD/MM/YYYY"),
      },
      {
        title: "Chú thích",
        width: 280,
        // textAlign: "center",
        dataIndex: "note",
      },
      {
        title: "Đã áp dụng",
        // textAlign: "center",
        width: 100,
        dataIndex: "memberIds",
        renderItem: (ids, item) =>
          item.allMember ? "Toàn bộ" : ids.length + " NV",
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
  }, []);

  const refreshBonus = (text = "") => {
    requestFetch("get", "/employee/bonus?text=" + text).then((res) => {
      if (res.code == 0) {
        setState({ data: res.data });
      } else {
        notify(res.message, "danger");
      }
    });
  };

  const refreshCheckingList = () => {
    requestFetch("get", "/employee/bonus").then((res) => {
      if (res.code == 0) {
        setState({ checkingList: res.data });
      } else {
        notify(res.message, "danger");
      }
    });
  };

  React.useEffect(() => {
    // refreshBonus();
    // refreshCheckingList();
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

  const { onSearch } = useSearch({
    refreshData: refreshBonus,
  });

  console.log(dataPayroll, "dataPayroll", state);
  return (
    <ContainerStyle>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <CardTitle tag="h4">Danh sách chế độ / khấu trừ</CardTitle>
                <Button
                  color="primary"
                  onClick={() => {
                    setState({ visible: !state.visible });
                  }}
                >
                  Thêm mới
                </Button>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={9}>
                    <Input
                      placeholder="Tìm theo tên chế độ ..."
                      onChange={onSearch}
                    />
                  </Col>
                </Row>
                <TableView columns={columns} data={state.data} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <ModalBonus
        visible={state.visible}
        setVisible={(visible) => setState({ visible })}
        data={state.editData}
        onSuccess={refreshBonus}
      />
    </ContainerStyle>
  );
}

export default Bonus;
