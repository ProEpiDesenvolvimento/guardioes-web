import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setSyndromes, setToken } from 'actions/';
import { bindActionCreators } from 'redux';
import { useForm } from 'react-hook-form';
import ContentBox from '../ContentBox';
import Modal from 'react-bootstrap/Modal';
import getAllSyndromes from './services/getAllSyndromes';
import deleteSyndrome from './services/deleteSyndrome';
import createSyndrome from './services/createSyndrome';
import MultiSelect from 'react-multi-select-component';
import getAllSymptoms from '../Symptoms/services/getAllSymptoms';
import editSyndrome from './services/editSyndrome';

import {
    Container,
    AddSyndromeContainer,
    ContainerHeader,
    ContainerTitle,
    ContainerForm,
    InputBlock,
    EditInput,
    SubmitButton,
    TextArea,
    SymptomsButton,
    ButtonBlock
} from './styles';

const Syndromes = ({
    token,
    user,
    syndromes,
    setSyndromes,
    setToken
}) => {
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
        selected.forEach(s => {
            symptoms.push({
                description: s.label,
                percentage: s.percentage,
                app_id: s.app_id
            })
        });
        const data = {
            "syndrome": {
                "description": syndromeDescription,
                "details": syndromeDetails,
                "symptom": symptoms,
                "days_period": parseInt(syndromeDays),
                "message_attributes": {
                    "title": syndromeMessageTitle,
                    "warning_message": syndromeMessageWarning,
                    "go_to_hospital_message": syndromeMessageHospital
                },
                "threshold_score" : syndromeThresholdScore,
                "app_id": user.app_id
            }
        }
        const response = await createSyndrome(data, token);
        if (!response.errors) {
            _getSyndromes(token);
            setSyndromeDescription("");
            setSyndromeDetails("");
            setSyndromeMessageTitle("");
            setSyndromeMessageWarning("");
            setSyndromeMessageHospital("");
            setSyndromeThresholdScore("")
            setSelected([]);
        }
    }

    const _getSyndromes = async (token) => {
        const response = await getAllSyndromes(token);
        if (!response.syndromes || response.syndromes.length === 0) {
            response.syndromes = null;
        }
        setSyndromes(response.syndromes);
    }

    const _getSymptoms = async (token) => {
        const response = await getAllSymptoms(token);
        let options = [];
        if (!response.symptoms) {
            response.symptoms = [];
        }
        response.symptoms.forEach(symptom => {
            options.push({
                label: symptom.description, 
                value: symptom.id,
                percentage: 0,
                app_id: symptom.app.id
            })
        });
        setOptions(options);
    }

    const _deleteSyndrome = async (id, token) => {
        await deleteSyndrome(id, token);
        _getSyndromes(token);
    }

    const _editSyndrome = async () => {
        let symptoms = [];
        editSymptoms.forEach(s => {
            symptoms.push({
                description: s.label,
                percentage: s.percentage,
                app_id: s.app_id
            })
        });
        const data = {
            "syndrome": {
                "description": editDescription,
                "details": editDetails,
                "symptom": symptoms,
                "days_period": parseInt(editDays),
                "message_attributes": {
                    "title": editMessageTitle,
                    "warning_message": editMessageWarning,
                    "go_to_hospital_message": editMessageHospital
                },
                "threshold_score" : editThresholdScore,
            }
        };
        await editSyndrome(editingSyndrome.id, data, token);
        setEditModal(false);
        _getSyndromes(token);
    }

    const handlePercentage = (value, symptom) => {
        const newValue = parseFloat(value) / 100
        setSelected(
            selected.map(s => 
                s.value === symptom.value ? {...s, percentage: newValue} : s
            )
        );
    }

    const handleEditPercentage = (value, symptom) => {
        const newValue = parseFloat(value) / 100
        setEditSymptoms(
            editSymptoms.map(s => 
                s.value === symptom.value ? {...s, percentage: newValue} : s
            )
        )
    }

    const handleEdit = (content) => {
        let editSymptoms = []
        content.symptoms.forEach(symptom => {
            editSymptoms.push({
                label: symptom.description, 
                value: symptom.id,
                percentage: symptom.percentage,
                app_id: symptom.app_id
            })
        });

        if (!content.message) {
            content.message = []
        }
        setEditMessageTitle(content.message.title);
        setEditMessageWarning(content.message.warning_message);
        setEditMessageHospital(content.message.go_to_hospital_message);

        setEditingSyndrome(content);
        setEditDescription(content.description);
        setEditDetails(content.details);
        setEditDays(content.days_period);
        setEditSymptoms(editSymptoms);
        setEditModal(!editModal);
    }

    const handleShow = (content) => {
        setSyndromeShow(content);
        setShowModal(!showModal);
    }

    useEffect(() => {
        _getSyndromes(token);
        _getSymptoms(token);
        setToken(token);
    }, [token]);

    const fields = [
        { key: "id", value: "ID" },
        { key: "description", value: "Título" }
    ];

    return (
        <>
            <Modal
                show={editModal}
                onHide={() => setEditModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Editar Síndrome
                    </Modal.Title>
                </Modal.Header>
                <form id="editSyndrome" onSubmit={handleSubmit(_editSyndrome)}>
                    <Modal.Body>
                        <EditInput>
                            <label htmlFor="edit_title">Título</label>
                            <input
                                type="text"
                                id="edit_title"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                            />
                        </EditInput>

                        <EditInput>
                            <label htmlFor="edit_description">Descrição</label>
                            <TextArea
                                type="text"
                                id="edit_description"
                                value={editDetails}
                                onChange={(e) => setEditDetails(e.target.value)}
                                rows="1"
                            />
                        </EditInput>

                        <EditInput>
                            <label htmlFor="edit_days">Período de dias</label>
                            <input
                                type="number"
                                id="edit_days"
                                value={editDays}
                                onChange={(e) => setEditDays(e.target.value)}
                                min="1"
                            />
                        </EditInput>


                        <EditInput className="bg-light p-2">
                            <label>Mensagem</label>

                            <div className="form-group">
                                <h6>Título</h6>
                                <input
                                    type="text"
                                    className="w-100"
                                    value={editMessageTitle}
                                    onChange={(e) => setEditMessageTitle(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <h6>Mensagem de aviso</h6>
                                <TextArea
                                    type="text"
                                    value={editMessageWarning}
                                    onChange={(e) => setEditMessageWarning(e.target.value)}
                                    rows="1"
                                />
                            </div>
                            <div className="form-group">
                                <h6>Mensagem de hospitalização</h6>
                                <TextArea
                                    type="text"
                                    value={editMessageHospital}
                                    onChange={(e) => setEditMessageHospital(e.target.value)}
                                    rows="1"
                                />
                            </div>
                        </EditInput>

                        <EditInput>
                            <label htmlFor="edit_symptoms">Sintomas</label>
                            <MultiSelect
                                options={options}
                                value={editSymptoms}
                                onChange={setEditSymptoms}
                                id="edit_symptoms"
                            />
                        </EditInput>

                        {editSymptoms.map((s) => (
                            <EditInput className="bg-light p-2" key={s.value}>
                                <h6>{s.label}</h6>
                                <label htmlFor={`edit_percentage_${s.value}`}>Porcentagem</label>
                                <input
                                    type="number"
                                    id={`edit_percentage_${s.value}`}
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={Math.round(s.percentage * 100)}
                                    onChange={(e) => handleEditPercentage(e.target.value, s)}
                                />
                            </EditInput>
                        ))}                        
                        <EditInput>
                            <label htmlFor="threshold_score">Pontuação limite para match com a sindrom em %</label>
                            <input
                                type="number"
                                id="edit_days"
                                value={editThresholdScore}
                                onChange={(e) => setEditThresholdScore(e.target.value)}
                                min="0"
                                max="100"
                            />
                        </EditInput>
                    </Modal.Body>

                    <Modal.Footer>
                        <SubmitButton type="submit">Editar</SubmitButton>
                    </Modal.Footer>
                </form>
            </Modal>

            <Modal
                show={createModal}
                onHide={() => setCreateModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Sintomas
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <EditInput>
                        <label htmlFor="symptoms">Sintomas</label>
                        <MultiSelect
                            options={options}
                            value={selected}
                            onChange={setSelected}
                            id="symptoms"
                        />
                    </EditInput>

                    {selected.map((s) => (
                        <EditInput className="bg-light p-2" key={s.value}>
                            <h6>{s.label}</h6>
                            <label htmlFor={`percentage_${s.value}`}>Porcentagem</label>
                            <input
                                type="number"
                                id={`percentage_${s.value}`}
                                min={0}
                                max={100}
                                step={1}
                                value={Math.round(s.percentage * 100)}
                                onChange={(e) => handlePercentage(e.target.value, s)}
                            />
                        </EditInput>
                    ))}
                </Modal.Body>

                <Modal.Footer>
                    <SubmitButton onClick={() => setCreateModal(false)}>Confirmar</SubmitButton>
                </Modal.Footer>
            </Modal>

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

                    <EditInput>
                        <label>Período de dias</label>
                        <input 
                            className="text-dark"
                            type="number"
                            value={syndromeShow.days_period}
                            disabled
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
                    <EditInput>
                        <label>Pontuação limite para match com a sindrome em %</label>
                        <input 
                            className="text-dark"
                            type="number"
                            value={syndromeShow.threshold_score}
                            disabled
                        />
                    </EditInput>
                </Modal.Body>

                <Modal.Footer>
                    <SubmitButton onClick={() => setShowModal(false)}>Voltar</SubmitButton>                    
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
                        <ContainerTitle>
                            Adicionar Síndrome
                        </ContainerTitle>
                    </ContainerHeader>
                    <ContainerForm>
                        <form id="addSyndrome" onSubmit={handleSubmit(_createSyndrome)}>
                            <InputBlock>
                                <label htmlFor="description">Título</label>
                                <input
                                    type="text"
                                    id="description"
                                    value={syndromeDescription}
                                    onChange={(e) => setSyndromeDescription(e.target.value)}
                                />
                            </InputBlock>

                            <InputBlock>
                                <label htmlFor="details">Descrição</label>
                                <TextArea
                                    type="text"
                                    id="details"
                                    value={syndromeDetails}
                                    onChange={(e) => setSyndromeDetails(e.target.value)}
                                    rows="1"
                                />
                            </InputBlock>

                            <InputBlock>
                                <label htmlFor="days_period">Período de dias</label>
                                <input
                                    type="number"
                                    id="days_period"
                                    value={syndromeDays}
                                    onChange={(e) => setSyndromeDays(e.target.value)}
                                    min="1"
                                />
                            </InputBlock>

                            <InputBlock>
                                <label htmlFor="threshold_score">Pontuação limite para match com a sindrome em %</label>
                                <input
                                    type="number"
                                    id="days_period"
                                    value={syndromeThresholdScore}
                                    onChange={(e) => setSyndromeThresholdScore(e.target.value)}
                                    min="0"
                                    max="100"
                                />
                            </InputBlock>

                            <InputBlock>
                                <label>Mensagem</label>

                                <div className="form-group">
                                    <h6>Título</h6>
                                    <input
                                        type="text"
                                        className="w-100"
                                        value={syndromeMessageTitle}
                                        onChange={(e) => setSyndromeMessageTitle(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <h6>Mensagem de aviso</h6>
                                    <TextArea
                                        type="text"
                                        value={syndromeMessageWarning}
                                        onChange={(e) => setSyndromeMessageWarning(e.target.value)}
                                        rows="1"
                                    />
                                </div>
                                <div className="form-group">
                                    <h6>Mensagem de hospitalização</h6>
                                    <TextArea
                                        type="text"
                                        value={syndromeMessageHospital}
                                        onChange={(e) => setSyndromeMessageHospital(e.target.value)}
                                        rows="1"
                                    />
                                </div>
                            </InputBlock>

                            <ButtonBlock>
                                <SymptomsButton onClick={() => setCreateModal(!createModal)}>
                                    Ver Sintomas
                                </SymptomsButton>

                                <SubmitButton type="submit">
                                    Criar Síndrome
                                </SubmitButton>
                            </ButtonBlock>
                        </form>
                    </ContainerForm>
                </AddSyndromeContainer>
            </Container>
        </>
    )
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    user: state.user.user,
    syndromes: state.user.syndromes
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        setSyndromes,
        setToken
    },
    dispatch,
);

export default connect (
    mapStateToProps,
    mapDispatchToProps,
)(Syndromes);