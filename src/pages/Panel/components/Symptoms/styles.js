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
  height: 20.7rem;
  width: 90%;
  align-content: center;
  margin: 0% 5%;
  margin-bottom: 2rem;
  background-color: #E5E5E5;
  border-radius: 10px;
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
  z-index: 5;
`;

export const ContainerTitle = styled.h3`
  margin: 0;
  font-weight: 600;
  font-family: "ArgentumSans", sans-serif;
  font-size: 22px;
  color: white;
  text-shadow: 2px 5px 10px rgba(0,0,0,0.25);
  text-align: center;
`;

export const ContainerForm = styled.div`
  margin: 30px auto;
  max-height: 14rem;
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