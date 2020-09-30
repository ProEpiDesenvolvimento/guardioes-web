import styled from 'styled-components';

export const Container = styled.div`
  display: ${props => (props.show === false ? 'none' : 'flex')};
  flex-direction: column;
  width: 65%;

  @media (min-width: 500px) {
    width: 100%;
  }
`;
