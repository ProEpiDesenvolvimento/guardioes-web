import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { 
  ContentBoxTableHeader,
  ContentBoxTableIcon,
 } from './styles';
import editIcon from 'pages/Panel/components/assets/edit-solid.svg';
import deleteIcon from 'pages/Panel/components/assets/trash-solid.svg';
import confirmIcon from 'pages/Panel/components/assets/confirm.svg';
import cancelIcon from 'pages/Panel/components/assets/cancel.svg';

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
            <ContentBoxTableHeader style={{ maxWidth: "500px" }} key={field.key}>
              {field.value}
            </ContentBoxTableHeader>
          ))}
          <th></th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {contents.map(content => (
          <tr key={content.id}>
            {fields.map(field => (
              <td style={{ maxWidth: "500px" }} key={field.key}>
                {content[field.key]}
              </td>
            ))}
            <td>
              <Link to="/panel">
                <button className="btn btn-info" onClick={() => setContentShow(content)}>
                  Visualizar
                </button>
              </Link>
            </td>
            <td>
              <Link to="/panel">
                <ContentBoxTableIcon
                  cursor={"true"}
                  src={editIcon}
                  alt="Editar"
                  onClick={() => setEditingContent(content)}
                />
              </Link>
            </td>
            <td>
              <Link to="/panel">
                <ContentBoxTableIcon
                  cursor={"true"}
                  src={confirmDelete === content.id ? confirmIcon : deleteIcon}
                  alt="Deletar"
                  onClick={() => handleDelete(content.id, token)}
                />
                <ContentBoxTableIcon
                  cursor={confirmDelete === content.id ? "true" : ""}
                  style={{ width: "20px", marginLeft: "10px", opacity: confirmDelete === content.id ? 1 : 0 }}
                  src={cancelIcon}
                  alt="Deletar"
                  onClick={() => setConfirmDelete(null)}
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