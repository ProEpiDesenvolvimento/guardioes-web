import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;

  @media (min-width: 500px) {
    width: 100%;
  }
`;

export const AddAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  align-content: center;
  margin: 0 auto;
  background-color: #FFF;
  border-radius: 5px;
  font-family: argumentum, sans-serif;
  font-style: normal;
`;

export const ContainerHeader = styled.div`
  display: flex;
  background-color: #5dd39e;
  height: 70px;
  padding-left: 20px;
  place-items: center start;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const ContainerTitle = styled.h3`
  margin: 0;
  font-size: 24;
  color: #fff;
`;

export const ContainerForm = styled.div`
  margin: 30px auto;
  width: 70vw;
  width: 95%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Inputs = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

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

export const CheckboxInputBlock = styled.div`
  width: 250px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  color: #348EAC;
  text-shadow: 2px 5px 10px rgba(0,0,0,0.125);
  margin-bottom: 1rem;
  margin-right: 50px;
  padding-top: 25px;
`;

export const CheckboxInput = styled.input` 
  border: 2px solid #348EAC;
  border-radius: 5px;
  transition: opacity 0.2s;
  padding-left: 10px;
  cursor: pointer;
`;

export const Label = styled.label` 
  margin: 0;
`;

export const SubmitButton = styled.button`
  width: 100px;
  background-color: #5DD39E;
  color: white;
  border: 0;
  border-radius: 5px;
  height: 2.2rem;
  cursor: pointer;
  transition: opacity 0.2s;
  margin: auto 0;

  &:hover {
    opacity: 0.7;
  }
`;

export const EditInput = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  font-size: 20;
  color: #348EAC;
  margin-bottom: 1rem;
`;

export const EditCheckbox = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 700;
  font-size: 20;
  color: #348EAC;
  margin-bottom: 1rem;
  align-items: center;
`;

export const EditCheckboxInput = styled.input`
  margin-bottom: .5rem;
  margin-left: .5rem;
`;

export const EditButton = styled.button`
  width: 100%;
  background-color: #5DD39E;
  color: white;
  border: 0;
  border-radius: 5px;
  height: 2.2rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  @media (min-width: 500px) {
    width: 14rem;
  }
`;