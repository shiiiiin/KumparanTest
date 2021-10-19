import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Feed, Dimmer, Loader } from "semantic-ui-react";
import { getUserList } from "./../../actions/actions";
import userImage from "./../../assets/mexican.png";

const ListUser = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user?.users?.data ?? []);
  const isLoading = useSelector(
    (state) => state.user?.users?.meta?.isLoading ?? false
  );
  const error = useSelector((state) => state.user?.users?.meta?.error ?? null);

  useEffect(() => {
    dispatch(getUserList());
  }, []);

  return (
    <Card>
      {isLoading && (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      )}
      <Card.Content>
        <Card.Header>User List</Card.Header>
      </Card.Content>
      <Card.Content>
        {error ? (
          <Feed>{error}</Feed>
        ) : (
          <Feed>
            {users.map((user) => (
              <Feed.Event key={user.id}>
                <Feed.Label image={userImage} />
                <Feed.Content>
                  <Feed.Date content={user.username} />
                  <Feed.Summary>
                    {user.name}
                    <br /> post album
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            ))}
          </Feed>
        )}
      </Card.Content>
    </Card>
  );
};

export default ListUser;
