import styled from 'styled-components';
import { Link } from 'react-router-dom'

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

export const PositiveBanner = styled.img`
    width: max(300px, 50vw);
    height: max(200px, 40vh);
    margin: 5vh auto;
`;

export const Title = styled.p`
    margin: 0 auto;
    display: inline;
    font-family: Lovelo;
    font-style: normal;
    font-weight: 900;
    font-size: 40px;
    line-height: 48px;
    color: #000000;
    text-align: center;
    @media(max-width: 400px) {
        font-size: 25px;
    } 
`;

export const Subtitle = styled.p`
    width: max(40vw, 250px);
    font-family: Argentum Sans;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 31px;
    text-align: center;
    color: #000000;
    text-align: center;
    margin 0 auto;
    @media(max-width: 400px) {
        font-size: 15px;
    } 
`;

export const HomeButton = styled(Link)`
    margin: 30px auto;
    text-decoration: none;
    font-family: Argentum Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 37px;
    color: #FFFFFF;
    text-align: center;
    padding-top: 10px;
    background: #5DD39E;
    box-shadow: 0px 0px 40px rgba(93, 211, 158, 0.3);
    border-radius: 25px;
    width: 300px;
    height: 50px;
    cursor: pointer;
`;