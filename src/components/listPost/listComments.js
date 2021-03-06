import React, { useState } from "react";
import { Button, Item, Comment, Header, Form } from "semantic-ui-react";
import { Collapse } from "react-collapse";
import PropTypes from "prop-types";
import userImage from "./../../assets/mexican.png";
import { useDispatch, useSelector } from "react-redux";
import { postReply, deleteReply } from "../../actions/actions";
import { ModalEditComment } from "..";

const ListComments = ({ comments, postId }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.post.errorPostReply);
  const isLoadingPostReply = useSelector(
    (state) => state.post.isLoadingPostReply
  );
  const loginUser = useSelector((state) => state.user.loginUser);

  const commentLength = comments ? comments.length : 0;

  const [isOpenComment, setIsOpenComment] = useState(false);
  const [reply, setReply] = useState("");
  const [isOpenModalEditComment, setisOpenModalEditComment] = useState(false);
  const [selectedComment, setselectedComment] = useState(null);

  const handleOpenComments = () => {
    setIsOpenComment(true);
  };

  const handleCloseComments = () => {
    setIsOpenComment(false);
  };

  const handleChange = (e) => {
    setReply(e.target.value);
  };

  const handlePostComment = async () => {
    postId && (await dispatch(postReply(postId, reply)));
    setReply("");
  };

  const handleEdit = (dataComment) => {
    setisOpenModalEditComment(true);
    setselectedComment(dataComment);
  };

  const handleCloseModalEditComment = () => {
    setisOpenModalEditComment(false);
    setselectedComment(null);
  };

  const handleDelete = (commentId) => {
    postId && dispatch(deleteReply(postId, commentId));
  };
  return (
    <Item.Extra>
      <Button
        style={{ background: "transparent", padding: "0" }}
        onClick={handleOpenComments}
      >
        {`${commentLength} ${commentLength > 1 ? "comments" : "comment"}`}
      </Button>
      <Collapse isOpened={isOpenComment}>
        <div>
          <Comment.Group>
            <Header as="h3" dividing></Header>

            {comments &&
              comments.map((comment) => (
                <Comment key={comment.id}>
                  <Comment.Avatar src={userImage} />
                  <Comment.Content>
                    <Comment.Author as="a">{comment.email}</Comment.Author>
                    <Comment.Text>{comment.body}</Comment.Text>
                    {loginUser.email === comment.email && (
                      <Comment.Action style={{ display: "flex" }}>
                        <p
                          style={{ marginRight: "10px" }}
                          onClick={() => handleEdit(comment)}
                        >
                          Edit
                        </p>
                        <p onClick={() => handleDelete(comment.id)}>Delete</p>
                      </Comment.Action>
                    )}
                  </Comment.Content>
                </Comment>
              ))}

            <Form reply>
              <Form.TextArea value={reply} onChange={handleChange} />
              {error && <p style={{ color: "red" }}>{error}</p>}
              <Button
                content={isLoadingPostReply ? "Loading..." : `Add Comment`}
                labelPosition="left"
                icon="edit"
                primary
                onClick={handlePostComment}
              />
            </Form>
          </Comment.Group>
        </div>
        <br />
        <Button
          style={{ background: "transparent", padding: "0" }}
          onClick={handleCloseComments}
        >
          Hide Comment
        </Button>
      </Collapse>
      <ModalEditComment
        open={isOpenModalEditComment}
        data={selectedComment}
        closeModal={handleCloseModalEditComment}
      />
    </Item.Extra>
  );
};

ListComments.propTypes = {
  comments: PropTypes.array,
  postId: PropTypes.number,
};

export default ListComments;
