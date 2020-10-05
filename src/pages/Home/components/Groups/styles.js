import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;

  @media (min-width: 500px) {
    width: 100%;
  }
`;

export const AddGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 25rem;
  width: 90%;
  align-content: center;
  margin: 0% 5%;
  margin-bottom: 2rem;
  background-color: #E5E5E5;
  border-radius: 10px;
  font-family: argumentum, sans-serif;
  font-style: normal;
`;

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5DD39E;
  height: 70px;
  border-radius: 10px;
  border-bottom: 2px solid rgba(0,0,0,0.125);
`;

export const ContainerTitle = styled.h3`
  margin: 0;
  font-weight: 500;
  font-size: 24;
  color: white;
  text-shadow: 2px 5px 10px rgba(0,0,0,0.25);
  text-align: center;
`;

export const ContainerForm = styled.div`
  margin: 1rem 1.8rem;
  height: 20 rem;
`;

export const Form = styled.form`
  display: flex;
  flex-flow: row wrap;
`;

export const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  font-size: 20;
  color: #348EAC;
  text-shadow: 2px 5px 10px rgba(0,0,0,0.125);
  margin: 1rem;
`;

export const Input = styled.input`
  width: 50%;
  background-color: white;
  border: 2px solid #348EAC;
  border-radius: 5px; 
  height: 2.2rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  @media (min-width: 500px) {
    width: 14rem;
  }
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

export const SubmitButton = styled.button`
  width: 100%;
  background-color: #5DD39E;
  margin: 1rem;
  color: white;
  border: 0;
  border-radius: 5px;
  height: 2.2rem;
  cursor: pointer;
  transition: opacity 0.2s;

  align-self: flex-end;

  &:hover {
    opacity: 0.7;
  }

  @media (min-width: 500px) {
    width: 14rem;
  }
`;

export const EditInput = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  font-size: 20;
  color: #348EAC;
  margin-bottom: 1rem;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      /* display: none; <- Crashes Chrome on hover */
      -webkit-appearance: none;
      margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type=number] {
      -moz-appearance:textfield; /* Firefox */
  }
`;
