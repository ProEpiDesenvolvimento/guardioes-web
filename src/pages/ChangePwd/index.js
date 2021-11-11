import React, { useState, useEffect, useRef } from "react";
import { connect } from 'react-redux';
import { sessionService } from 'redux-react-session';
import { setToken, setUser } from 'actions';
import { bindActionCreators } from 'redux';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

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
import Backicon from "sharedComponents/BackIcon";
import InputSign from "sharedComponents/InputSign";
import SendButton from 'sharedComponents/SendButton';
import authUser from "./services/authUser";
import changePassword from "./services/changePassword";

const ChangePwd = ({
  token,
  setToken,
  user,
  setUser,
}) => {
  const { handleSubmit } = useForm()

  const history = useHistory()

  const [oldPassword, setOldPassword] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const refOldPassword = useRef(null)
  const refPassword = useRef(null)
  const refConfirmPassword = useRef(null)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const _loadSession = async () => {
      try {
        const auxSession = await sessionService.loadSession()
        const auxUser = await sessionService.loadUser()
        setToken(auxSession.token)
        setUser(auxUser)
      } catch (err) {
        history.push("/login")
      }
    }
    _loadSession();
  }, [setToken, setUser, token]);

  const handleResetPassword = async (e) => {
    if (password === "") {
      setErrors({ password: true })
      return
    }
    if (confirmPassword === "") {
      setErrors({ confirmPassword: true })
      return
    }
    if (password !== confirmPassword) {
      return
    }
    if (password.length < 6) {
      setErrors({ shortPassword: true })
      return
    }

    const auth = await authUser(user.type, user.email, oldPassword)
    if (auth.status === 200) {
      const response = await changePassword(user.id, user.type, token, password)
      if (!response.errors) {
        const newUser = response.data[user.type]

        setUser({
          ...newUser,
          type: user.type
        });
        sessionService.saveUser({
          ...newUser,
          type: user.type
        });

        history.push("/login");
      }
    } else {
      setErrors({ oldPassword: true })
    }
  }

  return (
    <Container>
      <Header />
      <HeadSection>
        <Backicon backTo="/login" />
      </HeadSection>
      <Body>
        <LoginBox onSubmit={handleSubmit(handleResetPassword)}>
          <Title>
            Troca de Senha
          </Title>
          <Subtitle>
            Mudar senha no primeiro acesso
          </Subtitle>
          <InputSign
            placeholder="Senha Antiga"
            type="password"
            name="old-password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            ref={refOldPassword}
            style={{ margin: "0px" }}
          />
          {errors.oldPassword && <Span>Senha antiga incorreta</Span>}
          <InputSign
            placeholder="Nova Senha"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={refPassword}
          />
          {errors.password && <Span>A nova senha é obrigatória</Span>}
          <InputSign
            placeholder="Confirme a Nova Senha"
            type="password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            ref={refConfirmPassword}
            style={{ margin: "0px" }}
          />
          {errors.confirmPassword && <Span>A confirmação da senha é obrigatória</Span>}
          {password !== "" && password !== confirmPassword && <Span>As senhas precisam ser iguais</Span>}
          {errors.shortPassword && <Span>A senha é muito pequena (no mínimo 6 caracteres)</Span>}
          <SendButton/>
        </LoginBox>
      </Body>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setToken,
    setUser
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePwd);
