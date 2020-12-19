import React, { useEffect } from 'react';
import {
  Container,
  Logo,
  HeaderNav,
  NavTo,
  UserName,
  UserDiv
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
    "group_manager": "Instituição"
  }

  useEffect(() => {
    console.log("AAA", user)
  }, [user])

  const logout = async () => {
    if (authenticated === true) {
      await sessionService.deleteSession()
      await sessionService.deleteUser()
      setUser("")
    }
    history.push("/login")
  }
  return (
    <Container>
      {/* <UserDiv> */}
      {authenticated === false ?
        <Logo src={logo} style={{ fill: "#fff" }} />
        : null}
      {/* </UserDiv> */}
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
          <NavTo onClick={logout}>
            {authenticated === true ? "Login" : "Logout"}
          </NavTo>
        {/* <NavTo to="/contact">
          Contato
        </NavTo> */}
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
