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
  width: 100%;
  border-radius: 10px;
  -webkit-box-shadow: -1px 23px 21px -17px rgba(0,0,0,0.35);
  -moz-box-shadow: -1px 23px 21px -17px rgba(0,0,0,0.35);
  box-shadow: -1px 23px 21px -17px rgba(0,0,0,0.35);
  align-content: center
`;

export const AppsTableTitle = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 15px;
  color: white;
  align-self: center;
  justify-self: center;
  text-align: center
`;