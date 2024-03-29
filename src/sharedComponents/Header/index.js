import React from 'react';
import {
  Container,
  Logo,
  HeaderNav,
  NavTo,
  UserName
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
  setUser,
  user
}) => {
  const history = useHistory(); 

  const usersTypes = {
    "admin": "Administrador",
    "manager": "Gerente",
    "city_manager": "Município",
    "group_manager": "Instituição",
    "group_manager_team": "Equipe de Instituição",
  }

  const logout = async () => {
    if (authenticated === true ) {
      await sessionService.deleteSession()
      await sessionService.deleteUser()
      setUser({})
    }
    history.push("/login")
  }
  return (
    <Container>
      <Logo src={logo} style={{ fill: "#fff" }} />
      {authenticated === true ?
        <div>
          <UserName>
            {usersTypes[user.type]} - {user.type === "admin" ? user.first_name + " " + user.last_name : user.name}<br/> 
            {user.email}
          </UserName>
        </div>
      : null}
      <HeaderNav>
        {authenticated === false ?
          <NavTo to="/">
            Faça Parte
          </NavTo>
        : null}
        {/*authenticated === true ?
          <NavTo to="/panel">
            Painel
          </NavTo>
        : null*/}
        {authenticated === false ?
          <NavTo to="/statistics">
            Estatísticas
          </NavTo>
        : null}
        <NavTo to="#" onClick={logout}>
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
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setUser,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
