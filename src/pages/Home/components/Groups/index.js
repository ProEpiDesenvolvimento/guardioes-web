/* eslint-disable react-hooks/exhaustive-deps */
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
import getChildrenGroups from './services/getChildrenGroups'

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

  const [prevGroup, setPrevGroup] = useState([]);
  const [count, setCount] = useState(0);

  const [goBack, setGoBack] = useState(false);

  const [creating, setCreating] = useState("course");
  const [creatingGroup, setCreatingGroup] = useState({
    parent_id: 0,
    address: "",
    cep: "",
    code: "",
    description: "",
    email: "",
    phone: "",
    children_label: null
  })
  const [creatingState, setCreatingState] = useState("");
  const [creatingCountie, setCreatingCountie] = useState("");

  useEffect(() => {
    if (creating === "group") {
      let desc = user.group_manager.group_name
      setCreatingGroup({...creatingGroup, description: desc, children_label: "CURSO"})
    }
    else
      setCreatingGroup({...creatingGroup, description: "", children_label: null})
  }, [creating])

  const _createGroup = async () => {
    const response = await createGroup(creatingGroup, token)
    if (!response.errors)
      clearData()
    fetchData(token)
  }

  const clearData = () => {
    setCreatingGroup({
      parent_id: 0,
      address: "",
      cep: "",
      code: "",
      description: "",
      email: "",
      phone: "",
      children_label: null
    })
    setEditingGroup({})
    setGroupShow({})
    setCreating("course")
  }

  const fetchData = async (token) => {
    const response = await getAllGroups(token)

    if (!response && !response.groups)
      return
    
    let aux_groups = response.groups

    aux_groups = aux_groups.map((group) => {
      group.parentName = group.parent.name
      return group
    })

    setGroups(aux_groups)
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

  const handleNavigate = async (group, goback=false) => {
    if (goback === false) {
      const response = await getChildrenGroups(group.id)

      if (response.children.length === 0){
        return alert("O grupo não possui filhos")
      }

      setPrevGroup([...prevGroup, groups])
      setCount(count + 1)
      setGroups(response.children)
      setGoBack(false)
    }
    
    if (goback === true) {
      let aux_prev = prevGroup[count - 1]
      //console.log('ARRAY QUE VAI VOLTAR', aux_prev)
      setGroups(prevGroup[count - 1])

      setCount(count - 1)
      if(count <= 0){
        setGoBack(false)
      }
    } else {
      setGoBack(true)
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
    { key: "children_label", value: "Tipo" },
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
                  <button style={{width: '150%', height: '25px', padding: 0}} className="btn btn-info" onClick={() => handleNavigate(groups, true)}>
                    Voltar
                  </button>
                </td>
              </tr>
              : null }
                <tr>
                  {fields.map(field => (
                      <ContentBoxTableHeader key={field.value}>{field.value}</ContentBoxTableHeader>
                  ))}
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {/* {console.log('GRUPOS QUE SERÃO MOSTRADOS -> ', groups)}
                {console.log('GRUPOS PARA VOLTAR -> ', prevGroup)} */}
                {console.log('CONTADOR -> ', count)}
                {groups.map(group => (
                  <tr key={group.id}>
                    {fields.map(field => (
                      <td key={field.value}>{group[field.key]}</td>
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
        
        {user.type === "group_manager" ?
        <AddGroupContainer className="shadow-sm">
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <SubmitButton
                style={{alignSelf: 'flex-start'}}
                onClick={() => {
                  clearData()
                  setCreating("group")
                }}
              >Add Instituição</SubmitButton>
              <SubmitButton
                style={{justifySelf: 'flex-end'}}
                onClick={() => {
                  clearData()
                  setCreating("course")
                }}
              >Add Subgrupo de Instituição</SubmitButton>  
            </div>
          <ContainerHeader>
            <ContainerTitle>{creating === "group" ? "Adicionar Instituição" : "Adicionar Subgrupo de Instituição"}</ContainerTitle>
          </ContainerHeader>
          <ContainerForm>
            <Form id="addCourse" onSubmit={handleSubmit(_createGroup)}>
              {creating === "course" ?
              <InputBlock>
                <label htmlFor="name">Nome</label>
                <Input
                  type="text"
                  id="name"
                  value={creatingGroup.description}
                  onChange={(e) => setCreatingGroup({...creatingGroup, description: e.target.value})}
                />
              </InputBlock>
              : null}

              <InputBlock>
                <label htmlFor="name">Código</label>
                <Input
                  type="text"
                  id="code"
                  value={creatingGroup.code}
                  onChange={(e) => setCreatingGroup({...creatingGroup, code: e.target.value})}
                />
              </InputBlock>

              <InputBlock>
                <label htmlFor="name">Endereço</label>
                <Input
                  type="text"
                  id="address"
                  value={creatingGroup.address}
                  onChange={(e) => setCreatingGroup({...creatingGroup, address: e.target.value})}
                />
              </InputBlock>

              <InputBlock>
                <label htmlFor="name">CEP</label>
                <Input
                  type="text"
                  id="cep"
                  value={creatingGroup.cep}
                  onChange={(e) => setCreatingGroup({...creatingGroup, cep: e.target.value})}
                />
              </InputBlock>

              <InputBlock>
                <label htmlFor="name">Telefone</label>
                <Input
                  type="text"
                  id="phone"
                  value={creatingGroup.phone}
                  onChange={(e) => setCreatingGroup({...creatingGroup, phone: e.target.value})}
                />
              </InputBlock>

              <InputBlock>
                <label htmlFor="name">Email</label>
                <Input
                  type="text"
                  id="email"
                  value={creatingGroup.email}
                  onChange={(e) => setCreatingGroup({...creatingGroup, email: e.target.value})}
                />
              </InputBlock>
              <InputBlock>
                <label htmlFor="name">Estado</label>
                <SelectInput
                  type="select"
                  id="name"
                  onChange={(e) => setCreatingState(e.target.value)}
                >
                  <option>Escolha</option>
                  {states.filter((g) => g.type === "Estado").map((g) => {
                    return <option value={g.description}>{g.description}</option>
                  })}
                </SelectInput>
              </InputBlock>

              {creatingState.length !== 0 ?
              <InputBlock>
                <label htmlFor="name">Município</label>
                <SelectInput
                  type="select"
                  id="name"
                  onChange={(e) => {
                    const id = parseInt(e.target.value, 10)
                    if (creating === "group")
                      setCreatingGroup({...creatingGroup, parent_id: id})
                    const aux_description = counties.find(countie => countie.id === id).description
                    setCreatingCountie(aux_description)
                  }}
                >
                  <option>Escolha</option>
                  {counties.filter((g) => g.parent.name === creatingState).map((g) => {
                    return <option key={g.id} value={g.id}>{g.description}</option>
                  })}
                </SelectInput>
              </InputBlock>
              : null}

              {creating === "course" && creatingCountie.length !== 0?
              <InputBlock>
                <label htmlFor="name">Instituição</label>
                <SelectInput
                  type="select"
                  id="name"
                  onChange={(e) => {
                    const id = parseInt(e.target.value, 10)
                    if (creating === "course")
                      setCreatingGroup({...creatingGroup, parent_id: id})
                  }}
                >
                  <option>Escolha</option>
                  {schools.filter((g) => g.parent.name === creatingCountie).map((g) => {
                    return <option key={g.id} value={g.id}>{g.description}</option>
                  })}
                </SelectInput>
              </InputBlock>
              : null}

              <SubmitButton type="submit">
                {creating === "group" ? "Criar Instituição" : "Criar Subgrupo de Instituição"}
              </SubmitButton>
            </Form>
          </ContainerForm>
        </AddGroupContainer>
        : null}
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