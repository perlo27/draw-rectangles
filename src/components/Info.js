import React from 'react';
import PropTypes from 'prop-types';

const Info = ({ availableWidth, allowedToAddRectangleCount }) => (
  <div className="info">
    <div>You can add <span className="bold-text">{allowedToAddRectangleCount}</span> rectangle(s)</div>
    <div>Available width: <span className="bold-text">{availableWidth}</span> (sum of all rectangles widths can't be larger then this number)</div>
  </div>
);

Info.propTypes = {
  availableWidth: PropTypes.number.isRequired,
  allowedToAddRectangleCount: PropTypes.number.isRequired,
};

export default Info;
