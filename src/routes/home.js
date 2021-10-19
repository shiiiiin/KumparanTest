import React from "react";
import { Grid } from "semantic-ui-react";
import { ListUser } from "../components";

const Home = () => {
  return (
    <div>
      {/* <Button>Klik</Button> */}
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <ListUser />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Home;
