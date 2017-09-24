import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import RectanglePropsForm from '../components/RectanglePropsForm';
import Field from '../components/Field';

describe('<RectanglePropsForm />', () => {
  it('should render 4 Field components', () => {
    const wrapper = mount(
      <RectanglePropsForm
        isAllowedToAddRectangle={true}
        rectangles={[]}
        availableWidth={1600}
        addRectangle={() => {}}
      />);
    expect(wrapper.find(Field)).to.have.length(4);
  });
  it('should render add button if isAllowedToAddRectangle = true', () => {
    const wrapper = mount(
      <RectanglePropsForm
        isAllowedToAddRectangle={true}
        rectangles={[]}
        availableWidth={1600}
        addRectangle={() => {}}
    />);
    expect(wrapper.find('.button.button-add')).to.have.length(1);
  });
  it('should not render add button if isAllowedToAddRectangle = false', () => {
    const wrapper = mount(
      <RectanglePropsForm
        isAllowedToAddRectangle={false}
        rectangles={[]}
        availableWidth={1600}
        addRectangle={() => {}}
      />);
    expect(wrapper.find('.button.button-add')).to.have.length(0);
  });
  it('should allow to type only numbers in Field', () => {
    const wrapper = mount(
      <RectanglePropsForm
        isAllowedToAddRectangle={false}
        rectangles={[]}
        availableWidth={1600}
        addRectangle={() => {}}
      />);
    const field = wrapper.find(Field).first();
    field.simulate('keydown', { which: 'a' });
    expect(field.prop('value')).to.equal('');
  });
});