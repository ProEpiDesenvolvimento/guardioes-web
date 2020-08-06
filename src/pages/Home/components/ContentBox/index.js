import React from 'react';
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

const ContentBox = ({ title, fields, contents }) => {
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
                                {content.map(c => (
                                    <td>{c}</td>
                                ))}
                                
                                <td>
                                    <Link to="/panel">
                                        <ContentBoxTableIcon src={editIcon} alt="Editar"/>
                                    </Link>
                                </td>
                                <td>
                                    <Link to="/panel">
                                        <ContentBoxTableIcon src={deleteIcon} alt="Deletar"/>
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