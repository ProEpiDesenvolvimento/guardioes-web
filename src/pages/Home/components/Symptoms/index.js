import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import {
  setSymptoms
} from 'actions/';

import { bindActionCreators } from 'redux';
import getAllSymptoms from './services/getAllSymptoms'
import createSymptom from './services/createSymptom'
import deleteSymptom from './services/deleteSymptom'

import {
  Container,
  AddAppContainer,
  ContainerHeader,
  ContainerTitle,
  ContainerForm,
  InputBlock,
  Input,
  SubmitButton
} from './styles';
import { useForm } from "react-hook-form";

import ContentBox from '../ContentBox';

const Symptoms = ({
  token,
  user,
  // symptoms,
  // setSymptoms
}) => {

  const [symptoms, setSymptoms] = useState()

  const { handleSubmit } = useForm()
  const [symptomName, setSymptomName] = useState("")
  const [symptomDescription, setSymptomDescription] = useState("")

  const _createSymptom = async () => {
    const data = {
      "description": symptomName,
      "code": symptomName.trim().replace(' ', ''),
      "priority": 1,
      "details": symptomDescription,
      "message": null,
      "app_id": 1
      // Por enquanto esta sendo usado o 1, mas quando for corrigido as rotas
      // será usado o app_id do user logado, como feito abaixo
      // "app_id": user.app_id
    }
    const reponse = await createSymptom(data, "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNTk3MjUyOTA0LCJleHAiOjE1OTk4ODI2NTAsImp0aSI6IjM4MDlkZTRmLWI5ZjAtNGJiYS05NmZkLTk5MmM4NjcyMzEwZSJ9.ccsgvAjMZUiUzwGXjlIFZelI0053XFwBR1orjNh43iA")
    setSymptomName("")
    setSymptomDescription("")
  }

  const _deleteSymptom = async (id, token) => {
    deleteSymptom(id, token)
  }

  const loadSymptoms = async (token) => {
    const response = await getAllSymptoms("Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNTk3MjUyOTA0LCJleHAiOjE1OTk4ODI2NTAsImp0aSI6IjM4MDlkZTRmLWI5ZjAtNGJiYS05NmZkLTk5MmM4NjcyMzEwZSJ9.ccsgvAjMZUiUzwGXjlIFZelI0053XFwBR1orjNh43iA")
    let aux_symptoms = [];
    response.symptoms.map(symptom => {
      aux_symptoms.push({
        "id": symptom.id,
        "name": symptom.description,
        "description": symptom.details
      })
    })
    setSymptoms(aux_symptoms)
  }

  useEffect(() => {
    loadSymptoms(token)
  }, [symptoms]);

  const fields =
    [{
      key: "id",
      value: "ID"
    },
    {
      key: "name",
      value: "Nome",
    },
    {
      key: "description",
      value: "Descrição"
    }];

  return (
    <Container>
      <ContentBox
        title="Sintomas"
        token={"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwic2NwIjoiYWRtaW4iLCJhdWQiOm51bGwsImlhdCI6MTU5NzI2MTc5NCwiZXhwIjoxNTk5ODkxNTQwLCJqdGkiOiJjYjZjZmNlNC1kOWQ3LTQ5OTAtYjE5NS05YjllMTM5ZjNmMzAifQ.ctPtvipCDYP90JXkukbzwtJluEn-H9_HEH_hZXuDsto"}
        contents={symptoms ? symptoms : []}
        fields={fields}
        delete_function={_deleteSymptom}
      />

      <AddAppContainer className="shadow-sm">
        <ContainerHeader>
          <ContainerTitle>Adicionar Sintoma</ContainerTitle>
        </ContainerHeader>
        <ContainerForm>
          <form id="addApp" onSubmit={handleSubmit(_createSymptom)}>
            <InputBlock>
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                value={symptomName}
                onChange={(e) => setSymptomName(e.target.value)}
              />
            </InputBlock>
            <InputBlock>
              <label htmlFor="name">Descrição</label>
              <input
                type="text"
                id="description"
                value={symptomDescription}
                onChange={(e) => setSymptomDescription(e.target.value)}
              />
            </InputBlock>
            <SubmitButton type="submit">
              Criar Sintoma
            </SubmitButton>
          </form>
        </ContainerForm>
      </AddAppContainer>
    </Container >
  );
}

// const mapStateToProps = (state) => ({
//   token: state.user.token,
//   user: state.user.user,
//   symptoms: state.user.symptoms
// });

// const mapDispatchToProps = (dispatch) => bindActionCreators(
//   {
//     setSymptoms
//   },
//   dispatch,
// );

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(Symptoms);

export default Symptoms;