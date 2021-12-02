import React, { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import {
  Container,
  HeadSection,
  Body,
  LoginBox,
  Title,
  Subtitle,
  Span,
} from "./styles";
import Header from "sharedComponents/Header";
import Backicon from 'sharedComponents/BackIcon'
import InputSign from 'sharedComponents/InputSign';
import SendButton from 'sharedComponents/SendButton';
import { useHistory } from "react-router-dom";
import { resetPassword, confirmToken, sendToken } from "./services/resetPassword"
import DropdownComponent from '../../sharedComponents/DropdownComponent'

const ResetPwd = () => {
  const { register, handleSubmit } = useForm();

  const history = useHistory();

  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [resetPasswordToken, setResetPasswordToken] = useState("")
  const [userType, setUserType] = useState('admin');
  const [slide, setSlide] = useState(0)

  const refToken = useRef(null)
  const refPassword = useRef(null)
  const refConfirmPassword = useRef(null)
  const [errors, setErrors] = useState({})

  const setUserTypeCallback = (userType) => {
    setUserType(userType)
  }

  const handleSendToken = async (e) => {
    setSlide(1);
    sendToken(email, userType)
  }

  const handleConfirmToken = async (e) => {
    if (token === "") {
      setErrors({token: true})
      return
    }
    const response = await confirmToken(token, userType)
    if (response.status === 200) {
        setSlide(2);
        setResetPasswordToken(response.data.reset_password_token)
    }
  }

  const handleResetPassword = async (e) => {
    if (password === "") {
      setErrors({password: true})
      return
    }
    if (confirmPassword === "") {
      setErrors({confirmPassword: true})
      return
    }
    if (password !== confirmPassword) {
      return
    }
    const response = await resetPassword(resetPasswordToken, password, confirmPassword, userType)
    if (response.status === 200)
        history.push("/login");
  }

  return (
    <Container>
      <Header />
      <HeadSection>
        <Backicon backTo="/login" />
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
          <DropdownComponent setItemsCallback={setUserTypeCallback} />
          <InputSign
            placeholder="E-mail"
            name='email'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={register({ required: true })}
          />
          {errors.email && <Span>O e-mail é obrigatório</Span>}
          <SendButton/>
        </LoginBox>
        ) : <> </>}
        {slide === 1? (
        <LoginBox onSubmit={handleSubmit(handleConfirmToken)}>
          <Title>
            Esqueci a Senha
          </Title>
          <Subtitle>
            Informe o código enviado no seu email
          </Subtitle>
          <InputSign
            autoFocus
            placeholder="Token"
            name='token'
            type='text'
            value={token}
            onChange={(e) => setToken(e.target.value)}
            ref={refToken}
          />
          {errors.token && <Span>O token é obrigatório</Span>}
          <SendButton/>
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
          <InputSign
            placeholder="Senha"
            type="password"
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={refPassword}
            style={{margin: '0px'}}
          />
          {errors.password && <Span>A senha é obrigatória</Span>}
          <InputSign
            placeholder="Confirme a Senha"
            type="password"
            name='confirmpassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            ref={refConfirmPassword}
          />
          {errors.confirmPassword && <Span>A confirmação da senha é obrigatória</Span>}
          {password !== "" && password !== confirmPassword && <Span>As senhas precisam ser iguais</Span>}
          <SendButton/>
        </LoginBox>
        ) : null}
      </Body>
    </Container>
  );
}

export default ResetPwd;