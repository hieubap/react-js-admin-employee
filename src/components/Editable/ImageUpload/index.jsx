import React, { Fragment, LegacyRef, useEffect, useRef, useState } from "react";
import ItemContainer from "../ItemContainer";

function ImageUpload({
  item,
  onAddBottom,
  onRemove,
  onChange,
  notContent = false,
}) {
  const [file, setFile] = useState();
  const [fileUrl, setFileUrl] = useState();
  const preview = useRef();

  useEffect(() => {
    setFileUrl(item?.value || "");
  }, [item?.value]);

  const Container = notContent ? Fragment : ItemContainer;

  return (
    <Container onRemove={onRemove} onAddBottom={onAddBottom}>
      <div style={{ width: "90%", padding: "5px 0" }}>
        {/* <label htmlFor="avatar">Choose a profile picture:</label> */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img ref={preview} src={fileUrl} style={{ width: "100%" }} />
        </div>

        <input
          type="file"
          // id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            console.log(e.target.files?.[0], "e.target.files?.[0]");

            setFile(e.target.files?.[0]);
            const reader = new FileReader();

            reader.onload = function (e) {
              preview.current.src = e.target?.result;
              if (e.target?.result) {
                setFileUrl(e.target.result);
                if (onChange) {
                  onChange(e.target.result);
                }
              }
            };

            const file = e.target.files?.[0];

            if (file) reader.readAsDataURL(file);
          }}
        />
      </div>
    </Container>
  );
}

export default ImageUpload;
