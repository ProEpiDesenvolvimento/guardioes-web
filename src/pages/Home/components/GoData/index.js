import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    setVigilanceSyndromes,
    setToken,
    setSyndromes,
    setEmail
} from 'actions/';
import Loading from 'sharedComponents/Loading';
import { bindActionCreators } from 'redux';
import { sessionService } from 'redux-react-session';
import Modal from 'react-bootstrap/Modal';
import editGroupManager from '../GroupManagers/services/editGroupManager';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { SubmitButton } from '../GroupManagers/styles';
import ContentBox from '../ContentBox';
import {
    Container,
    ContentBoxHeader,
    ContentBoxTitle,
    ContentBoxTable
} from '../ContentBox/styles';
import { ContentBoxTableHeader } from '../ContentBox/Table/styles';
import getAllSyndromes from '../Syndromes/services/getAllSyndromes';

const GoData = ({
    vigilance_syndromes,
    setVigilanceSyndromes,
    setToken,
    token,
    user
}) => {
    const [goDataToken, setGoDataToken] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const { handleSubmit } = useForm();
    const [outbreaks, setOutbreaks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [syndromes, setSyndromes] = useState([]);
    const [selectedSyndrome, setSelectedSyndrome] = useState(0);
    const [outbreakId, setOutbreakId] = useState(0);

    useEffect(() => {
        const _loadSession = async () => {
            const auxSession = await sessionService.loadSession();
            setToken(auxSession.token);
        }
        _loadSession();

        if (user.godatausername && (goDataToken === "")) {
            const loginGoData = async () => {
                await axios.post(
                    "https://inclusaodigital.unb.br/api/oauth/token",
                    {
                        username: user.godatausername,
                        password: user.godatapassword
                    }
                )
                    .then(async (res) => {
                        setGoDataToken(res.data.response.access_token);
                        //await sessionService.saveSession({ goDataToken: res.data.response.access_token });
                        getOutbreaks(res.data.response.access_token);
                        const syns = await getAllSyndromes(token)
                        let synds = []
                        if (syns.syndromes)
                            synds = syns.syndromes
                        setSyndromes(synds);
                        setLoggedIn(true);
                    })
                    .catch((e) => {
                        alert("Falha na autenticação.");
                    });
            }

            loginGoData();
        }
    }, [token]);

    const _goDataLogIn = async () => {
        await axios.post(
            "https://inclusaodigital.unb.br/api/oauth/token",
            {
                username: inputEmail,
                password: inputPassword
            }
        )
            .then(async (res) => {
                setGoDataToken(res.data.response.access_token);
                getOutbreaks(res.data.response.access_token);
                const syns = await getAllSyndromes(token)
                let synds = []
                if (syns.syndromes)
                    synds = syns.syndromes
                setSyndromes(synds);
                setLoggedIn(true);
            })
            .catch((e) => {
                alert("Falha na autenticação.");
            });
    }

    const getOutbreaks = async (token) => {
        await axios.get(
            "https://inclusaodigital.unb.br/api/outbreaks",
            {
                headers: { "Authorization": `Bearer ${token}` }
            }
        )
            .then((res) => {
                setOutbreaks(res.data);
            })
            .catch((e) => {
                alert("Erro!");
            });
    }

    const _addSyndrome = async () => {
        let vigilanceSyndromes = user.vigilance_syndromes;
        vigilanceSyndromes.map((vs) => {
            if (vs.syndrome_id == selectedSyndrome) {
                vs.outbreak_id = outbreakId;
            }
        });
        const data = {
            group_manager: {
                vigilance_syndromes: vigilanceSyndromes
            }
        }
        await editGroupManager(user.id, data, token);
        setShowModal(false);
    }

    const handleModal = (outbreakId) => {
        setOutbreakId(outbreakId);
        setShowModal(true);
    } 

    return (
        <>
            {loggedIn ?
                <>
                    <Modal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Adicionar Síndrome</Modal.Title>
                        </Modal.Header>

                        <form id="addSyndrome" onSubmit={handleSubmit(_addSyndrome)}>
                            <Modal.Body>
                                <div className="form-group">
                                    <select className="form-control" onChange={(e) => setSelectedSyndrome(e.target.value)}>
                                        <option>Selecione...</option>
                                        {user.vigilance_syndromes.map((vs) => (
                                            syndromes.map((s) => {
                                                if (s.id === vs.syndrome_id)
                                                    return <option key={vs.syndrome_id} value={vs.syndrome_id}>{s.description}</option>
                                            })
                                        ))}
                                    </select>
                                </div>
                            </Modal.Body>
                            
                            <Modal.Footer>
                                <SubmitButton type="submit">Adicionar</SubmitButton>
                            </Modal.Footer>
                        </form>
                    </Modal>
                    <Container
                        className="shadow-sm"
                        component_height="35rem"
                    >
                        <ContentBoxHeader>
                            <ContentBoxTitle>Surtos GoData</ContentBoxTitle>
                        </ContentBoxHeader>
                        <ContentBoxTable
                            component_height="35rem"
                        >
                            {outbreaks !== null ?
                                outbreaks.length > 0 ?
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                {outbreaks.map((outbreak) => (
                                                    <>
                                                        <ContentBoxTableHeader style={{ maxWidth: "500px" }} key={outbreak.id}>Nome</ContentBoxTableHeader>
                                                        <ContentBoxTableHeader style={{ maxWidth: "500px" }} key={outbreak.id}>Descrição</ContentBoxTableHeader>
                                                    </>
                                                ))}
                                                <th></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {outbreaks.map((outbreak) => (
                                                <tr key={outbreak.id}>
                                                    <td style={{ maxWidth: "500px" }} key={outbreak.id}>{outbreak.name}</td>
                                                    <td style={{ maxWidth: "500px" }} key={outbreak.id}>{outbreak.description}</td>
                                                    <td><button type="button" class="btn btn-primary" onClick={() => handleModal(outbreak.id)}>Adicionar Síndrome</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    :
                                    <Loading isLoading={true} />
                                :
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Surtos GoData vazio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Não há nada cadastrado em Surtos GoData.</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            }
                        </ContentBoxTable>
                    </Container>
                </>
                :
                <div className="d-flex justify-content-center align-items-center h-100">
                    <div className="jumbotron">
                        <h4 className="pb-3">Autenticação GoData</h4>
                        <form id="goDataLogIn" onSubmit={handleSubmit(_goDataLogIn)}>
                            <div className="form-group">
                                <label for="inputEmail">E-mail</label>
                                <input type="email" class="form-control" id="inputEmail" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label for="inputPassword">Senha</label>
                                <input type="password" class="form-control" id="inputPassword" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />
                            </div>
                            <SubmitButton type="submit">Entrar</SubmitButton>
                        </form>
                    </div>
                </div>
            }
        </>
    );
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    syndromes: state.user.syndromes,
    vigilance_syndromes: state.user.vigilance_syndromes,
    user: state.user.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        setVigilanceSyndromes,
        setToken,
        setSyndromes
    },
    dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GoData);