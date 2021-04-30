import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setUser,
  setToken
} from 'actions/';
import { sessionService } from 'redux-react-session';

import queryString from 'query-string';

import getGraphs from './services/getGraphs'

import { isEmpty } from "lodash";
import './styles.css';

const Dashboard = ({
  token,
  user
}, props) => {
  const [currentNav, setCurrentNav] = useState({})
  const [urls, setUrls] = useState({})
  const hashes = queryString.parse(window.location.hash)

  const _getUrls = async () => {
    const response = await getGraphs(token)
    setUrls(response.urls)
  }

  useEffect(() => {
    const _loadSession = async () => {
      const auxSession = await sessionService.loadSession()
      setToken(auxSession.token)
    }
    _loadSession();

    _getUrls()
    if (isEmpty(hashes)) {
      setCurrentNav({ geral: null })
    }
    else {
      setCurrentNav(hashes)
    }
  }, [hashes.geral, hashes.adesao, hashes.dados, user, token]);
  
  const isCurrentNav = (string) => {
    if (typeof currentNav[string] !== "undefined") return true
    return false
  }
  // This allows a begin date for iframes
  let date = props.date || '2020-06-10T07:01:16.923Z' // App launch date

  return (
    <div style={{ width: '100%', height: '100%' }}>
          {urls?.length && urls.map((url) => {
            return (
                <iframe
                  src={url['iframe_url']}
                  frameborder="0"
                  width="100%"
                  height="100%"
                  allowtransparency
                />
            )
          })}
        </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  token: state.user.token
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setUser,
    setToken,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
