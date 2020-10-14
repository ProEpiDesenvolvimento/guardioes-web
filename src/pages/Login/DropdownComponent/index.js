import React, { useState } from 'react';

import { DropdownDiv, DropdownTitle, Header, SelectionDiv } from './styles.js'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';


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
          <DropdownTitle>Selecione: </DropdownTitle>
            <Select
              onChange={handleOnClick}
              value={userType}
              style={{color: '#fff'}}
            >
              <MenuItem disabled value="">
                <em>Tipos de Usuário</em>
              </MenuItem>
              <MenuItem value={'group_manager'}>Group Manager</MenuItem>
              <MenuItem value={'manager'}>Manager</MenuItem>
              <MenuItem value={'admin'}>Admin</MenuItem>
            </Select>
        </SelectionDiv>
      </Header>
    </DropdownDiv>
  );
}
