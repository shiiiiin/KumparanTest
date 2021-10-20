import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dimmer, Divider, Item, Loader } from "semantic-ui-react";
import { getPostList } from "../../actions/actions";
import userImage from "./../../assets/mexican.png";

const ListPost = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post?.posts?.data ?? []);
  const users = useSelector((state) => state.user?.users?.data ?? []);
  const isLoading = useSelector(
    (state) => state.post?.posts?.meta?.isLoading ?? false
  );
  const error = useSelector((state) => state.post?.posts?.meta?.error ?? null);

  useEffect(() => {
    users && dispatch(getPostList());
  }, [users]);

  if (isLoading) {
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );
  }
  return (
    <Item.Group>
      {error ? (
        <p>{error}</p>
      ) : (
        posts?.reverse()?.map((post) => {
          const user = users.find((user) => user.id === post.userId);
          return (
            <Item key={post.id}>
              <Item.Image size="mini" src={userImage} />
              <Item.Content>
                <Item.Header as="a">{post.title}</Item.Header>
                <Item.Meta>{user.username}</Item.Meta>
                <Item.Description>{post.body}</Item.Description>
                <Item.Extra>Additional Details</Item.Extra>
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
