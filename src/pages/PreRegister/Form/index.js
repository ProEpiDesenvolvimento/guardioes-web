import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { stateOptions } from "utils/Brasil";
import { cnpjMask, phoneMask } from "utils/mask";

import {
  RegisterDiv,
  FieldDiv,
  FieldName,
  Input,
  QuestionVector,
  ButtonsDiv,
  DownloadBtn,
  ButtonName,
  SendButton,
  SendButtonName,
  QuestionPopupCat,
  QuestionPopupOrgType,
  Span,
  SelectInput
} from './styles';

import questionIcon from '../assets/question_icon.png'
import submitPreRegister from './services/submitPreRegister';
import validateCnpj from './services/validateCnpj';

const Form = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const [cnpj, setCnpj] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [state, setState] = useState("")
  const [organizationType, setOrganizationType] = useState("")
  const [socialReason, setSocialReason] = useState("")

  const [emailValidation, setEmailValidation] = useState(false)

  const onSubmit = async () => {
    let formattedCnpj = cnpj
    formattedCnpj = formattedCnpj.replace(/\W/g, '')
    let formattedPhone = phone
    formattedPhone = formattedPhone.replace(/\W/g, '')
    const body = {
      pre_register: {
        cnpj: formattedCnpj,
        phone: formattedPhone,
        organization_kind: organizationType,
        state,
        email,
        company_name: socialReason,
        app_id: 1
      }
    }

    const response = await submitPreRegister(body)
    if (response.errors) {
      if (response.errors === "O email já está sendo usado.") {
        setEmailValidation(true)
        return null
      }
      alert('Algo deu errado, tente novamente!');
      console.log(response.errors);
    } else {
      props.setRedirectCallback(true)
    }
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
            onChange={(e) => setCnpj(cnpjMask(e.target.value))}
            ref={register({ required: true, validate: validateCnpj })}
          /><br/>
          {errors.cnpj && errors.cnpj.type === "validate" && <Span>CNPJ inválido</Span>}
          {errors.cnpj && errors.cnpj.type === "required" && <Span>O CNPJ é obrigatório</Span>}
        </FieldName>
      </FieldDiv>
      <FieldDiv>
        <FieldName>
          Razão Social
          <Input
            name='socialReason'
            type='text'
            value={socialReason}
            onChange={(e) => setSocialReason(e.target.value)}
            ref={register({ required: true })}
          /><br/>
          {errors.socialReason && <Span>A razão social é obrigatória</Span>}
        </FieldName>
      </FieldDiv>
      <FieldDiv>
        <FieldName>
          E-mail Institucional
          <Input
            name='email'
            type='text'
            value={email}
            onChange={(e) => {
              setEmailValidation(false)
              setEmail(e.target.value)}
            }
            ref={register({ required: true })}
          /><br/>
          {emailValidation && <Span>O e-mail já está em uso</Span>}
          {errors.email && <Span>O e-mail institucional é obrigatório</Span>}
        </FieldName>
      </FieldDiv>
      <FieldDiv>
        <FieldName>
          Contato
          <Input
            name='phone'
            type='tel'
            title="Apenas números. DDD + número"
            value={phone}
            onChange={(e) => setPhone(phoneMask(e.target.value))}
            ref={register({ required: true })}
          /><br/>
          {errors.phone && <Span>O telefone de contato é obrigatório</Span>}
        </FieldName>
      </FieldDiv>
      <FieldDiv>
        <FieldName>
          Estado
          <SelectInput
            name='state'
            value={state}
            onChange={(e) => setState(e.target.value)}
            ref={register({ required: true })}
          >
            {stateOptions.map((state) => {
              return (
                <option value={state.key}>{state.label}</option>
              )
            })}
          </SelectInput><br/>
          {errors.state && <Span>O Estado é obrigatório</Span>}
        </FieldName>
      </FieldDiv>
      <FieldDiv>
        <FieldName>
          Tipo de Organização
          <QuestionPopupOrgType content='Ex: Ensino, Administrativa, etc..' trigger={<QuestionVector src={questionIcon} />} />
          <Input
            name='organizationType'
            type='text'
            value={organizationType}
            onChange={(e) => setOrganizationType(e.target.value)}
            ref={register({ required: true })}
          /><br/>
          {errors.organizationType && <Span>O tipo de organização é obrigatório</Span>}
        </FieldName>
      </FieldDiv>
      <FieldDiv>
        <ButtonsDiv>
          <SendButton
            type='submit'
          >
            <SendButtonName>
              ENVIAR
            </SendButtonName>
          </SendButton>
        </ButtonsDiv>
      </FieldDiv>
    </RegisterDiv>
  );
}

export default Form;