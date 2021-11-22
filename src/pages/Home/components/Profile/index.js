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

import FormInput from 'sharedComponents/FormInput';

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
    const [hasRequireID, setHasRequireID] = useState(false);
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
                "require_id": hasRequireID? requireId : null,
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
        setHasRequireID(user.require_id === null? false : true);
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
                            <FormInput
                                label="Nome"
                                type="text"
                                id="first_name"
                                value={firstName}
                                setValue={setFirstName}
                            />

                        {user.type === "admin" &&
                            <FormInput
                                label="Sobrenome"
                                type="text"
                                id="last_name"
                                value={lastName}
                                setValue={setLastName}
                            />
                        }

                            <FormInput
                                label="Email"
                                type="text"
                                id="email"
                                value={email}
                                disabled
                            />

                            <FormInput
                                label="Alterar senha"
                                type="text"
                                id="change_password"
                                value={password}
                                setValue={setPassword}
                            />

                        {user.type !== "admin" &&
                            <FormInput
                                label="App Id"
                                type="text"
                                id="app_id"
                                value={appId}
                                disabled
                            />
                        }

                        {user.type === "admin" &&
                            <FormInput
                                label="App: "
                                type="text"
                                id="app_name"
                                value={appName}
                                setValue={setAppName}
                            />
                        }

                        {user.type === "admin" &&
                            <FormInput
                                label="App Twitter: "
                                type="text"
                                id="app_twitter"
                                value={appTwitter}
                                setValue={setAppTwitter}
                            />
                        }

                        {user.type === "group_manager" &&
                            <FormInput
                                label="Twitter"
                                type="text"
                                id="twitter"
                                value={twitter}
                                setValue={setTwitter}
                            />
                        }

                        {user.type === "group_manager" &&
                            <FormInput
                                label="Código de Identificação"
                                type="checkbox"
                                id="has_id_code"
                                ckecked={hasRequireID}
                                setValue={(e) => setHasRequireID(!hasRequireID)}
                            />
                        }

                        {user.type === "group_manager" && hasRequireID &&
                            <FormInput
                                label="Quantidade de caracteres"
                                type="text"
                                id="id_code_length"
                                value={idCodeLength}
                                setValue={setIdCodeLength}
                            />
                        }

                        {user.type === "group_manager" && hasRequireID &&
                            <FormInput
                                label="Nome do código de identificação"
                                type="text"
                                id="require_id"
                                value={requireId}
                                setValue={setRequireId}
                            />
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
