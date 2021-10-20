import React, { useEffect, useState } from "react";
import { Button, Form, Header, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { putPostting } from "../../actions/actions";

const ModalEditPost = ({ open, data, closeModal }) => {
  const dispatch = useDispatch();

  const isLoadingEditPosting = useSelector(
    (state) => state.post.isLoadingEditPosting
  );
  const errorEditPosting = useSelector(
    (state) => state.post.isLoadingEditPosting
  );

  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (open) {
      setBody(data.body);
      setTitle(data.title);
    }
  }, [open]);

  const handleChangeBody = (e) => {
    setBody(e.target.value);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleEditPosting = async () => {
    await dispatch(
      putPostting({ id: data.id, userId: data.userId, title, body })
    );
    closeModal();
  };
  return (
    <Modal closeIcon open={open} onClose={closeModal}>
      <Header icon="edit" content="Edit" />
      <Modal.Content>
        <Form reply>
          <Form.Input
            value={title}
            onChange={handleChangeTitle}
            placeholder="title"
          />
          <Form.TextArea
            value={body}
            onChange={handleChangeBody}
            placeholder="description"
          />
          {errorEditPosting && (
            <p style={{ color: "red" }}>{errorEditPosting}</p>
          )}
          <Button
            content={isLoadingEditPosting ? "Loading..." : `Save`}
            labelPosition="left"
            icon="edit"
            primary
            onClick={handleEditPosting}
          />
        </Form>
      </Modal.Content>
    </Modal>
  );
};

ModalEditPost.propTypes = {
  open: PropTypes.bool,
  data: PropTypes.object,
  closeModal: PropTypes.func,
};

export default ModalEditPost;
