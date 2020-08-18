import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import {
  setManagers
} from 'actions/';

import { bindActionCreators } from 'redux';
import getAllManagers from './services/getAllManagers'
import createManager from './services/createManager'
import deleteManager from './services/deleteManager'

import {
  Container,
  AddAppContainer,
  ContainerHeader,
  ContainerTitle,
  ContainerForm,
  Form,
  Inputs,
  CheckboxInputBlock,
  CheckboxInput,
  InputBlock,
  Input,
  SubmitButton,
  Label
} from './styles';
import { useForm } from "react-hook-form";

import ContentBox from '../ContentBox';

const Managers = ({
  token,
  user,
  // managers,
  // setManagers
}) => {

  const [groupManagers, setGroupManagers] = useState([])

  const { handleSubmit } = useForm()
  const [managerName, setManagerName] = useState("")
  const [managerEmail, setManagerEmail] = useState("")
  const [managerTwitter, setManagerTwitter] = useState("")
  const [managerGroup, setManagerGroup] = useState("")
  const [managerIdentificationCode, setManagerIdentificationCode] = useState(false)
  const [managerLengthIdentificationCode, setManagerLengthIdentificationCode] = useState(0)
  const [managerPassword, setManagerPassword] = useState("")

  const _createManager = async () => {
    const data = {
      "group_manager": {
        "password": managerPassword,
        "email": managerEmail,
        "name": managerName,
        "group_name": managerGroup,
        "twitter": managerTwitter,
        "app_id": 1,
        "require_id": managerIdentificationCode,
        "id_code_length": managerIdentificationCode ? managerLengthIdentificationCode : undefined
      }
    }
    const reponse = await createManager(data, "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwic2NwIjoiYWRtaW4iLCJhdWQiOm51bGwsImlhdCI6MTU5NzI2MTc5NCwiZXhwIjoxNTk5ODkxNTQwLCJqdGkiOiJjYjZjZmNlNC1kOWQ3LTQ5OTAtYjE5NS05YjllMTM5ZjNmMzAifQ.ctPtvipCDYP90JXkukbzwtJluEn-H9_HEH_hZXuDsto")
    setManagerName("")
    setManagerPassword("")
    setManagerEmail("")
    setManagerGroup("")
    setManagerIdentificationCode(false)
    setManagerLengthIdentificationCode(0)
    setManagerTwitter("")
    _getAllManagers(token);
  }

  const _deleteManager = async (id, token) => {
    deleteManager(id, token)
    _getAllManagers(token)
  }

  const _getAllManagers = async (token) => {
    const response = await getAllManagers("Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwic2NwIjoiYWRtaW4iLCJhdWQiOm51bGwsImlhdCI6MTU5NzI2MTc5NCwiZXhwIjoxNTk5ODkxNTQwLCJqdGkiOiJjYjZjZmNlNC1kOWQ3LTQ5OTAtYjE5NS05YjllMTM5ZjNmMzAifQ.ctPtvipCDYP90JXkukbzwtJluEn-H9_HEH_hZXuDsto")
    loadManagers(response)
  }

  const loadManagers = async (token) => {
    const response = await getAllManagers("Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwic2NwIjoiYWRtaW4iLCJhdWQiOm51bGwsImlhdCI6MTU5NzI2MTc5NCwiZXhwIjoxNTk5ODkxNTQwLCJqdGkiOiJjYjZjZmNlNC1kOWQ3LTQ5OTAtYjE5NS05YjllMTM5ZjNmMzAifQ.ctPtvipCDYP90JXkukbzwtJluEn-H9_HEH_hZXuDsto")
    let aux_managers = [];
    response.group_managers.map(manager => {
      aux_managers.push({
        "id": manager.id,
        "name": manager.name,
        "email": manager.email,
        "group_name": manager.group_name
      })
    })
    setGroupManagers(aux_managers)
  }

  useEffect(() => {
    _getAllManagers(token)
  }, []);

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
      key: "email",
      value: "E-mail",
    },
    {
      key: "group_name",
      value: "Grupo",
    }];

  return (
    <Container>
      <ContentBox
        title="Gerentes"
        token={"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwic2NwIjoiYWRtaW4iLCJhdWQiOm51bGwsImlhdCI6MTU5NzI2MTc5NCwiZXhwIjoxNTk5ODkxNTQwLCJqdGkiOiJjYjZjZmNlNC1kOWQ3LTQ5OTAtYjE5NS05YjllMTM5ZjNmMzAifQ.ctPtvipCDYP90JXkukbzwtJluEn-H9_HEH_hZXuDsto"}
        contents={groupManagers}
        fields={fields}
        delete_function={_deleteManager}
      />

      <AddAppContainer className="shadow-sm">
        <ContainerHeader>
          <ContainerTitle>Adicionar Gerente</ContainerTitle>
        </ContainerHeader>
        <ContainerForm>
          <Form id="addApp" onSubmit={handleSubmit(_createManager)}>
            <Inputs>
              <InputBlock>
                <label htmlFor="name">Nome</label>
                <Input
                  type="text"
                  id="name"
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                />
              </InputBlock>
              <InputBlock>
                <label htmlFor="email">E-mail</label>
                <Input
                  type="text"
                  id="email"
                  value={managerEmail}
                  onChange={(e) => setManagerEmail(e.target.value)}
                />
              </InputBlock>
              <InputBlock>
                <label htmlFor="group">Grupo</label>
                <Input
                  type="text"
                  id="group"
                  value={managerGroup}
                  onChange={(e) => setManagerGroup(e.target.value)}
                />
              </InputBlock>
              <InputBlock>
                <label htmlFor="twitter">Twitter</label>
                <Input
                  type="text"
                  id="twitter"
                  value={managerTwitter}
                  onChange={(e) => setManagerTwitter(e.target.value)}
                />
              </InputBlock>
              <InputBlock>
                <label htmlFor="password">Senha</label>
                <Input
                  type="password"
                  id="password"
                  value={managerPassword}
                  onChange={(e) => setManagerPassword(e.target.value)}
                />
              </InputBlock>
              <CheckboxInputBlock>
                <Label htmlFor="id_code">Código de Identificação</Label>
                <CheckboxInput
                  type="checkbox"
                  id="id_code"
                  value={managerIdentificationCode}
                  onChange={(e) => setManagerIdentificationCode(!managerIdentificationCode)}
                />
              </CheckboxInputBlock>
              {managerIdentificationCode ? <InputBlock>
                <label htmlFor="len_id_code">Quantidade de caracteres</label>
                <Input
                  type="text"
                  id="len_id_code"
                  value={managerLengthIdentificationCode}
                  onChange={(e) => setManagerLengthIdentificationCode(e.target.value)}
                />
              </InputBlock>
                : null}
            </Inputs>
            <SubmitButton type="submit">
              Adicionar
            </SubmitButton>
          </Form>
        </ContainerForm>
      </AddAppContainer>
    </Container >
  );
}

// const mapStateToProps = (state) => ({
//   token: state.user.token,
//   user: state.user.user,
//   managers: state.user.managers
// });

// const mapDispatchToProps = (dispatch) => bindActionCreators(
//   {
//     setManagers
//   },
//   dispatch,
// );

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(Managers);

export default Managers;