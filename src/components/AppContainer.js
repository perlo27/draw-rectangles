import React, { Component } from 'react';
import Rectangle from './Rectangle';
import RectanglePropsForm from './RectanglePropsForm';
import Info from './Info';
import { getRectangles, getRemainingWidth, saveRectangles, clearStorage } from '../helpers';
import config from '../config';
import { labels } from '../constants';

class MyRect extends Component {

  constructor(props) {
    super(props);
    const rectangles = getRectangles();
    this.state = {
      rectangles,
      availableRectanglesCount: config.maxRectanglesCount - rectangles.length,
      availableWidth: getRemainingWidth(config.maxWidth, rectangles),
    }
  }

  clearRectangles = () => {
    clearStorage();
    this.setState({
      rectangles: [],
      availableRectanglesCount: config.maxRectanglesCount,
      availableWidth: config.maxWidth,
    });
  };

  addRectangle = rectangle => {
    const { rectangles, availableRectanglesCount, availableWidth } = this.state;
    const updatedRectanglesArray = [...rectangles, rectangle];
    this.setState({
      rectangles: updatedRectanglesArray,
      availableRectanglesCount: availableRectanglesCount - 1,
      availableWidth: availableWidth - rectangle.width,
    });
    saveRectangles(updatedRectanglesArray);
  };

  updateAvailableWidth = width => {
    const { availableWidth } = this.state;
    this.setState({ availableWidth: availableWidth - width });
  };

  allowedToAddRectangleCount = () => {
    const { availableRectanglesCount, availableWidth } = this.state;
    return availableWidth ? availableRectanglesCount : 0;
  };

  render() {
    const { rectangles, availableWidth } = this.state;
    return (
      <div>
        <div className="row controls-wrapper">
          <RectanglePropsForm
            isAllowedToAddRectangle={this.allowedToAddRectangleCount()}
            rectangles={rectangles}
            availableWidth={availableWidth}
            addRectangle={this.addRectangle}
            updateAvailableWidth={this.updateAvailableWidth}
          />
          <div className="info-wrapper">
            <Info
              availableWidth={availableWidth}
              allowedToAddRectangleCount={this.allowedToAddRectangleCount()}
              viewportWidth={config.maxWidth}
            />
            <button onClick={this.clearRectangles} className="button button-clear">{labels.CLEAR_BUTTON}</button>
          </div>
        </div>
        <div className="rectangles-wrapper">
          {rectangles.map(rectangle => <Rectangle {...rectangle} />)}
        </div>
      </div>
    );
  }
}

export default MyRect;