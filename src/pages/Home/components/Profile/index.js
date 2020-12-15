import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setAdmins, setToken } from 'actions/';
import { bindActionCreators } from 'redux';

const Profile = ({
    token,
    user,
    setToken
}) => {
    return (
        <>
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
)(Profile);