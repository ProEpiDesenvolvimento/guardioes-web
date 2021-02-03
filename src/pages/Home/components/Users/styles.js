import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;

  @media (min-width: 500px) {
    width: 100%;
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

export const SearchView = styled.div`
  width: 100%;
  align-self: center;
  margin-top: 1.25rem;
  display: flex;
  flex-direction: row;
  justify-content: center
`;

export const PaginationDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

export const SearchInputDiv  = styled(EditInput)`
  width: 60%;
`;

export const SearchBtn = styled(EditInput)`
  align-self: flex-end;
  margin-left: 1rem;
  border: 1px solid black;
  border-radius: 5px;
  padding: 0 0.5rem;
  cursor: pointer;
  justify-content: center;
  align-content: center;
`