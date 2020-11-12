import React, { useState } from 'react';

import { DropdownDiv, DropdownTitle, Header, SelectionDiv } from './styles.js'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';


export default function DropdownComponent(props){  
  const [userType, setUserType] = useState('Selecione Usuário');

  const handleOnClick = (event) => {
    setUserType(event.target.value)
    props.setItemsCallback(event.target.value)
  }

  return (
    <DropdownDiv>
      <Header>
        <SelectionDiv>
          <DropdownTitle>Usuário: </DropdownTitle>
            <Select
              onChange={handleOnClick}
              value={userType}
              style={{
                color: '#fff',
                fontFamily: 'Argentum Sans'
              }}
            >
              <MenuItem disabled value="">
                <em>Tipos de Usuário</em>
              </MenuItem>
              <MenuItem value={'group_manager'} style={{ fontFamily: 'Argentum Sans' }}>Group Manager</MenuItem>
              <MenuItem value={'manager'} style={{ fontFamily: 'Argentum Sans' }}>Manager</MenuItem>
              <MenuItem value={'admin'} style={{ fontFamily: 'Argentum Sans' }}>Admin</MenuItem>
            </Select>
        </SelectionDiv>
      </Header>
    </DropdownDiv>
  );
}
