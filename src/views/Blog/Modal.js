import React, { useState } from "react";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  Row,
} from "reactstrap";

// core components

import RadioView from "components/RadioView";
import { DatePicker } from "reactstrap-date-picker";
import { FILE_URL, requestFetch, uploadFile } from "service/request";
import { notify } from "utils/notification";
import AddItem from "components/Editable/AddItem";
import TextArea from "components/Editable/TextArea";
import ImageUpload from "components/Editable/ImageUpload";

function ModalManager({ visible, setVisible, onSuccess = () => {}, data }) {
  //   const dataRef = React.useRef({});
  const [state, _setState] = useState({
    modalData: {},
    groups: [{ type: "edit" }],
    draft: { groups: [{ type: "edit" }] },
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  //   dataRef.current = data ? { ...data } : {};
  //   if (!data) {
  //     dataRef.current = {
  //       fullname: "",
  //     };
  //   }

  React.useEffect(() => {
    // dataRef.current = { ...(data || { fullname: "" }) };
    console.log(data, state, "state");
    setState({
      modalData: data || {},
      groups:
        data?._id && data.contents?.length
          ? data.contents
          : state.draft?.groups,
    });
  }, [data]);

  React.useEffect(() => {
    const draft = localStorage.getItem("draftPost2");
    if (draft) {
      const _draft = JSON.parse(draft);

      setState({
        title: _draft.title,
        groups: _draft.groups,
        draft: _draft,
      });
    } else {
      setState({
        title: "",
        groups: [{ type: "edit" }],
        _draft: { groups: [{ type: "edit" }] },
      });
    }
  }, []);

  const handleSubmit = async () => {
    const data = state.modalData;

    const customGroups = [...state.groups].filter((i) => i.type != "edit");
    for (let i = 0; i < customGroups.length; i++) {
      const item = { ...customGroups[i] };
      if (item.type != "img" || item.value.includes("http")) continue;
      let res = await fetch(item.value);
      const blob = await res.blob();
      const file = new File([blob], "image.png", {
        type: "image/png",
      });
      res = await uploadFile(file);
      item.value = FILE_URL + res.filename;
      customGroups[i] = item;
    }

    if (state.banner) {
      let res = await fetch(state.banner);
      const blob = await res.blob();
      const file = new File([blob], "image.png", {
        type: "image/png",
      });
      res = await uploadFile(file);
      data.banner = FILE_URL + res.filename;
    }

    data.contents = customGroups.map(({ title, ...rest }) => rest);

    requestFetch(data?._id ? "put" : "post", "/vape-dong-anh/blog", data).then(
      (res) => {
        if (res.code == 0) {
          notify("Thêm thành công");
          onClose();
          onSuccess();
        } else {
          notify(res.message, "danger");
        }
      }
    );
  };

  const onChange = (key) => (e) => {
    const newData = {
      ...state.modalData,
      [key]: typeof e == "string" ? e : e.target?.value || "",
    };
    // dataRef.current[key] = e.target?.value || e;
    setState({ modalData: newData });
    // console.log(dataRef.current, "dataRef.current", e.target.value);
  };

  const onRemove = (idx: number) => () => {
    if (state.groups?.length <= 1) return;
    setState({
      groups: [...state.groups].filter((_, i) => i != idx),
    });
  };

  const onAddBottom = (index: number) => () => {
    const newGroups = [...state.groups];
    newGroups.splice(index + 1, 0, { type: "edit" });
    console.log(newGroups, "newGroups");

    // newGroups;
    setState({ groups: newGroups });
  };

  const onChangeContent = (item: any, idx: number) => (payload: any) => {
    const newGroups = [...state.groups];

    if (["h2", "p", "img"].includes(item.type)) {
      const newItem = { ...item };
      newItem.value = payload;
      newGroups[idx] = newItem;
      setState({ groups: newGroups });
    }
  };

  const onChangeBanner = (item) => {
    setState({ banner: item });
  };

  const isEdit = !!data?._id;

  const onClose = () => {
    setState({ groups: [{ type: "edit" }], banner: null, modalData: {} });
    setVisible(false);
  };

  return (
    <Modal onExit={onClose} onClose={onClose} isOpen={visible}>
      <Card>
        <CardHeader>
          <h5 className="title">{isEdit ? "Chỉnh sửa" : "Tạo mới"}</h5>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col md="12">
                <FormGroup>
                  <label>Tiêu đề</label>
                  <Input
                    placeholder="Nhập tiêu đề"
                    type="text"
                    value={state.modalData.title || ""}
                    onChange={onChange("title") || ""}
                  />
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <label>Thứ tự ưu tiên</label>
                  <Input
                    placeholder="Nhập số thứ tự ưu tiên"
                    type="number"
                    value={state.modalData.priority || ""}
                    onChange={onChange("priority") || ""}
                  />
                </FormGroup>
              </Col>
              <Col md="12">
                <label>Ảnh banner</label>
                <ImageUpload
                  item={{ value: state.modalData?.banner }}
                  notContent={true}
                  onChange={onChangeBanner}
                />
              </Col>

              <Col md="12">
                <label>Nội dung blog</label>
              </Col>

              {state.groups?.map((item, idx) => (
                <Col md="12">
                  {item.type === "edit" ? (
                    <AddItem
                      key={idx}
                      onAdd={(item) => {
                        const newGroups = [...state.groups];
                        newGroups[idx] = item;
                        setState({ groups: newGroups });
                      }}
                      onAddBottom={onAddBottom(idx)}
                      onRemove={onRemove(idx)}
                    />
                  ) : item.type == "img" ? (
                    <ImageUpload
                      key={idx}
                      item={item}
                      onAddBottom={onAddBottom(idx)}
                      onRemove={onRemove(idx)}
                      onChange={onChangeContent(item, idx)}
                    />
                  ) : (
                    <TextArea
                      key={idx}
                      item={item}
                      style={item.type == "h2" ? { fontWeight: "500" } : {}}
                      onAddBottom={onAddBottom(idx)}
                      onRemove={onRemove(idx)}
                      onChange={onChangeContent(item, idx)}
                    />
                  )}
                </Col>
              ))}
              {state.error}
              <div className="row px-3">
                <div className="col-12">
                  {/* {state.loading ? (
                    <div>Đang đăng ...</div>
                  ) : (
                    <button
                      className="btn btn-primary w-100"
                      onClick={async () => {
                        setState({ loading: true });
                        const customGroups = [...state.groups].filter(
                          (i) => i.type != "edit"
                        );
                        for (let i = 0; i < customGroups.length; i++) {
                          const item = { ...customGroups[i] };
                          if (item.type != "img") continue;
                          let res: any = await fetch(item.value);
                          const blob = await res.blob();
                          const file = new File([blob], "image.png", {
                            type: "image/png",
                          });
                          res = await uploadFile(file);
                          item.value = FILE_URL + res.filename;
                          customGroups[i] = item;
                        }
                        const path = toNonAccentVietnamese(
                          customGroups[0].value
                        )
                          .replaceAll(" ", "-")
                          .toLowerCase();
                        fetchCreatePost({
                          title: state.title,
                          content: customGroups
                            // .filter((_: any, i: number) => i != 0)
                            .map(({ title, ...rest }: any) => rest),
                          path,
                        })
                          .then((res) => {
                            if (res && res.code === 200)
                              router.push("/blog/" + path);
                            else setState({ error: res.message });
                          })
                          .catch((e) => {
                            setState({ error: e?.toString() });
                          })
                          .finally(() => {
                            setState({ loading: false });
                          });
                      }}
                    >
                      Đăng
                    </button>
                  )} */}
                </div>
                <div className="col-12 mt-4">
                  <div>
                    <i>Lưu ý: Lưu nháp sẽ không lưu lại ảnh</i>
                  </div>
                </div>
              </div>
            </Row>
            <Row>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => {
                  localStorage.setItem(
                    "draftPost2",
                    JSON.stringify({
                      title: state.title,
                      groups: state.groups.map((item: any) => {
                        if (item.type === "img") {
                          return { ...item, value: "" };
                        }
                        return item;
                      }),
                    })
                  );
                  notify("Lưu nháp thành công");
                }}
              >
                Lưu nháp
              </button>
              <Button
                color="white"
                style={{ marginLeft: "auto" }}
                onClick={() => {
                  setState({ groups: [{ type: "edit" }] });
                  setVisible(!visible);
                }}
              >
                Hủy
              </Button>
              <Button color="primary" onClick={handleSubmit}>
                Lưu
              </Button>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Modal>
  );
}

export default ModalManager;
