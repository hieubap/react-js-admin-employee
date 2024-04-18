import React from "react";

function ItemContainer({
  children,
  onAddBottom,
  onRemove,
  ignoreIcon = false,
}: {
  ignoreIcon?: boolean;
  children: any;
  onAddBottom?: () => void;
  onRemove?: () => void;
}) {
  return (
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
        marginRight: "2em",
      }}
    >
      {children}
      {ignoreIcon ? (
        <></>
      ) : (
        <>
          <i
            className="fa fa-trash text-secondary my-1"
            style={{
              position: "absolute",
              right: "-1.4em",
              bottom: "0.5em",
              fontSize: "1.2em",
              cursor: "pointer",
            }}
            onClick={onRemove}
          ></i>
        </>
      )}
      <i
        className="fa fa-plus text-secondary my-1"
        style={{
          position: "absolute",
          right: "-1.4em",
          bottom: "-1em",
          fontSize: "1.2em",
          cursor: "pointer",
        }}
        onClick={onAddBottom}
      ></i>
    </div>
  );
}

export default ItemContainer;
