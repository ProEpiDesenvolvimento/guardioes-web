import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100%;
    margin: 0;

    @media (min-height: 900px) {
        height: 92vh;
    }
`;

export const Body = styled.div`
    height: 100%;
    background: linear-gradient(184deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 3%, rgba(230,230,230,1) 100%);
    display: flex;
    flex-direction: row;
    background-size: cover;
`;