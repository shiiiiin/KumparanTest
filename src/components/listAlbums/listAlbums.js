import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dimmer, Grid, Loader } from "semantic-ui-react";
import { getAlbums } from "../../actions/actions";

const ListAlbums = () => {
  const dispatch = useDispatch();
  const albums = useSelector((state) => state.albums.albums.data);
  const users = useSelector((state) => state.user?.users?.data ?? []);
  const isLoading = useSelector(
    (state) => state.albums?.albums.meta?.isLoading ?? false
  );
  const error = useSelector(
    (state) => state.albums?.albums?.meta?.error ?? null
  );

  useEffect(() => {
    dispatch(getAlbums());
  }, []);

  if (isLoading) {
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );
  }

  return (
    <Grid style={{ marginTop: "20px" }}>
      {error ? (
        <Grid.Row>
          <Grid.Column>{error}</Grid.Column>
        </Grid.Row>
      ) : (
        albums.map((album) => {
          const user = users?.find((user) => user.id === album.userId) ?? null;
          return (
            <Grid.Row key={album.id}>
              <Grid.Column width={16}>
                <p style={{ margin: "0", display: "flex" }}>
                  <b>{album.title}</b>
                  <p style={{ color: "gray", marginLeft: "5px" }}>
                    {" "}
                    by {user.username}
                  </p>
                </p>

                <Button
                  content="See Photos"
                  style={{ background: "transparent", padding: "0" }}
                />
              </Grid.Column>
            </Grid.Row>
          );
        })
      )}
    </Grid>
  );
};

export default ListAlbums;
