import React, { useState } from "react";
import ItemContainer from "../ItemContainer";

function AddItem({
  onAdd,
  ...rest
}: {
  onAdd: (i: any) => void;
  onAddBottom?: () => void;
  onRemove?: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <ItemContainer {...rest}>
      <div
        style={{
          border: "1px solid",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          margin: "1em",
          position: "relative",
        }}
      >
        <div style={{ width: "100%" }}>
          {
            <div style={{ display: "flex" }}>
              {[
                {
                  title: "Tiêu đề",
                  type: "h2",
                },
                {
                  title: "Nội dung",
                  type: "p",
                },
                {
                  title: "Ảnh",
                  type: "img",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="mx-2"
                  onClick={() => {
                    onAdd(item);
                  }}
                >
                  {item.title}
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </ItemContainer>
  );
}

export default AddItem;
