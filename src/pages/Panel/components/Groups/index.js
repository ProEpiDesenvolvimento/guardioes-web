/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  setGroups, setToken, setGoDataToken
} from 'actions/';
import { bindActionCreators } from 'redux';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';

import getAllGroups from './services/getAllGroups'
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

import FormInput from 'sharedComponents/FormInput';
import ModalInput from 'sharedComponents/ModalInput';

const Groups = ({
  token,
  user,
  groups,
  setGroups,
  setToken,
  godataToken,
  setGoDataToken
}) => {
  const [modalEdit, setModalEdit] = useState(false);
  const { handleSubmit } = useForm();

  const [groupID, setGroupId] = useState(0);
  const [noGroup, setNoGroup] = useState(false);

  const [modalShow, setModalShow] = useState(false);
  const [groupShow, setGroupShow] = useState({});

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [cityOnly, setCityOnly] = useState({});

  const [groupLabel, setGroupLabel] = useState('');
  const [prevGroup, setPrevGroup] = useState([]);
  const [count, setCount] = useState(0);

  const [goBack, setGoBack] = useState(false);

  const [addSubGroup, setAddSubGroup] = useState(false)
  
  const [creating, setCreating] = useState("course");
  const [editChildrenLabel, setEditChildrenLabel] = useState(null)
  const [locations, setLocations] = useState([]);
  
  const [creatingGroup, setCreatingGroup] = useState({
    description: "default",
    code: "",
    children_label: null,
    parent_id: null
  })

  const [editingGroup, setEditingGroup] = useState({});

  useEffect(() => {
    if (creating === "group") {
      let desc = user.group_manager.group_name
      setCreatingGroup({...creatingGroup, description: desc, children_label: "CURSO"})
    }
    else
      setCreatingGroup({...creatingGroup, description: "", children_label: null})
  }, [creating])

  const getLocations = async (token) => {
    await axios.get(
      `${user.url_godata}/api/locations`,
      {
        headers: { "Authorization": `${token}` }
      }
    )
      .then((res) => {
        setLocations(res.data);
      })
      .catch((e) => {
        // alert(e);
      });
  }

  const _createGroup = async () => {
    if (creatingGroup.description === '' || creatingGroup.parent_id === null) {
      return alert('Erro, verifique os dados ou contate um administrador!')
    } else {
      const response = await createGroup(creatingGroup, token)

      if (!response.errors) {
        clearData()
        response.data.group.parentName = response.data.group.parent.name
        setGroups([...groups, response.data.group])
      }
      setNoGroup(false)
      setAddSubGroup(false)
    }
  }

  const _editGroup = async () => {
    let children
    if (editingGroup.children_label !== null) {
      children = editingGroup.children_label
    } else {
      children = editChildrenLabel
    }

    const data = {
      description: editingGroup.description,
      code: editingGroup.code,
      children_label: children,
      location_name_godata: editingGroup.location_name_godata,
      location_id_godata: editingGroup.location_id_godata
    }

    const response = await editGroup(editingGroup.id, data, token);

    if (!response.errors) {
      const newGroups = groups.map((group) => {
        if (group.id === editingGroup.id) {
          return {
            ...response.data.group,
            parentName: response.data.group.parent.name,
            ...data,
          }
        } else {
          return group
        }
      })
      setGroups(newGroups)
    }
    setModalEdit(false);
  }

  const clearData = () => {
    setCreatingGroup({
      parent_id: null,
      code: "",
      description: "",
      children_label: null
    })
    setEditingGroup({})
    setGroupShow({})
    setAddSubGroup(false)
    setEditChildrenLabel(null)
    setCreating("course")
  }

  const fetchData = async (token) => {
    setGoBack(false)
    setPrevGroup([])
    setCount(0)
    const response = await getAllGroups(token)

    if (!response.groups || response.groups.length === 0)
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
    response.groups.forEach((group_map) => {
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
    const response = await deleteGroup(id, token)

    if (!response.errors) {
      fetchData(token)
    }
  }

  const handleShow = (content) => {
    setGroupShow(content);
    setModalShow(!modalShow);
  }

  const handleEdit = (content) => {
    setEditingGroup(content);
    setModalEdit(!modalEdit);
  }

  const handleLocationValue = (group) => {
    const groupLocation = group.location_id_godata
    const value = locations.filter((location) => location.id === groupLocation)

    if (value.length > 0) {
      return value[0]
    }
    return null
  }

  const handleNavigate = async (group, goback=false) => {
    setGroupId(group.id)
    if (goback === false) {
      setGroupLabel(group.children_label)
      const response = await getChildrenGroups(group.id)
      let aux_groups = response.children

      if (response.children.length !== 0){
        aux_groups = aux_groups.map((group_map) => {
          group_map.parentName = group.description
          return group_map
        })
      } else {
        setNoGroup(true)
      }

      setCount(count + 1)
      setPrevGroup([...prevGroup, groups])
      getCity(group)
      setGroups(aux_groups)
      setGoBack(false)
    }
    
    if (goback === true) {
      setNoGroup(false)
      let aux_label = prevGroup[count - 1]
      setGroups(aux_label)

      aux_label[0].hasOwnProperty('parent') ? 
        getGroupLabel(aux_label[0].parent.id) : setGroupLabel(aux_label[0].label)
        
      if (groups.length === 0) {
        getCity(aux_label[0])
      } else {
        getCity(group)
      }

      setCount(count - 1)
      if(count <= 1){
        setPrevGroup([])
        setGoBack(false)
      }
    } else {
      setGoBack(true)
    }
  }

  const getCity = async (group) => {
    if(groups.length === 0) {
      return
    } else {
      if (groups[0].parentName === user.group_name){
        return
      } else {
        if(group.hasOwnProperty('parent')) {
          setCityOnly(group.parent)
          return
        } else { 
          return
        }
      }
    }
  }

  const loginGoData = async (user) => {
    if (!user.url_godata && !user.username_godata) return

    await axios.post(
      `${user.url_godata}/api/oauth/token`,
      {
        username: user.username_godata,
        password: user.password_godata
      }
    )
      .then(async (res) => {
        setGoDataToken("Bearer " + res.data.access_token);
        const auxSession = await sessionService.loadSession();
        await sessionService.saveSession({ ...auxSession, godataToken: "Bearer " + res.data.access_token });
        getLocations(res.data.access_token);
      })
      .catch((e) => {
        alert("Falha na autenticação do GoData. Verifique as credenciais.");
      });
  }

  useEffect(() => {
    const _loadSession = async () => {
      const auxSession = await sessionService.loadSession()
      setToken(auxSession.token)
      fetchData(auxSession.token)
    }
    _loadSession();

    if (user.group_manager) {
      loginGoData(user.group_manager);
    } else {
      loginGoData(user);
    }
  }, []);

  const fields = [
    { key: "id", value: "ID" },
    { key: "description", value: "Nome" },
    { key: "parentName", value: "Pertence a(o)" }
  ];

  return (
    <>
      {/* ------- VISUALIZAR MODAL ------- */}  
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

        <ModalInput
            type="text"
            label="Nome"
            value={groupShow.description}
            disabled={true}
          />

        <ModalInput
            type="text"
            label="Tipo"
            value={groupLabel}
            disabled={true}
          />

          {groupShow.children_label ?
          <ModalInput
            type="text"
            label="Tipo dos Grupos Filhos"
            value={groupShow.children_label}
            disabled={true}
          />
          : null}

          {groupShow.parentName ?
          <ModalInput
            type="text"
            label="Nome do Grupo Pai"
            value={groupShow.parentName}
            disabled={true}
          />
          : null}

          {groupShow.code ?
          <ModalInput
            type="text"
            label="Código"
            id="edit_code"
            value={groupShow.code}
            disabled={true}
          />
          : null}

          {groupShow.location_name_godata ?
            <ModalInput
              type="text"
              label="Nome da Locação no GoData"
              id="edit_code"
              value={groupShow.location_name_godata}
              disabled={true}
            />
          : null}
        </Modal.Body>

        <Modal.Footer>
          <SubmitButton onClick={() => setModalShow(false)}>Voltar</SubmitButton>
        </Modal.Footer>
      </Modal>

      {/* ------- EDITAR MODAL ------- */}  
      <Modal
        show={modalEdit}
        onHide={() => {
          setModalEdit(false)
          setAddSubGroup(false)
          setEditChildrenLabel(null)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Editar Instituição
          </Modal.Title>
        </Modal.Header>
        <form id="editGroup" onSubmit={handleSubmit(_editGroup)}>
          <Modal.Body>
            {/* ------- NOME ------- */}

            <ModalInput
              type="text"
              label="Nome"
              id="edit_code"
              value={editingGroup.description}
              disabled={user.group_name === editingGroup.description ? true : false}
              setValue={(e) => setEditingGroup({
                ...editingGroup, 
                description: e.target.value, 
                children_label: editingGroup.children_label
              })}
            />
            
            {/* ------- SUBGRUPO ------- */}
            {editingGroup.children_label ? 

              <ModalInput
              type="text"
              label="Subgrupo"
              id="edit_subgrupo"
              value={editingGroup.children_label}
              disabled={true}
              />
              :
              <>
                <SubmitButton type="reset" onClick={() => {setAddSubGroup(true)}}>Adicionar Subgrupo</SubmitButton>
                {addSubGroup ?
                <ModalInput
                  type="text"
                  label="Adicionar Subgrupo"
                  id="edit_subgrupo"
                  value={editChildrenLabel}
                  setValue={(e) => {setEditChildrenLabel(e.target.value)}}
                /> 
                : null}
              </>
            }
            {/* ------- CODIGO ------- */}
            {editingGroup.code ?
             <ModalInput
              type="text"
              label="Código"
              id="edit_code"
              value={editingGroup.code}
              setValue={(e) => setEditingGroup({...editingGroup, code: e.target.value})}
            /> 
            : null}

            {locations.length > 0 && editingGroup.children_label == null ?
              <EditInput>
                <label htmlFor="edit_gender">Locação no GoData</label>
                <Select 
                  id="edit_gender"
                  options={locations}
                  defaultValue={handleLocationValue(editingGroup)}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  onChange={(option) => setEditingGroup({
                    ...editingGroup,
                    location_name_godata: option.name,
                    location_id_godata: option.id
                  })}
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
        {/* ------- TABELA ------- */}
        <ContainerContent>
          <ContentBoxHeader>
            <ContentBoxTitle>Instituições</ContentBoxTitle>
          </ContentBoxHeader>
            <ContentBoxSubTitle>{groupLabel}</ContentBoxSubTitle>
          <ContentBoxTable>
            {!noGroup ? 
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
                : null}
                  <tr>
                    {fields.map(field => (
                      <ContentBoxTableHeader key={field.value}>{field.value}</ContentBoxTableHeader>
                    ))}
                    <th></th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
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
            :
              <Table responsive>
                <thead>
                  {goBack ? 
                    <tr>
                      <td>
                        <button style={{width: '10%', height: '25px', padding: 0}} className="btn btn-info" onClick={() => handleNavigate(groups, true)}>
                          Voltar
                        </button>
                      </td>
                    </tr>
                  : null}
                  <tr>
                    <th>{groupLabel} vazio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Não há nada cadastrado em {groupLabel}.</td>
                  </tr>
                </tbody>
              </Table>
            }
          </ContentBoxTable>
        </ContainerContent>
      
        {/* ------- FORMULARIO ------- */}  
        <AddGroupContainer className="shadow-sm">
          <ContainerHeader>
            <ContainerTitle>Adicionar {groupLabel}</ContainerTitle>
          </ContainerHeader>
          <ContainerForm>
            <Form id="addCourse" onSubmit={handleSubmit(_createGroup)}>
              {groups.length !== 0 && user.group_name === groups[0].description ? 
                <>
                  {/* ------- NOME ------- */}

                  <FormInput
                  label="Nome"
                  type="text"
                  id="nameFix"
                  disabled
                  value={groups[0].description}
                  />
                  
                  {/* ------- MUNICIPIOS ------- */} 
                  {typeof cities !== 'undefined' && cities.length !== 0 ? 
                    <InputBlock>
                      <label htmlFor="name">Município</label>
                      <SelectInput
                        type="select"
                        id="name"
                        onChange={(e) => {
                          const id = parseInt(e.target.value)
                          setCreatingGroup({...creatingGroup, parent_id: id, description: groups[0].description})
                        }}
                      >
                        <option>Escolha</option>
                        {cities.map((g) => {
                          return <option key={g.id} value={g.id}>{g.description}</option>
                        })}
                      </SelectInput>
                    </InputBlock>
                  : null}
                </>
              :
              <>
                {/* ------- NOME ------- */}
                <FormInput
                  label="Nome"
                  type="text"
                  id="nameEdit"
                  value={creatingGroup.description}
                  setValue={(e) => setCreatingGroup({...creatingGroup, parent_id: groupID, description: e.target.value})}
                  
                />

                {/* ------- MUNICIPIO ------- */}  
                {cityOnly.hasOwnProperty('name') ? 

                  <FormInput
                  label="Município"
                  type="select"
                  id="name"
                  placeholder="Selecione o Município"
                  disabled
                  options={cityOnly.name}
                  />
                : null}
                </>
              }
              {/* ------- ESTADO ------- */} 

              <FormInput
                  label="Estado"
                  type="select"
                  id="name"
                  placeholder="Selecione o estado"
                  disabled
                  value={states.description}
              />

              {/* ------- CÓDIGO ------- */}

              <FormInput
                  label="Código"
                  type="text"
                  id="cod"
                  value={creatingGroup.code}
                  setValue={(e) => setCreatingGroup({...creatingGroup, code: e.target.value})}
              />

              {/* ------- TIPO ------- */}  
              <FormInput
                  label="Tipo"
                  type="text"
                  id="tipo"
                  value={groupLabel}
                  disabled
              />

              <SubmitButton type="submit">
                Adicionar em {groupLabel}
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
  groups: state.user.groups,
  godataToken: state.user.godataToken
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setGroups,
    setToken,
    setGoDataToken
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Groups);