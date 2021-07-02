import React from 'react';
import { 
  ContentBoxTableHeader,
  CheckboxInput,
 } from './styles';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TableCases = ({
  cases,
  fields,
  setCaseShow,
  setCaseEdit,
}) => {
  const isChecked = (content) => {
    if (content.reviwed) {
      return true
    }
    return false
  }

  return (
    <Table responsive>
      <thead>
        <tr>
          {fields.map(field => (
            <ContentBoxTableHeader style={{maxWidth: "500px"}} key={field.key}>{field.value}</ContentBoxTableHeader>
          ))}
          <th></th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {cases.map(content => (
          <tr key={content.id}>
            {fields.map(field => (
              <td style={{maxWidth: "500px"}} key={field.key}>{content[field.key]}</td>
            ))}
            <td>
              <Link to="/panel">
                <button className="btn btn-info" onClick={() => { setCaseShow(content) }}>
                  Visualizar
                </button>
              </Link>
            </td>
            <td>
              <label htmlFor="status_case">Marcar como Visualizado</label>
              <CheckboxInput
                type="checkbox"
                id="status_case"
                checked={isChecked(content)}
                onChange={() => setCaseEdit(content)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableCases;
