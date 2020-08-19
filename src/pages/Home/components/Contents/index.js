import React, { useEffect, useState } from 'react';
import {
    Container,
    AddContentContainer,
    ContainerHeader,
    ContainerTitle,
    ContainerForm,
    InputBlock,
    Input,
    SubmitButton
  } from './styles';
import { useForm } from "react-hook-form";
import ContentBox from '../ContentBox';
import getAllContents from './services/getAllContents'
import deleteContent from './services/deleteContent'
import createContent from './services/createContent'
import { connect } from 'react-redux';
import {
  setContents,
  setToken
} from 'actions/';
import { bindActionCreators } from 'redux';
import { sessionService } from 'redux-react-session';

const Contents = ({
  contents,
  token,
  setToken,
  user,
  setContents
}) => {
  const fields =
    [{
      key: "id",
      value: "ID"
    },
    {
      key: "title",
      value: "Title",
    },
    {
      key: "body",
      value: "Body"
    },
    {
      key: "content_type",
      value: "Content Type"
    },
    {
      key: "source_link",
      value: "Source Link"
    }
  ];
  const { handleSubmit } = useForm()
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [content_type, setContentType] = useState("text")
  const [source_link, setSourceLink] = useState("")


  const _getContents = async (token) => {
    const response = await getAllContents(token)
    setContents(response.contents)
  }

  const _createContent = () => {
    const data = {
      "content": {
        title,
        body,
        content_type,
        source_link,
        app_id: user.app_id
      }
    }
    console.log(data)
    createContent(data, token)
  }

  

  const _deleteContent = (token, id) => {
    deleteContent(token, id)
  }
  

  useEffect(() => {
    const _loadSession = async () => {
      const auxSession = await sessionService.loadSession()
      setToken(auxSession.token)
    }
    _loadSession();
    _getContents(token)
  }, [token]);

  const handleTitle = (value) => {
    setTitle(value)
  }

  const handleBody = (value) => {
    setBody(value)
  }

  const handleContentType = (value) => {
      
  }

  const handleSourceLink = (value) => {
    setSourceLink(value)
  }
  return (
    <Container>
        <ContentBox 
          title="Conteúdos" 
          fields={fields}
          delete_function={_deleteContent}
          contents={contents ? contents : []}
          token={token}
          />

      <AddContentContainer className="shadow-sm">
        <ContainerHeader>
          <ContainerTitle>Adicionar Conteudo</ContainerTitle>
        </ContainerHeader>
        <ContainerForm>
          <form id="addContent" onSubmit={handleSubmit(_createContent)}>
            <InputBlock>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => handleTitle(e.target.value)}
              />
            </InputBlock>

            <InputBlock>
              <label htmlFor="body">Body</label>
              <textarea
                type="textarea"
                id="body"
                value={body}
                onChange={(e) => handleBody(e.target.value)} />
            </InputBlock>

            <InputBlock>
              <label htmlFor="body">Source Link</label>
              <input
                type="text"
                id="source_link"
                value={source_link}
                onChange={(e) => handleSourceLink(e.target.value)} />
            </InputBlock>



            {/* <Input type="submit" className="shadow-sm" /> */}
            <SubmitButton type="submit">
              Criar Conteudo
            </SubmitButton>
          </form>
        </ContainerForm>
      </AddContentContainer>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
  contents: state.user.contents
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setContents,
    setToken
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contents);