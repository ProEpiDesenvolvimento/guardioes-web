import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { describe } from 'jest-circus';
import ModalInput from '../sharedComponents/ModalInput';
import MultiSelect from "react-multi-select-component";
import Select from "react-select";
import {
    TextArea,
    EditCheckboxInput,
  } from "../sharedComponents/ModalInput/styles";

configure({adapter: new Adapter()});

describe('Testing the ModalInput ', () => {
    let wrapper;
    //Fake props - assemble according to case
    const props = {
        placeholder: 'placeholder',
        id: 'id',
        type: 'number',
        value: 'value',
        disabled: false,
        min:4,
        max:9,
        rows: 7,
        checked: false,
        name: 'name',
        setValue: jest.fn(),
        options: [
            { value: true, label: "Sim" },
            { value: false, label: 'Não' }],
        
    }
    
    wrapper = shallow(<ModalInput {...props} />)

    if(props.type === 'number') {
        it('testing if there is a type in ModalInput - case number', () => {
            expect(wrapper.find({ className: 'number' }).length).toBe(1)
            expect(wrapper.find({ className: 'number' }).prop('type')).toBeDefined()
            expect(wrapper.find({ className: 'number' }).prop('type')).toBe(props.type)
        });

        it('testing if the id is the same as the assigned id - case number', () => {
            expect(wrapper.find({ className: 'number' }).prop('id')).toBe(props.id)
        });

        it('testing if the value is the same as the assigned value - case number', () => {
            expect(wrapper.find({ className: 'number' }).prop('value')).toBe(props.value)
        });

        it('test if there is the onChange method on the ModalInput and if it takes user input - case number', () => {
            expect(wrapper.find({ className: 'number' }).prop('onChange')).toBeDefined();
            expect(wrapper.find({ className: 'number' }).prop('onChange')).toBe(props.setValue)
        });

        it('testing if the disabled is the same as the assigned disabled - case number', () => {
            expect(wrapper.find({ className: 'number' }).prop('disabled')).toBe(props.disabled)
        });

        it('testing if the min is the same as the assigned min - case number', () => {
            expect(wrapper.find({ className: 'number' }).prop('min')).toBe(props.min)
        });

        it('testing if the max is the same as the assigned max - case number', () => {
            expect(wrapper.find({ className: 'number' }).prop('max')).toBe(props.max)
        });

        it('testing if the step is the same as the assigned step - case number', () => {
            expect(wrapper.find({ className: 'number' }).prop('step')).toBe(props.step)
        });

        it('testing if the placeholder is the same as the assigned placeholder - case number', () => {
            expect(wrapper.find({ className: 'number' }).prop('placeholder')).toBe(props.placeholder)
        });

    }

    else if(props.type === 'date') {
        it('testing if there is a type in ModalInput - case date', () => {
            expect(wrapper.find({ className: 'date' }).length).toBe(1);
            expect(wrapper.find({ className: 'date' }).prop('type')).toBeDefined();
            expect(wrapper.find({ className: 'date' }).prop('type')).toBe(props.type);
        });

        it('testing if the id is the same as the assigned id - case date', () => {
            expect(wrapper.find({ className: 'date' }).prop('id')).toBe(props.id)
        });

        it('testing if the value is the same as the assigned value - case date', () => {
            expect(wrapper.find({ className: 'date' }).prop('value')).toBe(props.value)
        });

        it('test if there is the onChange method on the ModalInput and if it takes user input - case date', () => {
            expect(wrapper.find({ className: 'date' }).prop('onChange')).toBeDefined();
            expect(wrapper.find({ className: 'date' }).prop('onChange')).toBe(props.setValue)
        });}

    else if(props.type === 'select') {
        it('testing if there is a Select in ModalInput - case select', () => {
            expect(wrapper.find(Select).length).toBe(1);
         ;
        });
    
        it('testing if the id is the same as the assigned id - case select', () => {
            expect(wrapper.find(Select).prop('id')).toBe(props.id)
        });
    
        it('testing if the value is the same as the assigned value - case select', () => {
            expect(wrapper.find(Select).prop('defaultValue')).toBe(props.value)
        });
    
        it('test if there is the onChange method on the ModalInput and if it takes user input - case select', () => {
            expect(wrapper.find(Select).prop('onChange')).toBeDefined();
            expect(wrapper.find(Select).prop('onChange')).toBe(props.setValue)
        });
    
        it('testing if the placeholder is the same as the assigned placeholder - case select', () => {
            expect(wrapper.find(Select).prop('placeholder')).toBe(props.placeholder)
        });

        it('testing if the options is the same as the assigned options - case select', () => {
            expect(wrapper.find(Select).prop('options')).toBe(props.options)
        });
    
        it('testing if the placeholder is the same as the assigned placeholder - case select', () => {
            expect(wrapper.find(Select).prop('isDisabled')).toBe(props.disabled)
        });}

    else if(props.type === 'multiselect') {
        it('testing if there is a Select in ModalInput - case multiselect', () => {
            expect(wrapper.find(MultiSelect).length).toBe(1);
         ;
        });
    
        it('testing if the id is the same as the assigned id - case multiselect', () => {
            expect(wrapper.find(MultiSelect).prop('id')).toBe(props.id)
        });
    
        it('testing if the value is the same as the assigned value - case multiselect', () => {
            expect(wrapper.find(MultiSelect).prop('value')).toBe(props.value)
        });
    
        it('test if there is the onChange method on the ModalInput and if it takes user input - case multiselect', () => {
            expect(wrapper.find(MultiSelect).prop('onChange')).toBeDefined();
            expect(wrapper.find(MultiSelect).prop('onChange')).toBe(props.setValue)
        });

        it('testing if the options is the same as the assigned options - case multiselect', () => {
            expect(wrapper.find(MultiSelect).prop('options')).toBe(props.options)
        });}

    else if(props.type === 'textarea') {
        it('testing if there is a TextArea in ModalInput - case textarea', () => {
            expect(wrapper.find(TextArea).length).toBe(1);
         ;
        });
    
        it('testing if the id is the same as the assigned id - case textarea', () => {
            expect(wrapper.find(TextArea).prop('id')).toBe(props.id)
        });
    
        it('testing if the value is the same as the assigned value - case textarea', () => {
            expect(wrapper.find(TextArea).prop('value')).toBe(props.value)
        });

        it('testing if the rows is the same as the assigned rows - case textarea', () => {
            expect(wrapper.find(TextArea).prop('rows')).toBe(props.rows)
        });
    
        it('test if there is the onChange method on the ModalInput and if it takes user input - case textarea', () => {
            expect(wrapper.find(TextArea).prop('onChange')).toBeDefined();
            expect(wrapper.find(TextArea).prop('onChange')).toBe(props.setValue)
        });
    
        it('testing if the disabled is the same as the assigned disabled - case textarea', () => {
            expect(wrapper.find(TextArea).prop('disabled')).toBe(props.disabled)
        });}

    else  if(props.type === 'checkbox') {
        it('testing if there is a TextArea in ModalInput - case checkbox', () => {
            expect(wrapper.find(EditCheckboxInput).length).toBe(1);
         ;
        });
    
        it('testing if the id is the same as the assigned id - case checkbox', () => {
            expect(wrapper.find(EditCheckboxInput).prop('id')).toBe(props.id)
        });
    
        it('testing if the value is the same as the assigned value - case checkbox', () => {
            expect(wrapper.find(EditCheckboxInput).prop('checked')).toBe(props.value)
        });
    
        it('test if there is the onChange method on the ModalInput and if it takes user input - case checkbox', () => {
            expect(wrapper.find(EditCheckboxInput).prop('onChange')).toBeDefined();
            expect(wrapper.find(EditCheckboxInput).prop('onChange')).toBe(props.setValue)
        });
    
        it('testing if the disabled is the same as the assigned disabled - case checkbox', () => {
            expect(wrapper.find(EditCheckboxInput).prop('disabled')).toBe(props.disabled)
        });}

    else  if(props.type === 'checkbox') {
        it('testing if there is a TextArea in ModalInput - case checkbox', () => {
            expect(wrapper.find(EditCheckboxInput).length).toBe(1);
         ;
        });
    
        it('testing if the id is the same as the assigned id - case checkbox', () => {
            expect(wrapper.find(EditCheckboxInput).prop('id')).toBe(props.id)
        });
    
        it('testing if the value is the same as the assigned value - case checkbox', () => {
            expect(wrapper.find(EditCheckboxInput).prop('checked')).toBe(props.value)
        });
    
        it('test if there is the onChange method on the ModalInput and if it takes user input - case checkbox', () => {
            expect(wrapper.find(EditCheckboxInput).prop('onChange')).toBeDefined();
            expect(wrapper.find(EditCheckboxInput).prop('onChange')).toBe(props.setValue)
        });
    
        it('testing if the disabled is the same as the assigned disabled - case checkbox', () => {
            expect(wrapper.find(EditCheckboxInput).prop('disabled')).toBe(props.disabled)
        });}


});