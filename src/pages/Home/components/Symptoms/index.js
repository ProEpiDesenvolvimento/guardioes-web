import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setSymptoms, setToken } from "actions/";

import { bindActionCreators } from "redux";
import getAllSymptoms from "./services/getAllSymptoms";
import createSymptom from "./services/createSymptom";
import deleteSymptom from "./services/deleteSymptom";
import editSymptom from "./services/editSymptom";

import {
  Container,
  AddAppContainer,
  ContainerHeader,
  ContainerTitle,
  ContainerForm,
  Form,
  Inputs,
  SubmitButton,
  EditButton,
} from "./styles";
import { useForm } from "react-hook-form";
import ContentBox from "../ContentBox";
import Modal from "react-bootstrap/Modal";
import FormInput from "sharedComponents/FormInput";
import ModalInput from "sharedComponents/ModalInput";

const Symptoms = ({ token, user, symptoms, setSymptoms, setToken }) => {
  const { handleSubmit } = useForm();
  const [symptomName, setSymptomName] = useState("");
  const [symptomDescription, setSymptomDescription] = useState("");
  const [modalEdit, setModalEdit] = useState(false);
  const [editingSymptom, setEditingSymptom] = useState({});
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [symptomShow, setSymptomShow] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const _createSymptom = async () => {
    const data = {
      description: symptomName,
      code: symptomName.replace(/\s+/g, ""),
      priority: 1,
      details: symptomDescription,
      message: null,
      app_id: user.app_id,
    };
    await createSymptom(data, token);
    setSymptomName("");
    setSymptomDescription("");
    _getAllSymptoms(token);
  };

  const _deleteSymptom = async (id, token) => {
    await deleteSymptom(id, token);
    _getAllSymptoms(token);
  };

  const _getAllSymptoms = async (token) => {
    const response = await getAllSymptoms(token);
    loadSymptoms(response);
  };

  const _editSymptom = async () => {
    const data = {
      description: editName,
      code: editName.replace(/\s+/g, ""),
      priority: 1,
      details: editDescription,
      message: null,
      app_id: user.app_id,
    };
    await editSymptom(editingSymptom.id, data, token);
    setModalEdit(false);
    _getAllSymptoms(token);
  };

  const handleShow = (content) => {
    setSymptomShow(content);
    setModalShow(!modalShow);
  };

  const handleEdit = (content) => {
    setEditingSymptom(content);
    setEditName(content.name);
    setEditDescription(content.description);
    setModalEdit(!modalEdit);
  };

  const loadSymptoms = async (response) => {
    let aux_symptoms = [];
    if (!response.symptoms) {
      response.symptoms = [];
    }
    response.symptoms.forEach((symptom) => {
      aux_symptoms.push({
        id: symptom.id,
        name: symptom.description,
        description: symptom.details,
      });
    });
    if (aux_symptoms.length === 0) {
      aux_symptoms = null;
    }
    setSymptoms(aux_symptoms);
  };

  useEffect(() => {
    _getAllSymptoms(token);
    setToken(token);
  }, []);

  const fields = [
    {
      key: "id",
      value: "ID",
    },
    {
      key: "name",
      value: "Nome",
    },
  ];

  return (
    <>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Informações do Sintoma</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ModalInput
            label="ID"
            type="text"
            value={symptomShow.id}
            disabled={true}
          />
          <ModalInput
            label="Nome"
            type="text"
            value={symptomShow.name}
            disabled={true}
          />
          <ModalInput
            label="Descrição"
            type="textarea"
            value={symptomShow.description}
            disabled={true}
            rows="4"
          />
        </Modal.Body>

        <Modal.Footer>
          <EditButton onClick={() => setModalShow(false)}>Voltar</EditButton>
        </Modal.Footer>
      </Modal>

      <Modal show={modalEdit} onHide={() => setModalEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Sintoma</Modal.Title>
        </Modal.Header>
        <form id="editSymptom" onSubmit={handleSubmit(_editSymptom)}>
          <Modal.Body>
            <ModalInput
              label="Nome"
              type="text"
              id="edit_name"
              value={editName}
              setValue={(e) => setEditName(e.target.value)}
            />
            <ModalInput
              label="Descrição"
              type="textarea"
              id="edit_description"
              value={editDescription}
              setValue={(e) => setEditDescription(e.target.value)}
              rows="4"
            />
          </Modal.Body>
          <Modal.Footer>
            <EditButton type="submit">Editar</EditButton>
          </Modal.Footer>
        </form>
      </Modal>

      <Container>
        <ContentBox
          title="Sintomas"
          token={token}
          contents={symptoms}
          fields={fields}
          delete_function={_deleteSymptom}
          handleEdit={handleEdit}
          handleShow={handleShow}
        />

        <AddAppContainer className="shadow-sm">
          <ContainerHeader>
            <ContainerTitle>Adicionar Sintoma</ContainerTitle>
          </ContainerHeader>
          <ContainerForm>
            <Form id="addApp" onSubmit={handleSubmit(_createSymptom)}>
              <Inputs>
                <FormInput
                  label="Nome"
                  type="text"
                  id="name"
                  value={symptomName}
                  setValue={(e) => setSymptomName(e.target.value)}
                />
                <FormInput
                  label="Descrição"
                  type="text"
                  id="description"
                  value={symptomDescription}
                  setValue={(e) => setSymptomDescription(e.target.value)}
                />
              </Inputs>
              <SubmitButton type="submit">Adicionar</SubmitButton>
            </Form>
          </ContainerForm>
        </AddAppContainer>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
  symptoms: state.user.symptoms,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setSymptoms,
      setToken,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Symptoms);
