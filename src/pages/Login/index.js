import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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
  Span,
  ResetLink
} from './styles';
import Header from 'sharedComponents/Header';
import Backicon from 'sharedComponents/BackIcon'
import DropdownComponent from '../../sharedComponents/DropdownComponent'
import { useHistory } from 'react-router-dom';

const Login = ({
  email,
  token,
  setEmail,
  user,
  setUser,
  setToken
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const history = useHistory();

  const [option, setOption] = useState('admin');
  const [password, setPassword] = useState('');

  const makeUserLogin = async (data) => {
    const response = await requestLogin(email, password, option)
    const responseUser = response.user[option]
    if (response.authorization !== '') {
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
        await sessionService.loadSession()
        await sessionService.loadUser()
        history.push('/panel')
      } catch (e) {
        console.log(e)
      }
    }
    _loadSession();
  }, []);

  return (
    <Container>
      <Header />
      <HeadSection>
        <Backicon />
      </HeadSection>
      <Body>
        <LoginBox onSubmit={handleSubmit(makeUserLogin)}>
          <Title>
            Login
          </Title>
          <DropdownComponent setItemsCallback={setItemsCallback} />
          <Field
            type='text'
            placeholder='Email'
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            ref={register({ required: true })}
          />
          {errors.email && <Span>O e-mail é obrigatório</Span>}
          <Field
            type='password'
            placeholder='Senha'
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            ref={register({ required: true })}
          />
          {errors.password && <Span>A senha é obrigatória</Span>}
          <ResetLink to="/reset">Esqueci a senha</ResetLink>
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