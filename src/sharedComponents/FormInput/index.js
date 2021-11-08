import React from "react";
import { InputBlock, Input, SelectInput } from "./styles";

const FormInput = ({ label, type, id, value, setValue, options }) => {
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
          />
        );
      case "select":
        return (
          <SelectInput
            type="select"
            id={id}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          >
            <option>Escolha</option>
            {options.map((c) => {
              return (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              );
            })}
          </SelectInput>
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
