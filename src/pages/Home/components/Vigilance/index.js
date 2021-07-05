import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Container,
  ContainerContentBox,
  ContentBoxHeader,
  ContentBoxTitle,
  ContentBoxTable,
  EditInput,
  SubmitButton,
  TextArea,
  Form,
  Inputs,
  CheckboxInputBlock,
  Label,
  CheckboxInput,
  ContainerForm,
  InputBlock,
  Input,
} from './styles';
import { Table } from 'react-bootstrap';
import TableCases from './TableCases';
import TableComponent from './Table';

import { connect } from 'react-redux';
import {
  setVigilanceSyndromes,
  setToken,
  setSyndromes,
  setUser,
} from 'actions/';
import Loading from 'sharedComponents/Loading';

import { bindActionCreators } from 'redux';
import { sessionService } from 'redux-react-session';
import Modal from 'react-bootstrap/Modal';

import getSurveysGroupCases from './services/getSurveysGroupCases';
import editSurvey from './services/editSurvey';
import getAllSyndromes from '../Syndromes/services/getAllSyndromes';
import editGroupManager from '../GroupManagers/services/editGroupManager';

const Vigilance = ({
  vigilance_syndromes,
  syndromes,
  setSyndromes,
  setVigilanceSyndromes,
  setToken,
  token,
  user
}) => {
  const { handleSubmit } = useForm()

  const [cases, setCases] = useState([])
  const [caseType, setCaseType] = useState("not_reviewed")
  const [filteredCases, setFilteredCases] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [syndromeShow, setShowSyndrome] = useState({})
  const [hasVigilance, setHasVigilance] = useState(false)
  const [editEmail, setEditEmail] = useState('')

  const _handleVigilance = async () => {
    let email = null
    let syndromes = []
    
    if (!hasVigilance || !editEmail) {
      setVigilanceSyndromes([])
      setEditEmail('')
      setHasVigilance(false)
    } else {
      email = editEmail
      syndromes = vigilance_syndromes
    }

    const data = {
      group_manager: {
        vigilance_email: email,
        vigilance_syndromes: syndromes,
      }
    }
    const response = await editGroupManager(user.id, data, token)

    const responseUser = response.data[user.type]
    if (!response.errors) {
      setUser({
        ...responseUser,
        type: user.type
      })
      sessionService.saveUser({
        ...responseUser,
        type: user.type
      })
      window.location.reload()
    }
  }

  const loadGroupCases = (response) => {
    let aux_cases = [];
    if (!response.surveys) {
      response.surveys = [];
    }
    response.surveys.forEach(survey => {
      if (caseType === "reviewed" && survey.reviewed) {
        aux_cases.push({
          ...survey,
          "user_id": survey.user.id,
          "user_name": survey.user.user_name,
        }) 
      } else {
        aux_cases.push({
          ...survey,
          "user_id": survey.user.id,
          "user_name": survey.user.user_name,
        }) 
      }
    })
    if (aux_cases.length === 0) {
      aux_cases = null
    }
    setFilteredCases(aux_cases)
  }

  const loadData = async (token) => {
    const syns = await getAllSyndromes(token)
    let synds = []
    if (syns.syndromes)
      synds = syns.syndromes
    setSyndromes(synds)

    const surveys = await getSurveysGroupCases(token)
    if (!surveys.errors) {
      loadGroupCases(surveys)
    }

    setVigilanceSyndromes(user.vigilance_syndromes)
    setEditEmail(user.vigilance_email)
    setHasVigilance(user.vigilance_email ? true : false)
  }

  useEffect(() => {
    const _loadSession = async () => {
      const auxSession = await sessionService.loadSession()
      setToken(auxSession.token)
      await loadData(auxSession.token)
    }
    _loadSession();
  }, [token]);

  const handleShow = (content) => {
    setShowModal(true)
    setShowSyndrome(content);
  };

  const setVigilanceSyndromesCallback = vs => {
    setVigilanceSyndromes(vs)
  }

  const handleCaseEdit = async (content) => {
    const newCases = []
    filteredCases.forEach((filteredCase) => {
      if (filteredCase.id === content.id) {
        newCases.push({
          ...content,
          reviewed: !content.reviewed,
        })
      } else {
        newCases.push(filteredCase)
      }
    })
    setFilteredCases(newCases)

    const data = {
      survey: {
        reviewed: !content.reviewed,
      }
    }
    await editSurvey(content.user.id, content.id, data, token)
    const surveys = await getSurveysGroupCases(token)
    if (!surveys.errors) {
      loadGroupCases(surveys)
    }
  }

  const handleSeeCases = () => {
    let type = ""
    if (caseType === "reviewed") {
      type = "not_reviewed"
    } else {
      type = "reviewed"
    }
    setCaseType(type)
  }

  const handleSubmitChanges = async () => {
    const data = {
      group_manager: {
        vigilance_syndromes: vigilance_syndromes
      }
    }
    const response = await editGroupManager(user.id, data, token)

    const responseUser = response.data[user.type]
    if (!response.errors) {
      setUser({
        ...responseUser,
        type: user.type
      })
      sessionService.saveUser({
        ...responseUser,
        type: user.type
      })
      window.location.reload()
    }
  }

  return (
    <Container>
      {/* -------- CASOS -------- */}
      <ContainerContentBox className="shadow-sm" component_height={'35rem'}>
        <ContentBoxHeader>
          <ContentBoxTitle>Casos - {filteredCases.length}</ContentBoxTitle>
        </ContentBoxHeader>
        <ContentBoxTable
          component_height={'35rem'}
        >
        {filteredCases !== null ?
          filteredCases.length > 0 ?
            <TableCases
              cases={filteredCases ? filteredCases : null}
              fields={[
                {
                  key: "user_name",
                  value: "Nome"
                },
                {
                  key: "bad_since",
                  value: "Data de início"
                }
              ]}
              setCaseShow={handleShow}
              setCaseEdit={handleCaseEdit}
            /> :
            <Loading isLoading={true} />
          :
            <Table responsive>
              <thead>
                <tr>
                  <th>Não há casos encontrados para esse grupo</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td></td>
                  </tr>
              </tbody>
            </Table>
        }
        </ContentBoxTable>
        <SubmitButton onClick={() => handleSeeCases()}>Casos Visualizados</SubmitButton>
      </ContainerContentBox>

      {/* -------- SINDROMES VIGILANCIA -------- */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Informações da Síndrome
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <EditInput>
            <label>ID</label>
              <input
                className="text-dark"
                type="text"
                value={syndromeShow.id}
                disabled
            />
          </EditInput>

          <EditInput>
            <label>Título</label>
            <input 
              className="text-dark"
              type="text"
              value={syndromeShow.description}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Descrição</label>
            <TextArea
              className="text-dark"
              type="text"
              value={syndromeShow.details}
              disabled
              rows="1"
            />
          </EditInput>

          {syndromeShow.message ?
            <EditInput className="bg-light p-2">
              <label>Mensagem</label>

              <div className="form-group">
                <h6>Título</h6>
                <input
                  type="text"
                  className="text-dark w-100"
                  value={syndromeShow.message.title}
                  disabled
                />
              </div>
              <div className="form-group">
                <h6>Mensagem de aviso</h6>
                <TextArea
                  type="text"
                  className="text-dark"
                  value={syndromeShow.message.warning_message}
                  disabled
                  rows="1"
                />
              </div>
              <div className="form-group">
                <h6>Mensagem de hospitalização</h6>
                <TextArea
                  type="text"
                  className="text-dark"
                  value={syndromeShow.message.go_to_hospital_message}
                  disabled
                  rows="1"
                />
              </div>
            </EditInput>
          : null}

          {syndromeShow.symptoms ? syndromeShow.symptoms.map((symptom) => (
            <EditInput className="bg-light p-2" key={symptom.id}>
              <h6>{symptom.description}</h6>
              <label htmlFor={`show_percentage_${symptom.id}`}>Porcentagem</label>
              <input
                type="number"
                id={`show_percentage_${symptom.id}`}
                value={Math.round(symptom.percentage * 100)}
                disabled
              />
              <h6>{symptom.label}</h6>
            </EditInput>
          )) : null}
        </Modal.Body>

        <Modal.Footer>
          <SubmitButton onClick={() => setShowModal(false)}>Voltar</SubmitButton>                    
        </Modal.Footer>
      </Modal>

      <ContainerContentBox className="shadow-sm" component_height={'35rem'}>
        <ContentBoxHeader>
          <ContentBoxTitle>Síndromes da Vigilância Ativa</ContentBoxTitle>
        </ContentBoxHeader>
        <ContentBoxTable
          component_height={'35rem'}
        >
        {syndromes !== null ?
          syndromes.length > 0 ?
            <TableComponent
              contents={syndromes ? syndromes : null}
              fields={[
                { key: "id", value: "ID" },
                { key: "description", value: "Título" }
              ]}
              _deleteApp={() => {}}
              setContentShow={handleShow}
              setEditingContent={() => {}}
              token={token}
              vigilance_syndromes={vigilance_syndromes}
              setVigilanceSyndromes={setVigilanceSyndromesCallback}
              vigilance_email={user.vigilance_email}
            /> :
            <Loading isLoading={true} />
          :
            <Table responsive>
              <thead>
                <tr>
                  <th>Não há sindromes cadastradas</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td></td>
                  </tr>
              </tbody>
            </Table>
        }
        </ContentBoxTable>
        <SubmitButton onClick={() => handleSubmitChanges()}>Confirmar Mudanças</SubmitButton>
      </ContainerContentBox>

      {/* -------- EDITAR VIGILANCIA -------- */}
      <ContainerContentBox className="shadow-sm" component_height={'35rem'}>
        <ContentBoxHeader>
          <ContentBoxTitle>Vigilância Ativa</ContentBoxTitle>
        </ContentBoxHeader>
        <ContentBoxTable component_height={'35rem'}>
          <ContainerForm>
            <Form id="editUser" onSubmit={handleSubmit(_handleVigilance)}>
              <Inputs>
                <CheckboxInputBlock>
                  <Label htmlFor="has_vigilance">Fornecer Vigilância Ativa</Label>
                  <CheckboxInput
                      type="checkbox"
                      id="has_vigilance"
                      checked={hasVigilance}
                      onChange={() => setHasVigilance(!hasVigilance)}
                  />
                </CheckboxInputBlock>

                {hasVigilance ?
                  <InputBlock>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder='Não possui e-mail cadastrado'
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                    />
                  </InputBlock>
                : null}
              </Inputs>
              <SubmitButton type="submit">Editar Vigilância</SubmitButton>
            </Form>
          </ContainerForm>
        </ContentBoxTable>
      </ContainerContentBox>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  syndromes: state.user.syndromes,
  vigilance_syndromes: state.user.vigilance_syndromes,
  user: state.user.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setVigilanceSyndromes,
    setToken,
    setSyndromes,
    setUser,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Vigilance);