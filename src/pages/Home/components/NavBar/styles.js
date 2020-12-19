import styled from 'styled-components';
import { device } from 'utils/devices';
import {
  Link,
} from "react-router-dom";

export const Container = styled.div`
  margin: 0;
  padding: 0;
  width: max(17vw, 200px);
  display: flex;
  flex-direction: column;
  background: #348EAC
  justify-content: initial;
  align-items: center;
  border: 
`;

export const OptionsSection = styled.div`
  margin-top: 30px;
  height: 85%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: initial;
`;

export const OptionButton = styled.button`
  margin: 0 auto;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border-radius: 20px;
  border: 2px solid #FFFFFF;
  background: ${props => props.selected ? "#5DD39E" : "#FFF"};
  box-shadow: ${props => props.selected ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : "none"};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
  margin-bottom: 10px;
  outline: none !important;
  &:hover{
    background: ${props => props.selected ? "#5DD39E" : "#5DD39EAC"};
  }
`;

export const NavTo = styled(Link)`
    font-weight: 500;
    color: #fff;
    font-size: 22px;
    line-height: 1.825rem;
    border-radius: 5px;
    text-align: center;
    margin-top: 20px;
    background: #524948;
    padding: 5px;
    position: relative;
    &:hover{
      text-decoration: none;
      color: #FFF;
      background: #ff2424;
    }
    @media ${device.mobileL} {
      font-size: 15px;
    };
`;

export const OptionName = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@700&display=swap');
  font-family: 'PT Sans', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  line-height: 21px;
  color: #524948;
`;

export const Logo = styled.img`
  width: 120px;
  margin-top: 20px;
  height: auto;
`;

export const UserDiv = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@700&display=swap');
  font-family: 'PT Sans', sans-serif;
  margin-top: 40px;
  margin-bottom: 20px;
  border-radius: 5px;
  display: grid;
  padding: 10px;
  background: #ffffff;
  width: 90%;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.8;
  color: #524948;
`;

export const NavIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

export const UserDivIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  filter: invert(100%);
`;