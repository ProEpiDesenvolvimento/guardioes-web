import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import {
  setEmail, setToken, setUser
} from 'actions/';
import { bindActionCreators } from 'redux';
import requestLogin from './services/requestLogin'
import { sessionService } from 'redux-react-session'
import {
  Container,
  HeadSection,
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
import DropdownComponent from './DropdownComponent'
import { useHistory } from "react-router-dom";

const Login = ({
  email,
  token,
  setEmail,
  user,
  setUser,
  setToken
}) => {
  const { register, handleSubmit, errors } = useForm();

  const [password, setPassword] = useState("")
  const [option, setOption] = useState('admin');

  const history = useHistory(); 

  const makeUserLogin = async (data) => {
    const response = await requestLogin(email, password, option)
    const responseUser = response.user
    if (response.authorization !== "") {
      setToken(response.authorization);
      setUser({
        ...responseUser,
        type: option
      })
      sessionService.saveSession({ token: response.authorization })
        .then(() => {
          sessionService.saveUser({
            ...responseUser,
            type: option
          })
            .then(() => {
              history.push('/panel')
            })
        })
      
    }
  }

  const setItemsCallback = (option) => {
    setOption(option)
  }

  useEffect(() => {
    const _loadSession = async () => {
      try {
        const auxSession = await sessionService.loadSession()
        const auxUser = await sessionService.loadUser()
        history.push("/panel")
      } catch (err) {
        console.log(err)
      }
    }
    _loadSession();
  }, []);

  return (
    <Container>
      <Header />
      <HeadSection>
        <Backicon />
        <DropdownComponent setItemsCallback={setItemsCallback} />
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