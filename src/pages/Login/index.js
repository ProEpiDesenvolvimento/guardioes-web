import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
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
  SendButton,
  SendButtonName,
  Span
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
  const { register, handleSubmit, watch, errors } = useForm();

  const [password, setPassword] = useState("")

  const makeUserLogin = async () => {
    // const response = await requestLogin(email, password, "admin")
    // setToken(response.authorization);
    // setUser(response.user)
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
        <LoginBox onSubmit={handleSubmit(makeUserLogin)}>
          <Title>
            Login
        </Title>
          <Field
            placeholder="E-mail"
            name='email'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={register({ required: true })}
          />
          {errors.email && <Span>O e-mail é obrigatório</Span>}
          <Field
            placeholder="Senha"
            type="password"
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={register({ required: true })}
          />
          {errors.password && <Span>A senha é obrigatória</Span>}
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