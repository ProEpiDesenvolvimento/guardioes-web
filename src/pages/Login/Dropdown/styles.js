import styled from 'styled-components';

export const DropdownDiv = styled.div`
  display: flex;
  min-height: 38px;
  flex-wrap: wrap;
  float: right;
  width: 250px;
  `;

export const Header = styled.div`
  @include styling();
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  margin: 0 20px;
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

export const DownIcon = styled.img`
  width: 10px;
  height: 10px;
  margin: 8px;
`;

export const List = styled.ul`
  padding: 0;
  margin: 0;
  width: 100%;
  z-index: 2;
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