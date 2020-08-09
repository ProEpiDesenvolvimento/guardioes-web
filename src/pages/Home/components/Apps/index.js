import React, { useEffect }from 'react';
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

const Apps = ({
    token,
    user,
    apps,
    setApps
}) => {

    const _getApps = async (token) => {
        const response = await getAllApps()
        console.log(response)
    } 

    useEffect(() => {
        _getApps(token)
    }, []);
  
  return (
      <Container>
          <AppsTable>
            <AppsTableHeaderDiv>
                <AppsTableTitle>
                    Apps
                </AppsTableTitle>
                <Table>
                    <THead>
                        <Tr>
                            <Th>AppId</Th>
                            <Th>Nome</Th>
                            <Th>País</Th>
                            <Th></Th>
                        </Tr>
                    </THead>
                </Table>
            </AppsTableHeaderDiv>
          </AppsTable>
      </Container>
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