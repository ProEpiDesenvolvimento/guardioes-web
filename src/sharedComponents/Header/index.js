import React from 'react';
import {
  Container,
  Logo,
  HeaderNav,
  NavTo,
  Logout
} from './styles';
import logo from 'assets/img/logo.png';
import { sessionService } from 'redux-react-session';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setUser
} from 'actions/';
import { useHistory } from "react-router-dom";

const Header = ({
  authenticated,
  setUser
}) => {
  const history = useHistory(); 

  const logout = async () => {
    if (authenticated === true ) {
      await sessionService.deleteSession()
      await sessionService.deleteUser()
      setUser("")
    }
    history.push("/login")
  }
  return (
    <Container>
      <Logo src={logo} style={{ fill: "#fff" }} />
      <HeaderNav>
        <NavTo to="/">
          Home
        </NavTo>
        {authenticated === true ?
          <NavTo to="/panel">
            Painel
          </NavTo>
        : null}
        {authenticated === false ?
          <NavTo to="/statistics">
            Estatísticas
          </NavTo>
        : null}
        <NavTo onClick={logout}>
          {authenticated === true ? "Logout" : "Login"}
        </NavTo>
        <NavTo to="/contact">
          Contato
        </NavTo>
      </HeaderNav>
    </Container>
  );
}
const mapStateToProps = (state) => ({
  authenticated: state.session.authenticated,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setUser
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
