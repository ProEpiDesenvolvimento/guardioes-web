import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    /* 50 */
    width: 90%;
    align-content: center;
    margin: 2.5% 5% 1% 5%;
    background-color: #FFF;
    border-radius: 5px;
    font-family: argumentum, sans-serif;
    font-style: normal;

    @media (min-width: 500px) {
        width: 90%;
    }
`;

export const ContentBoxHeader = styled.div`
    display: flex;
    background-color: #5dd39e;
    height: 70px;
    padding-left: 20px;
    place-items: center start;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

export const ContentBoxTitle = styled.h3`
    margin: 0;
    font-weight: 500;
    font-size: 24;
    color: white;
`;

export const ContentBoxTable = styled.div`
    display: flex;
    margin: 1rem 1.8rem;
    max-height: ${props => props.component_height ? props.component_height : '20rem'};
    /* 40 */
`;

export const ContentBoxTableHeader = styled.th`
    font-weight: 700;
    font-size: 20;
    color: #348EAC;
    text-shadow: 2px 5px 10px rgba(0,0,0,0.125);
`;

export const ContentBoxTableIcon = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    filter: invert(46%) sepia(95%) saturate(331%) hue-rotate(148deg) brightness(88%) contrast(86%);
    transition: opacity 0.2s;
    &:hover {
        opacity: 0.7;
    }
`;