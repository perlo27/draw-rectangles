import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Field from '../components/Field';

describe('<Field />', () => {
  it('should render correct label text', () => {
    const someText = 'someText';
    const wrapper = shallow(<Field label={someText} onChange={()=>{}}/>);
    expect(wrapper.find('.field-label').text()).to.equal(someText);
  });
  it('should render input', () => {
    const wrapper = shallow(<Field label="test" onChange={()=>{}}/>);
    expect(wrapper.find('.field-input')).to.have.length(1);
  });
  it('should render correct input placeholder', () => {
    const someText = 'someText';
    const wrapper = shallow(<Field label={someText} onChange={()=>{}}/>);
    expect(wrapper.find('.field-input').prop('placeholder')).to.equal(someText);
  });
  it('should render correct input value', () => {
    const someValue = 1;
    const someText = 'someText';
    const wrapper = shallow(<Field value={someValue} label={someText} onChange={()=>{}}/>);
    expect(wrapper.find('.field-input').prop('value')).to.equal(someValue);
  });
});