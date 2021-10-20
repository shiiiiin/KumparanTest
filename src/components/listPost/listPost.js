import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dimmer, Divider, Item, Loader } from "semantic-ui-react";
import { getCommentsByPostId, getPostList } from "../../actions/actions";
import userImage from "./../../assets/mexican.png";
import ListComments from "./listComments";
const ListPost = () => {
  const dispatch = useDispatch();
  const [isGotComments, setIsGotComment] = useState(false);
  const posts = useSelector((state) => state.post?.posts?.data ?? []);
  const users = useSelector((state) => state.user?.users?.data ?? []);
  const isLoading = useSelector(
    (state) => state.post?.posts?.meta?.isLoading ?? false
  );
  const error = useSelector((state) => state.post?.posts?.meta?.error ?? null);

  useEffect(() => {
    dispatch(getPostList());
  }, []);

  useEffect(() => {
    if (posts.length !== 0 && !isGotComments) {
      dispatch(getCommentsByPostId());
      setIsGotComment(true);
    }
  }, [posts, isGotComments]);

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
        posts?.reverse()?.map((post) => {
          const user = users?.find((user) => user.id === post.userId) ?? null;
          return (
            <Item key={post.id}>
              <Item.Image size="mini" src={userImage} />
              <Item.Content>
                <Item.Header as="a">{post.title}</Item.Header>
                <Item.Meta>{user?.username ?? "Anonim"}</Item.Meta>
                <Item.Description>{post.body}</Item.Description>
                <ListComments comments={post.comments} />
                <Divider />
              </Item.Content>
            </Item>
          );
        })
      )}
    </Item.Group>
  );
};

export default ListPost;
