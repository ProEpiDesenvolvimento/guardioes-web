import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setToken, setUser } from 'actions';
import { bindActionCreators } from 'redux';

import { useForm } from 'react-hook-form';
import { sessionService } from 'redux-react-session';
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
    const [vigilanceEmail, setVigilanceEmail] = useState("");
    const [password, setPassword] = useState("");
    const [appId, setAppId] = useState(0);
    const [twitter, setTwitter] = useState("");
    const [requireId, setRequireId] = useState(false);
    const [isGod, setIsGod] = useState(false);

    const _editUser = async () => {
        const data = {
            [user.type]: {
                "first_name": firstName,
                "last_name": lastName,
                "name": firstName,
                "email": email,
                "vigilance_email": vigilanceEmail,
                "password": password !== "" ? password : null,
                "twitter": twitter,
                "require_id": requireId,
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
        setVigilanceEmail(user.vigilance_email);
        setAppId(user.app_id);
        setTwitter(user.twitter);
        setRequireId(user.require_id);
        setIsGod(user.is_god);
    }

    useEffect(() => {
        const _loadSession = async () => {
            const auxSession = await sessionService.loadSession();
            setToken(auxSession.token);
        }
        _loadSession();
        _setEditUser();
    }, [token]);

    return (
        <Container>
            <EditProfileContainer className="shadow-sm">
                <ContainerHeader>
                    <ContainerTitle>Editar Perfil</ContainerTitle>
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
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </InputBlock>
                        
                        {user.type === "group_manager" &&
                            <InputBlock>
                                <label htmlFor="vigilance_email">Email de Vigilância</label>
                                <input
                                    type="text"
                                    id="vigilance_email"
                                    value={vigilanceEmail}
                                    onChange={(e) => setVigilanceEmail(e.target.value)}
                                />
                            </InputBlock>
                        }

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
                            <label htmlFor="app_id">App Id</label>
                            <input
                                type="number"
                                id="app_id"
                                value={appId}
                                disabled
                            />
                        </InputBlock>

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
                                    value={requireId}
                                    onChange={(e) => setRequireId(!requireId)}
                                />
                            </CheckboxInputBlock>
                        }

                        {user.type === "admin" &&
                            <CheckboxInputBlock>
                                <Label htmlFor="is_god">Is God</Label>
                                <CheckboxInput
                                    type="checkbox"
                                    id="is_god"
                                    value={isGod}
                                    onChange={(e) => setIsGod(!isGod)}
                                />
                            </CheckboxInputBlock>
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