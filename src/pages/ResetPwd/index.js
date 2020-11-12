import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import {
  Container,
  HeadSection,
  Body,
  LoginBox,
  Title,
  Subtitle,
  Field,
  SendButton,
  SendButtonName,
  Span,
} from "./styles";
import Header from "sharedComponents/Header";
import Backicon from 'sharedComponents/BackIcon'
import { useHistory } from "react-router-dom";
import { resetPassword, confirmToken, sendToken } from "./services/resetPassword"
import DropdownComponent from '../../sharedComponents/DropdownComponent'

const ResetPwd = () => {
  const { register, handleSubmit, errors } = useForm();

  const history = useHistory();

  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [resetPasswordToken, setResetPasswordToken] = useState("")
  const [userType, setUserType] = useState('admin');
  const [slide, setSlide] = useState(0)

  const setUserTypeCallback = (userType) => {
    setUserType(userType)
  }

  const handleSendToken = async (e) => {
    setSlide(1);
    sendToken(email, userType)
  }

  const handleConfirmToken = async (e) => {
    const response = await confirmToken(token, userType)
    if (response.status == 200) {
        setSlide(2);
        setResetPasswordToken(response.data.reset_password_token)
    }
  }

  const handleResetPassword = async (e) => {
    const response = await resetPassword(resetPasswordToken, password, confirmPassword, userType)
    if (response.status == 200)
        history.push("/login");
  }

  return (
    <Container>
      <Header />
      <HeadSection>
        <Backicon backTo="/login" />
        {slide === 0 && <DropdownComponent setItemsCallback={setUserTypeCallback} />}
      </HeadSection>
      <Body>
        {slide === 0? (
        <LoginBox onSubmit={handleSubmit(handleSendToken)}>
          <Title>
            Esqueci a Senha
          </Title>
          <Subtitle>
            Informe seu email para verificação
          </Subtitle>
          <Field
            placeholder="E-mail"
            name='email'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={register({ required: true })}
          />
          {errors.email && <Span>O e-mail é obrigatório</Span>}
          <SendButton type='submit'>
            <SendButtonName>
              ENVIAR
          </SendButtonName>
          </SendButton>
        </LoginBox>
        ) : null}
        {slide === 1? (
        <LoginBox onSubmit={handleSubmit(handleConfirmToken)}>
          <Title>
            Esqueci a Senha
          </Title>
          <Subtitle>
            Informe o código enviado no seu email
          </Subtitle>
          <Field
            placeholder="Token"
            name='token'
            type='text'
            value={token}
            onChange={(e) => setToken(e.target.value)}
            ref={register({ required: true })}
          />
          {errors.token && <Span>O token é obrigatório</Span>}
          <SendButton type='submit'>
            <SendButtonName>
              ENVIAR
          </SendButtonName>
          </SendButton>
        </LoginBox>
        ) : null}
        {slide === 2? (
        <LoginBox onSubmit={handleSubmit(handleResetPassword)}>
          <Title>
            Esqueci a Senha
          </Title>
          <Subtitle>
            Digite a nova senha
          </Subtitle>
          <Field
            placeholder="Senha"
            type="password"
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={register({ required: true })}
          />
          {errors.password && <Span>A senha é obrigatória</Span>}
          <Field
            placeholder="Confirme a Senha"
            type="password"
            name='confirmpassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            ref={register({ required: true })}
          />
          {errors.confirmpassword && <Span>A confirmação da senha é obrigatória</Span>}
          {password !== "" && password !== confirmPassword && <Span>As senhas precisam ser iguais</Span>}
          <SendButton type='submit'>
            <SendButtonName>
              ENVIAR
          </SendButtonName>
          </SendButton>
        </LoginBox>
        ) : null}
      </Body>
    </Container>
  );
}

export default ResetPwd;