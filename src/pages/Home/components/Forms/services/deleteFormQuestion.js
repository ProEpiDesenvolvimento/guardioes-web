import api from 'services/api';

const deleteFormQuestion = async (id, token) => 
  api.delete(`/form_questions/${id}`, {
    headers: {
      "Authorization": token,
    },
  })
  .then(async (res) => {
    alert('Deletado com sucesso!');
    const { data } = res;
    return data
  })
  .catch((e) => {
    if (e.response.data.error === "You are not authorized to access this page.") {
      alert("Você não tem permissão para deletar Perguntas.");
    }
    console.log(e);
  });

export default deleteFormQuestion;
