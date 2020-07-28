import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import {
  RegisterDiv,
  FieldDiv,
  FieldName,
  Input,
  QuestionVector,
  LargerInput,
  ButtonsDiv,
  DownloadBtn,
  ButtonName,
  SendButton,
  SendButtonName,
  QuestionPopupCat,
  QuestionPopupOrgType,
  Span
} from './styles';

import questionIcon from '../assets/question_icon.png'

import axios from '../../../services/api.js';

const Form = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();

  const [cnpj, setCnpj] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [state, setState] = useState("")
  const [organizationType, setOrganizationType] = useState("")
  const [socialReason, setSocialReason] = useState("")
  const [file, setFile] = useState("")

  const onSubmit = async data => {
    // const response = await axios.post('school_units', { data })
    // if (response.errors) {
    // console.log("Algo deu errado.\n" + response.errors)
    // } else {
    // console.log("Registro feito com sucesso.")
    // }
    props.setRedirectCallback(true)
    console.log(data)
  }

  return (
    <RegisterDiv onSubmit={handleSubmit(onSubmit)} >
      <FieldDiv>
        <FieldName>
          CNPJ
          <Input
            name='cnpj'
            type='text'
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            ref={register({ required: true })}
          />
          {errors.cnpj && <Span>O CNPJ é obrigatório</Span>}
        </FieldName>
      </FieldDiv>
      <FieldDiv>
        <FieldName>
          Contato
          <Input
            name='phone'
            type='text'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            ref={register({ required: true })}
          />
          {errors.phone && <Span>O telefone de contato é obrigatório</Span>}
        </FieldName>
      </FieldDiv>
      <FieldDiv>
        <FieldName>
          E-mail Institucional
          <Input
            name='email'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={register({ required: true })}
          />
          {errors.email && <Span>O e-mail institucional é obrigatório</Span>}
        </FieldName>
      </FieldDiv>
      <FieldDiv>
        <FieldName>
          Estado
          <Input
            name='state'
            type='text'
            value={state}
            onChange={(e) => setState(e.target.value)}
            ref={register({ required: true })}
          />
          {errors.state && <Span>O Estado é obrigatório</Span>}
        </FieldName>
      </FieldDiv>
      <FieldDiv>
        <FieldName>
          Tipo de Organização
          <QuestionPopupOrgType content='Qual o tipo da sua organização?' trigger={<QuestionVector src={questionIcon} />} />
          <Input
            name='organizationType'
            type='text'
            value={organizationType}
            onChange={(e) => setOrganizationType(e.target.value)}
            ref={register({ required: true })}
          />
          {errors.organizationType && <Span>O tipo de organização é obrigatório</Span>}
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
          </ButtonsDiv>
        </FieldName>
      </FieldDiv>
      <FieldDiv>
        <FieldName>
          Razão Social
          <LargerInput
            name='socialReason'
            type='text'
            value={socialReason}
            onChange={(e) => setSocialReason(e.target.value)}
            ref={register({ required: true })}
          />
          {errors.socialReason && <Span>A razão social é obrigatória</Span>}
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
  );
}

export default Form;