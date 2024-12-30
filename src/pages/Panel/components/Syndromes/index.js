import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setSyndromes, setToken } from "actions/";
import { bindActionCreators } from "redux";
import { useForm } from "react-hook-form";
import ContentBox from "../ContentBox";
import Modal from "react-bootstrap/Modal";
import getAllSyndromes from "./services/getAllSyndromes";
import deleteSyndrome from "./services/deleteSyndrome";
import createSyndrome from "./services/createSyndrome";
import getAllSymptoms from "../Symptoms/services/getAllSymptoms";
import editSyndrome from "./services/editSyndrome";
import ModalInput from "sharedComponents/ModalInput";
import FormInput from "sharedComponents/FormInput";

import {
  Container,
  AddSyndromeContainer,
  ContainerHeader,
  ContainerTitle,
  ContainerForm,
  ContainerInput,
  SubmitButton,
  SymptomsButton,
  ButtonBlock,
  Label,
} from "./styles";

const Syndromes = ({ token, user, syndromes, setSyndromes, setToken }) => {
  const { handleSubmit } = useForm();
  const [syndromeDescription, setSyndromeDescription] = useState("");
  const [syndromeDetails, setSyndromeDetails] = useState("");
  const [syndromeDays, setSyndromeDays] = useState("");
  const [syndromeMessageTitle, setSyndromeMessageTitle] = useState("");
  const [syndromeMessageWarning, setSyndromeMessageWarning] = useState("");
  const [syndromeMessageHospital, setSyndromeMessageHospital] = useState("");
  const [syndromeThresholdScore, setSyndromeThresholdScore] = useState("");
  const [createModal, setCreateModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [syndromeShow, setSyndromeShow] = useState({});
  const [editDescription, setEditDescription] = useState("");
  const [editDetails, setEditDetails] = useState("");
  const [editDays, setEditDays] = useState("");
  const [editMessageTitle, setEditMessageTitle] = useState("");
  const [editMessageWarning, setEditMessageWarning] = useState("");
  const [editMessageHospital, setEditMessageHospital] = useState("");
  const [editSymptoms, setEditSymptoms] = useState([]);
  const [editThresholdScore, setEditThresholdScore] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [editingSyndrome, setEditingSyndrome] = useState({});

  const _createSyndrome = async () => {
    let symptoms = [];
    selected.forEach((s) => {
      symptoms.push({
        description: s.label,
        percentage: s.percentage,
        app_id: s.app_id,
      });
    });
    const data = {
      syndrome: {
        description: syndromeDescription,
        details: syndromeDetails,
        symptom: symptoms,
        days_period: parseInt(syndromeDays),
        message_attributes: {
          title: syndromeMessageTitle,
          warning_message: syndromeMessageWarning,
          go_to_hospital_message: syndromeMessageHospital,
        },
        threshold_score: syndromeThresholdScore,
        app_id: user.app_id,
      },
    };
    const response = await createSyndrome(data, token);
    if (!response.errors) {
      _getSyndromes(token);
      setSyndromeDescription("");
      setSyndromeDetails("");
      setSyndromeMessageTitle("");
      setSyndromeMessageWarning("");
      setSyndromeMessageHospital("");
      setSyndromeThresholdScore("");
      setSelected([]);
    }
  };

  const _getSyndromes = async (token) => {
    const response = await getAllSyndromes(token);
    if (!response.syndromes || response.syndromes.length === 0) {
      response.syndromes = null;
    }
    setSyndromes(response.syndromes);
  };

  const _getSymptoms = async (token) => {
    const response = await getAllSymptoms(token);
    let options = [];
    if (!response.symptoms) {
      response.symptoms = [];
    }
    response.symptoms.forEach((symptom) => {
      options.push({
        label: symptom.description,
        value: symptom.id,
        percentage: 0,
        app_id: symptom.app.id,
      });
    });
    setOptions(options);
  };

  const _deleteSyndrome = async (id, token) => {
    await deleteSyndrome(id, token);
    _getSyndromes(token);
  };

  const _editSyndrome = async () => {
    let symptoms = [];
    editSymptoms.forEach((s) => {
      symptoms.push({
        description: s.label,
        percentage: s.percentage,
        app_id: s.app_id,
      });
    });
    const data = {
      syndrome: {
        description: editDescription,
        details: editDetails,
        symptom: symptoms,
        days_period: parseInt(editDays),
        message_attributes: {
          title: editMessageTitle,
          warning_message: editMessageWarning,
          go_to_hospital_message: editMessageHospital,
        },
        threshold_score: editThresholdScore,
      },
    };
    await editSyndrome(editingSyndrome.id, data, token);
    setEditModal(false);
    _getSyndromes(token);
  };

  const handleEditThresholdScore = (value) => {
    const newValue = parseFloat(value) / 100;
    setEditThresholdScore(newValue);
  };

  const handlePercentage = (value, symptom) => {
    const newValue = parseFloat(value) / 100;
    setSelected(
      selected.map((s) =>
        s.value === symptom.value ? { ...s, percentage: newValue } : s
      )
    );
  };

  const handleEditPercentage = (value, symptom) => {
    const newValue = parseFloat(value) / 100;
    setEditSymptoms(
      editSymptoms.map((s) =>
        s.value === symptom.value ? { ...s, percentage: newValue } : s
      )
    );
  };

  const handleEdit = (content) => {
    let editSymptoms = [];
    content.symptoms.forEach((symptom) => {
      editSymptoms.push({
        label: symptom.description,
        value: symptom.id,
        percentage: symptom.percentage,
        app_id: symptom.app_id,
      });
    });

    if (!content.message) {
      content.message = [];
    }
    setEditMessageTitle(content.message.title);
    setEditMessageWarning(content.message.warning_message);
    setEditMessageHospital(content.message.go_to_hospital_message);

    setEditingSyndrome(content);
    setEditDescription(content.description);
    setEditDetails(content.details);
    setEditDays(content.days_period);
    setEditThresholdScore(content.threshold_score);
    setEditSymptoms(editSymptoms);
    setEditModal(!editModal);
  };

  const handleShow = (content) => {
    setSyndromeShow(content);
    setShowModal(!showModal);
  };

  useEffect(() => {
    _getSyndromes(token);
    _getSymptoms(token);
    setToken(token);
  }, [token]);

  const fields = [
    { key: "id", value: "ID" },
    { key: "description", value: "Título" },
  ];

  return (
    <>
      <Modal show={editModal} onHide={() => setEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Síndrome</Modal.Title>
        </Modal.Header>
        <form id="editSyndrome" onSubmit={handleSubmit(_editSyndrome)}>
          <Modal.Body>
            <ModalInput
              label="Título"
              type="text"
              id="edit_title"
              value={editDescription}
              setValue={(e) => setEditDescription(e.target.value)}
            />
            <ModalInput
              label="Descrição"
              type="textarea"
              id="edit_description"
              value={editDetails}
              setValue={(e) => setEditDetails(e.target.value)}
              rows="1"
            />
            <ModalInput
              label="Duração em dias"
              type="number"
              id="edit_days"
              value={editDays}
              setValue={(e) => setEditDays(e.target.value)}
              min="1"
            />
            <ModalInput
              label="Pontuação mínima para dar match (%)"
              type="number"
              id="edit_days"
              value={Math.round(editThresholdScore * 100)}
              setValue={(e) => handleEditThresholdScore(e.target.value)}
              min="0"
              max="100"
              step={1}
            />
            <ContainerInput className="bg-light p-2">
              <Label>Mensagem no app</Label>
              <ModalInput
                label="Título"
                isSubtitle={true}
                type="text"
                value={editMessageTitle}
                setValue={(e) => setEditMessageTitle(e.target.value)}
              />
              <ModalInput
                label="Mensagem de aviso"
                isSubtitle={true}
                type="textarea"
                value={editMessageWarning}
                setValue={(e) => setEditMessageWarning(e.target.value)}
                rows="1"
              />
              <ModalInput
                label="Mensagem de ir ao hospital"
                isSubtitle={true}
                type="textarea"
                value={editMessageHospital}
                setValue={(e) => setEditMessageHospital(e.target.value)}
                rows="1"
              />
            </ContainerInput>
            <ModalInput
              label="Sintomas"
              type="multi-select"
              options={options}
              value={editSymptoms}
              setValue={setEditSymptoms}
              id="edit_symptoms"
            />
            {editSymptoms.map((s) => (
              <ContainerInput className="bg-light p-2" key={s.value}>
                <h6>{s.label}</h6>
                <ModalInput
                  label="Peso do sintoma (%)"
                  type="number"
                  id={`edit_percentage_${s.value}`}
                  min={0}
                  max={100}
                  step={1}
                  value={Math.round(s.percentage * 100)}
                  setValue={(e) => handleEditPercentage(e.target.value, s)}
                />
              </ContainerInput>
            ))}
          </Modal.Body>

          <Modal.Footer>
            <SubmitButton type="submit">Editar</SubmitButton>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal show={createModal} onHide={() => setCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sintomas</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ModalInput
            label="Sintomas"
            type="multi-select"
            id="symptoms"
            options={options}
            value={selected}
            setValue={setSelected}
          />
          {selected.map((s) => (
            <ContainerInput className="bg-light p-2" key={s.value}>
              <h6>{s.label}</h6>
              <ModalInput
                label="Peso do sintoma (%)"
                type="number"
                id={`percentage_${s.value}`}
                min={0}
                max={100}
                step={1}
                value={Math.round(s.percentage * 100)}
                setValue={(e) => handlePercentage(e.target.value, s)}
              />
            </ContainerInput>
          ))}
        </Modal.Body>

        <Modal.Footer>
          <SubmitButton onClick={() => setCreateModal(false)}>
            Confirmar
          </SubmitButton>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Informações da Síndrome</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ModalInput
            label="ID"
            type="text"
            value={syndromeShow.id}
            disabled={true}
          />
          <ModalInput
            label="Título"
            type="text"
            value={syndromeShow.description}
            disabled={true}
          />
          <ModalInput
            label="Descrição"
            type="textarea"
            value={syndromeShow.details}
            rows="1"
            disabled={true}
          />
          <ModalInput
            label="Duração em dias"
            type="text"
            value={syndromeShow.days_period}
            disabled={true}
          />
          <ModalInput
            label="Pontuação mínima para dar match (%)"
            type="text"
            value={Math.round(syndromeShow.threshold_score * 100)}
            disabled={true}
          />

          {syndromeShow.message ? (
            <ContainerInput className="bg-light p-2">
              <Label>Mensagem no app</Label>
              <ModalInput
                label="Título"
                type="text"
                value={syndromeShow.message.title}
                isSubtitle={true}
                disabled={true}
              />
              <ModalInput
                label="Mensagem de aviso"
                type="textarea"
                value={syndromeShow.message.warning_message}
                isSubtitle={true}
                rows="1"
                disabled={true}
              />
              <ModalInput
                label="Mensagem de ir ao hospital"
                type="textarea"
                value={syndromeShow.message.go_to_hospital_message}
                isSubtitle={true}
                rows="1"
                disabled={true}
              />
            </ContainerInput>
          ) : null}

          <ContainerInput className="bg-light p-2">
            <Label>Sintomas</Label>
            {syndromeShow.symptoms
              ? syndromeShow.symptoms.map((symptom) => (
                  <div key={symptom.id}>
                    <h6>{symptom.description}</h6>
                    <ModalInput
                      label="Peso do sintoma (%)"
                      type="text"
                      id={`show_percentage_${symptom.id}`}
                      value={Math.round(symptom.percentage * 100)}
                      disabled={true}
                    />
                  </div>
                ))
              : null}
          </ContainerInput>
        </Modal.Body>

        <Modal.Footer>
          <SubmitButton onClick={() => setShowModal(false)}>
            Voltar
          </SubmitButton>
        </Modal.Footer>
      </Modal>

      <Container>
        <ContentBox
          title="Síndromes"
          token={token}
          contents={syndromes}
          fields={fields}
          delete_function={_deleteSyndrome}
          handleShow={handleShow}
          handleEdit={handleEdit}
        />

        <AddSyndromeContainer className="shadow-sm">
          <ContainerHeader>
            <ContainerTitle>Adicionar Síndrome</ContainerTitle>
          </ContainerHeader>
          <ContainerForm>
            <form id="addSyndrome" onSubmit={handleSubmit(_createSyndrome)}>
              <FormInput
                label="Título"
                type="text"
                id="description"
                value={syndromeDescription}
                setValue={(e) => setSyndromeDescription(e.target.value)}
                isLongInput={true}
              />
              <FormInput
                label="Descrição"
                type="text"
                id="details"
                value={syndromeDetails}
                setValue={(e) => setSyndromeDetails(e.target.value)}
                isLongInput={true}
              />
              <FormInput
                label="Duração em dias"
                type="number"
                id="days_period"
                value={syndromeDays}
                setValue={(e) => setSyndromeDays(e.target.value)}
                min="1"
                isLongInput={true}
              />
              <FormInput
                label="Pontuação mínima para dar match (%)"
                type="number"
                id="days_period"
                value={syndromeThresholdScore}
                setValue={(e) => setSyndromeThresholdScore(e.target.value)}
                min="0"
                max="100"
                isLongInput={true}
              />
              <Label>Mensagem</Label>
              <FormInput
                label="Título"
                type="text"
                value={syndromeMessageTitle}
                setValue={(e) => setSyndromeMessageTitle(e.target.value)}
                isLongInput={true}
                isSubtitle={true}
              />
              <FormInput
                label="Mensagem de aviso"
                type="textarea"
                value={syndromeMessageWarning}
                setValue={(e) => setSyndromeMessageWarning(e.target.value)}
                isLongInput={true}
                isSubtitle={true}
              />
              <FormInput
                label="Mensagem de ir ao hospital"
                type="textarea"
                value={syndromeMessageHospital}
                setValue={(e) => setSyndromeMessageHospital(e.target.value)}
                isLongInput={true}
                isSubtitle={true}
              />
              <ButtonBlock>
                <SymptomsButton onClick={() => setCreateModal(!createModal)}>
                  Ver Sintomas
                </SymptomsButton>

                <SubmitButton type="submit">Criar Síndrome</SubmitButton>
              </ButtonBlock>
            </form>
          </ContainerForm>
        </AddSyndromeContainer>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
  syndromes: state.user.syndromes,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setSyndromes,
      setToken,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Syndromes);
