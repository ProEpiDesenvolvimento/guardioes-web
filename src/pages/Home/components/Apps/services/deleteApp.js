import api from 'services/api';

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
    console.log(e);
  });

export default deleteApp;
