import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setAdmins, setToken } from 'actions/';
import { bindActionCreators } from 'redux';
import getAllAdmins from './services/getAllAdmins';
import createAdmin from './services/createAdmin';
import deleteAdmin from './services/deleteAdmin';
import editAdmin from './services/editAdmin';
import {
    Container,
    AddAdminContainer,
    ContainerHeader,
    ContainerTitle,
    ContainerForm,
    InputBlock,
    EditInput,
    SubmitButton,
    Input
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
    const [editingAdmin, setEditingAdmin] = useState({});
    const [adminShow, setAdminShow] = useState({});
    const [modalEdit, setModalEdit] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const _createAdmin = async () => {
        const data = {

        }
        const response = await createAdmin(data, token);
        _getAdmins(token);
    }

    const _getAdmins = async (token) => {
        const response = await getAllAdmins(token);
        setAdmins(response.admins);
    }

    const _deleteAdmin = async (id, token) => {
        await deleteAdmin(id, token);
        _getAdmins(token);
    }
    
    const _editAdmin = async () => {
        const data = {
    
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
        setModalEdit(!modalEdit);
    }

    useEffect(() => {
        const _loadSession = async () => {
            const auxSession = await sessionService.loadSession();
            setToken(auxSession.token);
        }
        _loadSession();
        _getAdmins(token);
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
                    <EditInput>
                        <label>App_ID</label>
                        <input
                            className="text-dark"
                            type="text"
                            value={adminShow.app_id}
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