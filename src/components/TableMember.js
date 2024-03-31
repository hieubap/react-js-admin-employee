import { Badge, Input, Button } from "reactstrap";

// core components

import TableView from "components/TableView";
import TooltipView from "components/Tooltip";
import moment from "moment";
import { formatPrice } from "utils";
import { useEffect, useRef, useState } from "react";
import { requestFetch } from "service/request";

function TableMember({
  memberIds = [],
  onChangeAll = () => {},
  onChange = () => {},
} = {}) {
  const [state, _setState] = useState({
    data: [],
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const textSearch = useRef("");

  const refreshData = () => {
    requestFetch("get", "/employee/member?text=" + textSearch.current).then(
      (res) => {
        if (res.code == 0) {
          setState({ data: res.data });
        } else {
        }
      }
    );
  };

  useEffect(() => {
    refreshData();
  }, []);

  const columns = [
    {
      title: "STT",
      width: 30,
      renderItem: (_, item) => (
        <input
          type="checkbox"
          checked={memberIds?.some((i) => i == item._id)}
          onChange={() => {
            const checked = memberIds?.some((i) => i == item._id);
            if (checked) {
              onChange([...memberIds].filter((i) => i != item._id));
            } else {
              onChange([...memberIds, item._id]);
            }
          }}
        />
      ),
    },
    {
      title: "Họ tên",
      width: 100,
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
      title: "Ngày sinh",
      dataIndex: "birth",
      width: 100,
      renderItem: (v) => moment(v).format("DD/MM/YYYY"),
    },
    {
      title: "Ngày vào công ty",
      dataIndex: "joinTime",
      width: 80,
      renderItem: (v) => moment(v).format("DD/MM/YYYY"),
    },
    {
      title: "Số ngày làm việc",
      dataIndex: "joinTime",
      width: 70,
      renderItem: (v) => moment().diff(moment(v), "days") + " Ngày",
    },
    {
      title: "Lương",
      width: 100,
      dataIndex: "salary",
      renderItem: (v) => formatPrice(v),
    },
  ];

  const timeoutRef = useRef();
  const onSearch = (e) => {
    textSearch.current = e.target.value;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      refreshData();
    }, 800);
  };

  return (
    <div>
      <input
        style={{
          transform: "translateY(3px)",
          width: 16,
          height: 16,
          marginBottom: 15,
        }}
        type="checkbox"
        onChange={(e) => {
          onChangeAll(e.target.checked);
        }}
      ></input>
      <span style={{ marginLeft: 5 }}>Toàn bộ nhân sự</span>
      <Input cols="80" placeholder="Tìm tên hoặc mã" onChange={onSearch} />
      <TableView columns={columns} data={state.data} />
    </div>
  );
}

export default TableMember;
