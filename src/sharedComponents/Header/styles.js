import styled from 'styled-components';
import { device } from 'utils/devices';
import {
  Link,
} from "react-router-dom";

export const Container = styled.div`
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
    height: 8vh;
    background: #63D5A2;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0% 2%;
`;


export const Logo = styled.img`
  width: 15vw;
  height: 5vh;
  @media ${device.mobileL} {
    width: 50vw;
    height: 5vh;
  };

`;

export const HeaderNav = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 25%;
`;

export const NavTo = styled(Link)`
    text-decoration: 'none';
    font-family: Argentum Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 29px;
    color: #FFFFFF;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;
