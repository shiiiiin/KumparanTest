import React, { useState } from "react";
import { Button, Item, Comment, Header, Form } from "semantic-ui-react";
import { Collapse } from "react-collapse";
import PropTypes from "prop-types";
import userImage from "./../../assets/mexican.png";
import { useDispatch, useSelector } from "react-redux";
import { postReply } from "../../actions/actions";

const ListComments = ({ comments, postId }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.post.errorPostReply);
  const isLoadingPostReply = useSelector(
    (state) => state.post.isLoadingPostReply
  );

  const commentLength = comments ? comments.length : 0;

  const [isOpenComment, setIsOpenComment] = useState(false);
  const [reply, setReply] = useState("");

  const handleOpenComments = () => {
    setIsOpenComment(true);
  };

  const handleCloseComments = () => {
    setIsOpenComment(false);
  };

  const handleChange = (e) => {
    setReply(e.target.value);
  };

  const handlePostComment = () => {
    postId && dispatch(postReply(postId, reply));
    setReply("");
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
                  </Comment.Content>
                </Comment>
              ))}

            <Form reply>
              <Form.TextArea value={reply} onChange={handleChange} />
              {error && <p style={{ color: "red" }}>{error}</p>}
              <Button
                content={isLoadingPostReply ? "Loading..." : "Add Reply"}
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
    </Item.Extra>
  );
};

ListComments.propTypes = {
  comments: PropTypes.array,
  postId: PropTypes.number,
};

export default ListComments;
