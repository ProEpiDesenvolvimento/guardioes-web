import React, { useState } from 'react';
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
  BackIcon,
  BackLink
} from './styles';

import Header from 'sharedComponents/Header'
import businessMan from './assets/businessMan.svg'
import questionIcon from './assets/question_icon.png'
import backIcon from './assets/back_icon.svg'

import axios from '../../services/api.js';

const PreRegister = () => {
  const [cnpj, setCnpj] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [state, setState] = useState("")
  const [organizationType, setOrganizationType] = useState("")
  const [socialReason, setSocialReason] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      cnpj: cnpj,
      phone: phone,
      email: email,
      state: state,
      organizationType: organizationType,
      socialReason: socialReason
    }
    const response = await axios.post('school_units', { data })
    if (response.errors) {
      console.log("Algo deu errado.\n" + response.errors)
    } else {
      console.log("Registro feito com sucesso.")
    }
  }

  return (
    <Container>
      <Header />
      <Body>
        <BackLink to='/'>
          <BackIcon src={backIcon}/>
        </BackLink>
        <Title>
          PRÉ-CADASTRO DE INSTITUIÇÃO
        </Title>
        <ManDiv>
          <ManImage src={businessMan}/>
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
              <QuestionVector src={questionIcon}/>
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
              <QuestionVector src={questionIcon}/>
              <ButtonsDiv>
                <DownloadBtn>
                  <ButtonName>
                    Download
                  </ButtonName>
                </DownloadBtn>
                <UploadBtn>
                  <ButtonName>
                    Upload
                  </ButtonName>
                </UploadBtn>
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

export default PreRegister;