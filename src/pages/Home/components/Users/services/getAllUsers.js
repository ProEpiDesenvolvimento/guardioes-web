import api from 'services/api';

const getAllUsers = async (token, page) => api
  .get(`/user/panel?page=${page}`,
    {
      headers: {
        "Authorization": token,
      }
    },
  )
  .then(async (res) => {
    const { data } = res;
    return data
  })
  .catch((e) => {
    if (e.response.data.error === "You are not authorized to access this page.") {
      alert("Você não tem permissão para visualizar Usuários.");
    }
    return { data: {}, errors: e }
  });

export default getAllUsers;
