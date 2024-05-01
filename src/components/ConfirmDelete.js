import { Button, Card, CardBody, CardHeader, Modal, Row } from "reactstrap";

function ConfirmDelete({ visible, setVisible, onSuccess = () => {} }) {
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
            <Button color="primary" onClick={onSuccess}>
              Xóa
            </Button>
          </Row>
        </CardBody>
      </Card>
    </Modal>
  );
}

export default ConfirmDelete;
