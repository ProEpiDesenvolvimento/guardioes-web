import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { describe } from 'jest-circus';
import { Field} from '../sharedComponents/InputSign/styles';

import InputSign from '../sharedComponents/InputSign';

configure({adapter: new Adapter()});

describe('Testing the InputSign ', () => {
    let wrapper;
    //Fake props
    const props = {
        placeholder: 'placeholder',
        type: 'text',
        name: 'name',
        onChange: jest.fn()
    }
    
    wrapper = shallow(<InputSign {...props} />)

    it('testing if we have a Field on the InputSign', () => {
        expect(wrapper.find(Field).length).toBe(1)
    });

    it('testing whether the placeholder is the same as the assigned placeholder', () => {
        expect(wrapper.find(Field).prop('placeholder')).toBe(props.placeholder)
    });

    it('testing whether the type is the same as the assigned type', () => {
        expect(wrapper.find(Field).prop('type')).toBe(props.type)
    });

    it('testing whether the name is the same as the assigned name', () => {
        expect(wrapper.find(Field).prop('name')).toBe(props.name)
    });

    it('testing if there is the onChange method in the input Sign', () => {
        expect(wrapper.find(Field).prop('onChange')).toBeDefined();
        expect(wrapper.find(Field).prop('onChange')).toBe(props.onChange)
    });

});