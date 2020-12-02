import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 65%;

    @media (min-width: 750px) {
        width: 100%;
    }
`;

export const AddSyndromeContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 24rem;
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
    text-shadow: 2px 5px 10px rgba(0,0,0,0,125);
    text-align: center;
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

export const ButtonBlock = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: 700;
    font-size: 20;
    color: #348EAC;
    text-shadow: 2px 5px 10px rgba(0,0,0,0.125);
    margin-bottom: 1rem;

    @media (min-width: 750px) {
        flex-direction: row;
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

    @media (min-width: 750px) {
        width: 14rem;
    }
`;

export const SymptomsButton = styled.div`
    display: flex;
    width: 100%;
    font-weight: 500;
    background-color: #348EAC;
    color: white;
    border: 0;
    border-radius: 5px;
    height: 2.2rem;
    cursor: pointer;
    transition: opacity 0.2s;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    margin-bottom: 1rem;

    &:hover {
        opacity: 0.7;
    }

    @media (min-width: 750px) {
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
`;

export const TextArea = styled.textarea`
  resize: none;
  border: solid 1px #CCCCCC;
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