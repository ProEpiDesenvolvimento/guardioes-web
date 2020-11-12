import styled from 'styled-components';

export const DropdownDiv = styled.div`
  min-height: 38px;
  flex-wrap: wrap;
  float: right;
  width: 250px;
  margin-right: 20%;
  margin-top: 10px;
`;

export const DropdownTitle = styled.text`
  text-align: left;
  margin: 0;
  margin-left: 5px;
  font-family: Argentum Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  color: #FFFFFF;
  @media (min-width: 500px) {
    padding: 0 20px 30px 30px;
    font-size: 18px;
  }
`;

export const Header = styled.div`
  @include styling();
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 0 20px;
`;

export const SelectionDiv = styled.div`
  z-index: 2;
  height: 25px;
  margin: 0;
  margin-top: 20px;
  background: #63D5A2;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;

export const Title = styled.p`
  text-align: left;
  margin: 0;
  margin-left: 5px;
  font-family: Argentum Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 25px;
  color: #FFFFFF;
`;

export const ListItem = styled.li`
  padding-left: 20px;
  list-style-type: none;
`;

export const ListItemButton = styled.button`
  background: #63D5A2;  
  font-size: 16px;
  border: 0;
  &:hover, &:focus {
    cursor: pointer;
    font-weight: bold;
  }
  margin-top: 5px;
  border-radius: 4px;
  width: 100%;
  height: 25px;
  font-family: Argentum Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 25px;
  color: #FFFFFF;
  text-align: left;
  padding-left: 5px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
`;