import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ smallImage, largeImage, description }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Item>
      <Image onClick={toggleModal} src={smallImage} alt={description} />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt={description} />
        </Modal>
      )}
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};