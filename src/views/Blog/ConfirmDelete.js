import React, { useState } from "react";

import { Button, Card, CardBody, CardHeader, Modal, Row } from "reactstrap";

// core components

import { FILE_URL, requestFetch, uploadFile } from "service/request";
import { notify } from "utils/notification";

function ConfirmDelete({
  deleteId,
  visible,
  setVisible,
  onSuccess = () => {},
}) {
  const handleSubmit = async () => {
    requestFetch("delete", "/vape-dong-anh/blog/" + deleteId, {}).then(
      (res) => {
        if (res.code == 0) {
          notify("Xóa thành công");
          onClose();
          onSuccess();
        } else {
          notify(res.message, "danger");
        }
      }
    );
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Modal onExit={onClose} onClose={onClose} isOpen={visible}>
      <Card>
        <CardHeader>
          <h5 className="title">Ban có chắc muốn xóa</h5>
        </CardHeader>
        <CardBody>
          <Row style={{ padding: "0 10px" }}>
            <Button
              color="white"
              style={{ marginRight: "auto" }}
              onClick={() => {
                setVisible(!visible);
              }}
            >
              Hủy
            </Button>
            <Button color="primary" onClick={handleSubmit}>
              Xóa
            </Button>
          </Row>
        </CardBody>
      </Card>
    </Modal>
  );
}

export default ConfirmDelete;
