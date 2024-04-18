import React, { CSSProperties, useEffect, useRef } from "react";
import ItemContainer from "../ItemContainer";

function TextArea({
  item,
  style,
  onAddBottom,
  onRemove,
  onChange,
  ignoreIcon,
}: {
  item: any;
  ignoreIcon?: boolean;
  style?: CSSProperties;
  onAddBottom?: () => void;
  onRemove?: () => void;
  onChange?: (i?: any) => void;
}) {
  const refTextArea = useRef();
  function autoExpand(textarea: any) {
    // Reset textarea height to auto to correctly calculate new height
    textarea.style.height = "auto";

    // Set the new height based on the scrollHeight of the content
    textarea.style.height = textarea.scrollHeight + "px";
  }

  useEffect(() => {
    if (item.value && refTextArea.current) {
      console.log(item, "item");

      refTextArea.current.value = item.value;
      // setFileUrl(item.value);
    }
  }, []);

  return (
    <ItemContainer
      ignoreIcon={ignoreIcon}
      onRemove={onRemove}
      onAddBottom={onAddBottom}
    >
      <div className="col-12">
        <div className="form-floating">
          <textarea
            ref={refTextArea}
            onInput={(e) => {
              autoExpand(e.target);
            }}
            className="form-control"
            placeholder={item.title}
            style={{ minHeight: 80, ...style }}
            defaultValue={""}
            onChange={(e) => {
              if (onChange) onChange(e.target.value);
            }}
          />

          {/* <label htmlFor="message">{item.title}</label> */}
        </div>
      </div>
    </ItemContainer>
  );
}

export default TextArea;
