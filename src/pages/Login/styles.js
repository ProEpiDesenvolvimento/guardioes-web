import styled from 'styled-components';
import { device } from 'utils/devices';
import {
    Link,
  } from "react-router-dom";

export const Span = styled.span`
  color: red;
  font-size: 15px;
`;

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
`;

export const HeadSection = styled.div`
    height: 8vh;
    margin: 0;
`;

export const Body = styled.div`
    height: 84vh;
    background: linear-gradient(184deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 3%, rgba(230,230,230,1) 100%);
    margin: 0;
    width: 100vw;
`;

export const LoginBox = styled.form`
    width: max(300px, 35vw);
    height: max(400px, 70vh);
    margin: 0 auto;
    background: linear-gradient(180deg, #FFFFFF 99.99%, rgba(255, 255, 255, 0) 100%);
    box-shadow: 4px 4px 50px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: calc(50vw - max(300px, 35vw)/2);
    z-index: 1;
`;

export const Title = styled.p`
    font-family: Lovelo;
    font-style: normal;
    font-weight: 900;
    font-size: 4rem;
    line-height: 5rem;
    color: #282828;
    text-align: flex-start;
    margin: 30px;

    @media ${device.laptopL}{
        font-size: 3rem;
        line-height: 3rem;
        text-align: center;
    } 
`;

export const ResetLink = styled(Link)`
    cursor: pointer;
    color: #348EAC;
    &:hover {
        color: #5dd39e;
    }
    border: none;
    background: #ffffff;
`;
