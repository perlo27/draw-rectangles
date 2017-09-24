import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import { validateSize, validatePosition, isRequiredFieldsFilled } from '../helpers/validators';
import { requiredFieldError } from '../helpers/errors';
import { labels, rectangleProps } from '../constants';
import { getAllowedWidth } from '../helpers';
import config from '../config';

const initialState = {
  [rectangleProps.WIDTH]: '',
  [rectangleProps.HEIGHT]: '',
  [rectangleProps.TOP]: '',
  [rectangleProps.LEFT]: '',
  notFilledRequiredFields: config.requiredFormProps,
  showErrors: false,
};

class RectanglePropsForm extends Component {

  state = { ...initialState };

  handleAdd = () => {
    const { addRectangle } = this.props;
    const { width, height, top, left, notFilledRequiredFields } = this.state;

    if (isRequiredFieldsFilled(notFilledRequiredFields)) {
      addRectangle({ width, height, top, left, key: Date.now() });
      this.setState({ ...initialState });
    } else {
      this.setState({ showErrors: true });
    }
  };

  editProp = prop => e => {
    const { notFilledRequiredFields } = this.state;
    const { availableWidth } = this.props;
    const value = e.target.value;
    switch (prop) {
      case rectangleProps.WIDTH:
        if (validateSize(value)) {
          this.setState({
            [prop]: getAllowedWidth(+value, availableWidth),
            notFilledRequiredFields: notFilledRequiredFields.filter(field => field !== prop),
          });
        }
        break;
      case rectangleProps.HEIGHT:
        if (validateSize(value)) {
          this.setState({
            [prop]: +value,
            notFilledRequiredFields: notFilledRequiredFields.filter(field => field !== prop),
          });
        }
        break;
      case rectangleProps.TOP:
      case rectangleProps.LEFT:
        if (validatePosition(value)) {
          this.setState({ [prop]: +value });
        }
        break;
      default:
        return;
    }
  };

  renderAddRectangleButton = () => {
    const { isAllowedToAddRectangle } = this.props;
    if (isAllowedToAddRectangle) {
      return <button onClick={this.handleAdd} className="button button-add">{labels.ADD_RECTANGLE_BUTTON}</button>;
    }
    return null;
  };

  renderErrors = () => {
    const { showErrors, notFilledRequiredFields } = this.state;
    if (showErrors) {
      return (
        <div className="error">
          {notFilledRequiredFields.map(fieldName => (
            <div key={fieldName}>{requiredFieldError(fieldName)}</div>
          ))}
        </div>
      );
    }
    return null;
  };

  render() {
    return (
      <div className="rectangle-form-wrapper">
        <div className="row">
          <div className="column">
            <Field
              label={labels.WIDTH}
              onChange={this.editProp(rectangleProps.WIDTH)}
              value={this.state[rectangleProps.WIDTH]}
            />
            <Field
              label={labels.HEIGHT}
              onChange={this.editProp(rectangleProps.HEIGHT)}
              value={this.state[rectangleProps.HEIGHT]}
            />
          </div>
          <div className="column">
            <Field
              label={labels.TOP}
              onChange={this.editProp(rectangleProps.TOP)}
              value={this.state[rectangleProps.TOP]}
            />
            <Field
              label={labels.LEFT}
              onChange={this.editProp(rectangleProps.LEFT)}
              value={this.state[rectangleProps.LEFT]}
            />
          </div>
        </div>
        <div className="row fixed-height-60">
          {this.renderAddRectangleButton()}
          {this.renderErrors()}
        </div>
      </div>
    );
  }
}

RectanglePropsForm.propTypes = {
  isAllowedToAddRectangle: PropTypes.bool.isRequired,
  rectangles: PropTypes.arrayOf(PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })).isRequired,
  availableWidth: PropTypes.number.isRequired,
  addRectangle: PropTypes.func.isRequired,
};


export default RectanglePropsForm;