import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import ModalInput from '../../../../sharedComponents/ModalInput';
import moment from 'moment';

import {SubmitButton} from "./styles"
import ContentBox from '../../components/ContentBox';
import getRumors from "./services/getRumors";
import updateRumor from "./services/editRumor";
import deleteRumor from "./services/deleteRumor";
import { useForm } from "react-hook-form";

const fields = [
    { key: "title", value: "Título" },
    { key: "confirmed_cases", value: "Casos confirmados" },
  ];

const Rumors = ({token}) => {
    const { handleSubmit } = useForm();

    const [rumors, setRumors] = useState([]); 
    const [rumorShow, setRumorShow] = useState({});
    const [rumorEditing, setRumorEditing] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editConfirmedCases, setEditConfirmedCases] = useState(0);
    const [editConfirmedDeaths, setEditConfirmedDeaths] = useState(0);


    useEffect(() => {
      async function _getRumors() {
        try {
          const response = await getRumors(token);
          setRumors(response);
        } catch (err) {
          alert("Algo deu errado. Tente novamente em instantes!");
        }
      }
      _getRumors();
    }, [rumors])


  const handleShow = (rumor) => {
    setRumorShow(rumor);
    setModalShow(!modalShow);
  }

  const handleEdit = (content) => {
    setRumorEditing(content);
    setEditTitle(content.title);
    setEditDescription(content.description);
    setEditConfirmedCases(content.confirmed_cases);
    setEditConfirmedDeaths(content.confirmed_deaths);
    setModalEdit(!modalEdit); 
  }

  const editRumor = async () => {
    const data = {
      "title": editTitle,
      "description": editDescription,
      "confirmed_cases": editConfirmedCases,
      "confirmed_deaths": editConfirmedDeaths,
    };
    await updateRumor(rumorEditing.id, data, token);
    setModalEdit(false);
  }

  const _deleteRumor = async (id) => {
    await deleteRumor(id, token);
  }


  return (
    <>

      <Modal
        show={modalEdit}
        onHide={() => setModalEdit(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Editar Rumor
          </Modal.Title>
        </Modal.Header>
        <form id="editRumor" onSubmit={handleSubmit(editRumor)}>
          <Modal.Body>

          <ModalInput
          type="text"
          label="Título"
          value={editTitle}
          setValue={(e) => setEditTitle(e.target.value)}
        />

        <ModalInput
          type="number"
          label="Casos Confirmados"
          value={editConfirmedCases}
          setValue={(e) => setEditConfirmedCases(e.target.value)}
        />

        <ModalInput
          type="number"
          label="Mortes Confirmadas"
          value={editConfirmedDeaths}
          setValue={(e) => setEditConfirmedDeaths(e.target.value)}
        />

        <ModalInput
          type="textarea"
          label="Detalhes"
          value={editDescription}
          setValue={(e) => setEditDescription(e.target.value)}
        />

        <ModalInput
          type="text"
          label="Rumor informado em:"
          value={moment(rumorEditing.created_at).format('DD/MM/YYYY')}
          disabled={true}
        />

        <ModalInput
          type="text"
          label="Última atualização em:"
          value={moment(rumorEditing.updated_at).format('DD/MM/YYYY')}
          disabled={true}
        />

          </Modal.Body>

          <Modal.Footer>
            <SubmitButton type="submit">Editar</SubmitButton>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Informações do Rumor
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>

        <ModalInput
          type="text"
          label="Título"
          value={rumorShow.title}
          disabled={true}
        />

        <ModalInput
          type="text"
          label="Casos Confirmados"
          value={rumorShow.confirmed_cases}
          disabled={true}
        />

        <ModalInput
          type="text"
          label="Mortes Confirmadas"
          value={rumorShow.confirmed_deaths}
          disabled={true}
        />

        <ModalInput
          type="textarea"
          label="Detalhes"
          value={rumorShow.description}
          disabled={true}
        />

        <ModalInput
          type="text"
          label="Rumor informado em:"
          value={moment(rumorShow.created_at).format('DD/MM/YYYY')}
          disabled={true}
        />

        <ModalInput
          type="text"
          label="Última atualização em:"
          value={moment(rumorShow.updated_at).format('DD/MM/YYYY')}
          disabled={true}
        />

        </Modal.Body>

        <Modal.Footer>
          <SubmitButton onClick={() => setModalShow(false)}>Voltar</SubmitButton>
        </Modal.Footer>
      </Modal>

        <ContentBox
          title={'Rumores'}
          fields={fields}
          contents={rumors}
          handleShow={handleShow}
          component_height={'35rem'}
          delete_function={_deleteRumor}
          token={token}
          handleEdit={handleEdit}
        />

        </>
  )
}

const mapStateToProps = (state) => ({
    token: state.user.token,
  });


export default connect(
    mapStateToProps,
  )(Rumors);