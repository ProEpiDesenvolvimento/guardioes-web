import React from 'react';
import { 
  Container, 
  Logo, 
  HeaderNav, 
  HomeLink, 
  LoginLink, 
  ContatoLink, 
  NavTo
} from './styles';
import logo from 'utils/assets/logo.svg';

const Header = () => {
  return (
    <Container>
      <Logo src={logo} style={{fill: "#fff"}}/>
      <HeaderNav>
        <NavTo>
          Home
        </NavTo>
        <NavTo>
          Login
        </NavTo>
        <NavTo>
          Contato
        </NavTo>
      </HeaderNav>
    </Container>
    );
}


const navigateTo = () => {
  
}
export default Header;