import styled from "styled-components";

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