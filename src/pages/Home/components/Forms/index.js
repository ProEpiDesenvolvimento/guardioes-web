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
  EditButton,
} from "./styles";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import ContentBox from "../ContentBox";

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

  const getKindSelection = (kind) => {
    let selected = {}
    kindOptions.forEach(option => {
      if (option.value === kind) {
        selected = option
      }
    })
    return selected
  }

  const handleEdit = (content) => {
    setEditingQuestion(content);
    setModalEdit(!modalEdit);
  } 
  
  const handleShow = (content) => {
    setQuestionShow(content);
    setModalShow(!modalShow);
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
    setQuestions(aux_form_questions)
    await setForm(response.form)
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
            <EditInput className="bg-light p-2 draggable-edit" key={form_option.id}>
              <label>Opção #{form_option.id}</label>
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

            <DragDropContext>
              <Droppable droppableId="edit-options">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {editingQuestion.form_options ? 
                      editingQuestion.form_options.map((form_option, index) => (
                        <Draggable key={form_option.id} draggableId={form_option.id.toString()} index={index}>
                          {(provided) => (
                            <EditInput
                              className="bg-light p-2"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              title="Arraste para organizar"
                            >
                              <label>Opção ID #{form_option.id}</label>
                              <input
                                className="text-dark"
                                type="text"
                                value={form_option.text}
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
            <EditButton type="submit">Editar</EditButton>
          </Modal.Footer>
        </form>
      </Modal>

      <Container>
        <ContentBox
          title="Perguntas"
          token={token}
          contents={questions}
          fields={fields}
          delete_function={_deleteFormQuestion}
          handleEdit={handleEdit}
          handleShow={handleShow}
        />

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
