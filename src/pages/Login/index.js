import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  setEmail, setToken, setUser
} from 'actions/';
import { bindActionCreators } from 'redux';
import requestLogin from './services/requestLogin'
import { useHistory } from "react-router-dom";
import {
  Container,
  HeadSection,
  UserMenu,
  Body,
  LoginBox,
  Title,
  Field,
  FieldName,
  SendButton,
  SendButtonName
} from "./styles";
import Header from "sharedComponents/Header";
import Backicon from 'sharedComponents/BackIcon'

const Login = ({
  email,
  token,
  setEmail,
  user,
  setUser,
  setToken
}) => {

  const [password, setPassword] = useState("")

  const makeUserLogin = async (e) => {
    e.preventDefault()
    const response = await requestLogin(email, password, userType)
    setToken(response.authorization);
    setUser(response.user)
  }


  useEffect(() => {
  }, []);

  return (
    <Container>
      <Header />
      <HeadSection>
        <Backicon />
        <UserMenu />
      </HeadSection>
      <Body>
        <LoginBox onSubmit={makeUserLogin}>
          <Title>
            Login
        </Title>
          <Field placeholder="E-mail" />
          <Field placeholder="Senha" type="password" />
          <SendButton type='submit'>
            <SendButtonName>
              ENVIAR
          </SendButtonName>
          </SendButton>
        </LoginBox>
      </Body>
    </Container>
  );
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  token: state.user.token,
  user: state.user.user
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