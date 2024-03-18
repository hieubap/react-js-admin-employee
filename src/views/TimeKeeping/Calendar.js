import React from "react";
import { CalendarStyle } from "./styled";
import moment from "moment";
import ModalChecking from "./ModalChecking";

function Calendar({
  current,
  setCurrent,
  focusData,
  checkingData,
  refreshChecking,
}) {
  const [state, _setState] = React.useState({
    visible: false,
  });

  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  const [rowAndCol, startMonth, endMonth] = React.useMemo(() => {
    const startDate = moment(current).startOf("month").startOf("week");
    const endDate = moment(current).endOf("month").endOf("week");
    const numWeek = endDate.diff(startDate, "week");
    const output = [];
    const buffer = moment(startDate.format());
    const curMonth = moment(current).format("MM");

    for (let i = 0; i < numWeek + 1; i++) {
      const w = [];
      for (let d = 0; d < 7; d++) {
        const dateKey = buffer.format("DDMMYYYY");
        const detail = checkingData.find((i) => i.dateKey == dateKey) || {
          dateKey,
        };
        w.push({
          day: buffer.format("DD"),
          dateKey,
          time: moment(buffer.format()),
          blur: curMonth != buffer.format("MM"),
          checkIn: detail.checkIn
            ? moment(detail.checkIn).format("HH:mm")
            : null,
          checkOut: detail.checkOut
            ? moment(detail.checkOut).format("HH:mm")
            : null,
          detail,
        });
        buffer.add(1, "day");
      }

      output.push(w);
    }

    return [output, startDate, endDate];
  }, [checkingData, current]);
  const onClick = (col) => () => {
    setState({
      visible: true,
      data: col.detail,
    });
  };
  return (
    <CalendarStyle className="card-calendar card">
      <div className="card-body">
        <div className="rbc-calendar">
          <div className="rbc-toolbar">
            <span className="rbc-btn-group">
              <button
                onClick={() => {
                  setCurrent(moment(current).add(-1, "month"));
                }}
                type="button"
              >
                {"<"}
              </button>
              <button
                onClick={() => {
                  setCurrent(moment());
                }}
                type="button"
              >
                {"Hôm nay"}
              </button>
              <button
                onClick={() => {
                  setCurrent(moment(current).add(1, "month"));
                }}
                type="button"
              >
                {">"}
              </button>
            </span>
            <span className="rbc-toolbar-label">
              {moment(current).format("MM/YYYY")}
            </span>
          </div>
          <div className="rbc-month-view" role="table" aria-label="Month View">
            <div className="rbc-row rbc-month-header" role="row">
              {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((item) => (
                <div className="rbc-header">
                  <span role="columnheader" aria-sort="none">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            {rowAndCol.map((row) => (
              <div className="rbc-month-row" role="rowgroup">
                <div className="rbc-row-bg">
                  {row.map((col) => (
                    <div className="rbc-day-bg" />
                  ))}
                </div>
                <div className="rbc-row-content" role="row">
                  <div className="rbc-row ">
                    {row.map((col) => (
                      <div
                        className={`rbc-date-cell ${
                          col.blur ? "rbc-off-range" : ""
                        }`}
                        role="cell"
                        onClick={onClick(col)}
                      >
                        <a href="#" role="cell">
                          {col.day}
                        </a>
                      </div>
                    ))}
                  </div>
                  <div className="rbc-row">
                    {row.map((col) => (
                      <div
                        className="rbc-row-segment"
                        style={{
                          flexBasis: "14.2857%",
                          maxWidth: "14.2857%",
                        }}
                        onClick={onClick(col)}
                      >
                        {!col.blur && (
                          <>
                            <div
                              tabIndex={0}
                              className="rbc-event event-green rbc-event-allday"
                            >
                              <div
                                className="rbc-event-content"
                                title="All Day Event"
                              >
                                {col.checkIn}
                              </div>
                            </div>
                            <div
                              tabIndex={1}
                              className="rbc-event event-azure rbc-event-allday"
                            >
                              <div
                                className="rbc-event-content"
                                title="All Day Event"
                              >
                                {col.checkOut}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalChecking
        focusData={focusData}
        data={state.data}
        visible={state.visible}
        setVisible={(visible) => {
          setState({ visible });
        }}
        onSuccess={refreshChecking}
      />
    </CalendarStyle>
    //
  );
}

export default Calendar;
