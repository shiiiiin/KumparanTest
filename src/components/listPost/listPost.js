import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dimmer, Divider, Item, Loader } from "semantic-ui-react";
import { getCommentsByPostId, getPostList } from "../../actions/actions";
import ModalEditPost from "../modalEditPost/modalEditPost";
import userImage from "./../../assets/mexican.png";
import ListComments from "./listComments";
const ListPost = () => {
  const dispatch = useDispatch();
  const [isGotComments, setIsGotComment] = useState(false);
  const [isOpenModalEditPost, setisOpenModalEditPost] = useState(false);
  const [selectedPost, setselectedPost] = useState(null);
  const posts = useSelector((state) => state.post?.posts?.data ?? []);
  const users = useSelector((state) => state.user?.users?.data ?? []);
  const loginUser = useSelector((state) => state.user.loginUser);
  const isLoading = useSelector(
    (state) => state.post?.posts?.meta?.isLoading ?? false
  );
  const error = useSelector((state) => state.post?.posts?.meta?.error ?? null);

  useEffect(() => {
    dispatch(getPostList());
  }, []);

  useEffect(() => {
    if (posts.length !== 0 && !isGotComments) {
      dispatch(getCommentsByPostId({}));
      setIsGotComment(true);
    }
  }, [posts, isGotComments]);

  const handleEdit = (post) => {
    setisOpenModalEditPost(true);
    setselectedPost(post);
  };

  const handleCloseModal = () => {
    setisOpenModalEditPost(false);
  };
  if (isLoading) {
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );
  }
  return (
    <Item.Group style={{ paddingTop: "20px" }}>
      {error ? (
        <p>{error}</p>
      ) : (
        posts &&
        posts.length > 0 &&
        posts.map((post) => {
          const user = users?.find((user) => user.id === post.userId) ?? null;
          return (
            <Item key={post.id}>
              <Item.Image size="mini" src={userImage} />
              <Item.Content>
                <Item.Header as="a">{post.title}</Item.Header>
                <Item.Meta>{user?.username ?? "Anonim"}</Item.Meta>
                <Item.Description>
                  <p>{post.body}</p>
                  {loginUser.id == post.userId && (
                    <div style={{ display: "flex" }}>
                      <Button
                        style={{
                          background: "transparent",
                          padding: 0,
                          color: "blue",
                          marginRight: "20px",
                        }}
                        onClick={() => handleEdit(post)}
                      >
                        Edit
                      </Button>
                      <Button
                        style={{
                          background: "transparent",
                          padding: 0,
                          color: "blue",
                        }}
                        // onClick={() => handleDelete(comment.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </Item.Description>
                <ListComments comments={post.comments} postId={post.id} />
                <Divider />
              </Item.Content>
            </Item>
          );
        })
      )}
      <ModalEditPost
        open={isOpenModalEditPost}
        data={selectedPost}
        closeModal={handleCloseModal}
      />
    </Item.Group>
  );
};

export default ListPost;
