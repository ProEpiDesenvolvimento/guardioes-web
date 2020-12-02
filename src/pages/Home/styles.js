import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin: 0;
`;

export const Body = styled.div`
    height: 100%;
    background: linear-gradient(184deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 3%, rgba(230,230,230,1) 100%);
    display: flex;
    flex-direction: row;
    background-size: cover;
    overflow: hidden;
`;

export const Divider = styled.div`
    height: 100%;
    width: 100%;
    overflow-y: auto;
`;