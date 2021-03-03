import { api } from 'services/api';

const deleteSymptoms = async (id, token) => api
  .delete(`/symptoms/${id}`, {
    headers: {
      "Authorization": token,
    },
  }
  )
  .then(async (res) => {
    const { data } = res;
    // alert("Sintoma deletado")
    return data
  })
  .catch((e) => {
    if (e.response.data.error === "You are not authorized to access this page.") {
      alert("Você não tem permissão para deletar Sintomas.");
    }
    console.log(e);
  });

export default deleteSymptoms;
