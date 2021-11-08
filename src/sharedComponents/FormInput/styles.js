import styled from "styled-components";

export const InputBlock = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  font-weight: 700;
  font-size: 20;
  color: #348EAC;
  text-shadow: 2px 5px 10px rgba(0,0,0,0.125);
  margin-bottom: 1rem;
  margin-right: 50px;
`;

export const Input = styled.input`
  width: 100%;
  background-color: white;
  color: black;
  border: 2px solid #348EAC;
  border-radius: 5px;
  height: 2.2rem;
  transition: opacity 0.2s;
  padding-left: 10px;
`;

export const SelectInput = styled.select`
  width: 50%;
  background-color: white;
  border: 2px solid #348EAC;
  border-radius: 5px;
  cursor: pointer;
  height: 2.2rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  @media (min-width: 500px) {
    width: 14rem;
  }
`;