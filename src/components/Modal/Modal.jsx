import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ImageBox, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const scrollY = window.scrollY;
    const bodyStyle = document.body.style;

    bodyStyle.position = 'fixed';
    bodyStyle.top = `-${scrollY}px`;
    bodyStyle.left = '25px';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      const bodyStyle = document.body.style;
      const scrollY = bodyStyle.top;
      bodyStyle.position = '';
      bodyStyle.top = '';
      bodyStyle.left = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    e.currentTarget === e.target && onClose();
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ImageBox>{children}</ImageBox>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};
