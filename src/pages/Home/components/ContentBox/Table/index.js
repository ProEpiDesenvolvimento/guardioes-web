import React, { useState } from 'react';
import { 
  ContentBoxTableHeader,
  ContentBoxTableIcon,
 } from './styles';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import editIcon from 'pages/Home/components/assets/edit-solid.svg';
import deleteIcon from 'pages/Home/components/assets/trash-solid.svg';
import confirmIcon from 'pages/Home/components/assets/confirm.svg';
import cancelIcon from 'pages/Home/components/assets/cancel.svg';

const TableComponent = ({
  contents,
  fields,
  setContentShow,
  setEditingContent,
  _deleteApp,
  token
}) => {
  const [confirmDelete, setConfirmDelete] = useState(null)

  const handleDelete = (id, token) => {
    if (confirmDelete === id) {
      _deleteApp(id, token)
      setConfirmDelete(null)
    } else {
      setConfirmDelete(id);
    }
  }

  return (
    <Table responsive>
      <thead>
        <tr>
          {fields.map(field => (
            <ContentBoxTableHeader style={{maxWidth: "500px"}}>{field.value}</ContentBoxTableHeader>
          ))}
          <th></th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {contents.map(content => (
          <tr>
            {fields.map(field => (
              <td style={{maxWidth: "500px"}}>{content[field.key]}</td>
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
                  cursor={true}
                  src={confirmDelete === content.id ? confirmIcon : deleteIcon}
                  alt="Deletar"
                  onClick={() => { handleDelete(content.id, token) }}
                />
                <ContentBoxTableIcon
                  cursor={confirmDelete === content.id ? true : false}
                  style={{width: "20px", marginLeft: "10px", opacity: confirmDelete === content.id ? 1 : 0}}
                  src={cancelIcon}
                  alt="Deletar"
                  onClick={() => { setConfirmDelete(null) }}
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