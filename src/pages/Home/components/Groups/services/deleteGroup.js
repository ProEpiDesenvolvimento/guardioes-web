import api from 'services/api';

const deleteGroup = async (id, token) => api
  .delete(`/groups/${id}`, {
    headers: {
      "Authorization": token,
    },
  }
  )
  .then(async (res) => {
    const { data } = res;
    alert("Grupo deletado")
    return data
  })
  .catch((e) => {
    if (e.response?.data.error === "Not enough permissions") {
      alert("Você não tem permissão para deletar Instituições.");
    }
    console.log(e);
    return { data: {}, errors: e }
  });

export default deleteGroup;
