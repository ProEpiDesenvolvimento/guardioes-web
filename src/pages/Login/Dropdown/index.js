import React, { useState } from 'react';

import { DropdownDiv, Header, SelectionDiv, Title, DownIcon, List, ListItem, ListItemButton } from './styles.js'
import downIcon from './assets/down_arrow.png'

const Dropdown = (props) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  function handleOnClick() {
    let items_copy = props.items
    items_copy.reverse()
    props.setItemsCallback(items_copy)
    toggle()
  }

  return (
    <DropdownDiv>
      <Header
        tabIndex={0}
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <SelectionDiv>
          <Title>{props.items[0].value}</Title>
          <DownIcon src={downIcon} />
        </SelectionDiv>
      </Header>
      {open && (
        <List>
          <ListItem>
            <ListItemButton type="button" onClick={() => handleOnClick()}>
              <span>{props.items[1].value}</span>
            </ListItemButton>
          </ListItem>
        </List>
      )
      }
    </DropdownDiv >
  );
}

export default Dropdown;