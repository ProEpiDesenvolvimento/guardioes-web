import React from "react";
import {
  EditInput,
  TextArea,
  EditCheckboxInput,
  ImageSelector,
  ImageContainer,
  ImgContent,
} from "./styles";
import Select from "react-select";
import { MultiSelect } from "react-multi-select-component";

const ModalInput = ({
  type,
  label,
  id,
  value,
  setValue,
  isSelected,
  options,
  rows,
  min,
  max,
  step,
  isSubtitle,
  placeholder,
  disabled = false,
}) => {
  function defineInput() {
    switch (type) {
      case "date":
        return disabled ? (
          <input className="text-dark" type="date" value={value} disabled />
        ) : (
          <input
            className="date"
            type="date"
            id={id}
            value={value}
            onChange={setValue}
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
            isDisabled={disabled}
          />
        );
      case "textarea":
        return (
          <TextArea
            type="text"
            id={id}
            value={value}
            rows={rows}
            onChange={setValue}
            disabled={disabled}
          />
        );
      case "checkbox":
        return (
          <EditCheckboxInput
            type="checkbox"
            id={id}
            checked={value}
            onChange={setValue}
            disabled={disabled}
            value={value}
          />
        );
      case "checkboxes":
        return options.map((model, key) => (
          <div className="form-check" key={key}>
            <input
              type="checkbox"
              className="form-check-input"
              id={`manage-${model.value}`}
              checked={
                isSelected.permission
                  ? isSelected.permission.includes(model.value)
                  : false
              }
              disabled={disabled}
              onChange={() => {
                let newPermissions = isSelected.permission.slice();
                if (newPermissions.includes(model.value)) {
                  newPermissions = newPermissions.filter(
                    (p) => p !== model.value
                  );
                } else {
                  newPermissions.push(model.value);
                }
                setValue({
                  ...isSelected,
                  permission: newPermissions,
                });
              }}
            />
            <label
              className="form-check-label"
              htmlFor={`manage-${model.value}`}
            >
              {model.label}
            </label>
          </div>
        ));
      case "image-select":
        return (
          <ImageSelector>
            {disabled
              ? options.map((icon, index) => {
                  if (value === icon.value)
                    return (
                      <ImageContainer key={index}>
                        <ImgContent
                          src={require(`../../${icon.uri}`).default}
                          width={80}
                          alt="content-icon"
                        />
                      </ImageContainer>
                    );
                  else return null;
                })
              : options.map((icon, index) => (
                  <ImageContainer key={index}>
                    <ImgContent
                      src={require(`../../${icon.uri}`).default}
                      width={80}
                      onClick={() => setValue(icon.value)}
                      selected={isSelected(icon.value)}
                      alt="content-icon"
                    />
                  </ImageContainer>
                ))}
          </ImageSelector>
        );
      case "multi-select":
        return (
          <MultiSelect
            options={options}
            value={value}
            onChange={setValue}
            id={id}
          />
        );
      case "text":
      case "number":
      default:
        return (
          <input
            className="number"
            type={type}
            id={id}
            value={value}
            onChange={setValue}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            placeholder={placeholder}
          />
        );
    }
  }

  return (
    <EditInput isRow={type === "checkbox" ? true : false}>
      {isSubtitle ? <h6>{label}</h6> : <label htmlFor={id}>{label}</label>}
      {defineInput()}
    </EditInput>
  );
};

export default ModalInput;
