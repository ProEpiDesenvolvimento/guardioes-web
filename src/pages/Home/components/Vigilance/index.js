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
  PaginationDiv,
} from './styles';
import { Table } from 'react-bootstrap';
import TableCases from './TableCases';
import TableComponent from './Table';
import Pagination from "react-js-pagination";

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
import { setTimeout } from 'timers';

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

  const [showModal, setShowModal] = useState(false)
  const [syndromeShow, setShowSyndrome] = useState({})
  const [showCaseModal, setShowCaseModal] = useState(false)
  const [hasVigilance, setHasVigilance] = useState(false)
  const [editEmail, setEditEmail] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [cases, setCases] = useState([])
  const [filteredCases, setFilteredCases] = useState([])
  const [caseType, setCaseType] = useState("")
  const [caseShow, setCaseShow] = useState({})
  const [activePage, setActivePage] = useState(1)
  const [perPage, setPerPage] = useState(150)
  const [totalItems, setTotalItems] = useState(0)

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

  const handleCasesPageChange = async (page) => {
    setActivePage(page)
    setFilteredCases([])
    const surveys = await getSurveysGroupCases(token, page)
    if (!surveys.errors) {
      loadGroupCases(syndromes, surveys)
    }
  }

  const filterGroupCases = (contents) => {
    let aux_filtered = []
    contents.forEach(content => {
      if (caseType === "reviewed") {
        if (content.reviewed) {
          aux_filtered.push(content)
        }
      } else {
        if (!content.reviewed) {
          aux_filtered.push(content)
        }
      }
    })
    if (aux_filtered.length === 0) {
      aux_filtered = null
    }
    setFilteredCases(aux_filtered)
  }

  const loadGroupCases = (synds, response) => {
    const syndromesObj = {}
    synds.forEach(synd => {
      syndromesObj[synd.id] = synd
    })

    let aux_cases = [];
    if (!response.surveys) {
      response.surveys = [];
    }
    response.surveys.forEach(survey => {
      aux_cases.push({
        ...survey,
        "syndrome_name": syndromesObj[survey.syndrome_id].description,
        "user_name": survey.user.user_name,
      })
    })
    filterGroupCases(aux_cases)
    setCases(aux_cases)

    const { meta } = response
    if (meta) {
      setTotalItems(meta.pagination.total_objects)
    }
  }

  const loadData = async (token) => {
    const syns = await getAllSyndromes(token)
    let synds = []
    if (syns.syndromes)
      synds = syns.syndromes
    setSyndromes(synds)

    setVigilanceSyndromes(user.vigilance_syndromes)
    setEditEmail(getVigilanceEmail())
    setHasVigilance(getVigilanceEmail() ? true : false)

    const surveys = await getSurveysGroupCases(token, 1)
    if (!surveys.errors) {
      loadGroupCases(synds, surveys)
    }
    else {
      loadGroupCases(synds, [])
    }
  }

  const getVigilanceEmail = () => {
    return user.vigilance_email || (user.group_manager && user.group_manager.vigilance_email)
  }

  useEffect(() => {
    if (cases.length > 0) {
      filterGroupCases(cases)
    }
  }, [caseType]);

  useEffect(() => {
    const _loadSession = async () => {
      const auxSession = await sessionService.loadSession()
      setToken(auxSession.token)
      await loadData(auxSession.token)
    }
    _loadSession();
    setTimeout(()=> setIsLoading(false), 1000*0.5) // 0.5 segundos
  }, [token]);

  const handleCaseShow = (content) => {
    setShowCaseModal(true);
    setCaseShow(content);
  }

  const handleCaseEdit = async (content) => {
    const reviewed = content.reviewed ? false : true

    const newCases = []
    cases.forEach((case_) => {
      if (case_.id === content.id) {
        newCases.push({
          ...content,
          reviewed: reviewed,
        })
      } else {
        newCases.push(case_)
      }
    })
    setCases(newCases)
    filterGroupCases(newCases)

    const data = {
      survey: {
        reviewed: reviewed,
      }
    }
    await editSurvey(content.user.id, content.id, data, token)
  }

  const handleCasesFilter = () => {
    let type = ""
    if (caseType === "reviewed") {
      type = "not_reviewed"
    } else {
      type = "reviewed"
    }
    setCaseType(type)
  }

  const handleShow = (content) => {
    setShowModal(true)
    setShowSyndrome(content)
  }

  const setVigilanceSyndromesCallback = (vs) => {
    setVigilanceSyndromes(vs)
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

  const casesNum = new Intl.NumberFormat('pt-BR').format(totalItems)

  return (
    <Container>
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
        {isLoading ?
          <Loading isLoading={true} /> :
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
              disableCheckbox={user.type === "group_manager_team"}
            /> :
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
                      disabled={user.type !== "group_manager"}
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
                      disabled={user.type !== "group_manager"}
                    />
                  </InputBlock>
                : null}
              </Inputs>
              <SubmitButton type="submit">Editar Vigilância</SubmitButton>
            </Form>
          </ContainerForm>
        </ContentBoxTable>
      </ContainerContentBox>

      {/* -------- CASOS -------- */}
      <Modal
        show={showCaseModal}
        onHide={() => setShowCaseModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Informações do Caso
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <EditInput>
            <label>ID</label>
            <input
              className="text-dark"
              type="text"
              value={caseShow.id}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Nome</label>
            <input 
              className="text-dark"
              type="text"
              value={caseShow.user ? caseShow.user.user_name : ""}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Data de Nascimento</label>
            <input
              className="text-dark"
              type="text"
              value={caseShow.user ? caseShow.user.birthdate.split("T", 1) : ""}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Gênero</label>
            <input
              className="text-dark"
              type="text"
              value={caseShow.user ? caseShow.user.gender : ""}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Número de Telefone</label>
            <input
              className="text-dark"
              type="text"
              value={caseShow.user ? caseShow.user.phone : ""}
              disabled
            />
          </EditInput>

          <EditInput className="bg-light p-2">
            <label>Síndrome</label>
            <input
              className="text-dark"
              type="text"
              value={caseShow.syndrome_name}
              disabled
            />
          </EditInput>

          <EditInput className="bg-light p-2">
            <label>Sintomas</label>
            <TextArea
              className="text-dark"
              type="text"
              value={caseShow.symptom ? caseShow.symptom.join(", ") : ""}
              rows="1"
              disabled
            />
          </EditInput>

          <EditInput className="bg-light p-2">
            <label>Data de início</label>
            <input
              className="text-dark"
              type="text"
              value={caseShow.bad_since ? caseShow.bad_since : "Não"}
              disabled
            />
          </EditInput>

          <EditInput className="bg-light p-2">
            <label>Visualizado</label>
            <input
              className="text-dark"
              type="text"
              value={caseShow.reviewed ? "Sim" : "Não"}
              disabled
            />
          </EditInput>
        </Modal.Body>

        <Modal.Footer>
          <SubmitButton onClick={() => setShowCaseModal(false)}>Voltar</SubmitButton>                    
        </Modal.Footer>
      </Modal>
      <ContainerContentBox className="shadow-sm" component_height={'35rem'}>
        <ContentBoxHeader>
          <ContentBoxTitle>Casos - {casesNum}</ContentBoxTitle>
        </ContentBoxHeader>
        <SubmitButton onClick={() => handleCasesFilter()} style={{ marginBottom: 0 }}>
          {caseType === "reviewed" ? "Casos Não Visualizados" : "Casos Visualizados"}
        </SubmitButton>
        <ContentBoxTable
          component_height={'35rem'}
        >
        {filteredCases !== null ?
          filteredCases.length > 0 ?
            <TableCases
              cases={filteredCases ? filteredCases : null}
              fields={[
                { key: "id", value: "ID" },
                { key: "user_name", value: "Nome" },
                { key: "bad_since", value: "Data de início" }
              ]}
              setCaseShow={handleCaseShow}
              setCaseEdit={handleCaseEdit}
            /> :
            <Loading isLoading={true} />
          :
            <Table responsive>
              <thead>
                <tr>
                  <th>Não há casos filtrados para esse grupo</th>
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
      </ContainerContentBox>

      <PaginationDiv>
        <Pagination
          onChange={handleCasesPageChange.bind(this)}
          activePage={activePage}
          itemsCountPerPage={perPage}
          totalItemsCount={totalItems}
          pageRangeDisplayed={6}
          hideDisabled={true}
          itemClass='page'
        />
      </PaginationDiv>
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