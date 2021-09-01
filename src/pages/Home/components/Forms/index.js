import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  setForm, setToken
} from "actions/";
import { bindActionCreators } from "redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import getForm from "./services/getForm";
import createForm from "./services/createForm";
import editForm from "./services/editForm";
import createFormQuestion from "./services/createFormQuestion";
import deleteFormQuestion from "./services/deleteFormQuestion";
import deleteFormOption from "./services/deleteFormOption";
import { kindOptions } from "./formKinds";

import {
  Container,
  ContainerContentBox,
  ContentBoxHeader,
  ContentBoxTitle,
  ContentBoxTable,
  AddAppContainer,
  ContainerHeader,
  ContainerTitle,
  ContainerForm,
  Form,
  Inputs,
  InputBlock,
  Input,
  SubmitButton,
  EditInput,
  TextArea,
  AddButton,
  EditButton,
} from "./styles";
import "./styles.css";
import TableDragAndDrop from "../ContentBox/TableDragAndDrop";
import { Table } from 'react-bootstrap';
import deleteIcon from "../../../Home/components/assets/trash-solid.svg";

import Loading from 'sharedComponents/Loading';
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";

const Forms = ({
  token,
  user,
  form,
  setForm,
  setToken
}) => {
  const { handleSubmit } = useForm();

  const [questions, setQuestions] = useState([]);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionKind, setQuestionKind] = useState("");
  const [modalEdit, setModalEdit] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState({});
  const [editTitle, setEditName] = useState("");
  const [editKind, setEditKind] = useState("");
  const [editOrder, setEditOrder] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [questionShow, setQuestionShow] = useState({});

  const _createOption = async () => {
    const newOptions = editingQuestion.form_options.slice();
    const newOption = {
      id: Math.floor(Math.random() * 10000),
      value: false,
      text: "",
      order: newOptions.length + 1,
      form_question_id: editingQuestion.id,
      is_new: true,
    }
    newOptions.push(newOption);

    setEditingQuestion({...editingQuestion, form_options: newOptions});
  }

  const _createQuestion = async () => {
    let response = {}
    let data = {}
  
    if (user.form) {
      data = {
        "form_question": {
          "kind": questionKind.key,
          "text": questionTitle,
          "order": 1,
          "form_id": user.form.id,
        }
      }
      response = await createFormQuestion(data, token)
    } else {
      data = {
        "form": {
          "group_manager_id": user.id,
          "questions": [
            {
              "kind": questionKind.key,
              "text": questionTitle,
              "order": 1,
              "options": []
            },
          ]
        }
      }
      response = await createForm(data, token)
    }
    
    if (!response.errors) {
      setQuestionTitle("");
      setQuestionKind("");
      _getForm(token);
    }
  }

  const _deleteFormOption = async (form_option, token) => {
    let newOptions = editingQuestion.form_options.filter((option) =>
      option.id !== form_option.id
    );

    newOptions = newOptions.map((option, index) => {
      return { ...option, order: index+1 }
    })
    setEditingQuestion({...editingQuestion, form_options: newOptions});

    if (!form_option.is_new) {
      await deleteFormOption(form_option.id, token);
    }
  }

  const _deleteFormQuestion = async (id, token) => {
    await deleteFormQuestion(id, token)
  }

  const _editForm = async () => {
    const data = {
      "manager": {
        "email": editingQuestion.email,
        "name": editingQuestion.name,
        "app_id": user.app_id,
        "permission": editingQuestion.permission
      }
    }
    await editForm(editingQuestion.id, data, token);
    setModalEdit(false);
    _getForm(token);
  }

  const handleOptionOnDragEnd = (e) => {
    if (!e.destination) return;

    let newOptions = editingQuestion.form_options.slice();
    const [reorderedOption] = newOptions.splice(e.source.index, 1);
    newOptions.splice(e.destination.index, 0, reorderedOption);

    newOptions = newOptions.map((option, index) => {
      return { ...option, order: index+1 }
    })

    setEditingQuestion({...editingQuestion, form_options: newOptions})
  }

  const handleOptionOnChange = (form_option, text) => {
    const newOptions = editingQuestion.form_options.map((option) => 
      option.id === form_option.id ? { ...option, text } : option
    )

    setEditingQuestion({...editingQuestion, form_options: newOptions})
  }

  const handleEdit = (content) => {
    setEditingQuestion(content);
    setModalEdit(!modalEdit);
  } 
  
  const handleShow = (content) => {
    setQuestionShow(content);
    setModalShow(!modalShow);
  }

  const getKindSelection = (kind) => {
    let selected = {}
    kindOptions.forEach(option => {
      if (option.value === kind) {
        selected = option
      }
    })
    return selected
  }

  const loadForm = async (response) => {
    let aux_form_questions = [];
    if (!response.form.form_questions) {
      response.form.form_questions = [];
    }
    response.form.form_questions.forEach(form_question => {
      aux_form_questions.push({
        "id": form_question.id,
        "kind": form_question.kind,
        "text": form_question.text,
        "order": form_question.order,
        "form_options": form_question.form_options ? form_question.form_options : [],
      })
    })
    if (aux_form_questions.length === 0) {
      aux_form_questions = null
    }
    setQuestions(aux_form_questions);
    await setForm(response.form);
  }

  const _getForm = async (token) => {
    const formID = user.form ? user.form.id : null
    if (formID) {
      const response = await getForm(formID, token)
      loadForm(response)
    } else {
      setQuestions(null)
    }
  }

  useEffect(() => {
    _getForm(token)
    setToken(token)
  }, []);

  const fields =
    [{
      key: "id",
      value: "ID"
    },
    {
      key: "text",
      value: "Texto",
    }];

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Informações da Pergunta
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <EditInput>
            <label>ID</label>
            <input
              className="text-dark"
              type="text"
              value={questionShow.id}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Texto</label>
            <TextArea
              className="text-dark"
              type="text"
              value={questionShow.text}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Tipo</label>
            <Select
              options={kindOptions}
              defaultValue={getKindSelection(questionShow.kind)}
              isDisabled
            />
          </EditInput>

          {questionShow.form_options ? questionShow.form_options.map((form_option) => (
            <EditInput className="bg-light p-2" key={form_option.id}>
              <label>Opção ID #{form_option.id}</label>
              <input
                className="text-dark"
                type="text"
                value={form_option.text}
                disabled
              />
            </EditInput>
          )) : null}
        </Modal.Body>

        <Modal.Footer>
          <EditButton onClick={() => setModalShow(false)}>Voltar</EditButton>
        </Modal.Footer>
      </Modal>

      <Modal
        show={modalEdit}
        onHide={() => setModalEdit(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Editar Pergunta
          </Modal.Title>
        </Modal.Header>
        <form id="editForm" onSubmit={handleSubmit(_editForm)}>
          <Modal.Body>
            <EditInput>
              <label htmlFor="edit_text">Texto</label>
              <TextArea
                type="text"
                id="edit_name"
                value={editingQuestion.text}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, name: e.target.value })}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="edit_kind">Tipo</label>
              <Select
                id="edit_kind"
                placeholder="Selecionar"
                options={kindOptions}
                defaultValue={getKindSelection(editingQuestion.kind)}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, kind: e.value })}
              />
            </EditInput>

            <DragDropContext onDragEnd={handleOptionOnDragEnd}>
              <Droppable droppableId="edit-options">
                {(provided) => (
                  <div className="droppable" {...provided.droppableProps} ref={provided.innerRef}>
                    {editingQuestion.form_options ? 
                      editingQuestion.form_options.map((form_option, index) => (
                        <Draggable key={form_option.id} draggableId={form_option.id.toString()} index={index}>
                          {(provided) => (
                            <EditInput
                              className="bg-light p-2 draggable"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              title="Arraste para organizar"
                            >
                              <div className="option-labels">
                                <label>Opção ID #{form_option.id}</label>

                                <button
                                  className="delete-option"
                                  onClick={() => _deleteFormOption(form_option, token)}
                                >
                                  <img src={deleteIcon} alt="Deletar" />
                                </button>
                              </div>
                              
                              <input
                                className="text-dark"
                                type="text"
                                value={form_option.text}
                                onChange={(e) => handleOptionOnChange(form_option, e.target.value)}
                              />
                            </EditInput>
                          )}
                        </Draggable>
                      )
                    ) : null}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Modal.Body>
          <Modal.Footer>
            <AddButton type="button" onClick={() => _createOption()}>Adicionar Opção</AddButton>
            <EditButton type="submit">Editar</EditButton>
          </Modal.Footer>
        </form>
      </Modal>

      <Container>
        <ContainerContentBox className="shadow-sm" component_height={'35rem'}>
          <ContentBoxHeader>
            <ContentBoxTitle>Perguntas</ContentBoxTitle>
          </ContentBoxHeader>
          <ContentBoxTable
            component_height={'35rem'}
          >
          {questions !== null ?
            questions.length > 0 ?
              <TableDragAndDrop
                contents={questions ? questions : null}
                fields={fields}
                _deleteApp={_deleteFormQuestion}
                setContentShow={handleShow}
                setEditingContent={handleEdit}
                token={token}
              /> :
              <Loading isLoading={true} />
            :
              <Table responsive>
                <thead>
                  <tr>
                    <th>Não há perguntas cadastradas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
          }
          </ContentBoxTable>
        </ContainerContentBox>

        <AddAppContainer className="shadow-sm">
          <ContainerHeader>
            <ContainerTitle>Adicionar Pergunta</ContainerTitle>
          </ContainerHeader>
          <ContainerForm>
            <Form id="addFormQuestion" onSubmit={handleSubmit(_createQuestion)}>
              <Inputs>
                <InputBlock>
                  <label htmlFor="question_text">Texto</label>
                  <Input
                    type="text"
                    id="question_text"
                    value={questionTitle}
                    onChange={(e) => setQuestionTitle(e.target.value)}
                  />
                </InputBlock>
                <InputBlock>
                  <label htmlFor="question_kind">Tipo</label>
                  <Select
                    id="question_kind"
                    placeholder="Selecionar"
                    options={kindOptions}
                    defaultValue={questionKind}
                    onChange={(e) => setQuestionKind(e)}
                  />
                </InputBlock>
              </Inputs>
              <SubmitButton type="submit">
                Adicionar
              </SubmitButton>
            </Form>
          </ContainerForm>
        </AddAppContainer>
      </Container >
    </>
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
  form: state.user.form
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setForm,
    setToken
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Forms);
