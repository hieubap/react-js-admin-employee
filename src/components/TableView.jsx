// reactstrap components
import { Table } from "reactstrap";

function TableView({
  columns = [],
  data = [],
  rowClick = () => () => {},
  rowClassName,
}) {
  return (
    <div style={{ position: "relative" }}>
      <Table responsive style={{ width: "100%", backgroundColor: "white" }}>
        <thead className="text-primary">
          <tr>
            {columns.map((prop, key) => {
              return (
                <th
                  key={key}
                  style={{
                    width: prop.width,
                    minWidth: prop.minWidth,
                    whiteSpace: "break-spaces",
                  }}
                >
                  {prop.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowNum) => {
            return (
              <tr key={rowNum} className={rowClassName}>
                {columns.map((col, colNum) => {
                  return (
                    <>
                      <td
                        key={colNum}
                        onClick={rowClick(rowNum, item)}
                        style={{
                          padding: col.padding,
                          borderLeft: col.borderHor
                            ? "1px solid #f0f0f0"
                            : null,
                          borderRight: col.borderHor
                            ? "1px solid #f0f0f0"
                            : null,
                        }}
                      >
                        <div
                          style={{
                            width: col.width,
                            overflow: "hidden",
                            textAlign: col.textAlign,
                          }}
                        >
                          {col.renderItem
                            ? col.renderItem(item[col.dataIndex], item, rowNum)
                            : item[col.dataIndex]}
                        </div>
                      </td>
                    </>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div
        style={{
          position: "absolute",
          width: "auto",
          height: "100%",
          top: 0,
          left: 0,
          bottom: "1rem",
          backgroundColor: "white",
        }}
      >
        <Table
          style={{
            borderRight: "1px solid #eee",
          }}
        >
          <thead className="text-primary">
            <tr>
              {columns
                .filter((c) => c.fixedLeft)
                .map((prop, key) => {
                  return (
                    <th key={key} style={{ width: prop.width }}>
                      {prop.title}
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowNum) => {
              return (
                <tr key={rowNum} className={rowClassName}>
                  {columns
                    .filter((c) => c.fixedLeft)
                    .map((col, colNum) => {
                      return (
                        <td
                          key={colNum}
                          onClick={rowClick(rowNum, item)}
                          style={{
                            padding: col.padding,
                            borderLeft: col.borderHor ? "1px solid #eee" : null,
                            borderRight: col.borderHor
                              ? "1px solid #eee"
                              : null,
                          }}
                        >
                          <div
                            style={{
                              width: col.width,
                              overflow: "hidden",
                              textAlign: col.textAlign,
                            }}
                          >
                            {col.renderItem
                              ? col.renderItem(
                                  item[col.dataIndex],
                                  item,
                                  rowNum
                                )
                              : item[col.dataIndex]}
                          </div>
                        </td>
                      );
                    })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default TableView;
