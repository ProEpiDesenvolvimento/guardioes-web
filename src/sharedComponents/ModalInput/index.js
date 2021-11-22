import React from "react";
import {
  EditInput,
  TextArea,
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
  isValueSelected,
  options,
  placeholder,
  disabled = false,
}) => {
  function defineInput() {
    switch (type) {
      case "text":
        return disabled ? (
          <input className="text-dark" type="text" value={value} disabled />
        ) : (
          <input
            type="text"
            id={id}
            value={value}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
          />
        );
        case "date":
        return disabled ? (
          <input className="text-dark" type="date" value={value} disabled />
        ) : (
          <input
            type="date"
            id={id}
            value={value}
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
            placeholder={placeholder}
            onChange={(e) => setValue(e.value)}
            isDisabled={disabled}
          />
        );
      case "textarea":
        return disabled ? (
          <TextArea
            className="text-dark"
            type="text"
            value={value}
            rows="4"
            disabled
          />
        ) : (
          <TextArea
            type="text"
            id={id}
            value={value}
            rows="4"
            onChange={(e) => setValue(e.target.value)}
          />
        );
      case "imageselected":
        return (
          <ImageSelector>
            {options.map((icon, index) => {
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
            })}
          </ImageSelector>
        );
      case "imageselector":
        return (
          <ImageSelector>
            {options.map((icon, index) => (
              <ImageContainer key={index}>
                <ImgContent
                  src={require(`../../${icon.uri}`)}
                  width={80}
                  onClick={() => setValue(icon.value)}
                  selected={isValueSelected(icon.value)}
                  alt="content-icon"
                />
              </ImageContainer>
            ))}
          </ImageSelector>
        );
    }
  }

  return (
    <EditInput>
      <label htmlFor={id}>{label}</label>
      {defineInput()}
    </EditInput>
  );
};

export default ModalInput;
