import React, { useState, useMemo } from "react";

// reactstrap components
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
import TableView from "components/TableView";
import moment from "moment";
import Calendar from "./Calendar";
import FilterLeft from "./FilterLeft";
import { requestFetch } from "service/request";

function TimeKeeping() {
  const [state, _setState] = useState({
    focusData: {},
    checkingData: [],
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  const setFocusData = (focusData) => {
    setState({
      focusData,
    });
    getCheckingData({
      userId: focusData._id,
    });
  };
  const getCheckingData = (payload) => {
    requestFetch(
      "get",
      "/employee/checking?userId=" + (payload?.userId || state.focusData?._id)
    ).then((res) => {
      if (res.code == 0) {
        setState({ checkingData: res.data });
      }
    });
  };

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md={5}>
            <FilterLeft
              focusData={state.focusData}
              setFocusData={setFocusData}
            />
          </Col>
          <Col col={7}>
            <Calendar
              current={state.current}
              setCurrent={(current) => {
                setState({ current });
              }}
              focusData={state.focusData}
              checkingData={state.checkingData}
              refreshChecking={getCheckingData}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default TimeKeeping;
