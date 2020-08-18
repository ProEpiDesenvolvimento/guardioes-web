import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import {
    Container,
    ContentBoxHeader,
    ContentBoxTitle,
    ContentBoxTable,
    ContentBoxTableHeader,
    ContentBoxTableIcon,
} from './styles';

import editIcon from '../assets/edit-solid.svg';
import deleteIcon from '../assets/trash-solid.svg';

const ContentBox = ({ title, fields, contents, delete_function, token }) => {

    const _deleteApp = (id, token) => {
        delete_function(id, token)
    }
    return (
        <Container className="shadow-sm">
            <ContentBoxHeader>
                <ContentBoxTitle>{title}</ContentBoxTitle>
            </ContentBoxHeader>
            <ContentBoxTable>
                <Table responsive>
                    <thead>
                        <tr>
                            {fields.map(field => (
                                <ContentBoxTableHeader>{field.value}</ContentBoxTableHeader>
                            ))}
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
                                        <ContentBoxTableIcon src={editIcon} alt="Editar" />
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
            </ContentBoxTable>
        </Container>
    );
}

export default ContentBox;