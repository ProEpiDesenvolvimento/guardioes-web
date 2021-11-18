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

const ModalInput = ({
  type,
  label,
  id,
  value,
  setValue,
  isSelected,
  options,
  disabled = false,
}) => {
  function defineInput() {
    switch (type) {
      case "text":
        return (
          <input
            type="text"
            id={id}
            value={value}
            onChange={setValue}
            disabled={disabled}
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
            isDisabled={disabled}
          />
        );
      case "textarea":
        return (
          <TextArea
            type="text"
            id={id}
            value={value}
            rows="10"
            onChange={(e) => setValue(e.target.value)}
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
      case "imageselect":
        return (
          <ImageSelector>
            {disabled
              ? options.map((icon, index) => {
                  if (value === icon.value)
                    return (
                      <ImageContainer key={index}>
                        <ImgContent
                          src={require(`../../${icon.uri}`)}
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
    }
  }

  return (
    <EditInput isRow={type === "checkbox" ? true : false}>
      <label htmlFor={id}>{label}</label>
      {defineInput()}
    </EditInput>
  );
};

export default ModalInput;
