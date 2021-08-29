import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import {
    setVigilanceSyndromes,
    setToken,
    setSyndromes,
    setUser,
    setGoDataToken
} from 'actions/';
import Loading from 'sharedComponents/Loading';
import { bindActionCreators } from 'redux';
import { sessionService } from 'redux-react-session';
import Modal from 'react-bootstrap/Modal';
import editGroupManager from '../GroupManagers/services/editGroupManager';
import { useForm } from 'react-hook-form';
import { SubmitButton } from '../GroupManagers/styles';
import {
    Container,
    ContentBoxHeader,
    ContentBoxTitle,
    ContentBoxTable
} from '../ContentBox/styles';
import { ContentBoxTableHeader } from '../ContentBox/Table/styles';
import getAllSyndromes from '../Syndromes/services/getAllSyndromes';
import getGroupManager from '../GroupManagers/services/getGroupManager';

const GoData = ({
    vigilance_syndromes,
    setVigilanceSyndromes,
    setToken,
    token,
    setUser,
    user,
    godataToken,
    setGoDataToken
}) => {
    const [inputURL, setInputURL] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const { handleSubmit } = useForm();
    const [outbreaks, setOutbreaks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [syndromes, setSyndromes] = useState([]);
    const [selectedSyndrome, setSelectedSyndrome] = useState(0);
    const [outbreakId, setOutbreakId] = useState(0);
    const [outbreaksLinkeds, setOutbreaksLinkeds] = useState([])

    const loadData = async () => {
        getOutbreaks(godataToken)

        const syns = await getAllSyndromes(token)
        let synds = []
        if (syns.syndromes)
            synds = syns.syndromes
        setSyndromes(synds);

        const gm = await getGroupManager(user.id, token)
        setUser({ ...user, vigilance_syndromes: gm.group_manager.vigilance_syndromes })

        let auxOutbreaksLinkeds = []
        for (let i = 0; i < gm.group_manager.vigilance_syndromes.length; i++)
            if (gm.group_manager.vigilance_syndromes[i].surto_id)
                auxOutbreaksLinkeds.push(gm.group_manager.vigilance_syndromes[i].surto_id)
        setOutbreaksLinkeds(auxOutbreaksLinkeds)
    }

    useEffect(() => {
        if (godataToken) {
            loadData()
        }
    }, [godataToken])

    useEffect(() => {
        const _loadSession = async () => {
            const auxSession = await sessionService.loadSession();
            setToken(auxSession.token);
            if (auxSession.godataToken) {
                setGoDataToken(auxSession.godataToken);
            }
        }
        _loadSession();

        if (!user.url_godata && !user.username_godata && !godataToken) {
            const loginGoData = async () => {
                await axios.post(
                    `${user.url_godata}/api/oauth/token`,
                    {
                        headers: { "Access-Control-Allow-Origin": "*" },
                        username: user.username_godata,
                        password: user.password_godata
                    }
                )
                    .then(async (res) => {
                        setGoDataToken("Bearer " + res.data.access_token);
                        const auxSession = await sessionService.loadSession();
                        await sessionService.saveSession({ ...auxSession, godataToken: "Bearer " + res.data.access_token });
                        await loadData();
                    })
                    .catch((e) => {
                        alert("Falha na autenticação do GoData. Verifique as credenciais.");
                    });
            }
            loginGoData();
        }
    }, []);

    const _goDataLogIn = async () => {
        let userIdGoData
        await axios.post(
            `${inputURL}/api/users/login`,
            {
                headers: { "Access-Control-Allow-Origin": "*" },
                email: inputEmail,
                password: inputPassword
            }
        )
            .then(async (res) => {
                userIdGoData = res.data.userId;
            })
            .catch((e) => {
                alert("Falha na autenticação");
            });
        
        await axios.post(
            `${inputURL}/api/oauth/token`,
            {
                headers: { "Access-Control-Allow-Origin": "*" },
                username: inputEmail,
                password: inputPassword
            }
        )
            .then(async (res) => {
                const data = {
                    group_manager: {
                        url_godata: inputURL,
                        username_godata: inputEmail,
                        password_godata: inputPassword,
                        userid_godata: userIdGoData,
                    }
                }
                await editGroupManager(user.id, data, token);

                const auxSession = await sessionService.loadSession();
                await sessionService.saveUser({ ...user, url_godata: inputURL, username_godata: inputEmail, password_godata: inputPassword });
                await sessionService.saveSession({ ...auxSession, godataToken: "Bearer " + res.data.access_token });
                setUser({ ...user, url_godata: inputURL, username_godata: inputEmail, password_godata: inputPassword });
                setGoDataToken("Bearer " + res.data.access_token);

                const syns = await getAllSyndromes(token)
                let synds = []
                if (syns.syndromes)
                    synds = syns.syndromes
                setSyndromes(synds);
            })
            .catch((e) => {
                alert("Falha na autenticação.");
            });
    }

    const getOutbreaks = async (token) => {
        await axios.get(
            `${user.url_godata}/api/outbreaks`,
            {
                headers: { "Authorization": `${token}`, "Access-Control-Allow-Origin": "*" }
            }
        )
            .then((res) => {
                setOutbreaks(res.data);
            })
            .catch((e) => {
                // alert(e);
            });
    }

    const _addSyndrome = async () => {
        let auxOutbreaksLinkeds = []
        let vigilanceSyndromes = user.vigilance_syndromes;
        vigilanceSyndromes.forEach((vs, index) => {
            if (vs.syndrome_id === parseInt(selectedSyndrome)) {
                vigilanceSyndromes[index]['surto_id'] = outbreakId;
                auxOutbreaksLinkeds.push(outbreakId)
            }
        });
        const data = {
            group_manager: {
                vigilance_syndromes: vigilanceSyndromes
            }
        }
        await editGroupManager(user.id, data, token);
        setVigilanceSyndromes(vigilanceSyndromes)
        setOutbreaksLinkeds(auxOutbreaksLinkeds)
        setShowModal(false);
    }

    const handleModal = (outbreakId) => {
        setOutbreakId(outbreakId);
        setShowModal(true);
    }

    const signOut = async () => {
        const data = {
            group_manager: {
                url_godata: "",
                username_godata: "",
                password_godata: "",
                userid_godata: null
            }
        }
        await editGroupManager(user.id, data, token);

        let auxVigilanceSyndromes = user.vigilance_syndromes
        for (let i = 0; i < auxVigilanceSyndromes.length; i++)
            delete auxVigilanceSyndromes[i].surto_id
        setVigilanceSyndromes(auxVigilanceSyndromes)

        const auxSession = await sessionService.loadSession();
        await sessionService.saveUser({ ...user, url_godata: "", username_godata: "", password_godata: "" });
        await sessionService.saveSession({ ...auxSession, godataToken: "" });
        setUser({ ...user, url_godata: "", username_godata: "", password_godata: "" });
        setGoDataToken("");
    }

    const unlinkOutbreak = async (outbreakId) => {
        let auxVigilanceSyndromes = user.vigilance_syndromes
        for (let i = 0; i < auxVigilanceSyndromes.length; i++)
            if (auxVigilanceSyndromes[i].surto_id === outbreakId)
                delete auxVigilanceSyndromes[i].surto_id
        const data = {
            group_manager: {
                vigilance_syndromes: auxVigilanceSyndromes
            }
        }
        setVigilanceSyndromes(auxVigilanceSyndromes)
        await editGroupManager(user.id, data, token);
        setOutbreaksLinkeds(outbreaksLinkeds.filter((ol) => ol !== outbreakId))
    }

    return (
        <>
            {godataToken ?
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
                                                if (s.id === vs.syndrome_id && outbreakId === vs.surto_id) {
                                                    return <option key={vs.syndrome_id} value={vs.syndrome_id} selected>{s.description}</option>
                                                } else if (s.id === vs.syndrome_id) {
                                                    return <option key={vs.syndrome_id} value={vs.syndrome_id}>{s.description}</option>
                                                }
                                                return null
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
                                                <th>
                                                    <p>Vinculado ao GoData como:</p>
                                                    <p>URL: <span style={{ fontWeight: "normal" }}>{user.url_godata}</span></p>
                                                    <p>Email: <span style={{ fontWeight: "normal" }}>{user.username_godata}</span></p>
                                                </th>
                                                <th /><th />
                                                <th style={{ float: "right" }}>
                                                    <button type="button" className="btn btn-danger" onClick={signOut}>Desvincular</button>
                                                </th>
                                            </tr>
                                            <tr>
                                                <ContentBoxTableHeader style={{ maxWidth: "500px" }}>Nome</ContentBoxTableHeader>
                                                <ContentBoxTableHeader style={{ maxWidth: "500px" }}>Descrição</ContentBoxTableHeader>
                                                <ContentBoxTableHeader style={{ maxWidth: "500px" }}>Síndrome Conectada</ContentBoxTableHeader>
                                                <th></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {outbreaks.map((outbreak) => {
                                                const getSyndromeName = (outbreakId) => {
                                                    let syndromeId = -1
                                                    for (let i = 0; i < user.vigilance_syndromes.length; i++)
                                                        if (user.vigilance_syndromes[i].surto_id === outbreakId)
                                                            syndromeId = user.vigilance_syndromes[i].syndrome_id
                                                    if (syndromeId === -1) return
                                                    for (let i = 0; i < syndromes.length; i++)
                                                        if (syndromes[i].id === syndromeId)
                                                            return syndromes[i].description
                                                }
                                                return (
                                                    <tr key={outbreak.id}>
                                                        <td style={{ maxWidth: "500px" }}>{outbreak.name}</td>
                                                        <td style={{ maxWidth: "500px" }}>{outbreak.description}</td>
                                                        {outbreaksLinkeds.includes(outbreak.id) ?
                                                            <>
                                                                <td style={{ maxWidth: "500px", padding: "10px 0", fontWeight: "bold", textAlign: 'center' }}>{getSyndromeName(outbreak.id)}</td>
                                                                <td><button type="button" className="btn btn-danger" onClick={() => unlinkOutbreak(outbreak.id)} style={{ margin: "0", padding: "5px", fontSize: "15px", width: "100px" }}>Desvincular Síndrome</button></td>
                                                            </>
                                                            :
                                                            <td><button type="button" className="btn btn-primary" onClick={() => handleModal(outbreak.id)}>Adicionar Síndrome</button></td>
                                                        }
                                                    </tr>
                                                )
                                            })}
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
                                <label htmlFor="inputURL">URL do GoData</label>
                                <input type="text" className="form-control" id="inputURL" value={inputURL} onChange={(e) => setInputURL(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputEmail">E-mail</label>
                                <input type="email" className="form-control" id="inputEmail" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputPassword">Senha</label>
                                <input type="password" className="form-control" id="inputPassword" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />
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
    user: state.user.user,
    godataToken: state.user.godataToken
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        setVigilanceSyndromes,
        setToken,
        setSyndromes,
        setGoDataToken,
        setUser
    },
    dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GoData);