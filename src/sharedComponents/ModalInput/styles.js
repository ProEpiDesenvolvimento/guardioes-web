import styled from "styled-components";

export const EditInput = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  font-size: 20;
  color: #348eac;
  margin-bottom: 1rem;
`;

export const TextArea = styled.textarea`
  border: solid 1px #cccccc;
  border-radius: 5px;
  padding: 5px 5px 10px 10px;

  &:focus {
    border: solid 2px #007bff;
    padding: 4px 4px 9px 9px;
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
