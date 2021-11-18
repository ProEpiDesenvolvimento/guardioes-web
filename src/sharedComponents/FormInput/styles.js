import styled from "styled-components";

export const InputBlock = styled.div`
  width: ${(props) => (props.isLongInput ? "none" : "250px")};
  display: flex;
  flex-direction: ${(props) => (props.isRow ? "row" : "column")};
  font-weight: 700;
  font-size: 20;
  color: #348eac;
  text-shadow: 2px 5px 10px rgba(0, 0, 0, 0.125);
  margin-bottom: ${(props) => (props.isRow ? "0.5rem" : "1rem")};
  align-items: ${(props) => (props.isRow ? "center" : "none")};
  margin-right: ${(props) => (props.isLongInput ? "0" : "50px")};
`;

export const Input = styled.input`
  width: 100%;
  background-color: white;
  color: black;
  border: 2px solid #348eac;
  border-radius: 5px;
  height: 2.2rem;
  transition: opacity 0.2s;
  padding-left: 10px;
`;

export const CheckboxInput = styled.input`
  margin: 0 0 0.5rem 1.7rem;
`;

export const TextArea = styled.textarea`
  border: 2px solid #348eac;
  border-radius: 5px;
  padding: 5px 5px 10px 10px;

  &:focus {
    border: 2px solid #007bff;
  }

  &:disabled {
    background: #f8f9fa;
  }
`;

export const ImageSelector = styled.div`
  background-color: #ffffff;
  border: solid 1px #cccccc;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem;

  &:after {
    content: "";
    flex: auto;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem;
`;

export const ImgContent = styled.img`
  border: ${(props) => (props.selected ? "solid 2px #007bff" : "0px")};
  border-radius: 5px;
  cursor: pointer;
  padding: ${(props) => (props.selected ? "2px" : "0px")};
`;
