import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  setGroups, setToken
} from 'actions/';
import { bindActionCreators } from 'redux';
import getAllGroups from './services/getAllGroups'
// import createApp from './services/createApp'
// import deleteApp from './services/deleteApp'
// import editApp from './services/editApp';
import {
  Container,
  AddGroupContainer,
  ContainerHeader,
  ContainerTitle,
  ContainerForm,
  InputBlock,
  EditInput,
  SubmitButton,
  Input
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
    const aux_groups =  response.groups.map((group) => {
                          group.parent = group.parent.name;
                          return group
                        })
    setGroups(aux_groups)
  }

  // const _deleteApp = async (id, token) => {
  //   await deleteApp(id, token)
  //   _getApps(token)
  // }

  // const _editApp = async () => {
  //   const data = {
  //     "app_name": editName,
  //     "owner_country": editCountry
  //   };
  //   await editApp(editingApp.id, data, token);
  //   setModalEdit(false);
  //   _getApps(token);
  // }

  const handleShow = (content) => {
    setGroupShow(content);
    setModalShow(!modalShow);
  }

  const handleEdit = (content) => {
    // setEditingApp(content);
    // setEditName(content.app_name);
    // setEditCountry(content.owner_country);
    // setModalEdit(!modalEdit);
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
    { key: "children_label", value: "Descrição dos Filhos" },
    { key: "parent", value: "Descrição dos Pais" }
  ];

  return (
    <>
      {/* <Modal
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
            <label>ID</label>
            <input
              className="text-dark"
              type="text"
              value={appShow.id}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Nome</label>
            <input
              className="text-dark"
              type="text"
              value={appShow.app_name}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>País</label>
            <input
              className="text-dark"
              type="text"
              value={appShow.owner_country}
              disabled
            />
          </EditInput>
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
        <form id="editApp" onSubmit={() => {}}>
          <Modal.Body>
            <EditInput>
              <label htmlFor="edit_name">Nome</label>
              <input
                type="text"
                id="edit_name"
                value={editName}
                onChange={(e) => {}}
              />
            </EditInput>

          </Modal.Body>
          <Modal.Footer>
            <SubmitButton type="submit">Editar</SubmitButton>
          </Modal.Footer>
        </form>
      </Modal> */}

      <Container>
        <ContentBox
          title="Instituições"
          token={token}
          contents={groups ? groups : []}
          fields={fields}
          delete_function={() => {}}
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