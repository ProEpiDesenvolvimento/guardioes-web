import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import {
  Container,
  Body,
  Title,
  ManDiv,
  ManImage,
  BackIcon,
  BackLink,
} from './styles';

import Header from 'sharedComponents/Header'
import Form from './Form'
import businessMan from './assets/businessMan.svg'
import Backicon from 'sharedComponents/BackIcon'


const PreRegister = () => {
  const [redirect, setRedirect] = useState(false)

  const setRedirectCallback = (redirect) => {
    setRedirect(redirect)
  }

  if (redirect)
    return <Redirect to='/thanks' />
  else {
    return (
      <Container>
        <Header />
        <Body>
          <Backicon />
          <Title>
            PRÉ-CADASTRO DE INSTITUIÇÃO
        </Title>
          <ManDiv>
            <ManImage src={businessMan} />
          </ManDiv>
          <Form setRedirectCallback={setRedirectCallback} />
        </Body>
      </Container>
    );
  }
}

export default PreRegister;