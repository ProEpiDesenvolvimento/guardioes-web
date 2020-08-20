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

const ContentBox = ({ title, fields, contents, delete_function, token, handleEdit }) => {

    const _deleteApp = (id, token) => {
        delete_function(id, token)
    }

    const setEditingContent = (content) => {
        handleEdit(content);
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
                                <ContentBoxTableHeader>{ field }</ContentBoxTableHeader>
                            ))}
                            <ContentBoxTableHeader></ContentBoxTableHeader>
                            <ContentBoxTableHeader></ContentBoxTableHeader>
                        </tr>
                    </thead>

                    <tbody>
                        {contents.map(content => (
                            <tr>
                                <td>{content.id}</td>
                                <td>{content.app_name}</td>
                                <td>{content.owner_country}</td>
                                <td>
                                    <Link to="/panel">
                                        <ContentBoxTableIcon 
                                            src={editIcon} 
                                            alt="Editar"
                                            onClick={() => {setEditingContent(content)}}
                                        />
                                    </Link>
                                </td>
                                <td>
                                    <Link to="/panel">
                                        <ContentBoxTableIcon 
                                            src={deleteIcon} 
                                            alt="Deletar"
                                            onClick={() => {_deleteApp(content.id, token)}}
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