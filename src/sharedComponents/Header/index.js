import React from 'react';
import { 
  Container, 
  Logo, 
  HeaderNav,  
  NavTo
} from './styles';
import logo from 'utils/assets/logo.png';

const Header = () => { 
  return (
    <Container>
      <Logo src={logo} style={{fill: "#fff"}}/>
      <HeaderNav>
        <NavTo to="/">
          Home
        </NavTo>
        <NavTo to="/login">
          Login
        </NavTo>
        <NavTo to="/contact">
          Contato
        </NavTo>
      </HeaderNav>
    </Container>
    );
}
export default Header;