import React, { useEffect, useState } from "react";
import {
  Container,
  AddContentContainer,
  ContainerHeader,
  ContainerTitle,
  ContainerForm,
  SubmitButton,
} from "./styles";
import { useForm } from "react-hook-form";
import ContentBox from "../ContentBox";
import getAllContents from "./services/getAllContents";
import deleteContent from "./services/deleteContent";
import createContent from "./services/createContent";
import editContent from "./services/editContent";
import { contentIcons } from "../../../../utils/contentIcons";
import { connect } from "react-redux";
import { setContents, setToken } from "actions/";
import { bindActionCreators } from "redux";
import { sessionService } from "redux-react-session";
import Modal from "react-bootstrap/Modal";
import ModalInput from "sharedComponents/ModalInput";
import FormInput from "sharedComponents/FormInput";

const Contents = ({ contents, token, setToken, user, setContents }) => {
  const fields = [
    {
      key: "id",
      value: "ID",
    },
    {
      key: "title",
      value: "Title",
    },
  ];

  const { handleSubmit } = useForm();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [icon, setIcon] = useState("");
  const [content_type, setContentType] = useState("");
  const [source_link, setSourceLink] = useState("");

  const [modalEdit, setModalEdit] = useState(false);
  const [editingContent, setEditingContent] = useState({});
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editIcon, setEditIcon] = useState("");
  const [editContentType, setEditContentType] = useState({});
  const [editSourceLink, setEditSourceLink] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [contentShow, setContentShow] = useState({});

  const contentTypeSelect = [
    {
      label: "Conselho",
      value: "text",
    },
    {
      label: "Redirecionamento",
      value: "redirect",
    },
  ];

  const _getContents = async (token) => {
    const response = await getAllContents(token);
    if (!response.contents || response.contents.length === 0) {
      response.contents = null;
    }
    setContents(response.contents);
  };

  const _createContent = async () => {
    const data = {
      content: {
        title,
        body,
        icon,
        content_type,
        source_link,
        group_manager_id: user.type === "group_manager" ? user.id : null,
        app_id: user.app_id,
      },
    };
    await createContent(data, token).then((response) => {
      if (!response.errors) {
        setTitle("");
        setBody("");
        setIcon("");
        setContentType("");
        setSourceLink("");
        _getContents(token);
      }
    });
  };

  const _editContent = async () => {
    const data = {
      title: editTitle,
      body: editBody,
      icon: editIcon,
      content_type: editContentType,
      source_link: editSourceLink,
      app_id: user.app_id,
    };
    await editContent(editingContent.id, data, token);
    setModalEdit(false);
    _getContents(token);
  };

  const isIconSelected = (current) => {
    return current === icon;
  };

  const isEditIconSelected = (current) => {
    return current === editIcon;
  };

  const handleShow = (content) => {
    setContentShow(content);
    setModalShow(!modalShow);
  };

  const handleEdit = (content) => {
    setEditingContent(content);
    setEditTitle(content.title);
    setEditBody(content.body);
    setEditIcon(content.icon);
    setEditContentType(
      contentTypeSelect.map((type) => {
        if (content.content_type === type.value) return type;
      })
    );
    setEditSourceLink(content.source_link);
    setModalEdit(!modalEdit);
  };

  const _deleteContent = async (id, token) => {
    await deleteContent(id, token);
    _getContents(token);
  };

  useEffect(() => {
    const _loadSession = async () => {
      const auxSession = await sessionService.loadSession();
      setToken(auxSession.token);
    };
    _loadSession();
    _getContents(token);
  }, [token]);

  return (
    <>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Informações do Conteúdo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ModalInput
            type="text"
            label="ID"
            value={contentShow.id}
            disabled={true}
          />
          <ModalInput
            type="text"
            label="Título"
            value={contentShow.title}
            disabled={true}
          />
          <ModalInput
            type="textarea"
            label="Conteúdo"
            value={contentShow.body}
            rows="10"
            disabled={true}
          />
          <ModalInput
            type="imageselect"
            label="Ícone"
            value={contentShow.icon}
            options={contentIcons}
            disabled={true}
          />
          <ModalInput
            type="select"
            label="Tipo"
            id="type_id"
            options={contentTypeSelect}
            value={contentTypeSelect.map((type) => {
              if (contentShow.content_type === type.value) return type;
            })}
            disabled={true}
          />
          <ModalInput
            type="text"
            label="Fonte"
            value={contentShow.source_link}
            disabled={true}
          />
        </Modal.Body>

        <Modal.Footer>
          <SubmitButton onClick={() => setModalShow(false)}>
            Voltar
          </SubmitButton>
        </Modal.Footer>
      </Modal>

      <Modal show={modalEdit} onHide={() => setModalEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Conteúdo</Modal.Title>
        </Modal.Header>
        <form id="editContent" onSubmit={handleSubmit(_editContent)}>
          <Modal.Body>
            <ModalInput
              type="text"
              label="Título"
              id="edit_title"
              value={editTitle}
              setValue={(e) => setEditTitle(e.target.value)}
            />
            <ModalInput
              type="textarea"
              label="Conteúdo"
              id="edit_body"
              value={editBody}
              rows="10"
              setValue={(e) => setEditBody(e.target.value)}
            />
            <ModalInput
              type="imageselect"
              label="Ícone"
              options={contentIcons}
              setValue={setEditIcon}
              isSelected={isEditIconSelected}
            />
            <ModalInput
              type="select"
              label="Tipo"
              id="type_id"
              options={contentTypeSelect}
              value={editContentType}
              setValue={(e) => setEditContentType(e.value)}
            />
            <ModalInput
              type="text"
              label="Link da Fonte"
              id="edit_source_link"
              value={editSourceLink}
              setValue={(e) => setEditSourceLink(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <SubmitButton type="submit">Salvar</SubmitButton>
          </Modal.Footer>
        </form>
      </Modal>

      <Container>
        <ContentBox
          title="Conteúdos"
          fields={fields}
          delete_function={_deleteContent}
          contents={contents}
          token={token}
          handleEdit={handleEdit}
          handleShow={handleShow}
        />

        <AddContentContainer className="shadow-sm">
          <ContainerHeader>
            <ContainerTitle>Adicionar Conteúdo</ContainerTitle>
          </ContainerHeader>
          <ContainerForm>
            <form id="addContent" onSubmit={handleSubmit(_createContent)}>
              <FormInput
                label="Título"
                type="text"
                id="title"
                value={title}
                setValue={(e) => setTitle(e.target.value)}
                isLongInput={true}
              />
              <FormInput
                label="Conteúdo"
                type="textarea"
                id="body"
                value={body}
                setValue={(e) => setBody(e.target.value)}
                isLongInput={true}
              />
              <FormInput
                label="Ícone"
                type="imageselect"
                options={contentIcons}
                setValue={setIcon}
                isSelected={isIconSelected}
                isLongInput={true}
              />
              <FormInput
                label="Tipo"
                type="select"
                id="type_id"
                options={contentTypeSelect}
                setValue={(e) => setContentType(e.value)}
                isLongInput={true}
              />
              <FormInput
                label="Link da Fonte"
                type="text"
                id="source_link"
                value={source_link}
                setValue={(e) => setSourceLink(e.target.value)}
                isLongInput={true}
              />
              {/* <Input type="submit" className="shadow-sm" /> */}
              <SubmitButton type="submit">Criar</SubmitButton>
            </form>
          </ContainerForm>
        </AddContentContainer>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
  contents: state.user.contents,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setContents,
      setToken,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Contents);
