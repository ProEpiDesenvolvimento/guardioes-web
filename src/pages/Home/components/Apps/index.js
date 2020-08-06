import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  setApps
} from 'actions/';
import { bindActionCreators } from 'redux';
import getAllApps from './services/getAllApps'
import {
  Container,
  AppsTable,
  AppsTableHeaderDiv,
  AppsTableTitle,
  Table,
  THead,
  Tr,
  Th
} from './styles';
import ContentBox from '../ContentBox';

const Apps = ({
  token,
  user,
  apps,
  setApps
}) => {

  const _getApps = async (token) => {
    const response = await getAllApps(token)
  }

  useEffect(() => {
    _getApps(token)
  }, []);

  const fields = ["AppID", "Nome", "País"];
  const contents = [["1", "App 1", "País 1"], ["2", "App 2", "País 2"], ["3", "App 3", "País 3"]];

  return (
    <ContentBox title="Apps" contents={contents} fields={fields} />
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
  apps: state.user.apps
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setApps
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Apps);