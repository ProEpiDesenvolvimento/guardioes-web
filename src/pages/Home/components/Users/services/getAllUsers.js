import { api } from 'services/api';

const getAllUsers = async (token, page, email) => api
  .get(`/user/panel?page=${page}&email=${email}`,
    {
      headers: {
        "Authorization": token,
      }
    },
    {
      email
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
