import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  setForm, setToken, setUser
} from "actions/";
import { bindActionCreators } from "redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { sessionService } from 'redux-react-session';

import getForm from "./services/getForm";
import createForm from "./services/createForm";
import editForm from "./services/editForm";
import createFormQuestion from "./services/createFormQuestion";
import editFormQuestion from "./services/editFormQuestion";
import deleteFormQuestion from "./services/deleteFormQuestion";
import deleteFormOption from "./services/deleteFormOption";
import { kindOptions } from "./formKinds";
import { valueOptions } from "./optionValues";

import {
  Container,
  ContainerContentBox,
  ContentBoxHeader,
  ContentBoxTitle,
  ContentBoxTable,
  EditButtonsContainer,
  EditOrder,
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
import { Table } from "react-bootstrap";
import deleteIcon from "../../../Home/components/assets/trash-solid.svg";

import Loading from "sharedComponents/Loading";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import FormInput from "sharedComponents/FormInput";
import ModalInput from "sharedComponents/ModalInput";


const Forms = ({
  token,
  user,
  form,
  setForm,
  setToken
}) => {
  const { handleSubmit } = useForm();

  const [questions, setQuestions] = useState([]);
  const [questionsSorted, setQuestionsSorted] = useState([]);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionKind, setQuestionKind] = useState({});
  const [isChangedOrder, setIsChangedOrder] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [questionShow, setQuestionShow] = useState({});

  const _createFormQuestion = async () => {
    let response = {}
    let data = {}
  
    if (user.form) {
      data = {
        "form_question": {
          "kind": questionKind.value,
          "text": questionTitle,
          "order": questions ? questions.length + 1 : 1,
          "form_id": user.form.id,
        }
      }
      response = await createFormQuestion(data, token)
      if (!response.errors) {
        setQuestionTitle("");
        setQuestionKind({});
        _getForm(token);
      }
    } else {
      data = {
        "form": {
          "group_manager_id": user.id,
          "questions": [
            {
              "kind": questionKind.value,
              "text": questionTitle,
              "order": 1,
              "options": []
            },
          ]
        }
      }
      response = await createForm(data, token)
      if (!response.errors) {
        setUser({
          ...user,
          form: { id: response.data.form?.id }
        });
        sessionService.saveUser({
          ...user,
          form: { id: response.data.form?.id }
        });
        window.location.reload();
      }
    }
  }

  const _editFormQuestion = async () => {
    const data = {
      "form_question": {
        "kind": editingQuestion.kind,
        "text": editingQuestion.text,
        "order": editingQuestion.order,
        "options": editingQuestion.form_options,
      }
    }
    const response = await editFormQuestion(editingQuestion.id, data, token);
    if (!response.errors) {
      setModalEdit(false);
      _getForm(token);
    }
  }

  const _deleteFormQuestion = async (id, token) => {
    await deleteFormQuestion(id, token);
    _getForm(token);
  }

  const _deleteFormOption = async (form_option, token) => {
    const confirm = window.confirm("Tem certeza que deseja excluir essa opção?");
    if (!confirm) return;

    let newOptions = editingQuestion.form_options.filter((option) =>
      option.id !== form_option.id
    );

    newOptions = newOptions.map((option, index) => {
      return { ...option, order: index+1 }
    })
    setEditingQuestion({...editingQuestion, form_options: newOptions});

    if (!form_option.is_new) {
      await deleteFormOption(form_option.id, token);
      _getForm(token);
    }
  }

  const _editForm = async () => {
    const data = {
      "form": {
        "questions": questionsSorted,
      }
    }
    const response = await editForm(form.id, data, token);
    if (!response.errors) {
      _getForm(token);
    }
  }

  const handleOptionOnCreate = async () => {
    if (editingQuestion.kind !== "boolean" || editingQuestion.form_options.length < 2) {
      const newOptions = editingQuestion.form_options.slice();
      const newOption = {
        id: Math.floor(Math.random() * 10000),
        value: true,
        text: "",
        order: newOptions.length + 1,
        form_question_id: editingQuestion.id,
        is_new: true,
      }
      newOptions.push(newOption);

      setEditingQuestion({...editingQuestion, form_options: newOptions});
    } else {
      alert("Você não pode adicionar mais Opções pra esse tipo de Pergunta");
    }
  }

  const handleOptionOnChange = (form_option, field, value) => {
    const newOptions = editingQuestion.form_options.map((option) => 
      option.id === form_option.id ? { ...option, [field]: value } : option
    );
  
    setEditingQuestion({...editingQuestion, form_options: newOptions});
  }

  const handleOptionOnDragEnd = (e) => {
    if (!e.destination) return;

    let newOptions = editingQuestion.form_options.slice();
    const [reorderedOption] = newOptions.splice(e.source.index, 1);
    newOptions.splice(e.destination.index, 0, reorderedOption);

    newOptions = newOptions.map((option, index) => {
      return { ...option, order: index+1 }
    });

    setEditingQuestion({...editingQuestion, form_options: newOptions});
  }

  const handleQuestionOrderChange = (newQuestions, isChanged = true) => {
    setQuestionsSorted(newQuestions);

    if (isChanged) {
      setIsChangedOrder(true);
    } else {
      setIsChangedOrder(false);
    }
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
      setQuestions([]);
    } else {
      setQuestions(aux_form_questions);
    }
    setQuestionsSorted(aux_form_questions);

    await setForm(response.form);
  }

  const _getForm = async (token) => {
    const formID = user.form ? user.form.id : null
    if (formID) {
      const response = await getForm(formID, token)
      loadForm(response)
    } else {
      setQuestions([])
      setQuestionsSorted(null)
    }
    setIsChangedOrder(false)
  }

  useEffect(() => {
    _getForm(token)
    setToken(token)
  }, []);

  const fields = [
    {
      key: "id",
      value: "ID"
    },
    {
      key: "text",
      value: "Texto",
    }
  ];

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

        <ModalInput
            type="text"
            label="ID"
            value={questionShow.id}
            disabled={true}
          />

        <ModalInput
            type="textarea"
            label="Texto"
            value={questionShow.text}
            disabled={true}
          />

          <ModalInput
              type="select"
              label="Tipo"
              id="tipo" 
              value={getKindSelection(questionShow.kind)}   
              options={kindOptions}          
              disabled={true}
            /> 

          {questionShow.form_options ? questionShow.form_options.map((form_option) => (
            
            <EditInput className="bg-light p-2" key={form_option.id}>
              <div>
                <label>Opção ID #{form_option.id}</label>
                <select
                  className="value-option"
                  value={form_option.value}
                  disabled
                >
                  {valueOptions.map(option => 
                    <option value={option.value} key={option.label}>{option.label}</option>
                  )}
                </select>
              </div>                
              
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
          <EditButton onClick={() => setModalShow(false)}>
            Voltar
          </EditButton>
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
        <form id="editForm" onSubmit={handleSubmit(_editFormQuestion)}>
          <Modal.Body>

          <ModalInput
              type="textarea"
              label="Texto"
              id="edit_name" 
              value={editingQuestion.text}   
              setValue={(e) => setEditingQuestion({ ...editingQuestion, text: e.target.value })}         
            />

          <ModalInput
              type="select"
              label="Tipo"
              id="edit_kind"
              placeholder="Selecionar"
              value={getKindSelection(editingQuestion.kind)}   
              options={kindOptions}          
              setValue={(e) => setEditingQuestion({ ...editingQuestion, kind: e.value })}
            />

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
                                <div>
                                  {form_option.is_new ?
                                    <label>Opção NOVA</label> 
                                  :
                                    <label>Opção ID #{form_option.id}</label>
                                  }

                                  <select
                                    className="value-option"
                                    value={form_option.value}
                                    onChange={e => handleOptionOnChange(form_option, "value", e.target.value)}
                                    disabled={editingQuestion.kind !== "boolean"}
                                  >
                                    {valueOptions.map(option => 
                                      <option value={option.value} key={option.label}>{option.label}</option>
                                    )}
                                  </select>
                                </div>
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
                                onChange={(e) => handleOptionOnChange(form_option, "text", e.target.value)}
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
            <AddButton type="button" onClick={() => handleOptionOnCreate()}>
              Adicionar Opção
            </AddButton>
            <EditButton type="submit">Editar</EditButton>
          </Modal.Footer>
        </form>
      </Modal>

      <Container>
        <ContainerContentBox className="shadow-sm" component_height={"35rem"}>
          <ContentBoxHeader>
            <ContentBoxTitle>Perguntas</ContentBoxTitle>
          </ContentBoxHeader>
          <ContentBoxTable
            component_height={"35rem"}
          >
          {questionsSorted !== null ?
            questionsSorted.length > 0 ?
              <TableDragAndDrop
                contents={questionsSorted ? questionsSorted : null}
                fields={fields}
                _deleteApp={_deleteFormQuestion}
                setContentsOrder={handleQuestionOrderChange}
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
          {isChangedOrder ? 
            <EditButtonsContainer>
              <EditOrder onClick={() => _editForm()}>
                Salvar Ordenação
              </EditOrder>
              <EditOrder alert onClick={() => handleQuestionOrderChange(questions, false)}>
                Descartar Ordenação
              </EditOrder>
            </EditButtonsContainer>
          : null}
        </ContainerContentBox>

        <AddAppContainer className="shadow-sm">
          <ContainerHeader>
            <ContainerTitle>Adicionar Pergunta</ContainerTitle>
          </ContainerHeader>
          <ContainerForm>
            <Form id="addFormQuestion" onSubmit={handleSubmit(_createFormQuestion)}>
              <Inputs>

              <FormInput
                  label="Texto"
                  type="text"
                  id="question_text"
                  value={questionTitle}
                  setValue={(e) => setQuestionTitle(e.target.value)}
                  required
              />

                <FormInput
                  label="Tipo"
                  type="select"
                  id="question_kind"
                  placeholder="Selecionar"
                  setValue={(e) => setQuestionKind(e)}
                  options={kindOptions}
                />

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
    setToken,
    setUser
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Forms);
