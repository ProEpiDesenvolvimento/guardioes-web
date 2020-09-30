import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  setGroups, setToken
} from 'actions/';
import { bindActionCreators } from 'redux';
import getAllGroups from './services/getAllGroups'
// import createApp from './services/createApp'
import deleteGroup from './services/deleteGroup'
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
  EditCheckbox,
  EditCheckboxInput
} from './styles';
import { useForm } from "react-hook-form";
import ContentBox from '../ContentBox';
import Modal from 'react-bootstrap/Modal';
import { sessionService } from 'redux-react-session';
import getAllGroupManagers from '../GroupManagers/services/getAllGroupManagers';

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

  // const _createApp = async () => {
  //   const data = {
  //     "app_name": appName,
  //     "owner_country": ownerCountry
  //   }
  //   console.log(data)
  //   const reponse = await createApp(data, token)
  //   console.log(reponse)
  //   _getApps(token)
  //   setAppName("")
  //   setOwnerCountry("")
  // }

  const fetchData = async (token) => {
    const response = await getAllGroups(token)
    const aux_groups = response.groups.map((group) => {
                          group.parentName = group.parent.name;
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
      require_id: editingGroup.require_id,
      id_code_length: editingGroup.require_id ? editingGroup.require_id : null
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
    { key: "children_label", value: "Tipo dos Grupos Filhos" },
    { key: "parentName", value: "Nome do Grupo Pai" }
  ];

  console.log(editingGroup.require_id)

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

          <EditInput>
            <label>Nome do Grupo Pai</label>
            <input
              className="text-dark"
              type="text"
              value={groupShow.parentName}
              disabled
            />
          </EditInput>

          {groupShow.require_id ?
            <EditInput>
              <label htmlFor="edit_len_id_code">Quantidade de caracteres</label>
              <input
                type="number"
                id="edit_len_id_code"
                value={groupShow.id_code_length}
                min="1"
                disabled
              />
            </EditInput>
          : null}
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

            <EditCheckbox>
              <label htmlFor="edit_id_code">Código de Identificação</label>
              <EditCheckboxInput
                type="checkbox"
                id="edit_id_code"
                value={editingGroup.require_id}
                onChange={(e) => setEditingGroup({...editingGroup, require_id: e.target.value})}
              />
            </EditCheckbox>

            {editingGroup.require_id ? <EditInput>
              <label htmlFor="edit_len_id_code">Quantidade de caracteres</label>
              <input
                type="number"
                id="edit_len_id_code"
                value={editingGroup.id_code_length}
                min="1"
                onChange={(e) => setEditingGroup({...editingGroup, id_code_length: e.target.value})}
              />
            </EditInput> : null}

          </Modal.Body>
          <Modal.Footer>
            <SubmitButton type="submit">Editar</SubmitButton>
          </Modal.Footer>
        </form>
      </Modal>

      <Container>
        <ContentBox
          title="Instituições"
          token={token}
          contents={groups ? groups : []}
          fields={fields}
          delete_function={handleDelete}
          handleEdit={handleEdit}
          handleShow={handleShow}  
        />


        <AddGroupContainer className="shadow-sm">
          <ContainerHeader>
            <ContainerTitle>Adicionar Instituição</ContainerTitle>
          </ContainerHeader>
          <ContainerForm>
            <form id="addGroup" onSubmit={() => {}}>
              <InputBlock>
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  value={"arroz"}
                  onChange={(e) => {}}
                />
              </InputBlock>

              <SubmitButton type="submit">
                Criar App
            </SubmitButton>
            </form>
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