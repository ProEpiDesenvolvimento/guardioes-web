import React from "react";
import {
  InputBlock,
  Input,
  CheckboxInput,
  TextArea,
  ImageSelector,
  ImageContainer,
  ImgContent,
} from "./styles";
import Select from "react-select";

const FormInput = ({
  label,
  type,
  id,
  value,
  setValue,
  options,
  placeholder,
  disabled,
  checked,
  isSelected,
  min,
  max,
  isSubtitle = false,
  isLongInput = false,
}) => {
  let inactive = false;
  if(disabled !== undefined) inactive = true;
  function defineInput() {
    switch (type) {
      case "text":
      case "password":
      case "email":
      case "number":
        return (
          <Input
            type={type}
            id={id}
            value={value}
            onChange={setValue}
            min={min}
            max={max}
            placeholder={placeholder}
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
          <Select
            id={id}
            isSearchable={true}
            options={options}
            defaultValue={value}
            onChange={setValue}
            placeholder={placeholder}
            isDisabled={inactive}
          />
        );
      case "checkbox":
        return (
          <CheckboxInput
            type="checkbox"
            id={id}
            checked={value}
            onChange={setValue}
          />
        );
      case "textarea":
        return <TextArea id={id} value={value} onChange={setValue} rows="2" />;
      case "imageselect":
        return (
          <ImageSelector>
            {options.map((icon, index) => (
              <ImageContainer key={index}>
                <ImgContent
                  src={require(`../../${icon.uri}`)}
                  width={80}
                  onClick={() => setValue(icon.value)}
                  selected={isSelected(icon.value)}
                  alt="content-icon"
                />
              </ImageContainer>
            ))}
          </ImageSelector>
        );
      case "checkboxes":
        return options.map((model, key) => (
          <div className="form-check" key={key}>
            <input
              type="checkbox"
              className="form-check-input"
              id={`manage-${model.value}-3`}
              checked={isSelected.includes(model.value)}
              onChange={() => setValue(model.value)}
            />
            <label
              className="form-check-label"
              htmlFor={`manage-${model.value}-3`}
            >
              {model.label}
            </label>
          </div>
        ));
    }
  }

  return (
    <InputBlock
      isLongInput={isLongInput}
      isRow={type === "checkbox" ? true : false}
    >
      {isSubtitle ? <h6>{label}</h6> : <label htmlFor={id}>{label}</label>}
      {defineInput()}
    </InputBlock>
  );
};

export default FormInput;
