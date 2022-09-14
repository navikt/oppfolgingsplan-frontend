import React from 'react';
// eslint-disable-next-line import/extensions
import Modal from 'nav-frontend-modal';
import PropTypes from 'prop-types';

const Lightbox = ({ lukkLightbox, children }) => {
  const appEl = document.getElementById('maincontent');
  Modal.setAppElement(appEl);
  return (
    <Modal isOpen closeButton onRequestClose={lukkLightbox}>
      {children}
    </Modal>
  );
};

Lightbox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
  lukkLightbox: PropTypes.func,
};

export default Lightbox;
