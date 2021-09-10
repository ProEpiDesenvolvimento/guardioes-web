import styled from 'styled-components';

export const DropdownDiv = styled.div`
  width: max(250px, 30vw);
  height: 50px;
  margin: 20px auto;
`;

export const DropdownTitle = styled.span`
  text-align: left;
  heigth: 100%;
  margin: auto 10px;
  font-family: Argentum Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  color: #FFFFFF;
  @media (min-width: 500px) {
    font-size: 20px;
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
  width: 80%;
  height: 40px;
  margin: 0 auto;
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
  font-size: 25px;
  line-height: 25px;
  color: #FFFFFF;
  text-align: left;
  padding-left: 5px;
`;