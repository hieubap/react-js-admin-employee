import React, { useState } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { RadioViewStyle } from "./styled";

function RadioView({ data = [], value = 1, onChange = () => {} }) {
  //   const [cSelected, setCSelected] = useState([]);
  const [rSelected, setRSelected] = useState(value);

  React.useEffect(() => {
    setRSelected(value);
  }, [value]);

  //   const onCheckboxBtnClick = (selected) => {
  //     const index = cSelected.indexOf(selected);
  //     if (index < 0) {
  //       cSelected.push(selected);
  //     } else {
  //       cSelected.splice(index, 1);
  //     }
  //     setCSelected([...cSelected]);
  //   };
  return (
    <RadioViewStyle>
      {data.map((item, index) => (
        <Button
          key={index}
          color="primary"
          outline={rSelected != item.value}
          onClick={() => {
            setRSelected(item.value);
            onChange(item.value);
          }}
          //   active={rSelected === index}
        >
          {item.title}
        </Button>
      ))}
    </RadioViewStyle>
  );
}

export default RadioView;
