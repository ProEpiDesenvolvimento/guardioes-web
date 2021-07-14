import React, { useEffect, useState } from 'react';
import Select from 'react-select';
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

const Admins = ({
    token,
    user,
    admins,
    setAdmins,
    setToken
}) => {
    const { handleSubmit } = useForm();
    const [apps, setApps] = useState([]);
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
    const [editIsGod, setEditIsGod] = useState(false);
    const [editApp, setEditApp] = useState({});

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
        await createAdmin(data, token);
        _getAdmins(token);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
    }

    const _getAdmins = async (token) => {
        const response = await getAllAdmins(token);
        setAdmins(response.admins);
    }

    const _getApps = async (token) => {
        const response = await getAllApps(token);
        let a = [];
        if (!response.apps) {
            response.apps = [];
        }
        response.apps.forEach(app => {
            const option = {
                label: app.app_name, 
                value: app.id,
            };
            a.push(option);
        });
        setApps(a);
    }

    const _deleteAdmin = async (id, token) => {
        await deleteAdmin(id, token);
        _getAdmins(token);
    }
    
    const _editAdmin = async () => {
        const data = {
            "admin": {
                "email": editEmail,
                "first_name": editFirstName,
                "last_name": editLastName,
                "is_god": editIsGod,
                "app_id": editApp
            }
        }
        await editAdmin(editingAdmin.id, data, token);
        setModalEdit(false);
        _getAdmins(token);
    }
    
    const handleShow = (content) => {
        const a = apps.filter(app => app.value === content.app_id)
        content.app_name = a[0].label;
        setAdminShow(content);
        setModalShow(!modalShow);
    }

    const handleEdit = (content) => {
        const a = apps.filter(app => app.value === content.app_id)
        content.app = a[0];
        setEditingAdmin(content);
        setEditFirstName(content.first_name);
        setEditLastName(content.last_name);
        setEditEmail(content.email);
        setEditIsGod(content.is_god);
        setEditApp(content.app);
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
                            checked={adminShow.is_god}
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
                                disabled
                            />
                        </EditInput>

                        <EditInput>
                            <label htmlFor="app_id">App</label>
                            <Select 
                                id="app_id"
                                isSearchable={true}
                                options={apps}
                                defaultValue={editApp}
                                onChange={(e) => setEditApp(e.value)}
                            />
                        </EditInput>

                        <EditCheckbox>
                            <Label htmlFor="is_god">Is God</Label>
                            <EditCheckboxInput
                                type="checkbox"
                                id="is_god"
                                checked={editIsGod}
                                onChange={(e) => setEditIsGod(!editIsGod)}
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
                    contents={admins}
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
                                type="email"
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
                                <Select 
                                id="app_id"
                                isSearchable={true}
                                options={apps}
                                onChange={(e) => setAppId(e.value)}
                                />
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
