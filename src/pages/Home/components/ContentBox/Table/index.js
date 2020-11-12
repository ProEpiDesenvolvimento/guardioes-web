import React from 'react';
import { 
  ContentBoxTableHeader,
  ContentBoxTableIcon,
 } from './styles';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import editIcon from 'pages/Home/components/assets/edit-solid.svg';
import deleteIcon from 'pages/Home/components/assets/trash-solid.svg';

const TableComponent = ({
  contents,
  fields,
  setContentShow,
  setEditingContent,
  _deleteApp,
  token
}) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          {fields.map(field => (
            <ContentBoxTableHeader>{field.value}</ContentBoxTableHeader>
          ))}
          <th></th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {contents.map(content => (
          <tr>
            {fields.map(field => (
              <td>{content[field.key]}</td>
            ))}
            <td>
              <Link to="/panel">
                <button className="btn btn-info" onClick={() => { setContentShow(content) }}>
                  Visualizar
                        </button>
              </Link>
            </td>
            <td>
              <Link to="/panel">
                <ContentBoxTableIcon
                  src={editIcon}
                  alt="Editar"
                  onClick={() => { setEditingContent(content) }}
                />
              </Link>
            </td>
            <td>
              <Link to="/panel">
                <ContentBoxTableIcon
                  src={deleteIcon}
                  alt="Deletar"
                  onClick={() => { _deleteApp(content.id, token) }}
                />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableComponent;