import React from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
// import { Button } from "semantic-ui-react";
import PropTypes from "prop-types";

const DetailPhoto = ({ image, isOpen, handleClose }) => {
  return (
    <div>
      {isOpen && (
        <Lightbox
          mainSrc={image}
          //   nextSrc={images[(photoIndex + 1) % images.length]}
          //   prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={handleClose}
          //   onMovePrevRequest={() =>
          //     this.setState({
          //       photoIndex: (photoIndex + images.length - 1) % images.length,
          //     })
          //   }
          //   onMoveNextRequest={() =>
          //     this.setState({
          //       photoIndex: (photoIndex + 1) % images.length,
          //     })
          //   }
        />
      )}
    </div>
  );
};

DetailPhoto.propTypes = {
  image: PropTypes.string,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default DetailPhoto;
