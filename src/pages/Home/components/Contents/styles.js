import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;

  @media (min-width: 500px) {
    width: 100%;
  }
`;

export const AddContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 20rem;
  width: 90%;
  align-content: center;
  margin: 0% 5%;
  margin-bottom: 2%;
  background-color: #E5E5E5;
  border-radius: 10px;
  font-family: argumentum, sans-serif;
  font-style: normal;

  @media (min-width: 500px) {
    width: 90%;
  }
`;

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5DD39E;
  height: 60px;
  border-radius: 10px;
  border-bottom: 2px solid rgba(0,0,0,0.125);
`;

export const ContainerTitle = styled.h3`
  margin: 0;
  font-weight: 500;
  font-size: 24;
  color: white;
  text-shadow: 2px 5px 10px rgba(0,0,0,0.25);
`;

export const ContainerForm = styled.div`
  margin: 1rem 1.8rem;
  max-height: 14rem;
`;

export const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  font-size: 20;
  color: #348EAC;
  text-shadow: 2px 5px 10px rgba(0,0,0,0.125);
  margin-bottom: 1rem;
`;

export const Input = styled.input`
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

export const SubmitButton = styled.button`
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