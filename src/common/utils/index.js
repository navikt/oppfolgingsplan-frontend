import PropTypes from 'prop-types';

export const Vis = ({ hvis, children, render }) => {
  return hvis && render ? render() : hvis && children ? children : null;
};

Vis.propTypes = {
  hvis: PropTypes.bool,
  children: PropTypes.node,
};
