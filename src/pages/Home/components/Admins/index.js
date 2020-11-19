import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setAdmins, setToken } from 'actions/';
import { bindActionCreators } from 'redux';
import getAllAdmins from './services/getAllAdmins';
import createAdmin from './services/createAdmin';
import deleteAdmin from './services/deleteAdmin';
import editAdmin from './services/editAdmin';
import getAllApps from '../Apps/services/getAllApps';
import {
    Container,
    AddAdminContainer,
    ContainerHeader,
    ContainerTitle,
    ContainerForm,
    InputBlock,
    EditInput,
    SubmitButton,
    CheckboxInputBlock,
    CheckboxInput,
    EditCheckbox,
    EditCheckboxInput,
    Label,
} from './styles';
import { useForm } from 'react-hook-form';
import ContentBox from '../ContentBox';
import Modal from 'react-bootstrap/Modal';
import { sessionService } from 'redux-react-session';
import { EditCheckboxInput } from '../GroupManagers/styles';

const Admins = ({
    token,
    user,
    admins,
    setAdmins,
    setToken
}) => {
    const { handleSubmit } = useForm();
    const [editingAdmin, setEditingAdmin] = useState({});
    const [adminShow, setAdminShow] = useState({});
    const [modalEdit, setModalEdit] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isGod, setIsGod] = useState(false);
    const [appId, setAppId] = useState(0);
    const [editFirstName, setEditFirstName] = useState("");
    const [editLastName, setEditLastName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editPassword, setEditPassword] = useState("");
    const [editIsGod, setEditIsGod] = useState(false);
    const [editAppId, setEditAppId] = useState(0);
    const [options, setOptions] = useState([]);

    const _createAdmin = async () => {
        const data = {
            "admin": {
                "email": email,
                "password": password,
                "first_name": firstName,
                "last_name": lastName,
                "is_god": isGod,
                "app_id": appId
            }
        }
        const response = await createAdmin(data, token);
        _getAdmins(token);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setIsGod(false);
        setAppId(0);
    }

    const _getAdmins = async (token) => {
        const response = await getAllAdmins(token);
        setAdmins(response);
    }

    const _getApps = async (token) => {
        const response = await getAllApps(token);
        let a = [];
        if (!response.apps) {
            response.apps = [];
        }
        response.apps.map(async app => {
            const option = {
                name: app.app_name,
                app_id: app.id 
            };
            a.push(option);
        });
        setOptions(a);
    }

    const _deleteAdmin = async (id, token) => {
        await deleteAdmin(id, token);
        _getAdmins(token);
    }
    
    const _editAdmin = async () => {
        const data = {
            "admin": {
                "email": editEmail,
                "password": editPassword,
                "first_name": editFirstName,
                "last_name": editLastName,
                "is_god": editIsGod,
                "app_id": editAppId
            }
        }
        await editAdmin(editingAdmin.id, data, token);
        setModalEdit(false);
        _getAdmins(token);
    }
    
    const handleShow = (content) => {
        setAdminShow(content);
        setModalShow(!modalShow);
    }

    const handleEdit = (content) => {
        setEditingAdmin(content);
        setEditFirstName(content.first_name);
        setEditLastName(content.last_name);
        setEditEmail(content.email);
        setEditPassword("");
        setEditIsGod(content.is_god);
        setEditAppId(content.app_id);
        setModalEdit(!modalEdit);
    }

    useEffect(() => {
        const _loadSession = async () => {
            const auxSession = await sessionService.loadSession();
            setToken(auxSession.token);
        }
        _loadSession();
        _getAdmins(token);
        _getApps(token);
    }, [token]);

    const fields = [
        { key: 'id', value: 'ID' },
        { key: 'email', value: 'E-mail' },
    ];

    return (
        <>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Informações do Admin
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <EditInput>
                        <label>ID</label>
                        <input
                            className="text-dark"
                            type="text"
                            value={adminShow.id}
                            disabled
                        />
                    </EditInput>
                    <EditInput>
                        <label>E-mail</label>
                        <input
                            className="text-dark"
                            type="text"
                            value={adminShow.email}
                            disabled
                        />
                    </EditInput>
                    <EditInput>
                        <label>Nome</label>
                        <input
                            className="text-dark"
                            type="text"
                            value={adminShow.first_name}
                            disabled
                        />
                    </EditInput>
                    <EditInput>
                        <label>Sobrenome</label>
                        <input
                            className="text-dark"
                            type="text"
                            value={adminShow.last_name}
                            disabled
                        />
                    </EditInput>
                    <EditCheckbox>
                        <Label htmlFor="is_god">Is God</Label>
                        <EditCheckboxInput
                            type="checkbox"
                            id="is_god"
                            value={adminShow.is_god}
                            disabled
                        />
                    </EditCheckbox>
                    <EditInput>
                        <label>App</label>
                        <input
                            className="text-dark"
                            type="text"
                            value={adminShow.app_name}
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
                        Editar Admin
                    </Modal.Title>
                </Modal.Header>
                <form id="editAdmin" onSubmit={handleSubmit(_editAdmin)}>
                    <Modal.Body>
                        <EditInput>
                            <label htmlFor="edit_first_name">Nome</label>
                            <input
                                type="text"
                                id="edit_first_name"
                                value={editFirstName}
                                onChange={(e) => setEditFirstName(e.target.value)}
                            />
                        </EditInput>

                        <EditInput>
                            <label htmlFor="edit_last_name">Sobrenome</label>
                            <input
                                type="text"
                                id="edit_last_name"
                                value={editLastName}
                                onChange={(e) => setEditLastName(e.target.value)}
                            />
                        </EditInput>

                        <EditInput>
                            <label htmlFor="edit_email">E-mail</label>
                            <input
                                type="text"
                                id="edit_email"
                                value={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                            />
                        </EditInput>

                        <EditInput>
                            <label htmlFor="edit_password">Senha</label>
                            <input
                                type="password"
                                id="edit_password"
                                value={editPassword}
                                onChange={(e) => setEditPassword(e.target.value)}
                            />
                        </EditInput>

                        <EditInput>
                            <label htmlFor="app_id">App</label>
                            <select
                            id="app_id"
                            value={editAppId}
                            onChange={(e) => setEditAppId(e.target.value)}
                            className="form-control"
                            >
                                {options.map(app => (
                                    <option key={app.id} value={app.id}>{app.app_name}</option>
                                ))}
                            </select>
                        </EditInput>

                        <EditCheckbox>
                            <Label htmlFor="is_god">Is God</Label>
                            <EditCheckboxInput
                                type="checkbox"
                                id="is_god"
                                value={editIsGod}
                                onChange={(e) => setEditIsGod(!isGod)}
                            />
                        </EditCheckbox>
                    </Modal.Body>
                    <Modal.Footer>
                        <SubmitButton type="submit">Editar</SubmitButton>
                    </Modal.Footer>
                </form>
            </Modal>

            <Container>
                <ContentBox
                    title="Admins"
                    token={token}
                    contents={admins ? admins : []}
                    fields={fields}
                    delete_function={_deleteAdmin}
                    handleEdit={handleEdit}
                    handleShow={handleShow}
                />

                <AddAdminContainer className="shadow-sm">
                    <ContainerHeader>
                        <ContainerTitle>Adicionar Admin</ContainerTitle>
                    </ContainerHeader>
                    <ContainerForm>
                        <form id="addAdmin" onSubmit={handleSubmit(_createAdmin)}>
                            <InputBlock>
                                <label htmlFor="first_name">Nome</label>
                                <input
                                type="text"
                                id="first_name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                />
                            </InputBlock>

                            <InputBlock>
                                <label htmlFor="last_name">Sobrenome</label>
                                <input
                                type="text"
                                id="last_name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                />
                            </InputBlock>

                            <InputBlock>
                                <label htmlFor="email">Email</label>
                                <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            </InputBlock>

                            <InputBlock>
                                <label htmlFor="password">Senha</label>
                                <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            </InputBlock>

                            <InputBlock>
                                <label htmlFor="app_id">App</label>
                                <select
                                id="app_id"
                                value={appId}
                                onChange={(e) => setAppId(e.target.value)}
                                className="form-control"
                                >
                                    {options.map(app => (
                                        <option key={app.id} value={app.id}>{app.app_name}</option>
                                    ))}
                                </select>
                            </InputBlock>

                            <CheckboxInputBlock>
                                <Label htmlFor="is_god">Is God</Label>
                                <CheckboxInput
                                    type="checkbox"
                                    id="is_god"
                                    value={isGod}
                                    onChange={(e) => setIsGod(!isGod)}
                                />
                            </CheckboxInputBlock>

                            <SubmitButton type="submit">
                                Criar Admin
                            </SubmitButton>
                        </form>
                    </ContainerForm>
                </AddAdminContainer>
            </Container>
        </>
    );
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    user: state.user.user,
    admins: state.user.admins
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        setAdmins,
        setToken
    },
    dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Admins);