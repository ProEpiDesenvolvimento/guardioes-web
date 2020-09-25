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
    SymptomsButton
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
    const [symptom, setSymptom] = useState([]);

    const _createSyndrome = async () => {
        const data = {
            "syndrome": {
                "description": syndromeDescription,
                "details": syndromeDetails,
                "symptom": [
                    {
                        "description": "Dor 1",
                        "percentage": 0.7,
                        "app_id": 1
                    },
                    {
                        "description": "Dor 2",
                        "percentage": 0.3,
                        "app_id": 1
                    }
                ]
            }
        }
        const response = await createSyndrome(data, token);
        _getSyndromes(token);
        setSyndromeDescription("");
        setSyndromeDetails("");
    }

    const _getSyndromes = async (token) => {
        const response = await getAllSyndromes(token);
        setSyndromes(response.syndromes);
        console.log(syndromes);
    }

    const _deleteSyndrome = async (id, token) => {
        await deleteSyndrome(id, token);
        _getSyndromes(token);
    }

    useEffect(() => {
        _getSyndromes(token);
        setToken(token);
    }, [token]);

    const fields = [
        { key: "id", value: "ID" },
        { key: "description", value: "Título" }
    ];

    return (
        <>
            <Container>
                <ContentBox
                    title="Síndromes"
                    token={token}
                    contents={syndromes ? syndromes : []}
                    fields={fields}
                    delete_function={_deleteSyndrome}
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
                                    cols="50"
                                />
                            </InputBlock>

                            <InputBlock>
                                <SymptomsButton>
                                    Ver Sintomas
                                </SymptomsButton>
                            </InputBlock>

                            <SubmitButton type="submit">
                                Criar Síndrome
                            </SubmitButton>
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