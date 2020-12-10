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
  const { handleSubmit } = useForm();

  const [groupID, setGroupId] = useState(0);

  const [modalShow, setModalShow] = useState(false);
  const [groupShow, setGroupShow] = useState({});

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [cityOnly, setCityOnly] = useState({});

  const [groupLabel, setGroupLabel] = useState('');
  const [prevGroup, setPrevGroup] = useState([]);
  const [count, setCount] = useState(0);

  const [goBack, setGoBack] = useState(false);

  const [creating, setCreating] = useState("course");
  const [modalCreateGroup, setModalCreateGroup] = useState({
    description: "",
    code: "",
    children_label: null,
    parent_id: 0,
  })
  const [creatingGroup, setCreatingGroup] = useState({
    description: "",
    code: "",
    children_label: null,
    parent_id: 0,
  })

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
      code: "",
      description: "",
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
      children_label: modalCreateGroup.parent
    }

    if (data.children_label && modalCreateGroup.description === null){
      return alert('Você precisa criar um SubGrupo')
    }

    await editGroup(editingGroup.id, data, token);

    if(modalCreateGroup.description){
      await createGroup(modalCreateGroup, token)
    }

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
    setGroupId(group.id)
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
        //group_map.label = group.parent.children_label
        return group_map
      })
      setGroups(aux_groups)

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
              value={groupLabel}
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

        </Modal.Body>

        <Modal.Footer>
          <SubmitButton onClick={() => setModalShow(false)}>Voltar</SubmitButton>
        </Modal.Footer>
      </Modal>

      {/* ------- EDITAR MODAL ------- */}  
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
            {console.log('EDIT ', editingGroup)}
            {editingGroup.children_label ? 
              <EditInput>
              <label htmlFor="edit_code">Nome do SubGrupo</label>
              <input
                type="text"
                id="edit_subgrupo"
                value={editingGroup.children_label}
                disabled
              />
            </EditInput>
              :
              <>
                Adicionar SubGrupo
                <EditInput>
                  <label htmlFor="edit_code">Tipo do SubGrupo</label>
                  <input
                    type="text"
                    id="edit_subgrupo"
                    defaultValue=""
                    value={editingGroup.children_label}
                    onChange={(e) => {
                      setModalCreateGroup({...modalCreateGroup, parent: e.target.value})}
                    }
                  />
                </EditInput>

                <EditInput>
                  <label htmlFor="edit_name">Nome</label>
                    <input
                      type="text"
                      id="edit_name"
                      value={modalCreateGroup.description}
                      onChange={(e) => {
                        setModalCreateGroup({...modalCreateGroup, 
                          parent_id: editingGroup.id,
                          description: e.target.value,
                        })}
                      }
                    />
                </EditInput>
              </>
            }

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
                    : 
                      null
                    }
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
      
        {/* ------- FORMULARIO ------- */}  
        <AddGroupContainer className="shadow-sm">
          <ContainerHeader>
            <ContainerTitle>ADICIONAR {groupLabel}</ContainerTitle>
          </ContainerHeader>
          <ContainerForm>
            <Form id="addCourse" onSubmit={handleSubmit(_createGroup)}>
              {groups.length !== 0 && user.group_name === groups[0].description ? 
              <>
                {/* ------- NOME ------- */} 
                <InputBlock>
                  <label htmlFor="name">Nome</label>
                  <Input
                    type="text"
                    id="nameFix"
                    disabled
                    value={groups[0].description}
                  /> 
                </InputBlock>
                
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
                : 
                  null
                }

              </>
              :
              <>
                {/* ------- NOME ------- */}  
                {console.log('GRUPO -> ', groupID)}
                <InputBlock>
                  <label htmlFor="name">Nome</label>
                  <Input
                    type="text"
                    id="nameEdit"
                    value={creatingGroup.description}
                    defaultValue=""
                    onChange={(e) => setCreatingGroup({...creatingGroup, parent_id: groupID, description: e.target.value})}
                  />
                </InputBlock>

                {/* ------- MUNICIPIO ------- */}  
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
              {/* ------- ESTADO ------- */}  
              <InputBlock>
                  <label htmlFor="name">Estado</label>
                  <SelectInput
                    type="select"
                    id="name"
                    value={states.description}
                    disabled
                  >
                    <option>{states.description}</option>
                  </SelectInput>
                </InputBlock>

              {/* ------- CÓDIGO ------- */}
              <InputBlock>
                <label htmlFor="name">Código</label>
                <Input
                  type="text"
                  id="code"
                  defaultValue=""
                  value={creatingGroup.code}
                  onChange={(e) => setCreatingGroup({...creatingGroup, code: e.target.value})}
                />
              </InputBlock>

              {/* ------- TIPO ------- */}  
              <InputBlock>
                <label htmlFor="name">Tipo</label>
                <Input
                  type="text"
                  id="tipo"
                  value={groupLabel}
                  disabled
                  /* onChange={(e) => setCreatingGroup({...creatingGroup, description: e.target.value})} */
                />
              </InputBlock>

              <SubmitButton type="submit">
                Adicionar {groupLabel}
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