import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    margin: 0;
`;

export const Body = styled.div`
    height: 92vh;
    background: linear-gradient(184deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 3%, rgba(230,230,230,1) 100%);
    display: flex;@media(max-width: 925px) {
        flex-direction: column;
    }
`;

export const TitleDiv = styled.div`
    width: 45vw;
    display: flex;
    flex-direction: column;
    @media(max-width: 925px) {
        width: 100vw;
        margin: 10px 0 0 0;
    }
`;

export const Title = styled.h1`
    font-family: Lovelo;
    font-style: normal;
    font-weight: 900;
    font-size: 45px;
    line-height: 48px;
    color: #000000;
    text-align: center;
    margin-top: 10vh;
`;

export const Subtitle = styled.h3`
    width: max(35vw, 200px);
    margin: 0 auto;
    text-align: center;
    font-family: Argentum Sans;
    font-style: normal;
    font-weight: 500;
    font-size: 25px;
    line-height: 25px;
    color: #524948;
    @media(max-width: 921px) {
        width: 100vw;
        margin: 0 auto;
    }
`;