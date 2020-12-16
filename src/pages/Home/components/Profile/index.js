import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setToken, setUser } from 'actions';
import { bindActionCreators } from 'redux';

import { useForm } from 'react-hook-form';
import { sessionService } from 'redux-react-session';
import editProfile from './services/editProfile';

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

    const _editProfile = async () => {
        const data = {
            [user.type]: {
                "first_name": firstName,
                "last_name": lastName,
                "name": firstName,
                "email": email,
                "vigilance_email": vigilanceEmail,
                //"password": password,
                "twitter": twitter,
                "require_id": requireId,
            }
        }
        console.log(data);
        const response = await editProfile(user.id, user.type, data, token);
        if (!response.errors) {
            console.log(response)
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
        <>
        </>
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