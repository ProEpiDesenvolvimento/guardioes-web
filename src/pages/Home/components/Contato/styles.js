import styled from 'styled-components';

export const Container = styled.div`
  margin: 4%;
  flex: 1;
  flex-direction: column;
  max-width: 50%;
`;

export const Title = styled.div`
  margin-top: 2%;
  font-size: 18px;
  font-weight: 500;
  color: #348EAC;
`;

export const Info = styled.div`
  flex: 1;
  flex-direction: row;
`;

export const Text = styled.text`
  color: #524948;
  font-size: 14px;
`;

export const Option = styled.text`
  font-size: 14px;
  font-weight: 500;
`;

export const SocialMedia = styled.button`
  margin-right: 2%;
  margin-top: 2%;
  margin-bottom: 2%;
  width: 50%;
  border: 0;
  border-radius: 5px;
  height: 2.2rem;
  cursor: pointer;
  transition: opacity: 0.2s;

  &:hover {
      opacity: 0.7;
  }

  @media (min-width: 500px) {
      width: 10rem;
  }
`;

export const SocialMediaText = styled.text`
  font-size: 12px;
  font-weight: 300;
`;