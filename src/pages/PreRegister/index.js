import React from 'react';
import { 
  Container, 
  Body, 
  Title, 
  ManImage,
  ManDiv,
  RegisterDiv, 
  FieldDiv,
  FieldName,
  Input,
  LargerInput,
  ButtonsDiv,
  DownloadBtn,
  UploadBtn,
  ButtonName,
  SendButton
} from './styles';
import Header from 'sharedComponents/Header'
import businessMan from './assets/businessMan.svg'

const PreRegister = () => {
  return (
    <Container>
      <Header />
      <Body>
        <Title>
          PRÉ-CADASTRO DE INSTITUIÇÃO
        </Title>
        <ManDiv>
          <ManImage src={businessMan}/>
        </ManDiv>
        <RegisterDiv>
          <FieldDiv>
            <FieldName>
              CNPJ
              <Input />
            </FieldName>
          </FieldDiv>
          <FieldDiv>
            <FieldName>
              Contato
              <Input />
            </FieldName>
          </FieldDiv>
          <FieldDiv>
            <FieldName>
              E-mail Institucional
              <Input />
            </FieldName>
          </FieldDiv>
          <FieldDiv>
            <FieldName>
              Estado
              <Input />
            </FieldName>
          </FieldDiv>
          <FieldDiv>
            <FieldName>
              Tipo de Organização
              <Input />
            </FieldName>
          </FieldDiv>
          <FieldDiv>
            <FieldName>
              Categorias
              <ButtonsDiv>
                <DownloadBtn>
                  <ButtonName>
                    Download
                  </ButtonName>
                </DownloadBtn>
                <UploadBtn>
                  <ButtonName>
                    Upload
                  </ButtonName>
                </UploadBtn>
              </ButtonsDiv>
            </FieldName>
          </FieldDiv>
          <FieldDiv>
            <FieldName>
              Razão Social
              <LargerInput />
            </FieldName>
          </FieldDiv>
        </RegisterDiv>
      </Body>
    </Container>
  );
}

export default PreRegister;