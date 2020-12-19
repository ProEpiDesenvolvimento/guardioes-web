import styled from 'styled-components';
import { device } from 'utils/devices';
import {
  Link,
} from "react-router-dom";

export const Container = styled.div`
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  height: 70px;
  background: #5dd39e;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  place-items: center;
  padding: 0% 2%;
`;

export const UserDiv = styled.div`
  display: grid;
  grid-template-columns: 16vw auto;
  place-items: center start;
`;


export const Logo = styled.img`
  width: 80px;
  height: 35px;
`;

export const HeaderNav = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    float: right;
    gap: 40px;
    width: calc(100% - 80px);
    margin-right: 20px;
    @media ${device.mobileL} {
      margin-right: 10px;
      gap: 0;
      justify-content: space-evenly;
    };
`;

export const NavTo = styled(Link)`
    text-decoration: none;
    font-family: argumentum, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 1.825rem;
    color: #FFFFFF;
    margin-left: 10px;

    @media ${device.mobileL} {
      font-size: 15px;
    };
`;

export const UserName = styled.h1`
    text-decoration: none;
    font-family: argumentum, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 1.825rem;
    color: #FFFFFF;
    @media ${device.mobileL} {
      font-size: 15px;
    };
`;
