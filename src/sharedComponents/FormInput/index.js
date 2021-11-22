import React from "react";
import { InputBlock, Input, SelectInput, CheckboxInput } from "./styles";
import Select from "react-select";

const FormInput = ({ label, type, id, value, setValue, options, placeholder, disabled, checked }) => {
  let inactive = false;
  if(disabled !== undefined) inactive = true;
  function defineInput() {
    switch (type) {
      case "text":
      case "password":
      case "email":
        return (
          <Input
            type={type}
            id={id}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={inactive}
          />
        );
        case "checkbox":
        return (
            <CheckboxInput
              type="checkbox"
              id={id}
              checked={checked}
              onChange={(e) => setValue(e.target.value)}
            />
        );
      case "select":
        return (
          <div style={{width: '250px'}}>
            <Select
              type="select"
              id={id}
              onChange={(e) => setValue(e)}
              placeholder={placeholder}
              options={options}
              isDisabled={inactive}
            >
            </Select>
          </div>
        );
    }
  }

  return (
    <InputBlock>
      <label htmlFor={id}>{label}</label>
      {defineInput()}
    </InputBlock>
  );
};

export default FormInput;
