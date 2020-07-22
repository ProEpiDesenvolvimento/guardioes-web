import React from 'react';
import { connect } from 'react-redux';
import {
  setEmail, setToken, setUser
} from 'actions/';
import { bindActionCreators } from 'redux';
import requestLogin from './services/requestLogin'
import { useHistory } from "react-router-dom";
import { Container } from './styles';

const Login = (
    email,
    token,
    setEmail,
    user,
    setUser,
    setToken) =>  {
  return (
      <Container>

      </Container>
  );
}
const mapStateToProps = (state) => ({
    email: state.user.email,
    token: state.user.token,
    user: state.uset.user
  });
  
  const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
      setEmail,
      setToken,
      setUser
    },
    dispatch,
  );
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Login);