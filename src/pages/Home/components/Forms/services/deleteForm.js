import api from 'services/api';

const deleteForm = async (id, token) => 
  api.delete(`/forms/${id}`, {
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
      alert("Você não tem permissão para deletar Formulários.");
    }
    console.log(e);
  });

export default deleteForm;
