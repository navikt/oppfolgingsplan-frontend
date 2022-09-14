import PropTypes from 'prop-types';

const meta = PropTypes.shape({
  error: PropTypes.string,
  touched: PropTypes.bool,
});

const input = PropTypes.shape({
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onDragStart: PropTypes.func,
  onDrop: PropTypes.func,
  onFocus: PropTypes.func,
});

export const fieldPropTypes = { meta, input };
