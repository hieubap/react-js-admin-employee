import React, { useState } from "react";
import { Tooltip } from "reactstrap";

function Example(props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <>
      <div href="#" id={props.id}>
        {props.children}
      </div>

      <Tooltip
        placement="top"
        isOpen={tooltipOpen}
        autohide={false}
        target={props.id}
        toggle={toggle}
      >
        {props.title}
      </Tooltip>
    </>
  );
}

export default Example;
