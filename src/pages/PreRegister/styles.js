import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    margin: 0;
`;

export const Body = styled.div`
    height: 92vh;
    background: linear-gradient(184deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 3%, rgba(230,230,230,1) 100%);
    display: flex;
    flex-direction: column;
`;

export const Title = styled.h1`
    font-family: Lovelo;
    font-style: normal;
    font-weight: 900;
    font-size: 40px;
    line-height: 48px;
    color: #000000;

    // background: red;
    
    width: max(35vw, 200px);
    text-align: center;
    margin: 75px 30px 0 30px;
`;

export const Subtitle = styled.h3`
    width: max(35vw, 200px);
    margin: 25px 30px;

    // background: green;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
    text-align: center;

    color: #000000;
`;