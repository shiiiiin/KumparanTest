import React from "react";
import { Grid } from "semantic-ui-react";
import { ListUser, ListPost, AddPost } from "../components";

const Home = () => {
  return (
    <div>
      {/* <Button>Klik</Button> */}
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <ListUser />
          </Grid.Column>
          <Grid.Column width={13}>
            <AddPost />
            <ListPost />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Home;
