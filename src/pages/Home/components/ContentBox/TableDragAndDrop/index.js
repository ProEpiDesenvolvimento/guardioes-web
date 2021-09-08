import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { 
  ContentBoxTableHeader,
  ContentBoxTableIcon,
} from '../Table/styles';
import { TableRow } from './styles';
import TableCell from './TableCell';
import editIcon from 'pages/Home/components/assets/edit-solid.svg';
import deleteIcon from 'pages/Home/components/assets/trash-solid.svg';
import confirmIcon from 'pages/Home/components/assets/confirm.svg';
import cancelIcon from 'pages/Home/components/assets/cancel.svg';

const TableDragAndDrop = ({
  contents,
  fields,
  setContentsOrder,
  setContentShow,
  setEditingContent,
  _deleteApp,
  token
}) => {
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleContentOnDragEnd = (e) => {
    if (!e.destination) return;

    let newContents = contents.slice();
    const [reorderedOption] = newContents.splice(e.source.index, 1);
    newContents.splice(e.destination.index, 0, reorderedOption);

    newContents = newContents.map((option, index) => {
      return { ...option, order: index+1 }
    });

    setContentsOrder(newContents);
  }

  const handleDelete = (id, token) => {
    if (confirmDelete === id) {
      _deleteApp(id, token);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
    }
  }

  return (
    <DragDropContext onDragEnd={handleContentOnDragEnd}>
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
            <th></th>
          </tr>
        </thead>

        <Droppable droppableId="edit-content">
          {(provided) => (
            <tbody className="droppable" {...provided.droppableProps} ref={provided.innerRef}>
              {contents.map((content, index) => (
                <Draggable key={content.id} draggableId={content.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <TableRow
                      isDragging={snapshot.isDragging}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      title="Arraste para organizar"
                    >
                      {fields.map(field => (
                        <TableCell isDragging={snapshot.isDragging} key={field.key}>
                          {content[field.key]}
                        </TableCell>
                      ))}
                      <TableCell isDragging={snapshot.isDragging}>
                        <Link to="/panel">
                          <button className="btn btn-info" onClick={() => setContentShow(content)}>
                            Visualizar
                          </button>
                        </Link>
                      </TableCell>
                      <TableCell isDragging={snapshot.isDragging}>
                        <Link to="/panel">
                          <ContentBoxTableIcon
                            cursor={"true"}
                            src={editIcon}
                            alt="Editar"
                            onClick={() => setEditingContent(content)}
                          />
                        </Link>
                      </TableCell>
                      <TableCell isDragging={snapshot.isDragging}>
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
                      </TableCell>
                    </TableRow>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </tbody>
          )}
        </Droppable>
      </Table>
    </DragDropContext>
  );
}

export default TableDragAndDrop;
