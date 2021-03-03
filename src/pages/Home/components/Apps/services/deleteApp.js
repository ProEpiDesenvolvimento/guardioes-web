import { api } from 'services/api';

const deleteApp = async (id, token) => api
  .delete(`/apps/${id}`, {
    headers: {
      "Authorization": token,
    },
  }
  )
  .then(async (res) => {
    const { data } = res;
    alert("App deletado")
    return data
  })
  .catch((e) => {
    if (e.response.data.error === "You are not authorized to access this page.") {
      alert("Você não tem permissão para deletar Apps.");
    }
    console.log(e);
  });

export default deleteApp;
