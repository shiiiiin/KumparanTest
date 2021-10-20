import React, { useState } from "react";
import { Button, Card, Grid, Image, Segment } from "semantic-ui-react";
import PropTypes from "prop-types";
import { Collapse } from "react-collapse";
import { useDispatch, useSelector } from "react-redux";
import { getPhotosByAlbum } from "../../actions/actions";
import DetailPhoto from "./detailPhoto";

const ListPhotos = ({ album }) => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.albums.photos);
  const selectedPhotos = photos[album.id.toString()];
  const [openCollapse, setOpenCollapse] = useState(false);
  const [openModalDetail, setopenModalDetail] = useState(false);
  const [image, setimage] = useState("");
  const handleSeePhotos = () => {
    setOpenCollapse(!openCollapse);
    if (!openCollapse) dispatch(getPhotosByAlbum(album.id));
  };
  const handleOpenDetail = (image) => {
    setimage(image);
    setopenModalDetail(true);
  };
  const handleCloseDetail = () => {
    setimage("");
    setopenModalDetail(false);
  };
  return (
    <div>
      <Button
        content={(openCollapse ? "Hide" : "See") + " Photos"}
        style={{ background: "transparent", padding: "0" }}
        onClick={handleSeePhotos}
      />
      <Collapse isOpened={openCollapse}>
        <Segment style={{ width: "100%" }}>
          <Grid>
            <Grid.Row columns={5}>
              {selectedPhotos
                ? selectedPhotos.map((photo) => (
                    <Grid.Column key={photo.id}>
                      <Card style={{ textAlign: "center", margin: "5px" }}>
                        <Image
                          style={{
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                            width: "50%",
                            cursor: "zoom-in",
                          }}
                          src={photo.thumbnailUrl}
                          size="small"
                          onClick={() => handleOpenDetail(photo.url)}
                        />
                        <p>{photo.title}</p>
                      </Card>
                    </Grid.Column>
                  ))
                : "Loading..."}
            </Grid.Row>
          </Grid>
        </Segment>
      </Collapse>
      <DetailPhoto
        image={image}
        isOpen={openModalDetail}
        handleClose={handleCloseDetail}
      />
    </div>
  );
};

ListPhotos.propTypes = {
  album: PropTypes.object,
};

export default ListPhotos;
