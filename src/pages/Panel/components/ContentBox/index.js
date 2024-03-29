import React from 'react';
import TableComponent from './Table'
import Loading from 'sharedComponents/Loading'
import { Table } from 'react-bootstrap';
import {
  Container,
  ContentBoxHeader,
  ContentBoxTitle,
  ContentBoxTable
} from './styles';

const ContentBox = ({
  title,
  fields,
  contents,
  delete_function,
  token,
  handleEdit,
  handleShow,
  component_height
}) => {

  const _deleteApp = async (id, token) => {
    await delete_function(id, token)
  };

  const setEditingContent = (content) => {
    handleEdit(content);
  };

  const setContentShow = (content) => {
    handleShow(content);
  };

  const object = title ? title.split(' - ')[0] : ''

  return (
    <Container
      className="shadow-sm"
      component_height={component_height}
    >
      <ContentBoxHeader>
        <ContentBoxTitle>{title}</ContentBoxTitle>
      </ContentBoxHeader>
      <ContentBoxTable
        component_height={component_height}
      >
      {contents !== null ?
        contents.length > 0 ?
          <TableComponent
            contents={contents}
            fields={fields}
            _deleteApp={_deleteApp}
            setContentShow={setContentShow}
            setEditingContent={setEditingContent}
            token={token}
          /> :
          <Loading isLoading={true} />
        :
          <Table responsive>
            <thead>
              <tr>
                <th>{object} vazio</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td>Não há nada encontrado em {object}.</td>
                </tr>
            </tbody>
          </Table>
      }
      </ContentBoxTable>
    </Container>
  );
};

export default ContentBox;