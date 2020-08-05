import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-content: center;
`;

export const AppsTable = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  align-self: center;
  margin: 5%
`;

export const AppsTableHeaderDiv = styled.div`
  height: 60px;
  background-color: #5DD39E;  
  border-radius: 10px;
  -webkit-box-shadow: -1px 23px 21px -17px rgba(0,0,0,0.35);
  -moz-box-shadow: -1px 23px 21px -17px rgba(0,0,0,0.35);
  box-shadow: -1px 23px 21px -17px rgba(0,0,0,0.35);
  align-content: center;
`;

export const AppsTableTitle = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 1.5625rem;
  line-height: 0.9375rem;
  color: white;
  align-self: center;
  justify-self: center;
  text-align: center
`;

export const Table = styled.table`
    justify-content: center;
    border-collapse: collapse;
    border-radius: 0.8rem;
    background-color: #e5e5e5
`;

export const THead = styled.thead`
    display: table;
    width: 100%;
    table-layout: fixed;
    background-color: transparent
`;

export const Tr = styled.tr`
    display: table;
    width: 100%;
    table-layout: fixed;
    border-bottom: 2px solid #ddd;
`;

export const TBody = styled.tbody`
    display: block;
    overflow-y: scroll;
    overflow-x: hidden;
    table-layout: fixed;
    min-height: 30vh;
    max-height: 30vh
`;

export const Td = styled.td`
    text-align: center; 
    vertical-align: middle;
    border-bottom: 1px solid #ddd;
    border-left: 1px solid #ddd
`;

export const Th = styled.th`
    font-size: 1.25rem;
    padding: 1%;
    font-weight: 500;
    color: #348eac;

`;