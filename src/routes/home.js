import React, { useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import { ListUser, ListPost, AddPost } from "../components";

const Home = () => {
  const [menuActive, setMenuActive] = useState("posts");

  const handleMenu = (e) => {
    setMenuActive(e.target.value);
  };
  return (
    <div>
      {/* <Button>Klik</Button> */}
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <ListUser />
          </Grid.Column>
          <Grid.Column width={13}>
            <div style={{ display: "flex", marginTop: "20px" }}>
              <Button
                content="See Posts"
                active={menuActive === "posts"}
                color={menuActive === "posts" ? "google plus" : ""}
                value="posts"
                onClick={handleMenu}
              />
              <Button
                content="See Albums"
                active={menuActive === "albums"}
                color={menuActive === "albums" ? "google plus" : ""}
                value="albums"
                onClick={handleMenu}
              />
            </div>
            {menuActive === "posts" ? (
              <>
                <AddPost />
                <ListPost />
              </>
            ) : null}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Home;
