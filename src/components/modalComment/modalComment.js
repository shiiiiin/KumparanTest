import React, { useEffect, useState } from "react";
import { Button, Form, Header, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { putReply } from "../../actions/actions";

const ModalComment = ({ open, data, closeModal }) => {
  const dispatch = useDispatch();

  const [reply, setReply] = useState("");

  useEffect(() => {
    if (open) {
      setReply(data.body);
    }
  }, [open]);

  const handleChange = (e) => {
    setReply(e.target.value);
  };

  const handleEditReply = async () => {
    await dispatch(putReply(data.postId, data.id, reply));
    closeModal();
  };

  return (
    <Modal closeIcon open={open} onClose={closeModal}>
      <Header icon="edit" content="Edit" />
      <Modal.Content>
        <Form reply>
          <Form.TextArea value={reply} onChange={handleChange} />
          <Button
            content={`Save`}
            labelPosition="left"
            icon="edit"
            primary
            onClick={handleEditReply}
          />
        </Form>
      </Modal.Content>
    </Modal>
  );
};

ModalComment.propTypes = {
  open: PropTypes.bool,
  data: PropTypes.object,
  closeModal: PropTypes.func,
};

export default ModalComment;
