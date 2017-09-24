import React from 'react';
import PropTypes from 'prop-types';

const Field = ({ value, onChange, label }) => (
  <div className="field">
    <label className="field-label">
      {label}
    </label>
    <input
      value={value}
      onChange={onChange}
      placeholder={label}
      type="text"
      className="field-input"
    />
  </div>
);

Field.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Field.defaultProps = {
  value: '',
};

export default Field;
