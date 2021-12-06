import React, { forwardRef } from 'react';
import { Field} from './styles';

const InputSign = forwardRef((props, ref) => {

    return (
        <Field 
        ref={ref}
        placeholder= {props.placeholder}
        type= {props.type}
        name={props.name}
        onChange={props.onChange}
        {...props}
        />
    )

}); 

export default InputSign;