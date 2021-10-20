import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { postPosting } from "../../actions/actions";

const AddPost = () => {
  const dispatch = useDispatch();
  const isLoadingPosting = useSelector((state) => state.post.isLoadingPosting);
  const errorPosting = useSelector((state) => state.post.errorPosting);
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");

  const handleChangeBody = (e) => {
    setBody(e.target.value);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handlePosting = async () => {
    await dispatch(postPosting(title, body));
    setBody("");
    setTitle("");
  };
  return (
    <div style={{ width: "90%", marginTop: "20px" }}>
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
        {errorPosting && <p style={{ color: "red" }}>{errorPosting}</p>}
        <Button
          content={isLoadingPosting ? "Loading..." : `Post`}
          labelPosition="left"
          icon="edit"
          primary
          onClick={handlePosting}
        />
      </Form>
    </div>
  );
};

export default AddPost;
