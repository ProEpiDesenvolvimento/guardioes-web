import api from 'services/api';

const deleteFormQuestion = async (id, token) => 
  api.delete(`/form_questions/${id}`, {
    headers: {
      "Authorization": token,
    },
  })
  .then(async (res) => {
    alert('Deletado com sucesso!');
    const response = { data: res.data };
    return response
  })
  .catch((e) => {
    if (e.response.data.error === "You are not authorized to access this page.") {
      alert("Você não tem permissão para deletar Perguntas.");
    } else {
      alert('Algo deu errado, tente novamente!');
    }
    console.log(e);
    return { data: {}, errors: e }
  });

export default deleteFormQuestion;
