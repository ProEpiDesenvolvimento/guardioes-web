import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  setGroups, setToken
} from 'actions/';
import { bindActionCreators } from 'redux';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import getAllGroups from './services/getAllGroups'
import createGroup from './services/createGroup'
import deleteGroup from './services/deleteGroup'

import editIcon from '../assets/edit-solid.svg';
import deleteIcon from '../assets/trash-solid.svg';
import editGroup from './services/editGroup';
import {
  Container,
  AddGroupContainer,
  ContainerHeader,
  ContainerTitle,
  ContainerForm,
  InputBlock,
  EditInput,
  SubmitButton,
  Input,
  SelectInput,
  Form,
  ContainerContent,
  ContentBoxHeader,
  ContentBoxTitle,
  ContentBoxTable,
  ContentBoxTableHeader,
  ContentBoxTableIcon,
} from './styles';
import { Table } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { sessionService } from 'redux-react-session';

const Groups = ({
  token,
  user,
  groups,
  setGroups,
  setToken
}) => {
  const [modalEdit, setModalEdit] = useState(false);
  const [editingGroup, setEditingGroup] = useState({});
  const { handleSubmit } = useForm()
  const [modalShow, setModalShow] = useState(false);
  const [groupShow, setGroupShow] = useState({});

  const [states, setStates] = useState([]);
  const [counties, setCounties] = useState([]);
  const [schools, setSchools] = useState([]);
  const [courses, setCourses] = useState([]);

  const [country, setCountry] = useState({});
  const [state, setState] = useState({});
  const [countie, setCountie] = useState({});
  const [school, setSchool] = useState({});

  const [goBack, setGoBack] = useState(false);

  const [creating, setCreating] = useState(null);
  const [creatingCourse, setCreatingCourse] = useState({
    parent_id: 0,
    address: "",
    cep: "",
    code: "",
    description: "",
    email: "",
    phone: "",
    children_label: null
  })

  useEffect(() => {
    if (creating === "group")
      setCreatingCourse({...creatingCourse, children_label: "CURSO"})
    else
    setCreatingCourse({...creatingCourse, children_label: null})
  }, [creating])

  const _createCourse = async () => {
    if (creating === "group") {
      setCreatingCourse({...creatingCourse, children_label: "CURSO"})
    }
    const response = await createGroup(creatingCourse, token)
    if (!response.errors)
      setCreatingCourse({
        parent_id: 0,
        address: "",
        cep: "",
        code: "",
        description: "",
        email: "",
        phone: "",
        children_label: null
      })
    fetchData(token)
  }

  const fetchData = async (token) => {
    const response = await getAllGroups(token, user.type)

    if (!response && !response.groups)
      return
    
    let aux_groups = response.groups
    setCountry(aux_groups[1])
    aux_groups = aux_groups.filter((group) => group.children_label !== "ESTADO")
    aux_groups = aux_groups.filter((group) => group.children_label !== "Pais")
    let aux_states = []
    let aux_counties = []
    let aux_schools = []
    let aux_courses = []

    aux_groups = aux_groups.map((group) => {
      group.parentName = group.parent.name;
      switch(group.children_label) {
        case "MUNICIPIO":
          group.type = "Estado"
          aux_states.push(group)
          break;
        case "GRUPO":
          group.type = "Município"
          aux_counties.push(group)
          break;
        case "CURSO":
          group.type = "Instituição"
          aux_schools.push(group)
          break;
        case null:
          group.type = "Curso"
          aux_courses.push(group)
          break;
        default:
          break;
      }
      return group
    })
    setStates(aux_states)
    setCounties(aux_counties)
    setSchools(aux_schools)
    setCourses(aux_courses)
    setGroups(aux_groups.filter((g) => g.children_label === "MUNICIPIO"))
  }

  const handleDelete = async (id, token) => {
    await deleteGroup(id, token)
    fetchData(token)
  }

  const _editGroup = async () => {
    const data = {
      description: editingGroup.description,
      code: editingGroup.code,
      address: editingGroup.address,
      cep: editingGroup.cep,
      phone: editingGroup.phone,
      email: editingGroup.email
    }
    await editGroup(editingGroup.id, data, token);
    setModalEdit(false);
    fetchData(token);
  }

  const handleShow = (content) => {
    setGroupShow(content);
    setModalShow(!modalShow);
  }

  const handleEdit = (content) => {
    setEditingGroup(content);
    setModalEdit(!modalEdit);
  }

  const handleNavigate = (group, goback=false) => {
    if (group.type === "Estado" && goback === false)
      setGoBack(true)

    // if (goback) {
    //   setGoBack(false)
    //   console.log(country)
    //   setGroups(states.filter((state) => state.parent.name === country.description))
    //   return
    // }
    switch(group.type) {
      case "Estado":
        if (!goback) {
          setGroups(counties.filter((countie) => countie.parent.name === group.description))
          setState(group)
        }
        break;
      case "Município":
        if (goback) {
          console.log("AAAAAAAAAA")
          setGroups(states.filter((state) => state.parent.name === country.description))
          setCountie({})
        } else {
          setGroups(schools.filter((school) => school.parent.name === group.description))
          setCountie(group)
        }
        break;
      case "Instituição":
        if (goback) {
          setGroups(counties.filter((countie) => countie.parent.name === state.description))
          setSchool({})
        } else {
          setGroups(courses.filter((course) => course.parent.name === group.description))
          setSchool(group)
        }
        break;
      case "Curso":
        if (goback) {
          setGroups(schools.filter((school) => school.parent.name === countie.description))
        }
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    const _loadSession = async () => {
      const auxSession = await sessionService.loadSession()
      setToken(auxSession.token)
    }
    _loadSession();
    fetchData(token)
  }, [token]);

  const fields = [
    { key: "id", value: "ID" },
    { key: "description", value: "Nome" },
    { key: "type", value: "Tipo" },
    { key: "parentName", value: "Pertence a(o)" }
  ];

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Informações da Instituição
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <EditInput>
            <label>Nome</label>
            <input
              className="text-dark"
              type="text"
              value={groupShow.description}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Tipo</label>
            <input
              className="text-dark"
              type="text"
              value={groupShow.type}
              disabled
            />
          </EditInput>

          {groupShow.children_label ? 
            <EditInput>
              <label>Tipo dos Grupos Filhos</label>
              <input
                className="text-dark"
                type="text"
                value={groupShow.children_label}
                disabled
              />
            </EditInput>
          : null }

          {groupShow.parentName ?
            <EditInput>
              <label>Nome do Grupo Pai</label>
              <input
                className="text-dark"
                type="text"
                value={groupShow.parentName}
                disabled
              />
            </EditInput>
          : null }

          {groupShow.code ?
            <EditInput>
              <label htmlFor="edit_code">Código</label>
              <input
                type="text"
                id="edit_code"
                value={groupShow.code}
                disabled
              />
            </EditInput>
          : null }  

          {groupShow.address ?
            <EditInput>
              <label htmlFor="edit_address">Endereço</label>
              <input
                type="text"
                id="edit_address"
                value={groupShow.address}
                disabled
              />
            </EditInput>
          : null }

          {groupShow.cep ?
            <EditInput>
              <label htmlFor="edit_cep">CEP</label>
              <input
                type="text"
                id="edit_cep"
                value={groupShow.cep}
                disabled
              />
            </EditInput>
          : null }

          {groupShow.phone ?
            <EditInput>
              <label htmlFor="edit_phone">Telefone</label>
              <input
                type="text"
                id="edit_phone"
                value={groupShow.phone}
                disabled
              />
            </EditInput>
          : null }

          {groupShow.email ?
            <EditInput>
              <label htmlFor="edit_name">Email</label>
              <input
                type="text"
                id="edit_email"
                value={groupShow.email}
                disabled
              />
            </EditInput>
          : null }
        </Modal.Body>

        <Modal.Footer>
          <SubmitButton onClick={() => setModalShow(false)}>Voltar</SubmitButton>
        </Modal.Footer>
      </Modal>

      <Modal
        show={modalEdit}
        onHide={() => setModalEdit(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Editar Instituição
          </Modal.Title>
        </Modal.Header>
        <form id="editGroup" onSubmit={handleSubmit(_editGroup)}>
          <Modal.Body>
            <EditInput>
              <label htmlFor="edit_name">Nome</label>
              <input
                type="text"
                id="edit_name"
                value={editingGroup.description}
                onChange={(e) => setEditingGroup({...editingGroup, description: e.target.value})}
              />
            </EditInput>

            {editingGroup.code ?
            <EditInput>
              <label htmlFor="edit_code">Código</label>
              <input
                type="text"
                id="edit_code"
                value={editingGroup.code}
                onChange={(e) => setEditingGroup({...editingGroup, code: e.target.value})}
              />
            </EditInput>
            : null}

            {editingGroup.address ?
            <EditInput>
              <label htmlFor="edit_address">Endereço</label>
              <input
                type="text"
                id="edit_address"
                value={editingGroup.address}
                onChange={(e) => setEditingGroup({...editingGroup, address: e.target.value})}
              />
            </EditInput>
            : null}

            {editingGroup.cep ?
            <EditInput>
              <label htmlFor="edit_cep">CEP</label>
              <input
                type="text"
                id="edit_cep"
                value={editingGroup.cep}
                onChange={(e) => setEditingGroup({...editingGroup, cep: e.target.value})}
              />
            </EditInput>
            : null}

            {editingGroup.phone ?
            <EditInput>
              <label htmlFor="edit_phone">Telefone</label>
              <input
                type="text"
                id="edit_phone"
                value={editingGroup.phone}
                onChange={(e) => setEditingGroup({...editingGroup, phone: e.target.value})}
              />
            </EditInput>
            : null}

            {editingGroup.email ?    
            <EditInput>
              <label htmlFor="edit_name">Email</label>
              <input
                type="text"
                id="edit_email"
                value={editingGroup.email}
                onChange={(e) => setEditingGroup({...editingGroup, email: e.target.value})}
              />
            </EditInput>
            : null}

          </Modal.Body>
          <Modal.Footer>
            <SubmitButton type="submit">Editar</SubmitButton>
          </Modal.Footer>
        </form>
      </Modal>

      <Container>
        <ContainerContent>
          <ContentBoxHeader>
            <ContentBoxTitle>Instituições</ContentBoxTitle>
          </ContentBoxHeader>
          <ContentBoxTable>
            <Table responsive>
              <thead>
              {goBack ?
              <tr>
                <td>
                  <button style={{width: '150%', height: '25px', padding: 0}} className="btn btn-info" onClick={() => handleNavigate(groups[0], true)}>
                    Voltar
                  </button>
                </td>
              </tr>
              : null }
                <tr>
                  {fields.map(field => (
                      <ContentBoxTableHeader>{field.value}</ContentBoxTableHeader>
                  ))}
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {groups.map(group => (
                  <tr>
                    {fields.map(field => (
                      <td>{group[field.key]}</td>
                    ))}
                    <td>
                      <button className="btn btn-info" onClick={() => handleShow(group)}>
                        Detalhes
                      </button>
                    </td>
                    {group.children_label !== null ?
                    <td>
                      <button className="btn btn-info" onClick={() => handleNavigate(group)}>
                        Ver filhos
                      </button>
                    </td>
                    : null}
                    <td>
                      <Link to="/panel">
                        <ContentBoxTableIcon
                          src={editIcon}
                          alt="Editar"
                          onClick={() => { handleEdit(group) }}
                        />
                      </Link>
                    </td>
                    <td>
                      <Link to="/panel">
                        <ContentBoxTableIcon
                          src={deleteIcon}
                          alt="Deletar"
                          onClick={() => { handleDelete(group.id, token) }}
                        />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ContentBoxTable>
        </ContainerContent>
        
        <AddGroupContainer className="shadow-sm">
          {user.type === "admin" ?
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <SubmitButton style={{alignSelf: 'flex-start'}} onClick={() => setCreating("group")}>Add Instituição</SubmitButton>
              <SubmitButton style={{justifySelf: 'flex-end'}} onClick={() => setCreating("course")}>Add Curso</SubmitButton>  
            </div>
          : null}
          <ContainerHeader>
            <ContainerTitle>{creating === "group" ? "Adicionar Instituição" : "Adicionar Curso"}</ContainerTitle>
          </ContainerHeader>
          <ContainerForm>
            <Form id="addCourse" onSubmit={handleSubmit(_createCourse)}>
              <InputBlock>
                <label htmlFor="name">Nome</label>
                <Input
                  type="text"
                  id="name"
                  value={creatingCourse.description}
                  onChange={(e) => setCreatingCourse({...creatingCourse, description: e.target.value})}
                />
              </InputBlock>

              <InputBlock>
                <label htmlFor="name">Código</label>
                <Input
                  type="text"
                  id="code"
                  value={creatingCourse.code}
                  onChange={(e) => setCreatingCourse({...creatingCourse, code: e.target.value})}
                />
              </InputBlock>

              <InputBlock>
                <label htmlFor="name">Endereço</label>
                <Input
                  type="text"
                  id="address"
                  value={creatingCourse.address}
                  onChange={(e) => setCreatingCourse({...creatingCourse, address: e.target.value})}
                />
              </InputBlock>

              <InputBlock>
                <label htmlFor="name">CEP</label>
                <Input
                  type="text"
                  id="cep"
                  value={creatingCourse.cep}
                  onChange={(e) => setCreatingCourse({...creatingCourse, cep: e.target.value})}
                />
              </InputBlock>

              <InputBlock>
                <label htmlFor="name">Telefone</label>
                <Input
                  type="text"
                  id="phone"
                  value={creatingCourse.phone}
                  onChange={(e) => setCreatingCourse({...creatingCourse, phone: e.target.value})}
                />
              </InputBlock>

              <InputBlock>
                <label htmlFor="name">Email</label>
                <Input
                  type="text"
                  id="email"
                  value={creatingCourse.email}
                  onChange={(e) => setCreatingCourse({...creatingCourse, email: e.target.value})}
                />
              </InputBlock>

              <InputBlock>
                <label htmlFor="name">{creating === "group" ? "Município" : "Instituição"}</label>
                <SelectInput
                  type="select"
                  id="name"
                  onChange={(e) => setCreatingCourse({...creatingCourse, parent_id: e.target.value})}
                >
                  <option value="" selected disabled hidden>Escolha aqui</option>
                  {creating === "group" ?
                    groups.filter((g) => g.children_label === "GRUPO").map((g) => {
                    return <option key={g.id} value={g.id}>{g.description}</option>
                  }) :
                    groups.filter((g) => g.children_label === "CURSO").map((g) => {
                    return <option key={g.id} value={g.id}>{g.description}</option>
                  })}
                </SelectInput>
              </InputBlock>

              <SubmitButton type="submit">
                {creating === "group" ? "Criar Instituição" : "Criar Curso"}
              </SubmitButton>
            </Form>
          </ContainerForm>
        </AddGroupContainer>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
  groups: state.user.groups
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setGroups,
    setToken
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Groups);