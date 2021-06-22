import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setToken, setUser } from 'actions';
import { bindActionCreators } from 'redux';

import { useForm } from 'react-hook-form';
import { sessionService } from 'redux-react-session';
import getApp from './services/getApp';
import editApp from './services/editApp';
import editUser from './services/editUser';

import {
    Container,
    EditProfileContainer,
    ContainerHeader,
    ContainerTitle,
    ContainerForm,
    InputBlock,
    SubmitButton,
    CheckboxInputBlock,
    CheckboxInput,
    Label,
} from './styles';

const Profile = ({
    token,
    user,
    setToken
}) => {
    const { handleSubmit } = useForm();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [appId, setAppId] = useState(0);
    const [appName, setAppName] = useState("");
    const [appTwitter, setAppTwitter] = useState("");
    const [twitter, setTwitter] = useState("");
    const [requireId, setRequireId] = useState(null);
    const [idCodeLength, setIdCodeLength] = useState(1);

    const _editUser = async () => {
        if (user.type === "admin") {
            _editApp();
        }
        const data = {
            [user.type]: {
                "first_name": firstName,
                "last_name": lastName,
                "name": firstName,
                //"email": email,
                "password": password !== "" ? password : undefined,
                "twitter": twitter,
                "require_id": requireId,
                "id_code_length": idCodeLength,
            }
        }
        const response = await editUser(user.id, user.type, data, token);
        const responseUser = response.data[user.type]
        if (!response.errors) {
            setUser({
                ...responseUser,
                type: user.type
            });
            sessionService.saveUser({
                ...responseUser,
                type: user.type
            });
            window.location.reload();
        }
    }

    const _editApp = async () => {
        const data = {
            "app_name": appName,
            "twitter": appTwitter,
        }
        const response = await editApp(appId, data, token);
        if (response.errors) {
            alert("Erro ao editar APP")
        }
    }

    const _setEditUser = () => {
        if (user.first_name) {
            setFirstName(user.first_name);
        }
        else {
            setFirstName(user.name);
        }

        setLastName(user.last_name);
        setEmail(user.email);
        setAppId(user.app_id);
        setTwitter(user.twitter);
        setRequireId(user.require_id);
        setIdCodeLength(user.id_code_length);
    }

    const _setEditApp = async () => {
        if (user.type !== "admin") return;

        const response = await getApp(user.app_id, token);

        if (!response.errors) {
            const app = response.app;
            setAppName(app.app_name);
            setAppTwitter(app.twitter);
        }
    }

    useEffect(() => {
        const _loadSession = async () => {
            const auxSession = await sessionService.loadSession();
            setToken(auxSession.token);
        }
        _loadSession();
        _setEditUser();
        _setEditApp();
    }, [token]);

    return (
        <Container>
            <EditProfileContainer className="shadow-sm">
                <ContainerHeader>
                    <ContainerTitle>Editar Conta</ContainerTitle>
                </ContainerHeader>
                <ContainerForm>
                    <form id="editUser" onSubmit={handleSubmit(_editUser)}>
                        <InputBlock>
                            <label htmlFor="first_name">Nome</label>
                            <input
                                type="text"
                                id="first_name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </InputBlock>

                        {user.type === "admin" &&
                            <InputBlock>
                                <label htmlFor="last_name">Sobrenome</label>
                                <input
                                    type="text"
                                    id="last_name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </InputBlock>
                        }

                        <InputBlock>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                //onChange={(e) => setEmail(e.target.value)}
                                disabled
                            />
                        </InputBlock>

                        <InputBlock>
                            <label htmlFor="change_password">Alterar senha</label>
                            <input
                                type="password"
                                id="change_password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </InputBlock>

                        {user.type !== "admin" &&
                            <InputBlock>
                                <label htmlFor="app_id">App Id</label>
                                <input
                                    type="number"
                                    id="app_id"
                                    value={appId}
                                    disabled
                                />
                            </InputBlock>
                        }

                        {user.type === "admin" &&
                            <InputBlock>
                                <label htmlFor="app_name">App:</label>
                                <input
                                    type="text"
                                    id="app_name"
                                    value={appName}
                                    onChange={(e) => setAppName(e.target.value)}
                                />
                            </InputBlock>
                        }

                        {user.type === "admin" &&
                            <InputBlock>
                                <label htmlFor="app_twitter">App Twitter:</label>
                                <input
                                    type="text"
                                    id="app_twitter"
                                    value={appTwitter}
                                    onChange={(e) => setAppTwitter(e.target.value)}
                                />
                            </InputBlock>
                        }

                        {user.type === "group_manager" &&
                            <InputBlock>
                                <label htmlFor="twitter">Twitter</label>
                                <input
                                    type="text"
                                    id="twitter"
                                    value={twitter}
                                    onChange={(e) => setTwitter(e.target.value)}
                                />
                            </InputBlock>
                        }

                        {user.type === "group_manager" &&
                            <CheckboxInputBlock>
                                <Label htmlFor="id_code">Código de Identificação</Label>
                                <CheckboxInput
                                    type="checkbox"
                                    id="id_code"
                                    checked={requireId === null? false : true}
                                    onChange={(e) => setRequireId(requireId === null? '' : null)}
                                />
                            </CheckboxInputBlock>
                        }

                        {user.type === "group_manager" && requireId !== null &&
                            <InputBlock>
                                <label htmlFor="id_code_length">Quantidade de caracteres</label>
                                <input
                                    type="number"
                                    id="id_code_length"
                                    value={idCodeLength}
                                    min="1"
                                    onChange={(e) => setIdCodeLength(e.target.value)}
                                />
                            </InputBlock>
                        }

                        {user.type === "group_manager" && requireId !== null &&
                            <InputBlock>
                                <label htmlFor="require_id">Nome do código de identificação</label>
                                <input
                                    type="string"
                                    id="require_id"
                                    value={requireId}
                                    onChange={(e) => setRequireId(e.target.value)}
                                />
                            </InputBlock>
                        }

                        <SubmitButton type="submit">
                            Salvar
                        </SubmitButton>
                    </form>
                </ContainerForm>
            </EditProfileContainer>
        </Container>
    );
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    user: state.user.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        setToken,
        setUser
    },
    dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Profile);
