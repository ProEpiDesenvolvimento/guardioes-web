import api from 'services/api';

const deleteFormOption = async (id, token) => 
  api.delete(`/form_options/${id}`, {
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
      alert("Você não tem permissão para deletar Opções de uma Pergunta.");
    }
    console.log(e);
  });

export default deleteFormOption;
