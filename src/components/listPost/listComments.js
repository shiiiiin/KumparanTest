import React, { useState } from "react";
import { Button, Item, Comment, Header, Form } from "semantic-ui-react";
import { Collapse } from "react-collapse";
import PropTypes from "prop-types";
import userImage from "./../../assets/mexican.png";

const ListComments = ({ comments }) => {
  const [isOpenComment, setIsOpenComment] = useState(false);

  const handleOpenComments = () => {
    setIsOpenComment(true);
  };

  const handleCloseComments = () => {
    setIsOpenComment(false);
  };
  const commentLength = comments ? comments.length : 0;
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
              <Form.TextArea />
              <Button
                content="Add Reply"
                labelPosition="left"
                icon="edit"
                primary
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
};

export default ListComments;
