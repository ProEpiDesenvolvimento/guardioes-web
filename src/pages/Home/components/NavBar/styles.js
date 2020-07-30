import styled from 'styled-components';

export const Container = styled.div`
  width: 15vw;
  height: 100%;
  background: linear-gradient(180deg, #63D5A2 0%, #E5E5E5 100%);
  display: flex;
  flex-direction: column;
  position: fixed;
  align-content: center;
  -webkit-box-shadow: 29px -1px 25px -22px rgba(0,0,0,0.75);
  -moz-box-shadow: 29px -1px 25px -22px rgba(0,0,0,0.75);
  box-shadow: 29px -1px 25px -22px rgba(0,0,0,0.75);
`;

export const Title = styled.p`
    font-family: Lovelo;
    font-style: normal;
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 1.75rem;
    text-align: center;
    margin-top: 20%;
`;

export const SelectButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #E5E5E5;
    height: 3.3125rem;
    cursor: ${props => (props.isSelected ? 'default' : `pointer`)};
    border-left: ${props => (props.isSelected ? '20px solid #524948' : 'none')};
    margin: 5% 0%
`;

export const SelectText = styled.p`
    font-family: Argentum Sans;
    font-style: normal;
    font-weight: 700;
    font-size: 1.125rem
`;
