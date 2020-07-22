import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import {
  Container,
  Body,
  Title,
  ManDiv,
  ManImage,
  RegisterDiv,
  FieldDiv,
  FieldName,
  Input,
  QuestionVector,
  LargerInput,
  ButtonsDiv,
  DownloadBtn,
  UploadBtn,
  ButtonName,
  SendButton,
  SendButtonName,
  QuestionPopupCat,
  QuestionPopupOrgType
} from './styles';

import Header from 'sharedComponents/Header'
import businessMan from './assets/businessMan.svg'
import questionIcon from './assets/question_icon.png'
import Backicon from 'sharedComponents/BackIcon'

import axios from '../../services/api.js';

const PreRegister = () => {
  const [cnpj, setCnpj] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [state, setState] = useState("")
  const [organizationType, setOrganizationType] = useState("")
  const [socialReason, setSocialReason] = useState("")
  const [file, setFile] = useState("")

  const [redirect, setRedirect] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      cnpj: cnpj,
      phone: phone,
      email: email,
      state: state,
      organizationType: organizationType,
      socialReason: socialReason,
    }
    // const response = await axios.post('school_units', { data })
    // if (response.errors) {
    //   console.log("Algo deu errado.\n" + response.errors)
    // } else {
    console.log("Registro feito com sucesso.")
    setRedirect(true);
    // }
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
          <RegisterDiv onSubmit={handleSubmit}>
            <FieldDiv>
              <FieldName>
                CNPJ
              <Input
                  type='text'
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                />
              </FieldName>
            </FieldDiv>
            <FieldDiv>
              <FieldName>
                Contato
              <Input
                  type='text'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FieldName>
            </FieldDiv>
            <FieldDiv>
              <FieldName>
                E-mail Institucional
              <Input
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FieldName>
            </FieldDiv>
            <FieldDiv>
              <FieldName>
                Estado
              <Input
                  type='text'
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </FieldName>
            </FieldDiv>
            <FieldDiv>
              <FieldName>
                Tipo de Organização
              <QuestionPopupOrgType content='Qual o tipo da sua organização?' trigger={<QuestionVector src={questionIcon} />} />
                <Input
                  type='text'
                  value={organizationType}
                  onChange={(e) => setOrganizationType(e.target.value)}
                />
              </FieldName>
            </FieldDiv>
            <FieldDiv>
              <FieldName>
                Categorias
              <QuestionPopupCat content='Faça o download do documento modelo das categorias, preencha-o e faça o upload.' trigger={<QuestionVector src={questionIcon} />} />
                <ButtonsDiv>
                  <DownloadBtn href='./documents/modelo_categoras.xls' download="modelo_categorias.xls">
                    <ButtonName>
                      Download
                  </ButtonName>
                  </DownloadBtn>
                  <UploadBtn
                    type='file'
                    onChange={(e) => setFile(e.target.value)}
                  />
                </ButtonsDiv>
              </FieldName>
            </FieldDiv>
            <FieldDiv>
              <FieldName>
                Razão Social
              <LargerInput
                  type='text'
                  value={socialReason}
                  onChange={(e) => setSocialReason(e.target.value)}
                />
              </FieldName>
            </FieldDiv>
            <FieldDiv>
              <SendButton type='submit'>
                <SendButtonName>
                  ENVIAR
              </SendButtonName>
              </SendButton>
            </FieldDiv>
          </RegisterDiv>
        </Body>
      </Container>
    );
  }
}

export default PreRegister;