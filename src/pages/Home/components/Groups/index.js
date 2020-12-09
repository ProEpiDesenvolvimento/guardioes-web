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
import getGroup from './services/getGroup'
import createGroup from './services/createGroup'
import deleteGroup from './services/deleteGroup'
import getChildrenGroups from './services/getChildrenGroups'
import buildGroupPath from './services/buildGroupPath'

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
  ContentBoxSubTitle,
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
  const [cities, setCities] = useState([]);
  const [cityOnly, setCityOnly] = useState({});
  const [schools, setSchools] = useState([]);

  const [children, setChildren] = useState('');
  const [groupLabel, setGroupLabel] = useState('');
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
    setGoBack(false)
    setPrevGroup([])
    setCount(0)
    const response = await getAllGroups(token)

    if (!response && !response.groups)
      return
    
    let aux_groups = response.groups

    aux_groups = aux_groups.map((group) => {
      group.parentName = group.parent.name
      return group
    })

    await getGroupLabel(aux_groups[0].parent.id)
    
    getBuildPath(aux_groups[0].id, 'ESTADO')
    setGroups(aux_groups)
  }

  const getGroupLabel = async (label_group_id) => {
    const response = await getChildrenGroups(label_group_id)

    setGroupLabel(response.children[0].label)
  }

  const getBuildPath = async (group_id, type) => {
    let state_id;

    const response = await buildGroupPath(group_id);
    response.groups.map((group_map) => {
      if (group_map.label === type) {
        state_id = group_map.id
        setStates(group_map)
      } 
    })

    const city = await getChildrenGroups(state_id)
    setCities(city.children)

    return;
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

  const getGroupName = async (parent_id) => {
    const response = await getGroup(parent_id, token);

    const parent = await getGroup(response.group.parent.id, token)
    setChildren(parent.group.children_label)
  }

  const handleNavigate = async (group, goback=false) => {
    if (goback === false) {
      const response = await getChildrenGroups(group.id)

      if (response.children.length === 0){
        return alert("O grupo não possui filhos")
      }

      setCount(count + 1)
      setPrevGroup([...prevGroup, groups])
      let aux_groups = response.children
      
      await getGroupLabel(group.id)
      aux_groups = aux_groups.map((group_map) => {
        group_map.parentName = group.description
        group_map.children_label = group_map.children_label
        return group_map
      })
      setGroups(aux_groups)

      // VERIFICAR SE É MUNICIPIO ANTES DE SETAR
      getCity(aux_groups[0].id)
      setGoBack(false)
    }
    
    if (goback === true) {
      let aux_label = prevGroup[count - 1]

      aux_label[0].hasOwnProperty('parent') ? 
        getGroupLabel(aux_label[0].parent.id) : setGroupLabel(aux_label[0].children_label)

      setGroups(prevGroup[count - 1])
      getCity(aux_label[0].id)
      setCount(count - 1)
      if(count <= 1){
        setPrevGroup([])
        setGoBack(false)
      }
    } else {
      setGoBack(true)
    }
  }

  const getCity = async (id) => {
    if(typeof groups !== 'undefined' && groups.length !== 0){
      if (groups[0].parentName === user.group_name){
        return
      } else {
        const response = await getGroup(id, token)
        const municipio = await getGroup(response.group.parent.id)
        setCityOnly(municipio.group.parent)
      }
    }

    return
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
        {console.log(groupShow)}
        
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
              {user.group_name === editingGroup.description ? 
                <input
                  type="text"
                  id="edit_name"
                  disabled={true}
                  value={editingGroup.description}
                  onChange={(e) => setEditingGroup({...editingGroup, description: e.target.value})}
                /> : 
                <input
                  type="text"
                  id="edit_name"
                  value={editingGroup.description}
                  onChange={(e) => setEditingGroup({...editingGroup, description: e.target.value})}
                />
              }
              
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
            <ContentBoxSubTitle>{groupLabel}</ContentBoxSubTitle>
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
                {console.log('GROUPS ----> ', groups[0])}
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
      
        <AddGroupContainer className="shadow-sm">
          <ContainerHeader>
            <ContainerTitle>ADICIONAR {groupLabel}</ContainerTitle>
          </ContainerHeader>
          <ContainerForm>
            <Form id="addCourse" onSubmit={handleSubmit(_createGroup)}>
              {/* {groups.length !== 0 && groups[0].hasOwnProperty('parent') ? getGroupName(groups[0].parent.id) : null} */}
              {groups.length !== 0 && user.group_name === groups[0].description ? 
              <>
                <InputBlock>
                  <label htmlFor="name">Nome</label>
                  <Input
                    type="text"
                    id="name"
                    disabled
                    value={groups[0].description}
                  /> 
                </InputBlock>

                {typeof cities !== 'undefined' && cities.length !== 0 ? 
                  <InputBlock>
                    <label htmlFor="name">Município</label>
                    <SelectInput
                      type="select"
                      id="name"
                      onChange={(e) => {
                        const id = parseInt(e.target.value)
                        setCreatingGroup({...creatingGroup, parent_id: id, description: groups[0].description})
                        console.log('### -> ', creatingGroup)
                      }}
                    >
                      <option>Escolha</option>
                      {cities.map((g) => {
                        return <option key={g.id} value={g.id}>{g.description}</option>
                      })}
                    </SelectInput>
                  </InputBlock>
                  : 
                    null
                  }
              </>
              :
              <>
                <InputBlock>
                  <label htmlFor="name">Nome</label>
                  <Input
                    type="text"
                    id="name"
                    value=""
                    onChange={(e) => setCreatingGroup({...creatingGroup, description: e.target.value})}
                  />
                </InputBlock>

                {/* {groups.length !== 0 ? getCity(groups[0].id) : null} */}
                {console.log(cityOnly)}
                {groups.length !== 0 && cityOnly.hasOwnProperty('name') ? 
                  <InputBlock>
                    <label htmlFor="name">Município</label>
                    <SelectInput
                      type="select"
                      id="name"
                      disabled
                    >
                      <option>{cityOnly.name}</option>                  
                    </SelectInput>
                  </InputBlock>
                  : 
                    null
                  }
                
                </>
              }

              <InputBlock>
                  <label htmlFor="name">Estado</label>
                  <SelectInput
                    type="select"
                    id="name"
                    value={states.description}
                    disabled
                  >
                    <option>{states.description}</option>
                    {/* {setCreatingState(states.description)} */}
                  </SelectInput>
                </InputBlock>

              <InputBlock>
                <label htmlFor="name">Código</label>
                <Input
                  type="text"
                  id="code"
                  value={creatingGroup.code}
                  onChange={(e) => setCreatingGroup({...creatingGroup, code: e.target.value})}
                />
              </InputBlock>

              {}
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

              <SubmitButton type="submit">
                Criar Subgrupo de Instituição
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